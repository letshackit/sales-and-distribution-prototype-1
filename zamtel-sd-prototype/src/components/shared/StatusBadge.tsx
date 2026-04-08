import clsx from "clsx"

export type StatusBadgeTone = "healthy" | "watch" | "critical" | "info" | "neutral"

const tones: Record<StatusBadgeTone, string> = {
  healthy: "bg-brand-100 text-brand-900 border-brand-600/20",
  watch: "bg-amber-bg text-amber-w border-amber-w/30",
  critical: "bg-red-bg text-red-c border-red-c/30",
  info: "bg-blue-bg text-blue-i border-blue-i/30",
  neutral: "bg-surface-subtle text-text-muted border-border",
}

/** First-pass contract: shared status vocabulary (web + mobile). */
export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode
  tone?: StatusBadgeTone
  className?: string
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
