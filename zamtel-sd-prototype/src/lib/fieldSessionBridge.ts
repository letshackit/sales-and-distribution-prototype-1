import type { MobileVisitState } from "../state/mobileVisitDefaults"

export const FIELD_BRIDGE_STORAGE_KEY = "zamtel-sd-field-bridge-v1"

export interface FieldBridgePayload {
  v: 1
  updatedAt: number
  userName: string
  territory: string
  visitCount: number
  pendingSync: number
  routeDone: number
  routeTotal: number
  lastVisit?: {
    outletName: string
    visitType: string
    at: string
    outcome: string
    payloadSummary?: string
  }
}

function dayRouteTotal(stops: MobileVisitState["stops"]) {
  return stops.filter((s) => s.status !== "blocked" && s.status !== "rescheduled").length
}

function dayRouteDone(stops: MobileVisitState["stops"]) {
  return stops.filter((s) => s.status === "completed").length
}

export function writeFieldBridgeFromState(state: MobileVisitState) {
  const last = state.visitLog[state.visitLog.length - 1]
  const payload: FieldBridgePayload = {
    v: 1,
    updatedAt: Date.now(),
    userName: state.userName,
    territory: state.territory,
    visitCount: state.visitLog.length,
    pendingSync: state.pendingSync,
    routeDone: dayRouteDone(state.stops),
    routeTotal: dayRouteTotal(state.stops),
    lastVisit: last
      ? {
          outletName: last.outletName,
          visitType: last.visitType,
          at: last.at,
          outcome: last.outcome,
          payloadSummary: last.payloadSummary,
        }
      : undefined,
  }
  try {
    localStorage.setItem(FIELD_BRIDGE_STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* noop */
  }
  window.dispatchEvent(new CustomEvent("zamtel-field-bridge", { detail: payload }))
}

export function readFieldBridge(): FieldBridgePayload | null {
  try {
    const raw = localStorage.getItem(FIELD_BRIDGE_STORAGE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as FieldBridgePayload
    if (p.v !== 1) return null
    return p
  } catch {
    return null
  }
}

export function clearFieldBridge() {
  try {
    localStorage.removeItem(FIELD_BRIDGE_STORAGE_KEY)
  } catch {
    /* noop */
  }
}
