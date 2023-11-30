import { VscClose } from "react-icons/vsc"
import { Link, Outlet, useNavigate } from "react-router-dom"
import PrefCatalog from "./catalog"
import { Suspense } from "react"
import Loading from "@/components/loading"
import { useZoom } from "@/hooks/useZoom"

export default function Preference() {
  useZoom()
  const navigate = useNavigate()
  return (
    <div className="m-8 w-full shadow-md select-none relative">
      <button className="absolute right-4 top-4" onClick={() => navigate('/')}>
        <VscClose />
      </button>
      <div className="flex box-border rounded-lg h-full flex-row gap-2 content-stretch">
        <PrefCatalog>
          <li>
            <Link to="/pref/appearance">Appearance</Link>
          </li>
          <li>
            <Link to="/pref/editor">Editor</Link>
          </li>
          <li>
            <Link to="/pref/keymap">Keymap</Link>
          </li>
        </PrefCatalog>
        <div className="flex-1 p-8 overflow-y-auto">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
