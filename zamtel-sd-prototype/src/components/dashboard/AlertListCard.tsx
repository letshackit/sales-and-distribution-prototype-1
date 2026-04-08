import clsx from "clsx"
import type { ExceptionItem } from "../../types/dashboard"

function badge(s: ExceptionItem["severity"]) {
  if (s === "critical") return "bg-red-bg text-red-c border-red-c/30"
  if (s === "watch") return "bg-amber-bg text-amber-w border-amber-w/30"
  return "bg-blue-bg text-blue-i border-blue-i/30"
}

export function AlertListCard({
  title,
  items,
  severityFilter,
  onSeverityChange,
  onItemClick,
}: {
  title: string
  items: ExceptionItem[]
  severityFilter: "all" | "critical" | "watch"
  onSeverityChange: (s: "all" | "critical" | "watch") => void
  onItemClick?: (e: ExceptionItem) => void
}) {
  const filtered =
    severityFilter === "all"
      ? items
      : items.filter((i) =>
          severityFilter === "critical"
            ? i.severity === "critical"
            : i.severity === "watch" || i.severity === "info",
        )

  return (
    <div className="rounded-2xl border-2 border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-bold tracking-tight text-text-muted">{title}</h3>
        <div className="flex gap-1 rounded-xl bg-surface-subtle p-1 border border-border">
          {(["all", "critical", "watch"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSeverityChange(s)}
              className={clsx(
                "rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase transition-all duration-200",
                severityFilter === s 
                  ? "bg-white text-brand-700 shadow-sm border border-border/50" 
                  : "text-text-muted border border-transparent hover:text-text hover:bg-white/50",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <ul className="mt-5 max-h-[280px] space-y-2.5 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <li className="rounded-xl border-2 border-dashed border-border px-4 py-10 text-center text-sm text-text-muted font-medium">
            No exceptions for this filter.
          </li>
        ) : (
          filtered.map((ex, idx) => (
            <li key={ex.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <button
                type="button"
                onClick={() => onItemClick?.(ex)}
                className={clsx(
                  "w-full rounded-xl border-2 px-4 py-3.5 text-left text-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
                  badge(ex.severity),
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-text">{ex.issueType}</span>
                  <span className="rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-extrabold text-text-muted border border-border/50">{ex.ageHours}h</span>
                </div>
                <p className="mt-2 text-xs text-text-muted font-medium">
                  {ex.geography} · {ex.owner}
                </p>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
