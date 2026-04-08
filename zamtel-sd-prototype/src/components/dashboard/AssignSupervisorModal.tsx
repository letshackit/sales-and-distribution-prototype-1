import { useState } from "react"
import clsx from "clsx"

interface AssignSupervisorModalProps {
  isOpen: boolean
  onClose: () => void
  onAssign: (supervisor: string, cases: string[]) => void
}

const supervisors = [
  { id: "s1", name: "Mutale Banda", role: "Team Leader", region: "Lusaka" },
  { id: "s2", name: "Chanda Phiri", role: "Territory Manager", region: "Copperbelt" },
  { id: "s3", name: "Brian Mulenga", role: "Zone Manager", region: "Northern" },
  { id: "s4", name: "Ruth Tembo", role: "Team Leader", region: "Southern" },
]

const openCases = [
  { id: "c1", issue: "Geo-fence override pending", location: "Lusaka Central A", priority: "high" },
  { id: "c2", issue: "Offline manual location", location: "Ndola CBD", priority: "high" },
]

export function AssignSupervisorModal({ isOpen, onClose, onAssign }: AssignSupervisorModalProps) {
  const [selectedSupervisor, setSelectedSupervisor] = useState("")
  const [selectedCases, setSelectedCases] = useState<string[]>(openCases.map(c => c.id))
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleAssign = async () => {
    if (!selectedSupervisor || selectedCases.length === 0) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    onAssign(selectedSupervisor, selectedCases)
    setIsSubmitting(false)
    onClose()
  }

  const toggleCase = (caseId: string) => {
    setSelectedCases(prev =>
      prev.includes(caseId)
        ? prev.filter(id => id !== caseId)
        : [...prev, caseId]
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl animate-scale-in rounded-2xl border border-border bg-surface shadow-[var(--shadow-drawer)] mx-4">
        <div className="border-b border-border bg-gradient-to-r from-brand-50 to-surface px-6 py-4">
          <h2 className="text-xl font-bold text-text">Assign Supervisor</h2>
          <p className="mt-1 text-sm text-text-muted">
            Assign a supervisor to handle open geo exception cases
          </p>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text mb-3">
              Select Supervisor
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {supervisors.map((sup) => (
                <button
                  key={sup.id}
                  type="button"
                  onClick={() => setSelectedSupervisor(sup.id)}
                  className={clsx(
                    "rounded-xl border-2 p-4 text-left transition-all duration-200 hover:shadow-md",
                    selectedSupervisor === sup.id
                      ? "border-brand-600 bg-brand-50 shadow-sm"
                      : "border-border bg-surface hover:border-brand-300"
                  )}
                >
                  <p className="font-semibold text-text">{sup.name}</p>
                  <p className="text-xs text-text-muted mt-0.5">{sup.role}</p>
                  <p className="text-xs text-brand-700 mt-1 font-medium">{sup.region}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-3">
              Select Cases ({selectedCases.length} selected)
            </label>
            <div className="space-y-2">
              {openCases.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleCase(c.id)}
                  className={clsx(
                    "w-full rounded-lg border-2 p-4 text-left transition-all duration-200 hover:shadow-sm",
                    selectedCases.includes(c.id)
                      ? "border-brand-600 bg-brand-50"
                      : "border-border bg-surface hover:border-brand-300"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className={clsx(
                          "h-4 w-4 rounded border-2 flex items-center justify-center transition-all duration-200",
                          selectedCases.includes(c.id)
                            ? "border-brand-600 bg-brand-600"
                            : "border-border"
                        )}>
                          {selectedCases.includes(c.id) && (
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <p className="font-semibold text-text">{c.issue}</p>
                      </div>
                      <p className="text-sm text-text-muted mt-2 ml-6">{c.location}</p>
                    </div>
                    <span className={clsx(
                      "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      c.priority === "high" ? "bg-red-bg text-red-c" : "bg-amber-bg text-amber-w"
                    )}>
                      {c.priority}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border bg-surface-subtle px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-surface-subtle"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAssign}
            disabled={!selectedSupervisor || selectedCases.length === 0 || isSubmitting}
            className={clsx(
              "rounded-lg px-6 py-2 text-sm font-semibold text-white transition-all duration-200",
              !selectedSupervisor || selectedCases.length === 0 || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-brand-700 hover:bg-brand-800 hover:shadow-md active:scale-95"
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Assigning...
              </span>
            ) : (
              `Assign to ${selectedCases.length} case${selectedCases.length !== 1 ? 's' : ''}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
