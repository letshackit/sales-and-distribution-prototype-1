/** Cross-screen data contracts (blueprint §8) */

export type RoleCode = "ASE" | "TL" | "TDR" | "Rebalancer" | "ZBM" | "Admin"

export interface GeographyNode {
  regionId: string
  regionName: string
  clusterId: string
  clusterName: string
  territoryId: string
  territoryName: string
  status: "active" | "inactive"
}

export interface UserRecord {
  userId: string
  fullName: string
  role: RoleCode
  email: string
  region: string
  cluster: string
  territory: string
  deviceStatus: "online" | "offline" | "unknown"
  activeStatus: "active" | "inactive"
}

export interface OutletRecord {
  outletId: string
  outletName: string
  outletType: string
  assignedASE: string
  region: string
  cluster: string
  territory: string
  latitude: number
  longitude: number
  tradeArea: string
  visitFrequencyTarget: number
  brandingStatus: "full" | "partial" | "none"
  pricingCompliance: "compliant" | "non_compliant" | "unknown"
}

export interface VisitRecord {
  visitId: string
  userId: string
  outletId: string
  visitType: string
  checkInTime: string
  checkOutTime: string | null
  gpsValid: boolean
  geoFencePass: boolean
  proofPhotoValid: boolean
  visitStatus: "planned" | "completed" | "missed" | "blocked"
  missedReason: string | null
  notes: string | null
}

export interface LiquidityRecord {
  agentId: string
  outletId: string
  currentFloat: number
  floatThreshold: number
  currentCash: number
  cashThreshold: number
  topUpCount30d: number
  lastTopUpDate: string
  healthScore: number
  nearStockout: boolean
  dormantFloat: boolean
}

export interface AcquisitionSummary {
  leadCount: number
  registrationCount: number
  activationCount: number
  firstTransactionCount: number
  target: number
  actual: number
  channelMix: { channel: string; pct: number }[]
  topPerformers: { name: string; metric: string; value: number }[]
}
