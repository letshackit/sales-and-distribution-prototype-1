import { useFieldBridge } from "../../hooks/useFieldBridge"

/** Reflects mobile session activity stored in localStorage (same browser tab / prototype). */
export function FieldBridgeBanner({ title = "Field session bridge" }: { title?: string }) {
  const { bridge } = useFieldBridge()

  if (!bridge || (bridge.visitCount === 0 && !bridge.lastVisit)) {
    return (
      <div className="rounded-xl border-2 border-dashed border-border bg-surface-subtle px-5 py-4 text-sm shadow-sm animate-fade-in">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-text-muted shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-semibold text-text">{title}</p>
            <p className="mt-1 text-text-muted">
              Open <span className="rounded bg-surface border border-border px-1.5 py-0.5 font-mono text-xs">/mobile/login</span> to simulate field activity. 
              Visit data syncs via browser storage.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border-2 border-brand-600/30 bg-gradient-to-r from-brand-50 to-brand-100/50 px-5 py-4 text-sm shadow-md animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 shadow-sm">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-bold text-brand-900">{title}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-2.5 py-1 font-semibold text-white shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Live
            </span>
            <span className="font-medium text-text">{bridge.userName}</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-muted">{bridge.territory}</span>
            <span className="text-text-muted">·</span>
            <span className="font-semibold text-brand-800">{bridge.visitCount} visits</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-muted">Route {bridge.routeDone}/{bridge.routeTotal}</span>
            {bridge.pendingSync > 0 && (
              <>
                <span className="text-text-muted">·</span>
                <span className="rounded-full bg-amber-bg px-2 py-0.5 font-semibold text-amber-w">{bridge.pendingSync} pending sync</span>
              </>
            )}
          </div>
          {bridge.lastVisit ? (
            <p className="mt-2 text-xs text-brand-800">
              <span className="font-semibold">Last activity:</span> {bridge.lastVisit.outletName} — {bridge.lastVisit.visitType} ({bridge.lastVisit.outcome})
              {bridge.lastVisit.payloadSummary ? ` · ${bridge.lastVisit.payloadSummary}` : ""} · {new Date(bridge.lastVisit.at).toLocaleString()}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
