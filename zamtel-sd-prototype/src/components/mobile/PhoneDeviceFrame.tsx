import type { ReactNode } from "react"

/**
 * iPhone 16 Pro–style preview chrome (~402×874 logical pt portrait).
 * Constrains the mobile prototype so scrolling happens inside the handset, not the whole desktop window.
 */
export function PhoneDeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-b from-slate-800 via-slate-900 to-black px-3 py-6 text-white/90">
      <p className="mb-4 max-w-md text-center text-xs font-medium text-white/55">
        Mobile prototype · iPhone 16 Pro logical size (402 × 874 pt)
      </p>
      <div
        className="relative flex w-full max-w-[402px] shrink-0 flex-col overflow-hidden rounded-[2.85rem] border-[10px] border-[#2c2c2e] bg-[#1a1a1c] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.65)]"
        style={{
          height: "min(874px, calc(100svh - 7rem))",
          maxHeight: 874,
        }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-3 z-30 h-[34px] w-[126px] -translate-x-1/2 rounded-full bg-black/95 ring-1 ring-white/10"
          aria-hidden
        />
        <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[2.1rem] bg-surface-subtle text-text">
          {children}
        </div>
      </div>
      <p className="mt-4 max-w-sm text-center text-[11px] leading-relaxed text-white/45">
        Use the in-app flow: Route → Check-in → Visit type → Form → Proof → Compliance → Submit. Today and History update from the same state.
      </p>
    </div>
  )
}
