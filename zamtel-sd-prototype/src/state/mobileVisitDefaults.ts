import { MOBILE_ROUTE_SEED } from "../data/mobileRouteSeed"
import { defaultFormDrafts } from "../types/mobileDrafts"
import type { MobileFormDrafts } from "../types/mobileDrafts"
import type { VisitLogEntry } from "../types/mobileJourney"
import type { RouteStop } from "../types/mobileJourney"

export type GpsState = "locating" | "valid" | "weak" | "blocked" | "offline_fallback"

export type SyncPhase = "idle" | "syncing" | "error"

export interface MobileVisitState {
  loggedIn: boolean
  userName: string
  territory: string
  offline: boolean
  partialSync: boolean
  gps: GpsState
  outlet: { id: string; name: string; type: string }
  visitType: string | null
  proofCaptured: boolean
  dayComplete: boolean
  pendingSync: number
  syncedCount: number
  failedSyncCount: number
  pendingApprovalCount: number
  attendance: "not_started" | "in_field" | "complete"
  stops: RouteStop[]
  visitLog: VisitLogEntry[]
  drafts: MobileFormDrafts
  syncPhase: SyncPhase
}

const defaultOutlet = {
  id: "OUT-LSK-014",
  name: "Kabwata SIM & Cash Point",
  type: "Mobile Money Agent",
}

export function cloneStops(): RouteStop[] {
  return MOBILE_ROUTE_SEED.map((s) => ({ ...s }))
}

export function createInitialMobileVisitState(): MobileVisitState {
  return {
    loggedIn: false,
    userName: "Ruth Tembo",
    territory: "Lusaka Central A",
    offline: false,
    partialSync: false,
    gps: "locating",
    outlet: { ...defaultOutlet },
    visitType: null,
    proofCaptured: false,
    dayComplete: false,
    pendingSync: 2,
    syncedCount: 14,
    failedSyncCount: 0,
    pendingApprovalCount: 2,
    attendance: "not_started",
    stops: cloneStops(),
    visitLog: [],
    drafts: defaultFormDrafts(),
    syncPhase: "idle",
  }
}
