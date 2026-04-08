import clsx from "clsx"
import type { KpiCardData, KpiSeverity } from "../../types/dashboard"

const severityStyles: Record<KpiSeverity, { border: string; badge: string; text: string; label: string }> = {
  critical: {
    border: "border-l-red-c",
    badge: "bg-red-bg text-red-c",
    text: "text-red-c",
    label: "Critical",
  },
  watch: {
    border: "border-l-amber-w",
    badge: "bg-amber-bg text-amber-w",
    text: "text-amber-w",
    label: "Watch",
  },
  healthy: {
    border: "border-l-brand-600",
    badge: "bg-brand-50 text-brand-700",
    text: "text-brand-700",
    label: "Healthy",
  },
}

export function KpiCard({
  data,
  onClick,
  loading,
}: {
  data: KpiCardData
  onClick?: () => void
  loading?: boolean
}) {
  if (loading) {
    return (
      <div className="h-[140px] animate-pulse rounded-xl border-2 border-border bg-surface" />
    )
  }

  const styles = severityStyles[data.severity]

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "group relative flex h-[140px] w-full cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-border bg-surface p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2",
        "border-l-[5px]",
        styles.border,
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-[11px] font-bold tracking-tight text-text-muted leading-tight uppercase">
          {data.title}
        </span>
        <span
          className={clsx(
            "shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            styles.badge,
          )}
        >
          {styles.label}
        </span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-4xl font-extrabold tabular-nums tracking-tight text-text mb-2">{data.value}</p>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={clsx(
              "inline-flex items-center gap-1 font-bold tabular-nums",
              data.deltaUp ? "text-brand-700" : "text-red-c",
            )}
          >
            {data.deltaUp ? "↑" : "↓"} {data.delta}
          </span>
          <span className="text-text-muted font-medium">vs prior period</span>
        </div>
      </div>
    </button>
  )
}
