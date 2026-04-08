import type { KpiCardData } from "../../types/dashboard"
import { KpiCard } from "./KpiCard"

export function MetricStrip({
  kpis,
  onKpiClick,
  loading,
}: {
  kpis: KpiCardData[]
  onKpiClick?: (k: KpiCardData) => void
  loading?: boolean
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {kpis.map((k, idx) => (
        <div key={k.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
          <KpiCard data={k} loading={loading} onClick={() => onKpiClick?.(k)} />
        </div>
      ))}
    </div>
  )
}
