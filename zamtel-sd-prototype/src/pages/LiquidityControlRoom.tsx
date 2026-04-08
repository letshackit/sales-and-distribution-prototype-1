import clsx from "clsx"
import { useMemo, useState } from "react"
import { CreateRebalancingTaskModal } from "../components/liquidity/CreateRebalancingTaskModal"
import { FloatRiskBoard } from "../components/liquidity/FloatRiskBoard"
import { LiquidityFilterBar } from "../components/liquidity/LiquidityFilterBar"
import { defaultLiquidityFilters } from "../components/liquidity/liquidityFilterDefaults"
import { LiquidityHealthCard } from "../components/liquidity/LiquidityHealthCard"
import { RebalancingTasksQueue } from "../components/liquidity/RebalancingTasksQueue"
import { RebalancingTimeline } from "../components/liquidity/RebalancingTimeline"
import { TerritoryMatrix } from "../components/liquidity/TerritoryMatrix"
import { DataTable } from "../components/common/DataTable"
import { EmptyState } from "../components/shared/EmptyState"
import { ExportButton } from "../components/shared/ExportButton"
import { SkeletonCard } from "../components/shared/SkeletonCard"
import { KpiCard } from "../components/dashboard/KpiCard"
import { DrillDownDrawer } from "../components/dashboard/DrillDownDrawer"
import { TrendChartCard } from "../components/dashboard/TrendChartCard"
import { AppShell } from "../components/layout/AppShell"
import { useDemo } from "../context/DemoContext"
import {
  w07AgentTable,
  w07ChronicIssues,
  w07CriticalStockouts,
  w07DormantFloat,
  w07Kpis,
  w07NearStockouts,
  w07RebalanceTasks,
  w07TerritoryMatrix,
  w07Timeline,
  w07TimeToStockout,
  w07TopupHistory,
} from "../data/w07Seed"
import type { DrillDownContext } from "../types/dashboard"
import type { KpiCardData } from "../types/dashboard"
import type { LiquidityAgentRow, LiquidityToolbarFilters } from "../types/liquidity"

export function LiquidityControlRoom() {
  const {
    role,
    closeDrillDown,
    drillDown,
    lastRefresh,
    refresh,
    exportBusy,
    setExportBusy,
    analyticsDemoMode,
    loading: ctxLoading,
  } = useDemo()
  const loading = analyticsDemoMode === "loading" || ctxLoading
  const [taskModal, setTaskModal] = useState(false)
  const [territoryFilter, setTerritoryFilter] = useState<string | null>(null)
  const [localDrill, setLocalDrill] = useState<DrillDownContext | null>(null)
  const [liqFilters, setLiqFilters] = useState<LiquidityToolbarFilters>(defaultLiquidityFilters)

  const drawer = localDrill || drillDown

  const onExport = () => {
    setExportBusy(true)
    setTimeout(() => setExportBusy(false), 1000)
  }

  const filteredAgents = useMemo(() => {
    let rows = [...w07AgentTable]
    if (territoryFilter) rows = rows.filter((r) => r.matrixId === territoryFilter)
    if (liqFilters.stockoutState === "critical") rows = rows.filter((r) => r.status === "critical")
    if (liqFilters.stockoutState === "watch") rows = rows.filter((r) => r.status === "watch" || r.nearStockout)
    if (liqFilters.stockoutState === "healthy") rows = rows.filter((r) => r.status === "healthy")
    if (liqFilters.outletType !== "All outlet types") {
      rows = rows.filter((r) => r.outletType === liqFilters.outletType)
    }
    const q = liqFilters.agentQuery.trim().toLowerCase()
    if (q) {
      rows = rows.filter(
        (r) => r.agentName.toLowerCase().includes(q) || r.outlet.toLowerCase().includes(q),
      )
    }
    return rows
  }, [territoryFilter, liqFilters])

  const showActions = role === "Rebalancer" || role === "Admin"
  const empty = analyticsDemoMode === "empty"

  const onKpi = (k: KpiCardData) => {
    setLocalDrill({
      entityType: "kpi",
      entityId: k.id,
      title: k.title,
      subtitle: `Liquidity lens · ${k.value}`,
    })
  }

  const onRisk = (label: string, sub: string) => {
    setLocalDrill({
      entityType: "territory",
      entityId: label,
      title: label,
      subtitle: sub,
    })
  }

  const closeDrawer = () => {
    setLocalDrill(null)
    closeDrillDown()
  }

  return (
    <AppShell>
      <header className="border-b border-border bg-surface">
        <div className="flex flex-wrap items-start justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text">Liquidity Control Room</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted">
              <span className="rounded-full bg-brand-100 px-2 py-0.5 font-semibold text-brand-900">{role}</span>
              <span>
                Updated:{" "}
                <time className="font-medium text-text">{lastRefresh.toLocaleTimeString()}</time>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={refresh}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium hover:border-brand-500/40"
            >
              Refresh
            </button>
            <ExportButton busy={exportBusy} onClick={onExport} variant="secondary" />
            {showActions ? (
              <button
                type="button"
                onClick={() => setTaskModal(true)}
                className="rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-800"
              >
                Create rebalancing task
              </button>
            ) : null}
          </div>
        </div>
        <div className="border-t border-border bg-surface-subtle px-6 py-2">
          <p className="text-xs text-text-muted">
            {territoryFilter ? (
              <span>
                Matrix filter active ·{" "}
                <button
                  type="button"
                  className="font-semibold text-brand-800 underline"
                  onClick={() => setTerritoryFilter(null)}
                >
                  Clear
                </button>
              </span>
            ) : (
              "Operational density — critical items surfaced first"
            )}
          </p>
        </div>
      </header>

      <LiquidityFilterBar value={liqFilters} onChange={(p) => setLiqFilters((f) => ({ ...f, ...p }))} />

      <div className="space-y-6 px-6 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
          {empty ? (
            <div className="col-span-full">
              <EmptyState
                title="No liquidity signals for this filter"
                description="Adjust region, stockout state, or agent search — or switch sidebar demo mode to Live data."
              />
            </div>
          ) : loading ? (
            Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} className="h-[140px]" lines={2} />)
          ) : (
            w07Kpis.map((k) => <KpiCard key={k.id} data={k} loading={false} onClick={() => onKpi(k)} />)
          )}
        </div>

        {!empty && !loading ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="space-y-3 xl:col-span-3">
              <FloatRiskBoard
                title="Critical stockout board"
                variant="critical"
                items={w07CriticalStockouts}
                onSelect={(i) => onRisk(i.label, i.sub)}
              />
              <FloatRiskBoard
                title="Near-stockout board"
                variant="watch"
                items={w07NearStockouts}
                onSelect={(i) => onRisk(i.label, i.sub)}
              />
              <RebalancingTasksQueue
                tasks={w07RebalanceTasks}
                showQuickActions={showActions}
                onQuickAction={() => setTaskModal(true)}
              />
            </div>

            <div className="space-y-4 xl:col-span-6">
              <LiquidityHealthCard cells={w07TerritoryMatrix} />
              <TerritoryMatrix
                cells={w07TerritoryMatrix}
                selectedId={territoryFilter}
                onSelect={(c) => setTerritoryFilter((cur) => (cur === c.territoryId ? null : c.territoryId))}
              />
              <TrendChartCard
                title="Time-to-stockout (hours, blended)"
                data={w07TimeToStockout}
                lines={[{ key: "hours", name: "Est. hours", color: "#dc2626" }]}
              />
              <TrendChartCard
                title="Top-up history (index)"
                data={w07TopupHistory}
                lines={[{ key: "vol", name: "Volume idx", color: "#145a42" }]}
              />
            </div>

            <div className="space-y-4 xl:col-span-3">
              <div className="rounded-[var(--radius-card)] border border-border bg-surface p-3 shadow-[var(--shadow-card)]">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Dormant float opportunities
                </h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {w07DormantFloat.map((d) => (
                    <li key={d.id} className="rounded-lg border border-brand-600/20 bg-brand-50/80 px-2 py-2">
                      <p className="font-medium text-text">{d.outlet}</p>
                      <p className="text-xs text-text-muted">{d.territory}</p>
                      <p className="mt-1 text-xs font-semibold text-brand-800">{d.idle} idle</p>
                      <p className="text-xs text-text-muted">{d.suggestion}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[var(--radius-card)] border border-border bg-surface p-3 shadow-[var(--shadow-card)]">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Chronic liquidity issues
                </h3>
                <ol className="mt-2 space-y-2">
                  {w07ChronicIssues.map((c, i) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between rounded-lg border border-border px-2 py-2 text-sm"
                    >
                      <span>
                        <span className="font-semibold text-text">
                          {i + 1}. {c.agent}
                        </span>
                        <span className="block text-xs text-text-muted">{c.territory}</span>
                      </span>
                      <span className="text-right text-xs">
                        <span className="font-bold text-red-c">{c.topUps30d}</span>
                        <span className="block text-text-muted">top-ups</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <RebalancingTimeline events={w07Timeline} />
            </div>
          </div>
        ) : null}

        {!empty && !loading ? (
          <section>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                Agent / outlet liquidity detail
              </h2>
              <p className="text-xs text-text-muted">Sort columns · row opens drawer</p>
            </div>
            {filteredAgents.length === 0 ? (
              <EmptyState title="No rows match filters" description="Clear matrix or text filters to see all demo agents." />
            ) : (
              <DataTable<LiquidityAgentRow>
                rowKey={(r) => r.id}
                rows={filteredAgents}
                onRowClick={(r) => onRisk(r.agentName, `${r.outlet} · ${r.territory}`)}
                columns={[
                  { key: "agentName", header: "Agent / outlet", sortable: true },
                  { key: "outletType", header: "Outlet type", sortable: true },
                  { key: "territory", header: "Territory", sortable: true },
                  {
                    key: "currentFloat",
                    header: "Float",
                    sortable: true,
                    render: (r) => <span className="tabular-nums">ZMW {r.currentFloat.toLocaleString()}</span>,
                  },
                  {
                    key: "floatThreshold",
                    header: "Float thr.",
                    sortable: true,
                    render: (r) => <span className="tabular-nums">{r.floatThreshold.toLocaleString()}</span>,
                  },
                  {
                    key: "currentCash",
                    header: "Cash",
                    sortable: true,
                    render: (r) => <span className="tabular-nums">ZMW {r.currentCash.toLocaleString()}</span>,
                  },
                  {
                    key: "cashThreshold",
                    header: "Cash thr.",
                    sortable: true,
                    render: (r) => <span className="tabular-nums">{r.cashThreshold.toLocaleString()}</span>,
                  },
                  {
                    key: "healthScore",
                    header: "Health",
                    sortable: true,
                    render: (r) => (
                      <span
                        className={clsx(
                          "font-semibold tabular-nums",
                          r.healthScore >= 80 ? "text-brand-700" : r.healthScore >= 60 ? "text-amber-w" : "text-red-c",
                        )}
                      >
                        {r.healthScore}
                      </span>
                    ),
                  },
                  { key: "lastTopUp", header: "Last top-up", sortable: true },
                  {
                    key: "status",
                    header: "Status",
                    sortable: true,
                    render: (r) => (
                      <span
                        className={clsx(
                          "rounded-full px-2 py-0.5 text-xs font-semibold capitalize",
                          r.status === "healthy" && "bg-brand-100 text-brand-900",
                          r.status === "watch" && "bg-amber-bg text-amber-w",
                          r.status === "critical" && "bg-red-bg text-red-c",
                        )}
                      >
                        {r.status}
                      </span>
                    ),
                  },
                  {
                    key: "id",
                    header: "Actions",
                    render: () =>
                      showActions ? (
                        <button
                          type="button"
                          className="text-xs font-semibold text-brand-700 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation()
                            setTaskModal(true)
                          }}
                        >
                          Rebalance
                        </button>
                      ) : (
                        <span className="text-text-muted">—</span>
                      ),
                  },
                ]}
              />
            )}
          </section>
        ) : null}
      </div>

      <DrillDownDrawer open={!!drawer} context={drawer} onClose={closeDrawer} />
      <CreateRebalancingTaskModal open={taskModal} onClose={() => setTaskModal(false)} />
    </AppShell>
  )
}
