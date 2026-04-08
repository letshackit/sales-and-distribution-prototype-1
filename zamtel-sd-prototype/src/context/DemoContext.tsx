import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { RoleCode } from "../types/contracts"
import type { DrillDownContext, MapLayer } from "../types/dashboard"

export interface GlobalFilters {
  region: string
  cluster: string
  territory: string
  channel: string
  visitType: string
  team: string
  status: string
  timePeriod: string
}

const defaultFilters: GlobalFilters = {
  region: "All regions",
  cluster: "All clusters",
  territory: "All territories",
  channel: "All channels",
  visitType: "All types",
  team: "All teams",
  status: "Active",
  timePeriod: "Today",
}

interface DemoState {
  role: RoleCode
  setRole: (r: RoleCode) => void
  filters: GlobalFilters
  setFilters: (p: Partial<GlobalFilters>) => void
  mapLayer: MapLayer
  setMapLayer: (l: MapLayer) => void
  loading: boolean
  setLoading: (v: boolean) => void
  exportBusy: boolean
  setExportBusy: (v: boolean) => void
  drillDown: DrillDownContext | null
  openDrillDown: (d: DrillDownContext) => void
  closeDrillDown: () => void
  exceptionSeverity: "all" | "critical" | "watch"
  setExceptionSeverity: (s: "all" | "critical" | "watch") => void
  lastRefresh: Date
  refresh: () => void
  /** First-pass: demo empty / loading states for analytics surfaces (sidebar control). */
  analyticsDemoMode: "live" | "empty" | "loading"
  setAnalyticsDemoMode: (m: "live" | "empty" | "loading") => void
}

const DemoContext = createContext<DemoState | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<RoleCode>("ZBM")
  const [filters, setFiltersState] = useState<GlobalFilters>(defaultFilters)
  const [mapLayer, setMapLayer] = useState<MapLayer>("coverage")
  const [loading, setLoading] = useState(false)
  const [exportBusy, setExportBusy] = useState(false)
  const [drillDown, setDrillDown] = useState<DrillDownContext | null>(null)
  const [exceptionSeverity, setExceptionSeverity] = useState<"all" | "critical" | "watch">("all")
  const [lastRefresh, setLastRefresh] = useState(() => new Date())
  const [analyticsDemoMode, setAnalyticsDemoMode] = useState<"live" | "empty" | "loading">("live")

  const setFilters = useCallback((p: Partial<GlobalFilters>) => {
    setFiltersState((f) => ({ ...f, ...p }))
  }, [])

  const openDrillDown = useCallback((d: DrillDownContext) => setDrillDown(d), [])
  const closeDrillDown = useCallback(() => setDrillDown(null), [])
  const refresh = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setLastRefresh(new Date())
      setLoading(false)
    }, 600)
  }, [])

  const value = useMemo(
    () => ({
      role,
      setRole,
      filters,
      setFilters,
      mapLayer,
      setMapLayer,
      loading,
      setLoading,
      exportBusy,
      setExportBusy,
      drillDown,
      openDrillDown,
      closeDrillDown,
      exceptionSeverity,
      setExceptionSeverity,
      lastRefresh,
      refresh,
      analyticsDemoMode,
      setAnalyticsDemoMode,
    }),
    [
      role,
      filters,
      setFilters,
      mapLayer,
      loading,
      exportBusy,
      drillDown,
      exceptionSeverity,
      lastRefresh,
      refresh,
      openDrillDown,
      closeDrillDown,
      analyticsDemoMode,
    ],
  )

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error("useDemo must be used within DemoProvider")
  return ctx
}
