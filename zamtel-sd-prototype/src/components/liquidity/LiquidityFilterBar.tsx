import { useDemo } from "../../context/DemoContext"
import type { LiquidityToolbarFilters } from "../../types/liquidity"

export function LiquidityFilterBar({
  value,
  onChange,
}: {
  value: LiquidityToolbarFilters
  onChange: (p: Partial<LiquidityToolbarFilters>) => void
}) {
  const { filters, setFilters } = useDemo()

  return (
    <div className="sticky top-0 z-30 border-b border-border bg-surface/95 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-text-muted">
        W07 filters (first-pass contract)
      </p>
      <div className="flex flex-wrap gap-3">
        <label className="flex min-w-[120px] flex-col gap-1 sm:min-w-[130px]">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">Region</span>
          <select
            value={filters.region}
            onChange={(e) => setFilters({ region: e.target.value })}
            className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm"
          >
            {["All regions", "Lusaka", "Copperbelt", "Northern", "Southern"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[120px] flex-col gap-1 sm:min-w-[130px]">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">Cluster</span>
          <select
            value={filters.cluster}
            onChange={(e) => setFilters({ cluster: e.target.value })}
            className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm"
          >
            {["All clusters", "Lusaka Central", "Lusaka East", "Ndola Urban", "Kitwe Trade Belt"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[120px] flex-col gap-1 sm:min-w-[130px]">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">Territory</span>
          <select
            value={filters.territory}
            onChange={(e) => setFilters({ territory: e.target.value })}
            className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm"
          >
            {["All territories", "Lusaka Central A", "Ndola CBD", "Livingstone Urban"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[120px] flex-col gap-1 sm:min-w-[130px]">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">Outlet type</span>
          <select
            value={value.outletType}
            onChange={(e) => onChange({ outletType: e.target.value })}
            className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm"
          >
            {["All outlet types", "Mobile Money Agent", "Master Agent", "Retail"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[140px] flex-1 flex-col gap-1 sm:min-w-[160px]">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">Agent contains</span>
          <input
            value={value.agentQuery}
            onChange={(e) => onChange({ agentQuery: e.target.value })}
            placeholder="Name or outlet ID"
            className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm"
          />
        </label>
        <label className="flex min-w-[120px] flex-col gap-1 sm:min-w-[130px]">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">Stockout state</span>
          <select
            value={value.stockoutState}
            onChange={(e) => onChange({ stockoutState: e.target.value as LiquidityToolbarFilters["stockoutState"] })}
            className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm"
          >
            <option value="all">All</option>
            <option value="critical">Critical</option>
            <option value="watch">Watch / near</option>
            <option value="healthy">Healthy</option>
          </select>
        </label>
        <label className="flex min-w-[120px] flex-col gap-1 sm:min-w-[130px]">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">Date range</span>
          <select
            value={value.dateRange}
            onChange={(e) => onChange({ dateRange: e.target.value })}
            className="rounded-lg border border-border bg-surface px-2 py-1.5 text-sm"
          >
            {["Today", "WTD", "MTD", "7d"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
