import { DataTable } from "../components/common/DataTable"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"
import { StickyFilterBar } from "../components/layout/StickyFilterBar"
import { unvisitedAging } from "../data/w01Seed"
import { coverageGaps } from "../data/webScreensSeed"

export function OutletCoverage() {
  return (
    <AppShell>
      <PageHeader title="Outlet coverage" />
      <StickyFilterBar />
      <div className="space-y-6 px-6 py-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {coverageGaps.map((c) => (
            <div key={c.cluster} className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
              <p className="text-xs font-semibold uppercase text-text-muted">Cluster gap</p>
              <p className="mt-2 text-lg font-bold text-text">{c.cluster}</p>
              <p className="text-2xl font-bold text-amber-w">{c.gapPct}%</p>
              <p className="text-sm text-text-muted">{c.unvisited} unvisited outlets (demo)</p>
            </div>
          ))}
        </div>
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-text-muted">
            Unvisited outlet aging
          </h2>
          <DataTable
            rowKey={(r) => r.outlet}
            rows={unvisitedAging}
            columns={[
              { key: "outlet", header: "Outlet", sortable: true },
              { key: "territory", header: "Territory", sortable: true },
              {
                key: "days",
                header: "Days",
                sortable: true,
                render: (r) => <span className="font-semibold text-amber-w">{r.days}</span>,
              },
            ]}
          />
        </section>
      </div>
    </AppShell>
  )
}
