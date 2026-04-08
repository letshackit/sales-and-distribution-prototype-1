import { useState } from "react"
import clsx from "clsx"

const tree = [
  { 
    id: "1", 
    label: "Lusaka", 
    children: [
      { name: "Lusaka Central", outlets: 45, manager: "Mutale Banda" },
      { name: "Lusaka East", outlets: 38, manager: "Sarah Zulu" }
    ],
    outlets: 83
  },
  { 
    id: "2", 
    label: "Copperbelt", 
    children: [
      { name: "Ndola Urban", outlets: 52, manager: "Brian Mulenga" },
      { name: "Kitwe Belt", outlets: 41, manager: "John Mwansa" }
    ],
    outlets: 93
  },
  { 
    id: "3", 
    label: "Northern", 
    children: [
      { name: "Kasama North", outlets: 28, manager: "Chanda Phiri" }
    ],
    outlets: 28
  },
  { 
    id: "4", 
    label: "Southern", 
    children: [
      { name: "Livingstone Corridor", outlets: 34, manager: "Grace Lungu" },
      { name: "Mazabuka Zone", outlets: 22, manager: "Ruth Tembo" }
    ],
    outlets: 56
  },
]

export function A02Territory() {
  const [_selectedNode, setSelectedNode] = useState<string | null>(null)
  const [nodeName, setNodeName] = useState("Lusaka Central A")
  const [nodeManager, setNodeManager] = useState("Mutale Banda")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setIsSaving(false)
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] animate-fade-in p-8">
      <div className="flex w-full gap-8">
        <div className="w-4/12 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-text">Territory Hierarchy</h1>
              <p className="text-sm text-text-muted mt-1">Manage regions, clusters, and coverage</p>
            </div>
            <button className="flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-700 hover:shadow-xl active:scale-95 shadow-lg">
              + Region
            </button>
          </div>
          
          <div className="relative mb-5">
            <input 
              placeholder="Search territories or managers..." 
              className="w-full rounded-2xl border-2 border-border bg-surface px-5 py-4 pl-12 text-base transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" 
            />
            <svg className="absolute left-5 top-4.5 h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <ul className="space-y-4 text-sm overflow-y-auto pr-2">
            {tree.map((n) => (
              <li key={n.id} className="rounded-2xl border-2 border-border bg-surface p-4 transition-all hover:shadow-md hover:border-brand-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-text">{n.label}</span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 shadow-sm">
                    {n.outlets} outlets
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {n.children.map((c) => (
                    <li 
                      key={c.name}
                      className="group flex items-center justify-between rounded-xl bg-surface-subtle px-3 py-2.5 text-text-muted transition-all hover:bg-brand-50 hover:text-brand-700 cursor-pointer border border-transparent hover:border-brand-200"
                      onClick={() => setSelectedNode(c.name)}
                    >
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-[11px] font-medium opacity-70 group-hover:opacity-100">{c.outlets} · {c.manager}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="w-8/12 flex flex-col gap-6">
          <div className="rounded-2xl border-2 border-border bg-surface p-8 shadow-sm flex-1">
            <h2 className="text-xl font-extrabold text-text mb-6">Edit Territory</h2>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-text-muted">Territory Name</span>
                  <input
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-base font-medium transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-text-muted">Assigned Manager</span>
                  <select
                    value={nodeManager}
                    onChange={(e) => setNodeManager(e.target.value)}
                    className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-base font-medium transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  >
                    <option>Mutale Banda</option>
                    <option>Sarah Zulu</option>
                    <option>Brian Mulenga</option>
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border-2 border-border bg-surface-subtle p-4">
                    <p className="text-xs font-bold text-text-muted mb-1">Total Outlets</p>
                    <p className="text-2xl font-extrabold text-text">45</p>
                  </div>
                  <div className="rounded-xl border-2 border-border bg-surface-subtle p-4">
                    <p className="text-xs font-bold text-text-muted mb-1">Active Agents</p>
                    <p className="text-2xl font-extrabold text-text">12</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl border-2 border-dashed border-border bg-surface-subtle flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-text-muted opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="mt-4 text-sm font-bold text-text">Interactive Map View</p>
                  <p className="text-xs text-text-muted mt-2 max-w-[200px] mx-auto">Visual coverage and manager assignment preview will appear here.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t-2 border-border pt-6">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className={clsx(
                  "rounded-xl px-8 py-3.5 text-sm font-bold text-white transition-all duration-200",
                  isSaving 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-brand-700 hover:bg-brand-800 hover:shadow-lg active:scale-95"
                )}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" className="rounded-xl border-2 border-border bg-surface px-6 py-3.5 text-sm font-bold text-text transition-all hover:bg-surface-subtle hover:border-brand-500/40">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
