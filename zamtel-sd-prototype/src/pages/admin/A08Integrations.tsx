import { useState } from "react"
import clsx from "clsx"

const connectors = [
  { 
    id: "int1",
    name: "ERP (Finance)", 
    status: "connected", 
    description: "Real-time financial data sync",
    lastSync: "2 min ago",
    health: "healthy",
    endpoint: "https://erp.zamtel.zm/api/v1"
  },
  { 
    id: "int2",
    name: "SMS Gateway", 
    status: "connected", 
    description: "Automated notifications and alerts",
    lastSync: "5 min ago",
    health: "healthy",
    endpoint: "https://sms.gateway.zm/send"
  },
  { 
    id: "int3",
    name: "KYC Provider", 
    status: "testing", 
    description: "Identity verification service",
    lastSync: "1 hour ago",
    health: "warning",
    endpoint: "https://kyc.verify.zm/api"
  },
  { 
    id: "int4",
    name: "Payment Gateway", 
    status: "connected", 
    description: "Transaction processing",
    lastSync: "1 min ago",
    health: "healthy",
    endpoint: "https://payments.zamtel.zm/api"
  },
  { 
    id: "int5",
    name: "Mapping Service", 
    status: "connected", 
    description: "Geo-location and routing",
    lastSync: "10 min ago",
    health: "healthy",
    endpoint: "https://maps.api.zm/v2"
  },
  { 
    id: "int6",
    name: "Analytics Platform", 
    status: "disconnected", 
    description: "Business intelligence sync",
    lastSync: "3 days ago",
    health: "error",
    endpoint: "https://analytics.zamtel.zm/ingest"
  },
]

export function A08Integrations() {
  const [selectedIntegration, setSelectedIntegration] = useState(connectors[0])
  const [isTesting, setIsTesting] = useState(false)

  const handleTest = async () => {
    setIsTesting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsTesting(false)
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] flex-col p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text">Integrations</h1>
          <p className="text-sm text-text-muted mt-1">Manage external system connections and API endpoints</p>
        </div>
        <button className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-brand-700 hover:shadow-xl active:scale-95 shadow-lg">
          + Add Integration
        </button>
      </div>
      
      <div className="flex flex-1 gap-8">
        <div className="w-7/12 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {connectors.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedIntegration(c)}
                className={clsx(
                  "rounded-2xl border-2 p-6 text-left transition-all duration-200 hover:shadow-md",
                  selectedIntegration.id === c.id
                    ? "border-brand-600 bg-brand-50 shadow-sm"
                    : "border-border bg-surface hover:border-brand-500/40"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-extrabold text-text text-base">{c.name}</p>
                    <p className="text-xs font-medium text-text-muted mt-1">{c.description}</p>
                  </div>
                  <span className={clsx(
                    "flex h-2.5 w-2.5 shrink-0 rounded-full shadow-sm mt-1",
                    c.health === "healthy" ? "bg-brand-500" :
                    c.health === "warning" ? "bg-amber-w" :
                    "bg-red-c"
                  )} />
                </div>
                <div className="mt-5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                  <span className={clsx(
                    c.status === "connected" ? "text-brand-700" :
                    c.status === "testing" ? "text-amber-w" :
                    "text-red-c"
                  )}>
                    {c.status}
                  </span>
                  <span className="text-text-muted">Sync: {c.lastSync}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="w-5/12 flex flex-col gap-4">
          <div className="rounded-2xl border-2 border-border bg-surface p-8 shadow-sm flex-1">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-xl font-extrabold text-text">{selectedIntegration.name}</h2>
                <div className="mt-2 flex items-center gap-2">
                  <span className={clsx(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold shadow-sm",
                    selectedIntegration.status === "connected" ? "bg-brand-50 text-brand-700" :
                    selectedIntegration.status === "testing" ? "bg-amber-bg text-amber-w" :
                    "bg-red-bg text-red-c"
                  )}>
                    <span className={clsx(
                      "h-1.5 w-1.5 rounded-full",
                      selectedIntegration.status === "connected" ? "bg-brand-600" :
                      selectedIntegration.status === "testing" ? "bg-amber-w" :
                      "bg-red-c"
                    )} />
                    {selectedIntegration.status}
                  </span>
                </div>
              </div>
              <button 
                type="button"
                onClick={handleTest}
                disabled={isTesting}
                className="rounded-xl border-2 border-border bg-surface px-4 py-2 text-sm font-bold text-text transition-all hover:bg-surface-subtle hover:border-brand-500/40 active:scale-95 shadow-sm disabled:opacity-50"
              >
                {isTesting ? "Testing..." : "Test Connection"}
              </button>
            </div>

            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-text-muted">Endpoint URL</span>
                <input 
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm font-medium font-mono text-text transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" 
                  defaultValue={selectedIntegration.endpoint} 
                  key={selectedIntegration.id + "-url"}
                />
              </label>
              
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-text-muted">Authentication Type</span>
                <select 
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm font-medium transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  defaultValue="oauth2"
                >
                  <option value="bearer">Bearer Token</option>
                  <option value="basic">Basic Auth</option>
                  <option value="oauth2">OAuth 2.0</option>
                  <option value="api_key">API Key</option>
                </select>
              </label>
              
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-text-muted">Client ID / API Key</span>
                <input 
                  type="password"
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm font-medium font-mono transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" 
                  defaultValue="************************" 
                  key={selectedIntegration.id + "-key"}
                />
              </label>
            </div>
            
            <div className="mt-10 pt-6 border-t-2 border-border flex gap-4">
              <button className="rounded-xl bg-brand-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-brand-700 hover:shadow-lg active:scale-95 shadow-md">
                Save Configuration
              </button>
              <button className="rounded-xl border-2 border-border bg-surface px-6 py-3 text-sm font-bold text-text transition-all hover:bg-surface-subtle hover:border-brand-500/40">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
