export type StopStatus = "planned" | "current" | "completed" | "missed" | "rescheduled" | "blocked"

export interface RouteStop {
  id: string
  outletCode: string
  name: string
  status: StopStatus
  priority: string
  seq: number
  window: string
  type: string
  dist: string
}

export interface VisitLogEntry {
  id: string
  outletId: string
  outletName: string
  visitType: string
  at: string
  outcome: "completed" | "missed"
  note?: string
  /** Snapshot from form drafts at submit (demo telemetry) */
  payloadSummary?: string
}
