import clsx from "clsx"
import type { RebalanceTask } from "../../types/liquidity"

export function RebalancingTasksQueue({
  tasks,
  showQuickActions,
  onQuickAction,
}: {
  tasks: RebalanceTask[]
  showQuickActions: boolean
  onQuickAction: () => void
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-3 shadow-[var(--shadow-card)]">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Rebalancing tasks</h3>
      <ul className="mt-2 space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="rounded-lg border border-border bg-surface-subtle px-2 py-2 text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-text">{t.title}</span>
              <span
                className={clsx(
                  "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase",
                  t.status === "open" ? "bg-amber-bg text-amber-w" : "bg-blue-bg text-blue-i",
                )}
              >
                {t.status.replace("_", " ")}
              </span>
            </div>
            <p className="text-xs text-text-muted">{t.amount}</p>
            {showQuickActions ? (
              <button
                type="button"
                className="mt-2 text-xs font-semibold text-brand-700 hover:underline"
                onClick={onQuickAction}
              >
                Quick action
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
