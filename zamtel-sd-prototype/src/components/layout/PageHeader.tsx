import clsx from "clsx"
import { useState } from "react"
import { useDemo } from "../../context/DemoContext"
import { ExportButton } from "../shared/ExportButton"
import { NotificationsPanel } from "./NotificationsPanel"

export function PageHeader({
  title,
  showCriticalRibbon,
}: {
  title: string
  showCriticalRibbon?: boolean
}) {
  const {
    role,
    lastRefresh,
    refresh,
    exportBusy,
    setExportBusy,
    filters,
  } = useDemo()

  const [showNotifications, setShowNotifications] = useState(false)
  const [showSavedViews, setShowSavedViews] = useState(false)

  const onExport = () => {
    setExportBusy(true)
    setTimeout(() => setExportBusy(false), 1200)
  }

  return (
    <header className="border-b-2 border-border bg-surface shadow-sm">
      {showCriticalRibbon ? (
        <div className="bg-gradient-to-r from-red-c to-red-600 px-6 py-3 text-center text-sm font-bold text-white shadow-inner animate-fade-in">
          <span className="inline-flex items-center gap-2.5">
            <svg className="h-4 w-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Critical alerts require attention — 2 geo exceptions overdue
          </span>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-6 px-8 py-6">
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-text md:text-4xl">{title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span
              className={clsx(
                "rounded-full px-3.5 py-1 font-bold shadow-sm",
                "bg-brand-600 text-white",
              )}
            >
              {role}
            </span>
            <span className="text-text-muted font-medium">
              Last refresh:{" "}
              <time className="font-bold text-text">{lastRefresh.toLocaleTimeString()}</time>
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="hidden sm:inline font-bold text-text">{filters.timePeriod}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={refresh}
            className="rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-sm font-bold transition-all hover:bg-surface-subtle hover:border-brand-500/40 active:scale-95 shadow-sm"
          >
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </span>
          </button>
          <button
            type="button"
            onClick={() => setShowSavedViews(!showSavedViews)}
            className="rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-sm font-bold transition-all hover:bg-surface-subtle hover:border-brand-500/40 active:scale-95 shadow-sm"
          >
            Saved Views
          </button>
          <ExportButton busy={exportBusy} onClick={onExport} />
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-sm font-bold text-text transition-all hover:bg-surface-subtle hover:border-brand-500/40 active:scale-95 shadow-sm"
            aria-label="Notifications"
          >
            <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-c opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-c" />
            </span>
            Alerts
          </button>
          
          <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>
      </div>
      <div className="border-t-2 border-border bg-gradient-to-r from-surface-subtle to-brand-50/40 px-8 py-3">
        <p className="text-sm">
          <span className="font-bold text-text">Active Filters:</span>{" "}
          <span className="text-text-muted font-medium ml-1">
            {[filters.region, filters.cluster, filters.territory].filter((x) => x && !x.includes("All")).join(" → ") || "All geographies"}
          </span>
        </p>
      </div>
      
      {showSavedViews && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/20 animate-fade-in"
            onClick={() => setShowSavedViews(false)}
          />
          <div className="fixed right-4 top-20 z-50 w-full max-w-md animate-scale-in">
            <div className="rounded-2xl border-2 border-border bg-surface shadow-2xl">
              <div className="border-b border-border bg-gradient-to-r from-surface to-brand-50/30 px-6 py-4">
                <h2 className="text-lg font-bold text-text">Saved Views</h2>
                <p className="text-xs text-text-muted mt-0.5">Quick access to your custom filters</p>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { name: "Lusaka Region - MTD", filters: "Lusaka · All clusters · MTD" },
                  { name: "Critical Alerts Only", filters: "All regions · Critical severity" },
                  { name: "Copperbelt Performance", filters: "Copperbelt · WTD" },
                ].map((view, idx) => (
                  <button
                    key={view.name}
                    className="w-full rounded-xl border-2 border-border bg-surface p-4 text-left transition-all hover:border-brand-500 hover:bg-brand-50 hover:shadow-md animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <p className="font-semibold text-text">{view.name}</p>
                    <p className="text-xs text-text-muted mt-1">{view.filters}</p>
                  </button>
                ))}
              </div>
              <div className="border-t border-border bg-surface-subtle px-6 py-3">
                <button className="text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors">
                  + Save current view
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
