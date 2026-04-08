import clsx from "clsx"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { DrillDownContext } from "../../types/dashboard"

const trendData = Array.from({ length: 30 }, (_, i) => ({
  d: `${i + 1}`,
  v: 70 + Math.round(Math.sin(i / 4) * 12 + i * 0.2),
}))

export function DrillDownDrawer({
  open,
  context,
  onClose,
}: {
  open: boolean
  context: DrillDownContext | null
  onClose: () => void
}) {
  if (!open || !context) return null

  return (
    <>
      <button
        type="button"
        aria-label="Close panel"
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-border bg-surface shadow-[var(--shadow-drawer)] animate-slide-in-right"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border bg-gradient-to-r from-surface to-brand-50/30 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              {context.entityType === "map" ? "Territory" : context.entityType === "kpi" ? "KPI" : "Entity"}
            </p>
            <h2 className="mt-1.5 text-xl font-bold text-text">{context.title}</h2>
            {context.subtitle ? (
              <p className="mt-1 text-sm text-text-muted">{context.subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text transition-all hover:bg-surface-subtle hover:border-brand-500/40"
          >
            Close
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <section aria-label="Entity KPI summary">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">Summary Metrics</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                ["Coverage", "76%", "brand"],
                ["Exceptions", "3", "amber"],
                ["Risk", "Watch", "red"],
              ].map(([k, v, color]) => (
                <div key={k} className={clsx(
                  "rounded-xl border-2 px-3 py-3 text-center shadow-sm transition-all duration-200 hover:shadow-md",
                  color === "brand" && "border-brand-600/30 bg-brand-50",
                  color === "amber" && "border-amber-w/30 bg-amber-bg",
                  color === "red" && "border-red-c/30 bg-red-bg"
                )}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{k}</p>
                  <p className={clsx(
                    "text-lg font-bold tabular-nums mt-1",
                    color === "brand" && "text-brand-700",
                    color === "amber" && "text-amber-w",
                    color === "red" && "text-red-c"
                  )}>{v}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">30-Day Trend</h3>
            <div className="mt-3 h-44 min-h-44 w-full min-w-0 rounded-xl border border-border bg-surface p-3 shadow-sm">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={176}>
                <AreaChart data={trendData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
                  <XAxis dataKey="d" hide />
                  <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid var(--color-border)",
                      fontSize: 12,
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="var(--color-brand-700)"
                    fill="var(--color-brand-100)"
                    strokeWidth={2.5}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">Top Performing Agents</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {["Ruth Tembo", "Brian Mulenga", "Chanda Phiri"].map((n, idx) => (
                <li
                  key={n}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface-subtle px-4 py-3 transition-all duration-200 hover:bg-brand-50 hover:border-brand-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-text">{n}</span>
                  </div>
                  <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">ASE</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">Top Outlets</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {["Zamtel Point Cairo Road", "Kalingalinga MoMo Hub", "Ndola Trade Corner Agent"].map((n) => (
                <li
                  key={n}
                  className="flex justify-between items-center rounded-lg border border-border bg-surface px-4 py-3 transition-all duration-200 hover:bg-brand-50 hover:border-brand-300 cursor-pointer"
                >
                  <span className="font-medium text-text">{n}</span>
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">Active</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-xl border-2 border-amber-w/30 bg-amber-bg px-5 py-4 shadow-sm">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-amber-w shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-bold text-amber-w">Open Issues</h3>
                <p className="mt-1 text-sm text-text">
                  2 exceptions linked to this geography — supervisor review recommended.
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-800 hover:shadow-md active:scale-95"
              >
                Assign Supervisor
              </button>
              <button
                type="button"
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition-all hover:bg-surface-subtle hover:border-brand-500/40"
              >
                Export
              </button>
            </div>
          </section>
        </div>
      </aside>
    </>
  )
}
