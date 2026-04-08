import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { DrillDownDrawer } from "../components/dashboard/DrillDownDrawer"
import { FunnelCard } from "../components/dashboard/FunnelCard"
import { MetricStrip } from "../components/dashboard/MetricStrip"
import { TrendChartCard } from "../components/dashboard/TrendChartCard"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"
import { StickyFilterBar } from "../components/layout/StickyFilterBar"
import { useDemo } from "../context/DemoContext"
import { w09ChannelMix, w09Funnel } from "../data/webScreensSeed"
import type { KpiCardData } from "../types/dashboard"

const w09Kpis: KpiCardData[] = [
  {
    id: "ga",
    title: "GA vs target",
    value: "86%",
    delta: "-2.1%",
    deltaUp: false,
    sparkline: Array.from({ length: 12 }, (_, i) => ({ x: `${i}`, y: 88 - (i % 4) })),
    severity: "watch",
  },
  {
    id: "mm",
    title: "MoMo GA",
    value: "1,180",
    delta: "+4%",
    deltaUp: true,
    sparkline: Array.from({ length: 12 }, (_, i) => ({ x: `${i}`, y: 1100 + i * 5 })),
    severity: "healthy",
  },
  {
    id: "cv",
    title: "Activation conv.",
    value: "64%",
    delta: "+1%",
    deltaUp: true,
    sparkline: Array.from({ length: 12 }, (_, i) => ({ x: `${i}`, y: 62 + (i % 3) })),
    severity: "healthy",
  },
  {
    id: "g4",
    title: "Territory gap",
    value: "-28%",
    delta: "worst",
    deltaUp: false,
    sparkline: Array.from({ length: 12 }, (_, i) => ({ x: `${i}`, y: 20 + i })),
    severity: "critical",
  },
]

export function AcquisitionDashboard() {
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
      <PageHeader title="Acquisition Dashboard" />
      <StickyFilterBar />
      <div className="space-y-8 px-6 py-8 pb-10 animate-fade-in">
        <MetricStrip kpis={w09Kpis} onKpiClick={onKpiClick} loading={loading} />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <FunnelCard data={w09Funnel} title="Acquisition funnel (30d)" />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <TrendChartCard
              title="Conversion trend"
              data={Array.from({ length: 14 }, (_, i) => ({ day: `D${i + 1}`, a: 58 + (i % 6), b: 62 + (i % 4) }))}
              lines={[
                { key: "a", name: "Reg → act", color: "#145a42" },
                { key: "b", name: "Act → 1st tx", color: "#64748b" },
              ]}
            />
          </div>
        </div>
        <div className="group rounded-2xl border-2 border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">Channel Mix Distribution</h3>
          <div className="h-64 min-h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={256}>
              <PieChart>
                <Pie data={w09ChannelMix} dataKey="pct" nameKey="channel" outerRadius={95} label isAnimationActive={false}>
                  {w09ChannelMix.map((_, i) => (
                    <Cell key={i} fill={["#145a42", "#238b64", "#d97706"][i % 3]} />
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

        <DrillDownDrawer 
          open={!!drillDown} 
          context={drillDown} 
          onClose={closeDrillDown} 
        />
      </div>
    </AppShell>
  )
}
