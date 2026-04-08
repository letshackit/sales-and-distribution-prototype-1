import { useState } from "react"
import clsx from "clsx"

const visitTypes = ["Float & cash", "SIM registration", "Recruitment", "Prospecting", "Compliance check", "Master agent audit"]

const formFields: Record<number, Array<{ id: string; label: string; type: string; required: boolean }>> = {
  0: [
    { id: "f1", label: "Float balance", type: "number", required: true },
    { id: "f2", label: "Cash on hand", type: "number", required: true },
    { id: "f3", label: "Branding check", type: "select", required: false },
    { id: "f4", label: "Stock levels", type: "number", required: true },
    { id: "f5", label: "Transaction volume", type: "number", required: false },
  ],
  1: [
    { id: "s1", label: "Customer name", type: "text", required: true },
    { id: "s2", label: "ID number", type: "text", required: true },
    { id: "s3", label: "Phone number", type: "text", required: true },
    { id: "s4", label: "SIM card serial", type: "text", required: true },
  ],
  2: [
    { id: "r1", label: "Prospect name", type: "text", required: true },
    { id: "r2", label: "Contact number", type: "text", required: true },
    { id: "r3", label: "Location type", type: "select", required: true },
    { id: "r4", label: "Expected volume", type: "number", required: false },
  ],
  3: [
    { id: "p1", label: "Business name", type: "text", required: true },
    { id: "p2", label: "Owner contact", type: "text", required: true },
    { id: "p3", label: "Interest level", type: "select", required: true },
  ],
  4: [
    { id: "c1", label: "Branding visible", type: "select", required: true },
    { id: "c2", label: "Pricing compliance", type: "select", required: true },
    { id: "c3", label: "Service quality", type: "select", required: false },
  ],
  5: [
    { id: "m1", label: "Agent ID", type: "text", required: true },
    { id: "m2", label: "Audit score", type: "number", required: true },
    { id: "m3", label: "Issues found", type: "text", required: false },
  ],
}

export function A04FormConfigurator() {
  const [vt, setVt] = useState(0)
  const [active, setActive] = useState(formFields[0][0].id)
  const [isSaving, setIsSaving] = useState(false)

  const currentFields = formFields[vt] || formFields[0]
  const activeField = currentFields.find(f => f.id === active) || currentFields[0]

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setIsSaving(false)
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] flex-col p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text">Form Configurator</h1>
          <p className="text-sm text-text-muted mt-1">Design and manage data collection forms for the field app</p>
        </div>
        <button 
          type="button" 
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-2xl bg-brand-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-brand-700 hover:shadow-xl active:scale-95 shadow-lg disabled:opacity-70"
        >
          {isSaving ? "Publishing..." : "Publish Changes"}
        </button>
      </div>

      <div className="flex flex-1 gap-8">
        {/* Left: Form Types */}
        <div className="w-3/12 flex flex-col gap-4">
          <div className="rounded-2xl border-2 border-border bg-surface p-6 shadow-sm flex-1">
            <h2 className="text-lg font-extrabold text-text mb-4">Form Types</h2>
            <ul className="space-y-2">
              {visitTypes.map((v, i) => (
                <li key={v}>
                  <button
                    type="button"
                    onClick={() => {
                      setVt(i)
                      setActive(formFields[i][0].id)
                    }}
                    className={clsx(
                      "w-full rounded-xl px-4 py-3 text-left transition-all duration-200 font-semibold text-sm",
                      vt === i 
                        ? "bg-brand-50 text-brand-700 border-2 border-brand-500/30 shadow-sm" 
                        : "text-text-muted border-2 border-transparent hover:bg-surface-subtle hover:text-text"
                    )}
                  >
                    {v}
                  </button>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-xl border-2 border-dashed border-brand-600/50 bg-brand-50 py-3 text-sm font-bold text-brand-700 transition-all hover:bg-brand-100 hover:border-brand-600">
              + New Form Type
            </button>
          </div>
        </div>
        
        {/* Middle: Form Fields list */}
        <div className="w-4/12 flex flex-col gap-4">
          <div className="rounded-2xl border-2 border-border bg-surface p-6 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-extrabold text-text">Fields</h2>
              <span className="rounded-full bg-surface-subtle border border-border px-3 py-1 text-xs font-bold text-text-muted">
                {currentFields.length} total
              </span>
            </div>
            
            <ul className="space-y-3">
              {currentFields.map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => setActive(f.id)}
                    className={clsx(
                      "w-full rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200 hover:shadow-sm flex items-center gap-3",
                      active === f.id
                        ? "border-brand-600 bg-brand-50 shadow-sm"
                        : "border-border bg-surface hover:border-brand-500/40"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={clsx(
                          "font-bold truncate text-sm",
                          active === f.id ? "text-brand-900" : "text-text"
                        )}>
                          {f.label}
                        </span>
                        {f.required && (
                          <span className="text-red-c text-lg leading-none">*</span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-text-muted mt-1 block uppercase tracking-wider">
                        {f.type}
                      </span>
                    </div>
                    <svg className="h-5 w-5 text-border shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-xl border-2 border-dashed border-border py-3 text-sm font-bold text-text-muted transition-all hover:bg-surface-subtle hover:text-text">
              + Add Field
            </button>
          </div>
        </div>
        
        {/* Right: Field Editor */}
        <div className="w-5/12 flex flex-col gap-4">
          <div className="rounded-2xl border-2 border-border bg-surface p-8 shadow-sm flex-1">
            <h2 className="text-xl font-extrabold text-text mb-6">Edit Field</h2>
            
            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-text-muted">Field Label</span>
                <input
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-base font-medium transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  defaultValue={activeField.label}
                  key={activeField.id + "-label"}
                />
              </label>
              
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-text-muted">Data Type</span>
                <select
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-base font-medium transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  defaultValue={activeField.type}
                  key={activeField.id + "-type"}
                >
                  <option value="text">Text (Short)</option>
                  <option value="number">Number</option>
                  <option value="select">Dropdown Select</option>
                  <option value="photo">Photo Upload</option>
                  <option value="gps">GPS Location</option>
                </select>
              </label>
              
              <div className="rounded-xl border-2 border-border bg-surface-subtle p-5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={activeField.required}
                      key={activeField.id + "-req"}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-border transition-all checked:border-brand-600 checked:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-text">Required Field</span>
                </label>
                <p className="text-xs text-text-muted mt-2 ml-8">Agents must complete this field before submitting the form.</p>
              </div>

              {activeField.type === "select" && (
                <div className="rounded-xl border-2 border-border bg-surface-subtle p-5 animate-fade-in">
                  <p className="text-sm font-bold text-text-muted mb-3">Dropdown Options</p>
                  <div className="space-y-2">
                    <input className="w-full rounded-lg border border-border px-3 py-2 text-sm" defaultValue="Option 1" />
                    <input className="w-full rounded-lg border border-border px-3 py-2 text-sm" defaultValue="Option 2" />
                    <button className="text-xs font-bold text-brand-700 hover:text-brand-800">+ Add Option</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t-2 border-border flex gap-4">
              <button className="rounded-xl border-2 border-red-c/30 bg-red-bg px-6 py-3 text-sm font-bold text-red-c transition-all hover:bg-red-c hover:text-white">
                Delete Field
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
