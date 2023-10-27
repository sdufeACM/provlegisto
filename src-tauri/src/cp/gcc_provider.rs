use std::{path::PathBuf, process::Stdio, time::Duration};

use futures_util::TryFutureExt;
use tokio::{
    fs::File,
    io::{AsyncReadExt, BufReader},
    process::Command,
};
use uuid::Uuid;

use crate::{
    platform::{self, apply_win_flags},
    settings::Settings,
    AppCache,
};

use super::{CompilerCaller, ExecuatorCaller, ExecuatorStatus, LanguageProvider};

pub struct GccCompiler;
#[async_trait::async_trait]
impl CompilerCaller for GccCompiler {
    fn ext(&self) -> &'static str {
        "cpp"
    }

    async fn compile_file(
        &self,
        settings: &Settings,
        app_cache: &AppCache,
        path: &str,
    ) -> Result<String, String> {
        let output_filepath = app_cache.file_with_name(&sha256::try_digest(path).unwrap());
        let output = output_filepath.to_str().unwrap().to_owned();

        let mut proc = apply_win_flags(
            tokio::process::Command::new(&settings.cxx_compiler_program)
                .arg(path)
                .args(["-o", &output])
                .args(&settings.cxx_compiler_arguments)
                .stderr(Stdio::piped())
                .stdout(Stdio::piped()),
            platform::CREATE_NO_WINDOW,
        )
        .spawn()
        .map_err(|e| e.to_string())?;
        let mut err_msg = String::new();
        let mut reader = BufReader::new(proc.stderr.take().unwrap());
        reader.read_to_string(&mut err_msg).await.unwrap();
        let exit_status = proc.wait().map_err(|e| e.to_string()).await?;
        if exit_status.success() {
            Ok(output)
        } else {
            Err(err_msg)
        }
    }
}

pub struct ExeExecuator;

#[async_trait::async_trait]
impl ExecuatorCaller for ExeExecuator {
    fn run_detached(&self, settings: &Settings, consolepauser: &str, target: &str) {
        let mut consolepauser_args = vec![String::from("1"), Uuid::new_v4().to_string()];
        let (term, args) = if settings.terminal_program.is_empty() {
            consolepauser_args.push(target.to_owned());
            (consolepauser, consolepauser_args)
        } else {
            consolepauser_args.append(&mut settings.terminal_arguments.clone());
            consolepauser_args.push(String::from(consolepauser));
            consolepauser_args.push(String::from(target));
            (settings.terminal_program.as_str(), consolepauser_args)
        };

        platform::apply_win_flags(Command::new(term).args(&args), platform::CREATE_NEW_CONSOLE)
            .spawn()
            .unwrap();
    }

    async fn run(
        &self,
        _settings: &Settings,
        target: &str,
        input_from: &str,
        output_to: &str,
        time_limits: u64,
    ) -> Result<(), (ExecuatorStatus, String)> {
        let oup = PathBuf::from(output_to);
        let inp = File::open(PathBuf::from(input_from)).await.unwrap();
        if oup.exists() {
            tokio::fs::remove_file(&oup)
                .await
                .map_err(|e| (ExecuatorStatus::UKE, e.to_string()))?;
        }
        let oup = File::create(oup)
            .await
            .map_err(|e| (ExecuatorStatus::UKE, e.to_string()))?;

        let mut proc = apply_win_flags(
            tokio::process::Command::new(target)
                .stdin(Stdio::from(inp.into_std().await))
                .stdout(Stdio::from(oup.into_std().await))
                .stderr(Stdio::piped()),
            platform::CREATE_NO_WINDOW,
        )
        .spawn()
        .map_err(|e| (ExecuatorStatus::UKE, e.to_string()))?;

        let mut err_msg = String::new();

        let timeout_res =
            tokio::time::timeout(Duration::from_millis(time_limits), proc.wait()).await;

        let mut reader = BufReader::new(proc.stderr.take().unwrap());

        if timeout_res.is_err() {
            proc.kill().await.unwrap();
            return Err((ExecuatorStatus::TLE, String::new()));
        }
        reader
            .read_to_string(&mut err_msg)
            .await
            .map_err(|e| (ExecuatorStatus::RE, e.to_string()))?;

        match timeout_res.unwrap() {
            Ok(exit_code) => {
                if exit_code.success() {
                    return Ok(());
                } else {
                    return Err((ExecuatorStatus::RE, String::new()));
                }
            }
            Err(err) => {
                return Err((ExecuatorStatus::UKE, err.to_string()));
            }
        }
    }
}

pub struct GccProvider;
impl LanguageProvider for GccProvider {
    fn generator(&self) -> Box<dyn ExecuatorCaller> {
        Box::new(ExeExecuator)
    }

    fn compiler(&self) -> Box<dyn CompilerCaller> {
        Box::new(GccCompiler)
    }

    fn executaor(&self) -> Box<dyn ExecuatorCaller> {
        Box::new(ExeExecuator)
    }
}
