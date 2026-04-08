import clsx from "clsx"

/** Reusable export control — pairs with demo `exportBusy` from context. */
export function ExportButton({
  busy,
  onClick,
  label = "Export",
  variant = "primary",
  className,
}: {
  busy?: boolean
  onClick: () => void
  label?: string
  variant?: "primary" | "secondary"
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={clsx(
        "rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
        variant === "primary" && "bg-brand-700 text-white hover:bg-brand-800 hover:shadow-md",
        variant === "secondary" && "border border-border bg-surface font-medium text-text hover:bg-surface-subtle hover:border-brand-500/40",
        className,
      )}
    >
      {busy ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Exporting...
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {label}
        </span>
      )}
    </button>
  )
}
