import { useState } from "react"
import clsx from "clsx"

const categories = ["Liquidity", "Geo-fence", "Visits", "Alerts", "Performance", "Compliance"]

const thresholdData: Record<number, Array<{ id: string; name: string; value: string; unit: string; description: string }>> = {
  0: [
    { id: "l1", name: "Near-stockout ratio", value: "35", unit: "%", description: "Triggers amber alert when float drops below this percentage" },
    { id: "l2", name: "Critical stockout", value: "15", unit: "%", description: "Triggers critical alert requiring immediate action" },
    { id: "l3", name: "Rebalancing threshold", value: "50000", unit: "ZMW", description: "Amount requiring ZBM approval for rebalancing" },
    { id: "l4", name: "Float variance tolerance", value: "10", unit: "%", description: "Acceptable variance in float reporting" },
  ],
  1: [
    { id: "g1", name: "Geo-fence radius", value: "120", unit: "meters", description: "Default radius for outlet geo-fencing" },
    { id: "g2", name: "GPS accuracy threshold", value: "50", unit: "meters", description: "Maximum acceptable GPS accuracy error" },
    { id: "g3", name: "Override approval timeout", value: "4", unit: "hours", description: "Time limit for TL to approve geo-fence override" },
  ],
  2: [
    { id: "v1", name: "Missed visit escalation", value: "24", unit: "hours", description: "Time before missed visit escalates to TL" },
    { id: "v2", name: "Visit duration minimum", value: "5", unit: "minutes", description: "Minimum time required for valid visit" },
    { id: "v3", name: "Daily visit target", value: "20", unit: "visits", description: "Expected visits per ASE per day" },
  ],
  3: [
    { id: "a1", name: "Critical alert SLA", value: "2", unit: "hours", description: "Response time for critical alerts" },
    { id: "a2", name: "Watch alert SLA", value: "12", unit: "hours", description: "Response time for watch-level alerts" },
    { id: "a3", name: "Alert auto-escalation", value: "48", unit: "hours", description: "Unresolved alerts escalate after this period" },
  ],
  4: [
    { id: "p1", name: "Route adherence target", value: "85", unit: "%", description: "Minimum acceptable route adherence percentage" },
    { id: "p2", name: "Productivity baseline", value: "18", unit: "visits/day", description: "Baseline productivity for performance evaluation" },
  ],
  5: [
    { id: "c1", name: "Pricing violation tolerance", value: "5", unit: "%", description: "Acceptable pricing variance before flagging" },
    { id: "c2", name: "Branding compliance target", value: "90", unit: "%", description: "Target percentage for branding compliance" },
  ],
}

export function A05Thresholds() {
  const [cat, setCat] = useState(0)
  const [_editingId, setEditingId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const currentThresholds = thresholdData[cat] || thresholdData[0]

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setIsSaving(false)
    setEditingId(null)
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] flex-col p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text">Thresholds &amp; Alerts</h1>
          <p className="text-sm text-text-muted mt-1">Configure system thresholds for {categories[cat].toLowerCase()}</p>
        </div>
        <button 
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={clsx(
            "rounded-2xl px-8 py-3 text-sm font-bold text-white transition-all duration-200 shadow-lg",
            isSaving 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-brand-600 hover:bg-brand-700 hover:shadow-xl active:scale-95"
          )}
        >
          {isSaving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
      
      <div className="flex flex-1 gap-8">
        <div className="w-3/12 flex flex-col gap-4">
          <div className="rounded-2xl border-2 border-border bg-surface p-6 shadow-sm flex-1">
            <h2 className="text-lg font-extrabold text-text mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((c, i) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setCat(i)}
                    className={clsx(
                      "w-full rounded-xl px-4 py-3 text-left transition-all duration-200 font-semibold text-sm",
                      cat === i 
                        ? "bg-brand-50 text-brand-700 border-2 border-brand-500/30 shadow-sm" 
                        : "text-text-muted border-2 border-transparent hover:bg-surface-subtle hover:text-text"
                    )}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="w-9/12 flex flex-col gap-4">
          <div className="rounded-2xl border-2 border-border bg-surface p-8 shadow-sm flex-1">
            <div className="space-y-4">
              {currentThresholds.map((threshold) => (
                <div 
                  key={threshold.id} 
                  className="rounded-xl border-2 border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-brand-500/40 flex items-start gap-6 group"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-text mb-1">{threshold.name}</h3>
                    <p className="text-sm text-text-muted">{threshold.description}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="relative flex items-center">
                      <input 
                        type="number" 
                        defaultValue={threshold.value}
                        className="w-24 rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-base font-bold text-text transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-right pr-12"
                      />
                      <span className="absolute right-4 text-xs font-bold text-text-muted pointer-events-none">
                        {threshold.unit === "%" ? "%" : ""}
                      </span>
                    </div>
                    {threshold.unit !== "%" && (
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider w-16">
                        {threshold.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
