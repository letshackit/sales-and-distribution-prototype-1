export type KpiSeverity = "healthy" | "watch" | "critical"

export interface KpiCardData {
  id: string
  title: string
  value: string
  delta: string
  deltaUp: boolean
  sparkline: { x: string; y: number }[]
  severity: KpiSeverity
}

export interface ExceptionItem {
  id: string
  issueType: string
  severity: "critical" | "watch" | "info"
  geography: string
  owner: string
  ageHours: number
}

export interface RankedEntity {
  rank: number
  name: string
  metric: string
  variance: string
  trend: "up" | "down" | "flat"
}

export interface MapZone {
  id: string
  label: string
  coverage: number
  liquidityRisk: number
  acquisitionGap: number
  riskScore: number
}

export type MapLayer = "coverage" | "liquidity" | "acquisition" | "risk"

export interface FunnelStage {
  stage: string
  count: number
  dropPct?: number
}

export interface DrillDownContext {
  entityType: "kpi" | "territory" | "map"
  entityId: string
  title: string
  subtitle?: string
}
