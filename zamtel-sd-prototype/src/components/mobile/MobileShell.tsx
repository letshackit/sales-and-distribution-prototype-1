import clsx from "clsx"
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom"
import { useMobileVisit } from "../../context/MobileVisitContext"

const items = [
  { to: "/mobile/today", label: "Home" },
  { to: "/mobile/route", label: "Route" },
  { to: "/mobile/tasks", label: "Tasks" },
  { to: "/mobile/history", label: "History" },
  { to: "/mobile/sync", label: "Sync" },
]

/** First-pass handoff name: MobileAppShell */
export function MobileShell() {
  const { state, logout } = useMobileVisit()
  const location = useLocation()

  if (!state.loggedIn) {
    return <Navigate to="/mobile/login" replace state={{ from: location.pathname }} />
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-surface-subtle text-text">
      <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-border bg-brand-900 px-3 py-2 text-white">
        <span className="text-sm font-semibold">Zamtel Field</span>
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
              state.offline ? "bg-amber-w text-white" : "bg-brand-100 text-brand-900",
            )}
          >
            {state.offline ? "Offline" : "Online"}
          </span>
          <button type="button" onClick={logout} className="text-xs text-white/80 hover:text-white">
            Exit
          </button>
        </div>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 pb-24">
        <Outlet />
      </main>
      <nav className="sticky bottom-0 z-20 flex w-full justify-around border-t border-border bg-surface px-1 py-2 text-[11px] font-semibold shadow-[var(--shadow-card)]">
        {items.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex flex-1 flex-col items-center rounded-lg px-1 py-1",
                isActive ? "text-brand-700" : "text-text-muted",
              )
            }
          >
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
