import { Outlet } from "react-router-dom"
import { PhoneDeviceFrame } from "./PhoneDeviceFrame"

export function MobilePhoneRoot() {
  return (
    <PhoneDeviceFrame>
      <div className="flex h-full min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
    </PhoneDeviceFrame>
  )
}
