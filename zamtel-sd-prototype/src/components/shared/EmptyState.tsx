import type { ReactNode } from "react"

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-card)] border-2 border-dashed border-border bg-gradient-to-br from-surface-subtle to-brand-50/20 px-8 py-16 text-center shadow-sm animate-fade-in">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface border-2 border-dashed border-border mb-4">
        <svg className="h-8 w-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <p className="text-base font-bold text-text">{title}</p>
      {description ? <p className="mt-2 max-w-md text-sm text-text-muted">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
