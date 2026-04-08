import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { DataTable } from "../components/common/DataTable"
import { DrillDownDrawer } from "../components/dashboard/DrillDownDrawer"
import { FieldBridgeBanner } from "../components/field/FieldBridgeBanner"
import { MetricStrip } from "../components/dashboard/MetricStrip"
import { TrendChartCard } from "../components/dashboard/TrendChartCard"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"
import { StickyFilterBar } from "../components/layout/StickyFilterBar"
import { useDemo } from "../context/DemoContext"
import { w01MissedReasons } from "../data/w01Seed"
import { w02Kpis } from "../data/webScreensSeed"
import type { KpiCardData } from "../types/dashboard"

const aseRows = [
  { id: "1", ase: "Ruth Tembo", planned: 20, done: 16, adherence: 91, timeAvg: "17m" },
  { id: "2", ase: "Brian Mulenga", planned: 18, done: 14, adherence: 84, timeAvg: "19m" },
  { id: "3", ase: "Chanda Phiri", planned: 22, done: 19, adherence: 88, timeAvg: "16m" },
]

export function FieldExecutionDashboard() {
  const { loading, openDrillDown, drillDown, closeDrillDown } = useDemo()

  const onKpiClick = (kpi: KpiCardData) => {
    openDrillDown({
      entityType: "kpi",
      entityId: kpi.id,
      title: kpi.title,
      subtitle: `Value: ${kpi.value} — drill-down (demo)`,
    })
  }

  return (
    <AppShell>
      <PageHeader title="Field Execution Dashboard" />
      <StickyFilterBar />
      <div className="space-y-8 px-6 py-8 pb-10 animate-fade-in">
        <FieldBridgeBanner title="Live field bridge (prototype)" />
        <MetricStrip kpis={w02Kpis} onKpiClick={onKpiClick} loading={loading} />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="group rounded-2xl border-2 border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">Missed visit reasons</h3>
            <div className="h-64 min-h-64 w-full min-w-0 mt-4">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={256}>
                <PieChart>
                  <Pie data={w01MissedReasons} dataKey="value" nameKey="name" innerRadius={65} outerRadius={95} paddingAngle={4} isAnimationActive={false}>
                    {w01MissedReasons.map((_, i) => (
                      <Cell key={i} fill={["#145a42", "#238b64", "#d97706", "#64748b", "#dc2626"][i % 5]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: 12,
                      border: "2px solid #e2e8e4",
                      fontSize: 13,
                      fontWeight: 600,
                      boxShadow: "var(--shadow-card-hover)",
                      padding: "12px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <TrendChartCard
            title="Route adherence trend (14d)"
            data={Array.from({ length: 14 }, (_, i) => ({ day: `D${i + 1}`, v: 82 + (i % 5) }))}
            lines={[{ key: "v", name: "Adherence %", color: "#145a42" }]}
          />
        </div>
        <section className="rounded-2xl border-2 border-border bg-surface p-7 shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-extrabold text-text">ASE Performance</h2>
            <button className="rounded-xl border-2 border-border bg-surface px-4 py-2 text-sm font-bold transition-all hover:bg-brand-50 hover:border-brand-500 hover:shadow-md active:scale-95">
              Export Report
            </button>
          </div>
          <DataTable
            rowKey={(r) => r.id}
            rows={aseRows}
            columns={[
              { key: "ase", header: "ASE", sortable: true },
              { key: "planned", header: "Planned", sortable: true },
              { key: "done", header: "Completed", sortable: true },
              { key: "adherence", header: "Adherence %", sortable: true },
              { key: "timeAvg", header: "Avg Time", sortable: true },
            ]}
          />
        </section>

        <DrillDownDrawer 
          open={!!drillDown} 
          context={drillDown} 
          onClose={closeDrillDown} 
        />
      </div>
    </AppShell>
  )
}
