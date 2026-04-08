import { Link } from "react-router-dom"
import { DataTable } from "../components/common/DataTable"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"

const visits = [
  { id: "v1", when: "2026-03-30 09:14", outlet: "OUT-NDL-021", type: "Float & Cash", outcome: "Completed" },
  { id: "v2", when: "2026-03-29 14:02", outlet: "OUT-LSK-014", type: "SIM reg", outcome: "Completed" },
]

export function Agent360() {
  return (
    <AppShell>
      <PageHeader title="Agent 360 view" />
      <div className="space-y-6 px-6 py-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)] lg:col-span-1">
            <p className="text-xs font-semibold uppercase text-text-muted">Profile</p>
            <p className="mt-2 text-xl font-bold text-text">Brian Mulenga</p>
            <p className="text-sm text-text-muted">ASE · Copperbelt · Ndola Urban</p>
            <p className="mt-3 text-sm">
              Device: <span className="font-medium text-brand-700">Online</span>
            </p>
            <Link to="/liquidity" className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline">
              Open liquidity for assigned outlets →
            </Link>
          </div>
          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)] lg:col-span-2">
            <p className="text-xs font-semibold uppercase text-text-muted">KPI snapshot</p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Visits today", "16/20"],
                ["PoV pass", "100%"],
                ["Geo exceptions", "1"],
                ["GA contrib.", "11"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-surface-subtle px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase text-text-muted">{k}</p>
                  <p className="text-lg font-bold text-text">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-text-muted">Last visits</h2>
          <DataTable
            rowKey={(r) => r.id}
            rows={visits}
            columns={[
              { key: "when", header: "Time", sortable: true },
              { key: "outlet", header: "Outlet", sortable: true },
              { key: "type", header: "Type", sortable: true },
              { key: "outcome", header: "Outcome", sortable: true },
            ]}
          />
        </section>
        <div className="rounded-[var(--radius-card)] border border-dashed border-border bg-surface-subtle p-6 text-center text-sm text-text-muted">
          Evidence gallery &amp; open issues would load here from visit records (prototype placeholder).
        </div>
      </div>
    </AppShell>
  )
}
