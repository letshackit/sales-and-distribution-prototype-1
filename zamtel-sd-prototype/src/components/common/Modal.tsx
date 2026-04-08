import { useEffect, type ReactNode } from "react"

export function Modal({
  open,
  title,
  children,
  onClose,
  footer,
}: {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button type="button" className="absolute inset-0 bg-text/30" aria-label="Close" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[61] w-full max-w-md rounded-t-[var(--radius-panel)] border border-border bg-surface shadow-[var(--shadow-drawer)] sm:rounded-[var(--radius-panel)]"
      >
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-base font-semibold text-text">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-text-muted hover:bg-surface-subtle"
          >
            Close
          </button>
        </header>
        <div className="max-h-[70vh] overflow-y-auto px-4 py-3">{children}</div>
        {footer ? <footer className="border-t border-border px-4 py-3">{footer}</footer> : null}
      </div>
    </div>
  )
}
