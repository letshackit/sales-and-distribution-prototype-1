import { useState } from "react"
import { useDemo, type GlobalFilters } from "../../context/DemoContext"
import clsx from "clsx"

const primaryFields: { key: keyof GlobalFilters; label: string }[] = [
  { key: "region", label: "Region" },
  { key: "timePeriod", label: "Period" },
]

const advancedFields: { key: keyof GlobalFilters; label: string }[] = [
  { key: "cluster", label: "Cluster" },
  { key: "territory", label: "Territory" },
  { key: "channel", label: "Channel" },
  { key: "visitType", label: "Visit type" },
  { key: "team", label: "Team" },
  { key: "status", label: "Status" },
]

const options: Partial<Record<string, string[]>> = {
  region: ["All regions", "Lusaka", "Copperbelt", "Northern", "Southern"],
  cluster: ["All clusters", "Lusaka Central", "Lusaka East", "Ndola Urban", "Kitwe Trade Belt"],
  territory: ["All territories", "Lusaka Central A", "Ndola CBD", "Livingstone Urban"],
  channel: ["All channels", "Retail", "Agent", "Direct"],
  visitType: ["All types", "Float check", "SIM reg", "Recruitment"],
  team: ["All teams", "Team North", "Team Central"],
  status: ["Active", "All"],
  timePeriod: ["Today", "WTD", "MTD", "QTD"],
}

export function StickyFilterBar() {
  const { filters, setFilters } = useDemo()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const activeAdvancedCount = advancedFields.filter(
    (f) => filters[f.key] && !filters[f.key].includes("All") && filters[f.key] !== "Active"
  ).length

  return (
    <div className="sticky top-0 z-30 border-b border-border bg-surface/95 px-6 py-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-surface/90">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4 min-w-[300px]">
          <div className="relative max-w-sm flex-1">
            <input
              type="text"
              placeholder="Search outlets, agents, or territories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border-2 border-border bg-surface-subtle px-4 py-2.5 pl-10 text-sm font-medium transition-all focus:border-brand-500 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <svg className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex items-center gap-3 border-l-2 border-border pl-4">
            {primaryFields.map(({ key, label }) => (
              <select
                key={key}
                value={filters[key]}
                onChange={(e) => setFilters({ [key]: e.target.value })}
                className="rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-sm font-bold text-text shadow-sm transition-all duration-200 hover:border-brand-500/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
                aria-label={label}
              >
                {(options[key] ?? ["—"]).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={clsx(
              "flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95",
              showAdvanced || activeAdvancedCount > 0
                ? "border-brand-600 bg-brand-50 text-brand-700 shadow-sm"
                : "border-border bg-surface text-text hover:bg-surface-subtle hover:border-brand-500/40"
            )}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
            {activeAdvancedCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] text-white">
                {activeAdvancedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {showAdvanced && (
        <div className="mt-4 animate-slide-up rounded-2xl border-2 border-border bg-surface-subtle p-5 shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">Advanced Filters</h4>
            <button 
              type="button"
              onClick={() => setFilters({
                cluster: "All clusters",
                territory: "All territories",
                channel: "All channels",
                visitType: "All types",
                team: "All teams",
                status: "Active"
              })}
              className="text-xs font-bold text-brand-700 hover:text-brand-800 transition-colors"
            >
              Reset to default
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {advancedFields.map(({ key, label }, idx) => (
              <label 
                key={key} 
                className="flex flex-col gap-1.5 animate-fade-in"
                style={{ animationDelay: `${idx * 0.03}s` }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}</span>
                <select
                  value={filters[key]}
                  onChange={(e) => setFilters({ [key]: e.target.value })}
                  className="rounded-xl border-2 border-border bg-surface px-3 py-2 text-sm font-medium text-text shadow-sm transition-all duration-200 hover:border-brand-500/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
                >
                  {(options[key] ?? ["—"]).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
