import { useState, useCallback, useMemo } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
  Panel,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import clsx from "clsx"

interface WorkflowStep {
  id: string
  step: string
  role: string
  sla: string
  condition?: string
  actions?: string[]
}

interface Workflow {
  id: string
  name: string
  description: string
  trigger: string
  steps: WorkflowStep[]
  active: boolean
  triggers: number
}

const workflows: Workflow[] = [
  {
    id: "wf1",
    name: "Geo-fence override",
    description: "Handles geo-fence override requests from field agents",
    trigger: "ASE submits geo-fence override request",
    steps: [
      { id: "step1", step: "ASE submits override request", role: "ASE", sla: "—" },
      { id: "step2", step: "TL reviews and approves/rejects", role: "Team Leader", sla: "4h", condition: "If approved" },
      { id: "step3", step: "Auto-close or escalate to ZBM", role: "System", sla: "—" }
    ],
    active: true,
    triggers: 23
  },
  {
    id: "wf2",
    name: "Offline manual GPS",
    description: "Processes offline visit GPS entries",
    trigger: "System detects offline visit",
    steps: [
      { id: "step1", step: "System flags offline visit", role: "System", sla: "—" },
      { id: "step2", step: "TL approval required", role: "Team Leader", sla: "6h" },
      { id: "step3", step: "Entry logged in audit trail", role: "System", sla: "—" }
    ],
    active: true,
    triggers: 12
  },
  {
    id: "wf3",
    name: "Rebalancing > ZMW 50k",
    description: "High-value rebalancing approval workflow",
    trigger: "Rebalancing request exceeds threshold",
    steps: [
      { id: "step1", step: "Rebalancer initiates request", role: "Rebalancer", sla: "—" },
      { id: "step2", step: "ZBM approval", role: "Zone Manager", sla: "12h" },
      { id: "step3", step: "Finance notification sent", role: "System", sla: "—" }
    ],
    active: true,
    triggers: 8
  },
  {
    id: "wf4",
    name: "New outlet onboarding",
    description: "Onboards new outlets into the system",
    trigger: "New outlet registration initiated",
    steps: [
      { id: "step1", step: "ASE submits outlet details", role: "ASE", sla: "—" },
      { id: "step2", step: "Territory manager validates", role: "Territory Manager", sla: "24h" },
      { id: "step3", step: "System creates outlet record", role: "System", sla: "—" }
    ],
    active: true,
    triggers: 15
  },
  {
    id: "wf5",
    name: "Compliance violation",
    description: "Handles compliance violations and corrective actions",
    trigger: "Compliance violation detected",
    steps: [
      { id: "step1", step: "Violation detected and flagged", role: "System", sla: "—" },
      { id: "step2", step: "ASE acknowledges issue", role: "ASE", sla: "8h" },
      { id: "step3", step: "TL reviews corrective action", role: "Team Leader", sla: "24h" }
    ],
    active: true,
    triggers: 18
  },
]

const roleColors: Record<string, string> = {
  "ASE": "#2563eb",
  "Team Leader": "#7c3aed",
  "Zone Manager": "#dc2626",
  "Rebalancer": "#ea580c",
  "Territory Manager": "#16a34a",
  "System": "#64748b",
}

export function A06Workflows() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow>(workflows[0])
  const [editMode, setEditMode] = useState(false)
  const [showStepEditor, setShowStepEditor] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [workflowName, setWorkflowName] = useState(selectedWorkflow.name)
  const [workflowDescription, setWorkflowDescription] = useState(selectedWorkflow.description)
  const [workflowTrigger, setWorkflowTrigger] = useState(selectedWorkflow.trigger)

  // Convert workflow steps to React Flow nodes
  const initialNodes: Node[] = useMemo(() => {
    const nodes: Node[] = [
      {
        id: 'trigger',
        type: 'input',
        data: { label: selectedWorkflow.trigger },
        position: { x: 250, y: 0 },
        style: { 
          background: '#f0f9f6', 
          border: '2px solid #1e7a5f',
          borderRadius: '12px',
          padding: '12px 20px',
          fontSize: '13px',
          fontWeight: '600',
        },
      }
    ]

    selectedWorkflow.steps.forEach((step, idx) => {
      nodes.push({
        id: step.id,
        data: { 
          label: (
            <div className="text-left">
              <div className="font-bold text-sm mb-1">{step.step}</div>
              <div className="text-xs text-gray-600 flex items-center gap-2">
                <span className="font-semibold">{step.role}</span>
                {step.sla !== "—" && <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded">SLA: {step.sla}</span>}
              </div>
            </div>
          )
        },
        position: { x: 250, y: 120 + (idx * 140) },
        style: { 
          background: roleColors[step.role] || '#64748b',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '16px',
          minWidth: '280px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        },
      })
    })

    return nodes
  }, [selectedWorkflow])

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = []
    
    edges.push({
      id: 'trigger-step1',
      source: 'trigger',
      target: selectedWorkflow.steps[0].id,
      animated: true,
      style: { stroke: '#1e7a5f', strokeWidth: 2 },
    })

    for (let i = 0; i < selectedWorkflow.steps.length - 1; i++) {
      edges.push({
        id: `${selectedWorkflow.steps[i].id}-${selectedWorkflow.steps[i + 1].id}`,
        source: selectedWorkflow.steps[i].id,
        target: selectedWorkflow.steps[i + 1].id,
        animated: true,
        style: { stroke: '#64748b', strokeWidth: 2 },
        label: selectedWorkflow.steps[i].condition,
      })
    }

    return edges
  }, [selectedWorkflow])

  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    if (editMode && node.id !== 'trigger') {
      setSelectedNode(node)
      setShowStepEditor(true)
    }
  }, [editMode])

  const handleWorkflowSelect = (workflow: Workflow) => {
    setSelectedWorkflow(workflow)
    setWorkflowName(workflow.name)
    setWorkflowDescription(workflow.description)
    setWorkflowTrigger(workflow.trigger)
    setEditMode(false)
    setShowStepEditor(false)
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] flex-col animate-fade-in">
      {/* Header */}
      <div className="border-b-2 border-border bg-surface px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-text">Workflow Designer</h1>
            <p className="text-sm text-text-muted mt-1">Visual workflow builder with drag-and-drop configuration</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => setEditMode(!editMode)}
              className={clsx(
                "rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-all active:scale-95",
                editMode 
                  ? "border-brand-600 bg-brand-50 text-brand-700 shadow-sm"
                  : "border-border bg-surface text-text hover:bg-surface-subtle"
              )}
            >
              {editMode ? "✓ Done Editing" : "Edit Mode"}
            </button>
            <button 
              type="button" 
              className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-700 hover:shadow-xl active:scale-95 shadow-lg"
            >
              + New Workflow
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Workflow List */}
        <div className="w-80 border-r-2 border-border bg-surface-subtle overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-text">Workflows</h2>
              <span className="rounded-full bg-surface border border-border px-2.5 py-1 text-xs font-bold text-text-muted">
                {workflows.length}
              </span>
            </div>
            
            <div className="space-y-3">
              {workflows.map((workflow) => (
                <button
                  key={workflow.id}
                  onClick={() => handleWorkflowSelect(workflow)}
                  className={clsx(
                    "w-full rounded-xl border-2 p-4 text-left transition-all duration-200",
                    selectedWorkflow.id === workflow.id
                      ? "border-brand-600 bg-brand-50 shadow-md"
                      : "border-border bg-surface hover:border-brand-500/40 hover:shadow-sm"
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={clsx(
                      "font-bold text-base leading-tight",
                      selectedWorkflow.id === workflow.id ? "text-brand-900" : "text-text"
                    )}>
                      {workflow.name}
                    </span>
                    <span className={clsx(
                      "flex h-2 w-2 shrink-0 rounded-full mt-1",
                      workflow.active ? "bg-brand-500" : "bg-gray-400"
                    )} />
                  </div>
                  <p className="text-xs text-text-muted mb-3 line-clamp-2">{workflow.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-surface-subtle border border-border px-2 py-0.5 font-bold text-text-muted">
                      {workflow.steps.length} steps
                    </span>
                    <span className="text-text-muted">·</span>
                    <span className="font-semibold text-text">{workflow.triggers} triggers</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - React Flow Canvas */}
        <div className="flex-1 flex flex-col bg-surface">
          {/* Workflow Info Bar */}
          <div className="border-b-2 border-border bg-surface-subtle px-6 py-4">
            {editMode ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-2 text-lg font-bold transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  placeholder="Workflow name"
                />
                <input
                  type="text"
                  value={workflowDescription}
                  onChange={(e) => setWorkflowDescription(e.target.value)}
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-2 text-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  placeholder="Workflow description"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-muted">Trigger:</span>
                  <input
                    type="text"
                    value={workflowTrigger}
                    onChange={(e) => setWorkflowTrigger(e.target.value)}
                    className="flex-1 rounded-xl border-2 border-border bg-surface px-4 py-2 text-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    placeholder="What triggers this workflow?"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-extrabold text-text mb-1">{selectedWorkflow.name}</h2>
                <p className="text-sm text-text-muted mb-2">{selectedWorkflow.description}</p>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                    Active
                  </span>
                  <span className="text-xs text-text-muted">
                    Triggered <span className="font-bold text-text">{selectedWorkflow.triggers}</span> times this month
                  </span>
                  <span className="text-xs text-text-muted">·</span>
                  <span className="text-xs text-text-muted">
                    <span className="font-bold text-text">{selectedWorkflow.steps.length}</span> steps configured
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* React Flow Canvas */}
          <div className="flex-1 relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
              className="bg-surface"
            >
              <Background color="#e6e9e8" gap={16} />
              <Controls className="!bg-surface !border-2 !border-border !rounded-xl !shadow-lg" />
              <MiniMap 
                className="!bg-surface !border-2 !border-border !rounded-xl !shadow-lg"
                nodeColor={(node) => {
                  if (node.id === 'trigger') return '#1e7a5f'
                  const step = selectedWorkflow.steps.find(s => s.id === node.id)
                  return step ? (roleColors[step.role] || '#64748b') : '#64748b'
                }}
              />
              <Panel position="top-right" className="!m-4">
                <div className="rounded-xl border-2 border-border bg-surface p-4 shadow-lg">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Legend</h3>
                  <div className="space-y-2">
                    {Object.entries(roleColors).map(([role, color]) => (
                      <div key={role} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded" style={{ backgroundColor: color }} />
                        <span className="text-xs font-medium text-text">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>

        {/* Step Editor Sidebar */}
        {showStepEditor && selectedNode && (
          <>
            <div 
              className="fixed inset-0 bg-black/20 z-40 animate-fade-in"
              onClick={() => setShowStepEditor(false)}
            />
            <div className="fixed right-0 top-0 bottom-0 w-96 bg-surface border-l-2 border-border shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-extrabold text-text">Edit Step</h3>
                  <button
                    onClick={() => setShowStepEditor(false)}
                    className="rounded-lg p-2 hover:bg-surface-subtle transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-text-muted mb-2">Step Name</label>
                    <input
                      type="text"
                      defaultValue={selectedWorkflow.steps.find(s => s.id === selectedNode.id)?.step}
                      className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-muted mb-2">Assigned Role</label>
                    <select className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                      {Object.keys(roleColors).map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-muted mb-2">SLA (Service Level Agreement)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="24"
                        className="w-20 rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                      <select className="flex-1 rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                        <option>hours</option>
                        <option>minutes</option>
                        <option>days</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-muted mb-2">Condition (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., If approved, If amount > 50000"
                      className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-muted mb-2">Actions</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="notify" className="h-4 w-4 rounded border-2 border-border" />
                        <label htmlFor="notify" className="text-sm font-medium text-text">Send notification</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="log" className="h-4 w-4 rounded border-2 border-border" />
                        <label htmlFor="log" className="text-sm font-medium text-text">Log to audit trail</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="escalate" className="h-4 w-4 rounded border-2 border-border" />
                        <label htmlFor="escalate" className="text-sm font-medium text-text">Auto-escalate if overdue</label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-border flex gap-3">
                    <button className="flex-1 rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-brand-700 active:scale-95">
                      Save Changes
                    </button>
                    <button className="rounded-xl border-2 border-red-c/30 bg-red-bg px-4 py-3 text-sm font-bold text-red-c transition-all hover:bg-red-c hover:text-white">
                      Delete Step
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
