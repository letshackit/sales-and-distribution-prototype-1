import type { ReactNode } from "react"
import { RoleAwareSidebar } from "./RoleAwareSidebar"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh w-full bg-surface-subtle text-text">
      <RoleAwareSidebar />
      <main className="min-w-0 flex-1 overflow-x-auto">{children}</main>
    </div>
  )
}
