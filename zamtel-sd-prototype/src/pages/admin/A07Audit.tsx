import { useState } from "react"
import { DataTable } from "../../components/common/DataTable"
import clsx from "clsx"

const rows = [
  { id: "1", when: "2026-03-31 09:12", actor: "admin@demo", action: "Rule change", target: "Near-stockout ratio", category: "Threshold", severity: "medium" },
  { id: "2", when: "2026-03-31 08:45", actor: "tl.mutale", action: "Approval", target: "Geo override REQ-441", category: "Workflow", severity: "low" },
  { id: "3", when: "2026-03-31 07:22", actor: "admin@demo", action: "User created", target: "Sarah Zulu", category: "User", severity: "low" },
  { id: "4", when: "2026-03-30 16:30", actor: "zbm.banda", action: "Territory update", target: "Lusaka Central A", category: "Territory", severity: "medium" },
  { id: "5", when: "2026-03-30 14:40", actor: "tl.mutale", action: "Approval", target: "Geo override REQ-441", category: "Workflow", severity: "low" },
  { id: "6", when: "2026-03-30 12:15", actor: "admin@demo", action: "Threshold change", target: "Geo-fence radius", category: "Threshold", severity: "high" },
  { id: "7", when: "2026-03-30 10:05", actor: "tm.mulenga", action: "Outlet deactivated", target: "OUT-KAS-008", category: "Outlet", severity: "medium" },
  { id: "8", when: "2026-03-29 16:50", actor: "admin@demo", action: "Workflow enabled", target: "Compliance violation", category: "Workflow", severity: "medium" },
  { id: "9", when: "2026-03-29 14:20", actor: "tl.phiri", action: "Approval", target: "Float rebalancing REQ-328", category: "Workflow", severity: "low" },
  { id: "10", when: "2026-03-29 11:30", actor: "admin@demo", action: "Integration config", target: "SMS gateway", category: "Integration", severity: "high" },
]

export function A07Audit() {
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterSeverity, setFilterSeverity] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRows = rows.filter(r => 
    (filterCategory === "All" || r.category === filterCategory) &&
    (filterSeverity === "All" || r.severity === filterSeverity) &&
    (r.actor.toLowerCase().includes(searchQuery.toLowerCase()) || r.action.toLowerCase().includes(searchQuery.toLowerCase()) || r.target.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] flex-col p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text">Audit Log</h1>
          <p className="text-sm text-text-muted mt-1">System activity and configuration changes</p>
        </div>
        <button className="rounded-2xl border-2 border-border bg-surface px-6 py-3 text-sm font-bold text-text transition-all hover:bg-surface-subtle hover:border-brand-500/40 active:scale-95 shadow-sm">
          Export Log
        </button>
      </div>
      
      <div className="rounded-2xl border-2 border-border bg-surface shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="border-b-2 border-border bg-surface-subtle px-6 py-5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <input 
                placeholder="Search audit trail..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border-2 border-border bg-surface px-4 py-2.5 pl-10 text-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <svg className="absolute left-3.5 top-3 h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex items-center gap-3">
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-sm font-bold text-text transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option>All Categories</option>
                <option>User</option>
                <option>Territory</option>
                <option>Outlet</option>
                <option>Threshold</option>
                <option>Workflow</option>
                <option>Integration</option>
              </select>
              
              <select 
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-sm font-bold text-text transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option>All Severities</option>
                <option value="high">High Severity</option>
                <option value="medium">Medium Severity</option>
                <option value="low">Low Severity</option>
              </select>
              
              {(filterCategory !== "All" || filterSeverity !== "All" || searchQuery) && (
                <button 
                  onClick={() => { setFilterCategory("All"); setFilterSeverity("All"); setSearchQuery(""); }}
                  className="text-sm font-bold text-brand-700 hover:text-brand-800 transition-colors ml-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <DataTable
            rowKey={(r) => r.id}
            rows={filteredRows}
            columns={[
              { key: "when", header: "Timestamp", sortable: true },
              { 
                key: "actor", 
                header: "Actor", 
                sortable: true,
                render: (r) => <span className="font-semibold text-text">{r.actor}</span>
              },
              { key: "action", header: "Action", sortable: true },
              { key: "target", header: "Target", sortable: true },
              {
                key: "category",
                header: "Category",
                sortable: true,
                render: (r) => (
                  <span className="inline-flex rounded-full bg-surface-subtle border border-border px-2.5 py-1 text-[10px] font-extrabold text-text-muted uppercase tracking-wider">
                    {r.category}
                  </span>
                ),
              },
              {
                key: "severity",
                header: "Severity",
                sortable: true,
                render: (r) => (
                  <span className={clsx(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
                    r.severity === "high" ? "bg-red-bg text-red-c" :
                    r.severity === "medium" ? "bg-amber-bg text-amber-w" :
                    "bg-brand-50 text-brand-700"
                  )}>
                    {r.severity}
                  </span>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
