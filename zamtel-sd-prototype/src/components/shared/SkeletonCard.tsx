import clsx from "clsx"

export function SkeletonCard({ className, lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-[var(--radius-card)] border border-border bg-gradient-to-br from-surface to-surface-subtle p-5 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="h-4 w-1/3 rounded-lg bg-surface-subtle" />
      <div className="mt-5 space-y-3">
        {Array.from({ length: lines }, (_, i) => (
          <div 
            key={i} 
            className="h-3 rounded-lg bg-surface-subtle" 
            style={{ width: `${80 - i * 12}%` }} 
          />
        ))}
      </div>
    </div>
  )
}
