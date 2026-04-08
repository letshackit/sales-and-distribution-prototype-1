import { DataTable } from "../components/common/DataTable"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"
import { StickyFilterBar } from "../components/layout/StickyFilterBar"
import { w07Timeline } from "../data/w07Seed"
import { w08LogRows } from "../data/webScreensSeed"

export function FloatRebalancingLog() {
  return (
    <AppShell>
      <PageHeader title="Float rebalancing log" />
      <StickyFilterBar />
      <div className="space-y-6 px-6 py-6">
        <DataTable
          rowKey={(r) => r.id}
          rows={w08LogRows}
          columns={[
            { key: "when", header: "When", sortable: true },
            { key: "from", header: "From", sortable: true },
            { key: "to", header: "To", sortable: true },
            { key: "amount", header: "ZMW", sortable: true, render: (r) => <span className="tabular-nums">{r.amount}</span> },
            { key: "territory", header: "Territory", sortable: true },
            { key: "status", header: "Status", sortable: true },
            { key: "mode", header: "Mode", sortable: true },
          ]}
        />
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
          <h3 className="text-xs font-semibold uppercase text-text-muted">Timeline</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {w07Timeline.map((e) => (
              <li key={e.id}>
                <span className="font-mono text-xs text-text-muted">{e.time}</span>{" "}
                <span className="text-text">{e.summary}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  )
}
