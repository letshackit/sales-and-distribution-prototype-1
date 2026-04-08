import {
  createInitialMobileVisitState,
  type MobileVisitState,
} from "../state/mobileVisitDefaults"
import { defaultFormDrafts } from "../types/mobileDrafts"
import type { MobileFormDrafts } from "../types/mobileDrafts"

export const MOBILE_SESSION_STORAGE_KEY = "zamtel-sd-mobile-session-v1"

export interface PersistedMobileBundle {
  v: 1
  state: MobileVisitState
  fieldMinutesAccumulated: number
}

function deepMergeDrafts(stored?: Partial<MobileFormDrafts>): MobileFormDrafts {
  const d = defaultFormDrafts()
  if (!stored) return d
  return {
    sim: { ...d.sim, ...stored.sim },
    float: { ...d.float, ...stored.float },
    prospect: { ...d.prospect, ...stored.prospect },
    master: { ...d.master, ...stored.master },
    recruitment: { ...d.recruitment, ...stored.recruitment },
    compliance: {
      ...d.compliance,
      ...stored.compliance,
      competitors: stored.compliance?.competitors ?? d.compliance.competitors,
    },
  }
}

export function mergePersistedIntoDefaults(partial: Partial<MobileVisitState>): MobileVisitState {
  const base = createInitialMobileVisitState()
  return {
    ...base,
    ...partial,
    outlet: { ...base.outlet, ...partial.outlet },
    stops: partial.stops?.length ? partial.stops : base.stops,
    visitLog: partial.visitLog ?? [],
    drafts: deepMergeDrafts(partial.drafts),
    syncPhase: partial.syncPhase ?? "idle",
  }
}

export function loadMobileSession(): PersistedMobileBundle | null {
  try {
    const raw = localStorage.getItem(MOBILE_SESSION_STORAGE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as PersistedMobileBundle
    if (p.v !== 1 || !p.state) return null
    p.state = mergePersistedIntoDefaults(p.state)
    return p
  } catch {
    return null
  }
}

export function saveMobileSession(bundle: PersistedMobileBundle) {
  try {
    localStorage.setItem(MOBILE_SESSION_STORAGE_KEY, JSON.stringify(bundle))
  } catch {
    /* quota / private mode */
  }
}

export function clearMobileSession() {
  try {
    localStorage.removeItem(MOBILE_SESSION_STORAGE_KEY)
  } catch {
    /* noop */
  }
}
