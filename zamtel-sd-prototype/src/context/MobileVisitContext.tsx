import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { flushQueue } from "../api/mockFieldApi"
import { clearFieldBridge, writeFieldBridgeFromState } from "../lib/fieldSessionBridge"
import {
  clearMobileSession,
  loadMobileSession,
  saveMobileSession,
} from "../lib/mobilePersistence"
import { buildVisitPayloadSummary } from "../lib/visitPayloadSummary"
import {
  createInitialMobileVisitState,
  type GpsState,
  type MobileVisitState,
  type SyncPhase,
} from "../state/mobileVisitDefaults"
import type { MobileFormDrafts } from "../types/mobileDrafts"
import type { VisitLogEntry } from "../types/mobileJourney"

export type { GpsState, MobileVisitState, SyncPhase }

function nextPlannedStop(stops: MobileVisitState["stops"]) {
  return [...stops]
    .filter((s) => s.status === "planned")
    .sort((a, b) => a.seq - b.seq)[0]
}

interface Ctx {
  state: MobileVisitState
  login: () => void
  logout: () => void
  setOffline: (v: boolean) => void
  setGps: (g: GpsState) => void
  setVisitType: (t: string | null) => void
  setProofCaptured: (v: boolean) => void
  setAttendance: (a: MobileVisitState["attendance"]) => void
  setDayComplete: (v: boolean) => void
  beginCheckIn: (stopId: string) => void
  completeVisit: () => void
  recordMissedVisit: (reason: string) => void
  runSync: () => Promise<void>
  fieldMinutesAccumulated: number
  patchDraft: <K extends keyof MobileFormDrafts>(key: K, partial: Partial<MobileFormDrafts[K]>) => void
}

const MobileVisitContext = createContext<Ctx | null>(null)

export function MobileVisitProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MobileVisitState>(() => {
    const p = loadMobileSession()
    return p?.state ?? createInitialMobileVisitState()
  })
  const [fieldMinutesAccumulated, setFieldMinutesAccumulated] = useState(() => loadMobileSession()?.fieldMinutesAccumulated ?? 372)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    writeFieldBridgeFromState(state)
  }, [])

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      saveMobileSession({ v: 1, state, fieldMinutesAccumulated })
      writeFieldBridgeFromState(state)
    }, 300)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [state, fieldMinutesAccumulated])

  const patchDraft = useCallback(<K extends keyof MobileFormDrafts>(key: K, partial: Partial<MobileFormDrafts[K]>) => {
    setState((s) => ({
      ...s,
      drafts: { ...s.drafts, [key]: { ...s.drafts[key], ...partial } },
    }))
  }, [])

  const login = useCallback(() => {
    setState((s) => ({
      ...s,
      loggedIn: true,
      attendance: "in_field",
      gps: "valid",
    }))
  }, [])

  const logout = useCallback(() => {
    clearMobileSession()
    clearFieldBridge()
    setState(createInitialMobileVisitState())
    setFieldMinutesAccumulated(372)
  }, [])

  const setOffline = useCallback((v: boolean) => {
    setState((s) => ({ ...s, offline: v, gps: v ? "offline_fallback" : s.gps }))
  }, [])

  const setGps = useCallback((g: GpsState) => {
    setState((s) => ({ ...s, gps: g }))
  }, [])

  const setVisitType = useCallback((t: string | null) => {
    setState((s) => ({ ...s, visitType: t }))
  }, [])

  const setProofCaptured = useCallback((v: boolean) => {
    setState((s) => ({ ...s, proofCaptured: v }))
  }, [])

  const setAttendance = useCallback((a: MobileVisitState["attendance"]) => {
    setState((s) => ({ ...s, attendance: a }))
  }, [])

  const setDayComplete = useCallback((v: boolean) => {
    setState((s) => ({ ...s, dayComplete: v, attendance: v ? "complete" : s.attendance }))
  }, [])

  const beginCheckIn = useCallback((stopId: string) => {
    setState((s) => {
      const stop = s.stops.find((x) => x.id === stopId)
      if (
        !stop ||
        stop.status === "completed" ||
        stop.status === "blocked" ||
        stop.status === "missed" ||
        stop.status === "rescheduled"
      )
        return s
      const stops = s.stops.map((st) => {
        if (st.id === stopId) return { ...st, status: "current" as const }
        if (st.status === "current") return { ...st, status: "planned" as const }
        return st
      })
      return {
        ...s,
        stops,
        outlet: { id: stop.outletCode, name: stop.name, type: stop.type },
        visitType: null,
        proofCaptured: false,
      }
    })
  }, [])

  const completeVisit = useCallback(() => {
    setState((s) => {
      const cur = s.stops.find((st) => st.status === "current")
      if (!cur) return s
      const typeLabel = s.visitType ?? "visit"
      const payloadSummary = buildVisitPayloadSummary(s.visitType, s.drafts)
      const entry: VisitLogEntry = {
        id: `V-${Date.now()}`,
        outletId: cur.outletCode,
        outletName: cur.name,
        visitType: typeLabel,
        at: new Date().toISOString(),
        outcome: "completed",
        payloadSummary: payloadSummary || undefined,
      }
      let stops = s.stops.map((st) =>
        st.id === cur.id ? { ...st, status: "completed" as const, dist: "Done" } : st,
      )
      const next = nextPlannedStop(stops)
      stops = next
        ? stops.map((st) => (st.id === next.id ? { ...st, status: "current" as const } : st))
        : stops
      return {
        ...s,
        stops,
        visitLog: [...s.visitLog, entry],
        visitType: null,
        proofCaptured: false,
        pendingSync: s.pendingSync + 1,
        partialSync: true,
        syncPhase: "idle" as SyncPhase,
      }
    })
    setFieldMinutesAccumulated((m) => m + 18)
  }, [])

  const recordMissedVisit = useCallback((reason: string) => {
    setState((s) => {
      const cur = s.stops.find((st) => st.status === "current")
      if (!cur) return s
      const entry: VisitLogEntry = {
        id: `V-${Date.now()}`,
        outletId: cur.outletCode,
        outletName: cur.name,
        visitType: "missed",
        at: new Date().toISOString(),
        outcome: "missed",
        note: reason,
        payloadSummary: `Missed: ${reason.slice(0, 80)}`,
      }
      let stops = s.stops.map((st) =>
        st.id === cur.id ? { ...st, status: "missed" as const, dist: "—" } : st,
      )
      const next = nextPlannedStop(stops)
      stops = next
        ? stops.map((st) => (st.id === next.id ? { ...st, status: "current" as const } : st))
        : stops
      return {
        ...s,
        stops,
        visitLog: [...s.visitLog, entry],
        visitType: null,
        proofCaptured: false,
        pendingSync: s.pendingSync + 1,
        partialSync: true,
        syncPhase: "idle" as SyncPhase,
      }
    })
    setFieldMinutesAccumulated((m) => m + 5)
  }, [])

  const runSync = useCallback(async () => {
    let pending = 0
    setState((s) => {
      pending = s.pendingSync
      if (pending <= 0) return { ...s, syncPhase: "idle" }
      return { ...s, syncPhase: "syncing" }
    })
    if (pending <= 0) return

    try {
      const result = await flushQueue(pending)
      setState((s) => ({
        ...s,
        syncedCount: s.syncedCount + result.synced,
        pendingSync: result.remaining,
        failedSyncCount: s.failedSyncCount + result.failed,
        partialSync: result.remaining > 0,
        syncPhase: (result.remaining > 0 ? "error" : "idle") as SyncPhase,
      }))
    } catch {
      setState((s) => ({ ...s, syncPhase: "error" }))
    }
  }, [])

  const value = useMemo(
    () => ({
      state,
      login,
      logout,
      setOffline,
      setGps,
      setVisitType,
      setProofCaptured,
      setAttendance,
      setDayComplete,
      beginCheckIn,
      completeVisit,
      recordMissedVisit,
      runSync,
      fieldMinutesAccumulated,
      patchDraft,
    }),
    [
      state,
      login,
      logout,
      setOffline,
      setGps,
      setVisitType,
      setProofCaptured,
      setAttendance,
      setDayComplete,
      beginCheckIn,
      completeVisit,
      recordMissedVisit,
      runSync,
      fieldMinutesAccumulated,
      patchDraft,
    ],
  )

  return <MobileVisitContext.Provider value={value}>{children}</MobileVisitContext.Provider>
}

export function useMobileVisit() {
  const c = useContext(MobileVisitContext)
  if (!c) throw new Error("useMobileVisit requires provider")
  return c
}
