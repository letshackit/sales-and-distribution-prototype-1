import type { TerritoryLiquidityCell } from "../../types/liquidity"

/** Aggregate territory health snapshot for W07 center column context. */
export function LiquidityHealthCard({ cells }: { cells: TerritoryLiquidityCell[] }) {
  const avg = Math.round(cells.reduce((s, c) => s + c.health, 0) / Math.max(1, cells.length))
  const below = cells.reduce((s, c) => s + c.belowThresholdAgents, 0)

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Portfolio liquidity health</h3>
      <p className="mt-2 text-3xl font-bold tabular-nums text-brand-800">{avg}</p>
      <p className="text-sm text-text-muted">Blended health score (0–100) across visible territories</p>
      <p className="mt-2 text-xs font-medium text-amber-w">{below} agent slots below threshold (demo)</p>
    </div>
  )
}
