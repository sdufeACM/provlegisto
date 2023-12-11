use serde::{Deserialize, Serialize};

pub mod rt;
pub mod cmd;
pub mod lsp;
pub mod setup;
pub mod collab;

#[derive(Deserialize, Serialize, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Clone, Copy)]
pub enum LanguageMode {
    CXX,
    PY,
}
