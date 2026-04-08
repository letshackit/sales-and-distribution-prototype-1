import type { RebalanceEvent } from "../../types/liquidity"

export function RebalancingTimeline({ events }: { events: RebalanceEvent[] }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-3 shadow-[var(--shadow-card)]">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-text-muted">Recent rebalancing</h3>
      <ul className="mt-2 space-y-2 text-xs">
        {events.map((e) => (
          <li key={e.id} className="flex gap-2 border-b border-border pb-2 last:border-0">
            <span className="w-14 shrink-0 font-mono text-text-muted">{e.time}</span>
            <span>
              <span className="font-medium text-text">{e.summary}</span>
              <span className="block text-text-muted">{e.territory}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
