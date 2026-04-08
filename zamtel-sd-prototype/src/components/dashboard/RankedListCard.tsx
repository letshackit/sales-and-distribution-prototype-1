import clsx from "clsx"
import type { RankedEntity } from "../../types/dashboard"

export function RankedListCard({
  title,
  variant,
  items,
}: {
  title: string
  variant: "top" | "bottom"
  items: RankedEntity[]
}) {
  return (
    <div className="rounded-2xl border-2 border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-brand-500/50 animate-fade-in">
      <h3 className="text-sm font-bold tracking-tight text-text-muted">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((r, idx) => (
          <li
            key={r.rank}
            className="group flex items-center justify-between gap-3 rounded-xl border-2 border-border bg-surface-subtle px-4 py-3.5 text-sm transition-all duration-200 hover:bg-brand-50 hover:border-brand-400 hover:shadow-md cursor-pointer animate-fade-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className={clsx(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold shadow-md transition-all duration-200 group-hover:scale-110",
                variant === "top" 
                  ? "bg-brand-600 text-white" 
                  : "bg-red-100 text-red-700"
              )}>
                {r.rank}
              </span>
              <span className="truncate font-bold text-text">{r.name}</span>
            </span>
            <span
              className={clsx(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-extrabold tabular-nums shadow-sm",
                variant === "top" 
                  ? "bg-brand-50 text-brand-700" 
                  : "bg-red-bg text-red-c",
              )}
            >
              {r.variance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
