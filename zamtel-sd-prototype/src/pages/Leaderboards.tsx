import { DataTable } from "../components/common/DataTable"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"
import { StickyFilterBar } from "../components/layout/StickyFilterBar"

const ase = [
  { id: "1", name: "Ruth Tembo", territory: "Lusaka Central A", visits: 19, ga: 12, score: 94 },
  { id: "2", name: "Chanda Phiri", territory: "Lusaka East", visits: 21, ga: 10, score: 91 },
  { id: "3", name: "Brian Mulenga", territory: "Ndola CBD", visits: 16, ga: 11, score: 88 },
]

export function Leaderboards() {
  return (
    <AppShell>
      <PageHeader title="Leaderboards &amp; performance" />
      <StickyFilterBar />
      <div className="px-6 py-6">
        <DataTable
          rowKey={(r) => r.id}
          rows={ase}
          columns={[
            { key: "name", header: "ASE", sortable: true },
            { key: "territory", header: "Territory", sortable: true },
            { key: "visits", header: "Visits", sortable: true },
            { key: "ga", header: "GA", sortable: true },
            {
              key: "score",
              header: "Productivity",
              sortable: true,
              render: (r) => <span className="font-bold text-brand-700">{r.score}</span>,
            },
          ]}
        />
      </div>
    </AppShell>
  )
}
