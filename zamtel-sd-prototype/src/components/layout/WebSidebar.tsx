import clsx from "clsx"
import { NavLink } from "react-router-dom"
import type { RoleCode } from "../../types/contracts"
import { useDemo } from "../../context/DemoContext"

const groups = [
  {
    title: "Command Center",
    items: [
      { to: "/dashboard", label: "Executive Dashboard", code: "W01" },
      { to: "/exceptions", label: "Exception Queue", code: "W06" },
    ],
  },
  {
    title: "Operations",
    items: [
      { to: "/field", label: "Field Execution", code: "W02" },
      { to: "/agent", label: "Agent 360", code: "W05" },
      { to: "/recruitment", label: "Recruitment Pipeline", code: "W10" },
    ],
  },
  {
    title: "Network & Coverage",
    items: [
      { to: "/map", label: "Geo Performance", code: "W03" },
      { to: "/coverage", label: "Outlet Coverage", code: "W04" },
    ],
  },
  {
    title: "Liquidity",
    items: [
      { to: "/liquidity", label: "Control Room", code: "W07" },
      { to: "/rebalancing", label: "Rebalancing Log", code: "W08" },
    ],
  },
  {
    title: "Reports & Analytics",
    items: [
      { to: "/acquisition", label: "Acquisition", code: "W09" },
      { to: "/leaderboards", label: "Leaderboards", code: "W11" },
      { to: "/reports", label: "Exports", code: "W12" },
    ],
  },
  {
    title: "Administration",
    items: [
      { to: "/admin/users", label: "Admin Console", code: "A01+" },
      { to: "/mobile/login", label: "Mobile App (Demo)", code: "M01+" },
    ],
  },
]

const roles: RoleCode[] = ["ZBM", "TDR", "TL", "Rebalancer", "Admin", "ASE"]

export function WebSidebar() {
  const { role, setRole, analyticsDemoMode, setAnalyticsDemoMode } = useDemo()

  return (
    <aside className="flex w-64 shrink-0 flex-col overflow-y-auto border-r border-border bg-gradient-to-b from-brand-900 to-brand-800 text-white shadow-xl">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm shadow-lg">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-100">Zamtel S&amp;D</p>
            <p className="mt-0.5 text-base font-bold leading-tight">Operations Console</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-5 p-3">
        {groups.map((g, gIdx) => (
          <div key={g.title} className="animate-fade-in" style={{ animationDelay: `${gIdx * 0.1}s` }}>
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-white/50">{g.title}</p>
            <div className="space-y-1">
              {g.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive && "bg-white/15 text-white shadow-sm",
                      !isActive && "text-white/75 hover:bg-white/10 hover:text-white",
                    )
                  }
                >
                  <span className="truncate">{item.label}</span>
                  <span className="shrink-0 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold text-white/70 transition-all duration-200 group-hover:bg-white/20">
                    {item.code}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 bg-brand-800/50 p-4 space-y-3 backdrop-blur-sm">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Demo Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as RoleCode)}
            className="mt-1.5 w-full rounded-lg border border-white/20 bg-brand-800 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/30 hover:bg-brand-700"
          >
            {roles.map((r) => (
              <option key={r} value={r} className="text-text">
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">
            Analytics Mode
          </label>
          <select
            value={analyticsDemoMode}
            onChange={(e) => setAnalyticsDemoMode(e.target.value as "live" | "empty" | "loading")}
            className="mt-1.5 w-full rounded-lg border border-white/20 bg-brand-800 px-3 py-2 text-xs font-medium text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/30 hover:bg-brand-700"
          >
            <option value="live">Live Data</option>
            <option value="empty">Empty State</option>
            <option value="loading">Loading Skeleton</option>
          </select>
        </div>
      </div>
    </aside>
  )
}
