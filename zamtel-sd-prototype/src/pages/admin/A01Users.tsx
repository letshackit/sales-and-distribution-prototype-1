import { useState } from "react"
import { DataTable } from "../../components/common/DataTable"
import clsx from "clsx"

const users = [
  { id: "u1", name: "Ruth Tembo", role: "ASE", email: "r.tembo@demo.zm", region: "Lusaka", cluster: "Central", territory: "Central A", device: "online", active: "active", lastSync: "2 min ago" },
  { id: "u2", name: "Admin One", role: "Admin", email: "admin@demo.zm", region: "All", cluster: "—", territory: "—", device: "unknown", active: "active", lastSync: "—" },
  { id: "u3", name: "Brian Mulenga", role: "Team Leader", email: "b.mulenga@demo.zm", region: "Copperbelt", cluster: "Ndola Urban", territory: "Ndola CBD", device: "online", active: "active", lastSync: "5 min ago" },
  { id: "u4", name: "Chanda Phiri", role: "ASE", email: "c.phiri@demo.zm", region: "Northern", cluster: "Kasama", territory: "Kasama Town", device: "offline", active: "active", lastSync: "2 hours ago" },
  { id: "u5", name: "Mutale Banda", role: "Zone Manager", email: "m.banda@demo.zm", region: "Southern", cluster: "Livingstone", territory: "Livingstone Urban", device: "online", active: "active", lastSync: "1 min ago" },
  { id: "u6", name: "Sarah Zulu", role: "ASE", email: "s.zulu@demo.zm", region: "Lusaka", cluster: "East Market", territory: "Lusaka East", device: "online", active: "active", lastSync: "10 min ago" },
  { id: "u7", name: "John Mwansa", role: "Territory Manager", email: "j.mwansa@demo.zm", region: "Copperbelt", cluster: "Kitwe", territory: "Kitwe West", device: "online", active: "active", lastSync: "3 min ago" },
  { id: "u8", name: "Grace Lungu", role: "ASE", email: "g.lungu@demo.zm", region: "Southern", cluster: "Mazabuka", territory: "Mazabuka Corridor", device: "offline", active: "inactive", lastSync: "3 days ago" },
]

export function A01Users() {
  const [sel, setSel] = useState(users[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setIsSaving(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] animate-fade-in p-8">
      <div className="flex w-full gap-8">
        {/* Users List */}
        <div className="w-5/12 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-text">Users &amp; Roles</h1>
              <p className="text-sm text-text-muted mt-1">Manage team access and permissions</p>
            </div>
            <button 
              type="button" 
              className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-brand-700 hover:shadow-xl active:scale-95 shadow-lg"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </button>
          </div>

          <div className="relative mb-5">
            <input 
              placeholder="Search users, roles, or territories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-border bg-surface px-5 py-4 pl-12 text-base transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" 
            />
            <svg className="absolute left-5 top-4.5 h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="mt-4">
            <DataTable
              rowKey={(r) => r.id}
              rows={filteredUsers}
              onRowClick={(r) => setSel(r)}
              columns={[
                { key: "name", header: "User", sortable: true },
                { key: "role", header: "Role", sortable: true },
                { key: "territory", header: "Territory", sortable: true },
                {
                  key: "device",
                  header: "Status",
                  sortable: true,
                  render: (r) => (
                    <span className={clsx(
                      "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
                      r.device === "online" ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-gray-600"
                    )}>
                      <span className={clsx(
                        "h-1.5 w-1.5 rounded-full",
                        r.device === "online" ? "bg-brand-600" : "bg-gray-400"
                      )} />
                      {r.device}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>

        {/* User Details Sidebar */}
        <div className="w-7/12 space-y-6 p-8 bg-surface-subtle/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text">User Details</h2>
            {showSuccess && (
              <span className="animate-fade-in rounded-full bg-brand-50 px-4 py-1 text-xs font-semibold text-brand-700">
                ✓ Saved successfully
              </span>
            )}
          </div>

          <div className="rounded-2xl border-2 border-border bg-surface p-8 shadow-sm animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-text">{sel.name}</p>
                <p className="text-sm text-text-muted mt-1">{sel.email}</p>
              </div>
              <span className={clsx(
                "rounded-full px-4 py-1.5 text-xs font-bold",
                sel.active === "active" ? "bg-brand-50 text-brand-700" : "bg-red-bg text-red-c"
              )}>
                {sel.active.toUpperCase()}
              </span>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Role</label>
                <select className="mt-2 w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                  <option>{sel.role}</option>
                  <option>ASE</option>
                  <option>Team Leader</option>
                  <option>Territory Manager</option>
                  <option>Zone Manager</option>
                  <option>Admin</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Territory Assignment</label>
                <div className="mt-2 rounded-xl border-2 border-border bg-surface-subtle p-4 text-sm">
                  <p className="font-medium text-text">{sel.region} → {sel.cluster} → {sel.territory}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Device Status</label>
                  <p className="mt-2 text-sm font-medium capitalize text-text">{sel.device}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Last Sync</label>
                  <p className="mt-2 text-sm font-medium text-text">{sel.lastSync}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className={clsx(
                  "rounded-2xl px-8 py-3 text-sm font-bold text-white transition-all duration-200",
                  isSaving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-brand-700 hover:bg-brand-800 hover:shadow-xl active:scale-95"
                )}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="rounded-2xl border-2 border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-all hover:bg-surface-subtle hover:border-brand-500/40"
              >
                {sel.active === "active" ? "Deactivate User" : "Activate User"}
              </button>
              <button
                type="button"
                className="rounded-2xl border-2 border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-all hover:bg-surface-subtle hover:border-brand-500/40"
              >
                Reset Device
              </button>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-border bg-surface p-6 shadow-sm">
            <h3 className="text-sm font-bold text-text mb-4">Permissions</h3>
            <div className="space-y-3">
              {[
                { label: "Visit Capture", enabled: true },
                { label: "Route Planning", enabled: sel.role !== "ASE" },
                { label: "Territory Management", enabled: sel.role === "Zone Manager" || sel.role === "Admin" },
                { label: "User Management", enabled: sel.role === "Admin" },
                { label: "Analytics Access", enabled: true },
                { label: "Export Reports", enabled: sel.role !== "ASE" },
              ].map((perm) => (
                <label key={perm.label} className="flex items-center gap-3 rounded-xl border border-border bg-surface-subtle px-4 py-3 transition-colors hover:bg-surface">
                  <input
                    type="checkbox"
                    checked={perm.enabled}
                    className="h-5 w-5 rounded border-border text-brand-600 focus:ring-2 focus:ring-brand-500/20"
                    readOnly
                  />
                  <span className="text-sm font-medium text-text">{perm.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-i/20 bg-blue-bg p-5">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-blue-i shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm">
                <p className="font-semibold text-blue-i">Permission Note</p>
                <p className="text-text-muted mt-1">Changes to permissions require user to re-sync their device. Assigned geography restricts data visibility.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
