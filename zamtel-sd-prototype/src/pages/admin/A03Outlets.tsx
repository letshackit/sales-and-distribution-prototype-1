import { useState } from "react"
import { DataTable } from "../../components/common/DataTable"
import clsx from "clsx"

const outlets = [
  { id: "OUT-LSK-014", name: "Kabwata SIM & Cash Point", type: "MoMo", territory: "Lusaka East", lat: -15.4, lng: 28.35, freq: 5, status: "active", geoOk: true, lastVisit: "2 days ago" },
  { id: "OUT-NDL-021", name: "Ndola Trade Corner Agent", type: "Master", territory: "Ndola CBD", lat: -12.97, lng: 28.63, freq: 4, status: "active", geoOk: false, lastVisit: "1 day ago" },
  { id: "OUT-LSK-028", name: "Kalingalinga MoMo Hub", type: "Agent", territory: "Lusaka Central", lat: -15.39, lng: 28.32, freq: 6, status: "active", geoOk: true, lastVisit: "Today" },
  { id: "OUT-KIT-045", name: "Kitwe Market Outlet", type: "Retail", territory: "Kitwe West", lat: -12.81, lng: 28.21, freq: 3, status: "active", geoOk: true, lastVisit: "3 days ago" },
  { id: "OUT-LIV-012", name: "Livingstone Cash Point", type: "MoMo", territory: "Livingstone Urban", lat: -17.85, lng: 25.85, freq: 4, status: "active", geoOk: true, lastVisit: "1 day ago" },
  { id: "OUT-KAS-008", name: "Kasama Trade Center", type: "Agent", territory: "Kasama Town", lat: -10.21, lng: 31.18, freq: 2, status: "inactive", geoOk: false, lastVisit: "14 days ago" },
  { id: "OUT-LSK-067", name: "Matero TopUp Zone", type: "Agent", territory: "Lusaka Central B", lat: -15.42, lng: 28.29, freq: 5, status: "active", geoOk: true, lastVisit: "Today" },
  { id: "OUT-NDL-034", name: "Ndola North Outlet", type: "Retail", territory: "Ndola Urban", lat: -12.95, lng: 28.65, freq: 3, status: "active", geoOk: true, lastVisit: "2 days ago" },
]

export function A03Outlets() {
  const [selected, setSelected] = useState(outlets[0])
  const [isSaving, setIsSaving] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOutlets = outlets.filter(o => 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.territory.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setIsSaving(false)
  }

  const handleValidate = async () => {
    setIsValidating(true)
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsValidating(false)
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] flex-col p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text">Outlet Master</h1>
          <p className="text-sm text-text-muted mt-1">Manage outlet data, geolocation, and status</p>
        </div>
        <div className="flex gap-3">
          <button 
            type="button" 
            onClick={handleValidate}
            disabled={isValidating}
            className="rounded-2xl border-2 border-brand-600 bg-brand-50 px-6 py-3 text-sm font-bold text-brand-700 transition-all hover:bg-brand-100 hover:shadow-md active:scale-95 disabled:opacity-50"
          >
            {isValidating ? "Validating..." : "Batch Validate"}
          </button>
          <button 
            type="button" 
            className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-brand-700 hover:shadow-xl active:scale-95 shadow-lg"
          >
            + Add Outlet
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 gap-8">
        <div className="w-7/12 flex flex-col">
          <div className="relative mb-5">
            <input 
              placeholder="Search outlets by name, ID, or territory..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-border bg-surface px-5 py-4 pl-12 text-base transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" 
            />
            <svg className="absolute left-5 top-4.5 h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex-1 bg-surface rounded-2xl border-2 border-border shadow-sm overflow-hidden">
            <DataTable
              rowKey={(r) => r.id}
              rows={filteredOutlets}
              onRowClick={(r) => setSelected(r)}
              columns={[
                { key: "id", header: "ID", sortable: true },
                { key: "name", header: "Name", sortable: true },
                { key: "type", header: "Type", sortable: true },
                { key: "territory", header: "Territory", sortable: true },
                {
                  key: "geoOk",
                  header: "Geo Status",
                  sortable: true,
                  render: (r) => (
                    <span className={clsx(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
                      r.geoOk ? "bg-brand-50 text-brand-700" : "bg-amber-bg text-amber-w"
                    )}>
                      {r.geoOk ? "✓ Validated" : "⚠ Review"}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
        
        <div className="w-5/12 flex flex-col gap-6">
          <div className="aspect-video rounded-2xl border-2 border-border bg-surface shadow-sm overflow-hidden relative group">
            <div className="absolute inset-0 bg-[radial-gradient(#145a42_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-brand-50/50 to-surface-subtle relative z-10">
              <div className="text-center p-8">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 shadow-inner mb-4">
                  <svg className="h-10 w-10 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-xl font-extrabold text-text">{selected.name}</p>
                <p className="text-sm font-medium text-text-muted mt-2">Lat: {selected.lat}, Lng: {selected.lng}</p>
                {!selected.geoOk && (
                  <p className="mt-3 text-xs font-bold text-amber-w bg-amber-bg inline-block px-3 py-1 rounded-full">
                    Location needs verification
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl border-2 border-border bg-surface p-8 shadow-sm flex-1">
            <h2 className="text-xl font-extrabold text-text mb-6">Outlet Details</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-text-muted">Outlet Name</span>
                  <input 
                    className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-base font-medium transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" 
                    defaultValue={selected.name} 
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-text-muted">Outlet Type</span>
                  <select className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-base font-medium transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" defaultValue={selected.type}>
                    <option>MoMo</option>
                    <option>Agent</option>
                    <option>Retail</option>
                    <option>Master</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-text-muted">Visit Frequency</span>
                  <select className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-base font-medium transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" defaultValue={selected.freq}>
                    <option value={2}>2x / month</option>
                    <option value={3}>3x / month</option>
                    <option value={4}>4x / month</option>
                    <option value={5}>5x / month</option>
                    <option value={6}>6x / month</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-text-muted">Status</span>
                  <select className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-base font-medium transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" defaultValue={selected.status}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </label>
              </div>
              
              <div className="rounded-xl border-2 border-border bg-surface-subtle p-5">
                <p className="text-sm font-bold text-text-muted mb-3">Recent Activity</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-text">Last Visited</span>
                  <span className="font-bold text-brand-700">{selected.lastVisit}</span>
                </div>
              </div>
              
              <div className="pt-6 border-t-2 border-border flex gap-4">
                <button 
                  type="button" 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-xl bg-brand-600 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-brand-700 hover:shadow-lg active:scale-95 disabled:opacity-70"
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
    </div>
  )
}
