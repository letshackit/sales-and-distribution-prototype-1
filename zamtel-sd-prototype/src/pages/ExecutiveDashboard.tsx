import { useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { AlertListCard } from "../components/dashboard/AlertListCard"
import { AssignSupervisorModal } from "../components/dashboard/AssignSupervisorModal"
import { DrillDownDrawer } from "../components/dashboard/DrillDownDrawer"
import { FunnelCard } from "../components/dashboard/FunnelCard"
import { MapPanel } from "../components/dashboard/MapPanel"
import { MetricStrip } from "../components/dashboard/MetricStrip"
import { RankedListCard } from "../components/dashboard/RankedListCard"
import { TrendChartCard } from "../components/dashboard/TrendChartCard"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"
import { TopFilterBar } from "../components/layout/TopFilterBar"
import { FieldBridgeBanner } from "../components/field/FieldBridgeBanner"
import { EmptyState } from "../components/shared/EmptyState"
import { SkeletonCard } from "../components/shared/SkeletonCard"
import { Toast } from "../components/shared/Toast"
import { useDemo } from "../context/DemoContext"
import {
  complianceSummary,
  trendFieldPerf,
  trendLiquidityRisk,
  unvisitedAging,
  w01AcquisitionFunnel,
  w01BottomTerritories,
  w01Exceptions,
  w01Kpis,
  w01MapZones,
  w01MissedReasons,
  w01TopTerritories,
} from "../data/w01Seed"
import type { ExceptionItem, KpiCardData } from "../types/dashboard"
import type { MapZone } from "../types/dashboard"

function DonutCard() {
  return (
    <div className="group rounded-2xl border-2 border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50 animate-fade-in">
      <h3 className="text-sm font-bold tracking-tight text-text-muted">Missed visit reasons</h3>
      <div className="mt-5 h-56 min-h-56 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={224}>
          <PieChart>
            <Pie
              data={w01MissedReasons}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              isAnimationActive={false}
            >
              {w01MissedReasons.map((_, i) => (
                <Cell
                  key={i}
                  fill={["#145a42", "#238b64", "#d97706", "#64748b", "#dc2626"][i % 5]}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: 12, 
                fontSize: 13, 
                fontWeight: 600,
                border: "2px solid #e2e8e4",
                boxShadow: "var(--shadow-card-hover)",
                padding: "12px"
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function ExecutiveDashboard() {
  const {
    loading,
    mapLayer,
    setMapLayer,
    drillDown,
    openDrillDown,
    closeDrillDown,
    exceptionSeverity,
    setExceptionSeverity,
    analyticsDemoMode,
  } = useDemo()

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [assignedCases, setAssignedCases] = useState<string[]>([])
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  const isEmpty = analyticsDemoMode === "empty"
  const isLoading = loading || analyticsDemoMode === "loading"

  const handleAssignSupervisor = (_supervisor: string, cases: string[]) => {
    setAssignedCases(cases)
    setSuccessMessage(`Successfully assigned ${cases.length} case${cases.length !== 1 ? 's' : ''} to supervisor`)
    setShowSuccessToast(true)
    
    setTimeout(() => {
      setAssignedCases([])
      setShowSuccessToast(false)
    }, 5000)
  }

  const handleExportIssues = async () => {
    setIsExporting(true)
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsExporting(false)
    setSuccessMessage("Cluster issue list exported successfully")
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
  }

  const handleOpenApprovalQueue = () => {
    setSuccessMessage("Opening approval queue...")
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 2000)
  }

  const onKpi = (k: KpiCardData) => {
    openDrillDown({
      entityType: "kpi",
      entityId: k.id,
      title: k.title,
      subtitle: `Value ${k.value} — drill-down (demo)`,
    })
  }

  const onZone = (z: MapZone) => {
    openDrillDown({
      entityType: "map",
      entityId: z.id,
      title: z.label,
      subtitle: "Territory drill-down",
    })
  }

  const onException = (e: ExceptionItem) => {
    openDrillDown({
      entityType: "territory",
      entityId: e.id,
      title: e.issueType,
      subtitle: e.geography,
    })
  }

  return (
    <AppShell>
      <PageHeader title="Executive Dashboard" showCriticalRibbon />
      <TopFilterBar />
      <div className="space-y-8 px-6 py-8 pb-10">
        <FieldBridgeBanner title="Field activity (local bridge)" />
        <MetricStrip kpis={w01Kpis} onKpiClick={onKpi} loading={isLoading} />

        {isEmpty ? (
          <EmptyState
            title="No dashboard data for the current lens"
            description="W01 first-pass contract: use sidebar “Analytics demo” → Live data, or widen filters."
            action={
              <p className="text-xs text-text-muted">
                Export and drill-down stay available once live data is restored.
              </p>
            }
          />
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="space-y-4 xl:col-span-3">
              <SkeletonCard lines={4} />
              <SkeletonCard lines={3} />
            </div>
            <div className="xl:col-span-6">
              <SkeletonCard className="min-h-[320px]" lines={6} />
            </div>
            <div className="space-y-4 xl:col-span-3">
              <SkeletonCard lines={4} />
              <SkeletonCard lines={3} />
            </div>
          </div>
        ) : (
        <div className="flex flex-col gap-8">
          {/* Top: High-priority insight panels & map */}
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <MapPanel zones={w01MapZones} layer={mapLayer} onLayerChange={setMapLayer} onZoneClick={onZone} />
            </div>
            <div className="space-y-6">
              <AlertListCard
                title="Exception queue"
                items={w01Exceptions}
                severityFilter={exceptionSeverity}
                onSeverityChange={setExceptionSeverity}
                onItemClick={onException}
              />
            <div className="rounded-2xl border-2 border-brand-600/40 bg-gradient-to-br from-brand-50 to-brand-100/60 p-6 shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-in">
              <h3 className="text-sm font-bold tracking-tight text-brand-800">
                Supervisor approvals
              </h3>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-3xl font-extrabold text-brand-900">3</span>
                  <span className="text-sm text-text-muted font-medium">pending approvals</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 font-bold text-white shadow-sm">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    SLA on track
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenApprovalQueue}
                  className="mt-5 w-full rounded-xl bg-brand-700 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-brand-800 hover:shadow-xl active:scale-98 flex items-center justify-center gap-2"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Open Approval Queue
                </button>
              </div>
            </div>
          </div>

          {/* Middle: Secondary insights */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            <div className="group rounded-2xl border-2 border-border bg-gradient-to-br from-surface to-brand-50/40 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50 animate-fade-in">
              <h3 className="text-sm font-bold tracking-tight text-text-muted">
                Coverage summary
              </h3>
              <p className="mt-5 text-5xl font-extrabold tabular-nums text-brand-800 transition-all duration-200 group-hover:text-brand-900 group-hover:scale-105">76%</p>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">Active outlets visited vs planned route capacity</p>
              <div className="mt-5 h-4 overflow-hidden rounded-full bg-surface-subtle shadow-inner border border-border/50">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: "76%" }}
                />
              </div>
            </div>
            
            <div className="group rounded-2xl border-2 border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50 animate-fade-in">
              <h3 className="text-sm font-bold tracking-tight text-text-muted">
                Proof-of-visit compliance
              </h3>
              <p className="mt-5 text-4xl font-extrabold text-text transition-all duration-200 group-hover:text-brand-700 group-hover:scale-105">94.2%</p>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">Valid photo + GPS within tolerance</p>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 font-bold text-brand-700 shadow-sm">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Above target
                </span>
              </div>
            </div>

            <RankedListCard title="Top territories" variant="top" items={w01TopTerritories} />
            <RankedListCard title="Bottom territories" variant="bottom" items={w01BottomTerritories} />
          </div>

          {/* Bottom: Drillable operational views */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <DonutCard />
            <div className="rounded-2xl border-2 border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50 animate-fade-in">
              <h3 className="text-sm font-bold tracking-tight text-text-muted">
                Unvisited outlet aging
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {unvisitedAging.map((u) => (
                  <li
                    key={u.outlet}
                    className="flex justify-between gap-3 rounded-xl border-2 border-border bg-surface-subtle px-4 py-3 transition-all duration-200 hover:bg-brand-50 hover:border-brand-400 hover:shadow-sm"
                  >
                    <span className="min-w-0 truncate text-text font-semibold">{u.outlet}</span>
                    <span className="shrink-0 rounded-full bg-amber-bg px-3 py-1 text-xs font-bold text-amber-w shadow-sm">{u.days}d</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="rounded-2xl border-2 border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50 animate-fade-in">
              <h3 className="text-sm font-bold tracking-tight text-text-muted">Action center</h3>
              {assignedCases.length > 0 && (
                <div className="mt-4 rounded-xl bg-brand-50 border-2 border-brand-600/30 px-4 py-3 text-sm animate-slide-up shadow-sm">
                  <p className="font-bold text-brand-900 flex items-center gap-2">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Assigned successfully
                  </p>
                  <p className="text-xs text-brand-700 mt-1">{assignedCases.length} cases assigned to supervisor</p>
                </div>
              )}
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => setIsAssignModalOpen(true)}
                    className="w-full rounded-xl bg-brand-600 px-4 py-3.5 font-bold text-white transition-all duration-200 hover:bg-brand-700 hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 shadow-md"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Assign supervisor to 2 open geo cases
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleExportIssues}
                    disabled={isExporting}
                    className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3.5 font-bold text-text transition-all duration-200 hover:bg-brand-50 hover:border-brand-500 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isExporting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export cluster issue list
                      </>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        )}

        {!isEmpty && !isLoading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <FunnelCard data={w01AcquisitionFunnel} title="Acquisition funnel (30d)" />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <TrendChartCard
              title="Liquidity risk trend"
              data={trendLiquidityRisk}
              lines={[{ key: "risk", name: "Risk index", color: "#dc2626" }]}
            />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <TrendChartCard
              title="Field performance trend"
              data={trendFieldPerf}
              lines={[
                { key: "adherence", name: "Route adherence %", color: "#145a42" },
                { key: "productivity", name: "Productivity", color: "#64748b" },
              ]}
            />
          </div>
          <div className="group rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Competitor / compliance
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between items-center rounded-lg border border-border bg-surface-subtle px-3 py-2 transition-colors hover:bg-red-bg/30">
                <span className="text-text-muted">Pricing violations</span>
                <span className="rounded-full bg-red-bg px-2.5 py-0.5 text-xs font-bold text-red-c">{complianceSummary.pricingViolations}</span>
              </li>
              <li className="flex justify-between items-center rounded-lg border border-border bg-surface-subtle px-3 py-2 transition-colors hover:bg-amber-bg/30">
                <span className="text-text-muted">Branding partial / none</span>
                <span className="rounded-full bg-amber-bg px-2.5 py-0.5 text-xs font-bold text-amber-w">{complianceSummary.brandingPartial}</span>
              </li>
              <li className="flex justify-between items-center rounded-lg border border-border bg-surface-subtle px-3 py-2 transition-colors hover:bg-brand-50">
                <span className="text-text-muted">Competitor presence</span>
                <span className="font-bold text-text">{complianceSummary.competitorHeavyPct}%</span>
              </li>
              <li className="flex justify-between items-center rounded-lg border border-border bg-surface-subtle px-3 py-2 transition-colors hover:bg-brand-50">
                <span className="text-text-muted">Service issues</span>
                <span className="font-bold text-text">{complianceSummary.serviceIssues}</span>
              </li>
            </ul>
          </div>
        </div>
        ) : null}

        <footer className="mt-8 border-t border-border bg-surface-subtle/50 px-6 py-4 text-center">
          <p className="text-xs text-text-muted">
            Zamtel Sales &amp; Distribution Platform — Executive Dashboard
          </p>
          <p className="text-xs text-text-muted mt-1">
            Last updated: {new Date().toLocaleString()} · Demo environment
          </p>
        </footer>
      </div>

      <DrillDownDrawer open={!!drillDown} context={drillDown} onClose={closeDrillDown} />
      <AssignSupervisorModal 
        isOpen={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignSupervisor}
      />
      <Toast message={successMessage} type="success" isVisible={showSuccessToast} />
    </AppShell>
  )
}
