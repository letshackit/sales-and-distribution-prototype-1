import clsx from "clsx"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import type { GpsState } from "../../context/MobileVisitContext"
import { StatusBadge } from "../shared/StatusBadge"

export function MobileHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-text-muted">Zamtel Field</p>
      <h1 className="text-lg font-bold leading-tight text-text">{title}</h1>
      {subtitle ? <p className="mt-1 text-xs text-text-muted">{subtitle}</p> : null}
    </header>
  )
}

export function StatusChipRow({
  gps,
  offline,
  pendingSync,
  pendingApproval,
}: {
  gps: GpsState
  offline: boolean
  pendingSync: number
  pendingApproval?: number
}) {
  const gpsLabel =
    gps === "locating"
      ? "GPS locating"
      : gps === "valid"
        ? "GPS valid"
        : gps === "weak"
          ? "Weak GPS"
          : gps === "blocked"
            ? "Blocked"
            : "Offline capture"

  return (
    <div className="flex flex-wrap gap-1.5">
      <StatusBadge tone={offline ? "watch" : "healthy"}>{offline ? "Offline" : "Online"}</StatusBadge>
      <StatusBadge tone={gps === "valid" ? "healthy" : gps === "weak" ? "watch" : gps === "blocked" ? "critical" : "info"}>
        {gpsLabel}
      </StatusBadge>
      <StatusBadge tone={pendingSync > 0 ? "watch" : "neutral"}>Sync {pendingSync}</StatusBadge>
      {pendingApproval != null && pendingApproval > 0 ? (
        <StatusBadge tone="info">Approvals {pendingApproval}</StatusBadge>
      ) : null}
    </div>
  )
}

export function ProgressStepper({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-3 flex items-center gap-2" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={clsx(
            "h-1 flex-1 rounded-full",
            i < current ? "bg-brand-600" : "bg-surface-subtle",
          )}
        />
      ))}
      <span className="text-[10px] font-semibold text-text-muted">
        {current}/{total}
      </span>
    </div>
  )
}

export function OutletIdentityCard({
  name,
  id,
  type,
  tradeAreaMatched,
}: {
  name: string
  id: string
  type?: string
  tradeAreaMatched?: boolean
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <p className="text-sm font-semibold text-text">{name}</p>
      <p className="text-xs text-text-muted">{id}</p>
      {type ? <p className="mt-1 text-xs text-text-muted">{type}</p> : null}
      <p className="mt-2 text-xs">
        Trade area:{" "}
        <span className={tradeAreaMatched !== false ? "font-semibold text-brand-700" : "text-amber-w"}>
          {tradeAreaMatched !== false ? "Matched (demo)" : "Mismatch — review"}
        </span>
      </p>
    </div>
  )
}

export function GeoStatusBadge({ state }: { state: GpsState }) {
  const tone =
    state === "valid"
      ? "healthy"
      : state === "weak"
        ? "watch"
        : state === "blocked"
          ? "critical"
          : state === "offline_fallback"
            ? "watch"
            : "info"
  return <StatusBadge tone={tone}>{state.replace("_", " ")}</StatusBadge>
}

export function ValidationBanner({
  variant,
  title,
  children,
}: {
  variant: "info" | "warning" | "danger"
  title: string
  children?: ReactNode
}) {
  const box =
    variant === "danger"
      ? "border-red-c/40 bg-red-bg text-red-c"
      : variant === "warning"
        ? "border-amber-w/40 bg-amber-bg text-amber-w"
        : "border-blue-i/30 bg-blue-bg text-blue-i"
  return (
    <div className={clsx("rounded-xl border px-3 py-2 text-sm", box)}>
      <p className="font-semibold">{title}</p>
      {children ? <div className="mt-1 text-xs opacity-90">{children}</div> : null}
    </div>
  )
}

export function DynamicFormSection({
  title,
  required,
  open,
  onToggle,
  complete,
  children,
}: {
  title: string
  required?: boolean
  open: boolean
  onToggle: () => void
  complete?: boolean
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between px-4 py-3 text-left">
        <span className="font-semibold text-text">
          {title}
          {required ? <span className="ml-1 text-red-c">*</span> : null}
        </span>
        <span className="text-xs font-bold text-brand-700">{complete ? "Done" : open ? "−" : "+"}</span>
      </button>
      {open ? <div className="border-t border-border px-4 py-3 text-sm">{children}</div> : null}
    </div>
  )
}

export function FieldGroupCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface-subtle/60 px-3 py-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-text-muted">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

export function EvidenceCapturePanel({
  captured,
  onCapture,
  onRetake,
}: {
  captured: boolean
  onCapture: () => void
  onRetake: () => void
}) {
  return (
    <div className="space-y-3">
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-border bg-surface-subtle text-center text-sm text-text-muted">
        Camera preview (placeholder)
      </div>
      <div className="flex gap-2">
        <button type="button" className="flex-1 rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white" onClick={onCapture}>
          Capture
        </button>
        <button type="button" className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold" onClick={onRetake}>
          Retake
        </button>
      </div>
      {captured ? <ValidationBanner variant="info" title="Metadata checks passed (demo)" /> : null}
    </div>
  )
}

export function StickyBottomActionBar({
  primaryLabel,
  onPrimary,
  disabled,
  secondary,
}: {
  primaryLabel: string
  onPrimary: () => void
  disabled?: boolean
  secondary?: ReactNode
}) {
  return (
    <div className="fixed bottom-20 left-1/2 z-30 w-full max-w-md -translate-x-1/2 px-3">
      <div className="rounded-2xl border border-border bg-surface/95 p-3 shadow-lg backdrop-blur">
        {secondary}
        <button
          type="button"
          disabled={disabled}
          onClick={onPrimary}
          className="mt-2 w-full rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-40"
        >
          {primaryLabel}
        </button>
      </div>
    </div>
  )
}

export function SyncFooter({
  pendingSync,
  to,
}: {
  pendingSync: number
  to: string
}) {
  return (
    <footer className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 text-xs text-text-muted">
      <span>Sync: {pendingSync} pending</span>
      <Link to={to} className="font-semibold text-brand-700">
        Open sync center
      </Link>
    </footer>
  )
}
