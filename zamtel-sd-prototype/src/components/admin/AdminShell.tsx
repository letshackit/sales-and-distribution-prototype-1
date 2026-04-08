import clsx from "clsx"
import { NavLink, Outlet } from "react-router-dom"

const links = [
  { to: "/admin/users", label: "Users & roles", code: "A01" },
  { to: "/admin/territory", label: "Territory", code: "A02" },
  { to: "/admin/outlets", label: "Outlets", code: "A03" },
  { to: "/admin/forms", label: "Form configurator", code: "A04" },
  { to: "/admin/thresholds", label: "Thresholds", code: "A05" },
  { to: "/admin/workflows", label: "Workflows", code: "A06" },
  { to: "/admin/audit", label: "Audit log", code: "A07" },
  { to: "/admin/integrations", label: "Integrations", code: "A08" },
]

export function AdminShell() {
  return (
    <div className="flex min-h-svh bg-surface-subtle">
      <aside className="w-72 shrink-0 border-r border-border bg-surface shadow-sm">
        <div className="px-6 pt-8 pb-6 border-b border-border bg-surface">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 shadow-xl">
              <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[2px] text-text-muted">ADMIN CONSOLE</p>
              <p className="text-2xl font-bold tracking-tighter text-text">Configuration</p>
            </div>
          </div>
        </div>
        
        <nav className="px-4 py-6 space-y-1">
          {links.map((l, idx) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                clsx(
                  "group flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-200 animate-fade-in",
                  isActive
                    ? "bg-brand-600 text-white shadow-lg scale-[1.02]"
                    : "text-text hover:bg-brand-50 hover:text-brand-700 border border-transparent hover:border-brand-200",
                )
              }
              style={{ animationDelay: `${idx * 0.04}s` }}
            >
              <span>{l.label}</span>
              <span className="rounded-2xl px-3 py-1 text-xs font-mono font-bold transition-all duration-200 bg-surface border border-border text-text-muted group-hover:bg-brand-100 group-hover:text-brand-700">
                {l.code}
              </span>
            </NavLink>
          ))}
        </nav>
        
        <div className="absolute bottom-8 px-6 w-72">
          <div className="rounded-2xl border border-border bg-surface-subtle p-4 text-xs">
            <div className="flex items-center gap-2 text-text-muted">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              System Online
            </div>
            <div className="text-[10px] mt-1 text-text-muted">Last backup: 2 hours ago</div>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto bg-surface">
        <Outlet />
      </main>
    </div>
  )
}
