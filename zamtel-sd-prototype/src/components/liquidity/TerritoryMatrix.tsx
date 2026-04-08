import clsx from "clsx"
import type { TerritoryLiquidityCell } from "../../types/liquidity"

export function TerritoryMatrix({
  cells,
  selectedId,
  onSelect,
}: {
  cells: TerritoryLiquidityCell[]
  selectedId: string | null
  onSelect: (c: TerritoryLiquidityCell) => void
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Territory liquidity matrix</h3>
      <p className="mt-1 text-xs text-text-muted">Click a cell to filter the page (demo)</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {cells.map((c) => {
          const heat =
            c.health >= 75 ? "bg-brand-600 text-white" : c.health >= 60 ? "bg-amber-w text-white" : "bg-red-c text-white"
          return (
            <button
              key={c.territoryId}
              type="button"
              onClick={() => onSelect(c)}
              className={clsx(
                "rounded-lg p-3 text-left text-xs font-medium transition ring-2 ring-transparent hover:ring-brand-500/40",
                heat,
                selectedId === c.territoryId && "ring-brand-700 ring-offset-2",
              )}
            >
              <span className="line-clamp-2 leading-tight">{c.name}</span>
              <span className="mt-2 block text-[10px] font-normal opacity-90">
                Health {c.health} · {c.belowThresholdAgents} below thr.
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
