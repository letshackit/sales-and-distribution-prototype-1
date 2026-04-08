import { useState } from "react"
import { AppShell } from "../components/layout/AppShell"
import { PageHeader } from "../components/layout/PageHeader"
import { StickyFilterBar } from "../components/layout/StickyFilterBar"

const templates = ["Daily field pack", "Liquidity weekly", "Acquisition MTD", "Exception audit"]

export function ReportsExports() {
  const [busy, setBusy] = useState(false)
  const [format, setFormat] = useState<"csv" | "xlsx" | "pdf">("csv")

  const runExport = () => {
    setBusy(true)
    setTimeout(() => setBusy(false), 900)
  }

  return (
    <AppShell>
      <PageHeader title="Reports &amp; exports" />
      <StickyFilterBar />
      <div className="grid grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-text">Quick export</h2>
          <p className="mt-1 text-sm text-text-muted">Applies current global filters from the bar above.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <label className="text-sm">
              Format
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as typeof format)}
                className="mt-1 block w-full rounded-lg border border-border px-2 py-2"
              >
                <option value="csv">CSV</option>
                <option value="xlsx">Excel</option>
                <option value="pdf">PDF</option>
              </select>
            </label>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={runExport}
            className="mt-4 w-full rounded-lg bg-brand-700 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
          >
            {busy ? "Generating…" : `Export current view (${format.toUpperCase()})`}
          </button>
        </div>
        <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-text">Saved templates</h2>
          <ul className="mt-3 space-y-2">
            {templates.map((t) => (
              <li key={t}>
                <button
                  type="button"
                  onClick={runExport}
                  className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-left text-sm hover:border-brand-500/40"
                >
                  <span>{t}</span>
                  <span className="text-xs text-text-muted">Schedule</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  )
}
