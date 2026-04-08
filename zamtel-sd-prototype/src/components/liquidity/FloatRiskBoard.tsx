import clsx from "clsx"
import type { RiskBoardItem } from "../../types/liquidity"

/** W07 — critical / near-stockout urgent boards (first-pass name: FloatRiskBoard). */
export function FloatRiskBoard({
  title,
  items,
  variant,
  onSelect,
}: {
  title: string
  items: RiskBoardItem[]
  variant: "critical" | "watch"
  onSelect: (i: RiskBoardItem) => void
}) {
  return (
    <div
      className={clsx(
        "rounded-[var(--radius-card)] border bg-surface p-3 shadow-[var(--shadow-card)]",
        variant === "critical" ? "border-red-c/40" : "border-amber-w/40",
      )}
    >
      <h3
        className={clsx(
          "text-xs font-semibold uppercase tracking-wide",
          variant === "critical" ? "text-red-c" : "text-amber-w",
        )}
      >
        {title}
      </h3>
      <ul className="mt-2 space-y-2">
        {items.map((it) => (
          <li key={it.id}>
            <button
              type="button"
              onClick={() => onSelect(it)}
              className={clsx(
                "w-full rounded-lg border px-2 py-2 text-left text-sm transition hover:border-brand-500/50",
                variant === "critical" ? "border-red-c/25 bg-red-bg/50" : "border-amber-w/25 bg-amber-bg/50",
              )}
            >
              <p className="font-semibold text-text">{it.label}</p>
              <p className="text-xs text-text-muted">{it.sub}</p>
              <p className="mt-1 text-xs tabular-nums">
                Float ZMW {it.float.toLocaleString()} / threshold {it.threshold.toLocaleString()}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
