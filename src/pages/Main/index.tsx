import PrimarySide from "./sidebar"
import clsx from "clsx"
import PrimaryPanel from "./sidebar-panel"
import StatusBar from "@/components/statusbar"
import EditorTabPanel from "./editor"
import Runner from "@/components/runner"
import MainEventRegister from "./event"
import { useAtom, useAtomValue } from "jotai"
import { primaryPanelShowAtom, statusBarShowAtom } from "@/store/ui"
import { useZoom } from "@/hooks/useZoom"
import { hostnameAtom, setupDeviceAtom } from "@/store/setting/setup"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { activedSourceAtom } from "@/store/source"
import * as log from "tauri-plugin-log-api"

export default function Main() {
  useZoom()
  // const hostname = useAtomValue(hostnameAtom)
  // const setupHostname = useAtomValue(setupDeviceAtom)
  // const navgiate = useNavigate()
  const [activePrimaryPanel] = useAtom(primaryPanelShowAtom)
  const [showStatusBar] = useAtom(statusBarShowAtom)

  // useEffect(() => {
  //   log.info(`hostname: ${hostname}`)
  //   log.info(`setupHostname: ${setupHostname}`)
  //   if (setupHostname != hostname) navgiate("/setup")
  // }, [hostname, setupHostname])

  const activedSource = useAtomValue(activedSourceAtom)

  const editor = activedSource ? (
    <EditorTabPanel className="box-border flex-1 min-h-0" source={activedSource} />
  ) : (
    //TODO: make it beautiful
    <div className="box-border flex-1 min-h-0">No File opened</div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex flex-col items-stretch">
      <MainEventRegister />
      <div className="flex-1 flex flex-row min-h-0">
        <PrimarySide />
        <PrimaryPanel
          className={clsx({
            hidden: activePrimaryPanel === null,
          })}
        >
          <Runner className={clsx({ hidden: activePrimaryPanel != "run" })} source={activedSource} />
        </PrimaryPanel>
        <div className="flex-1 flex flex-col w-0 min-h-0">{editor}</div>
      </div>
      {showStatusBar ? <StatusBar className="h-6 w-full" /> : null}
    </motion.div>
  )
}
