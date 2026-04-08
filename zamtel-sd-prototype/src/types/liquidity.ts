export interface LiquidityAgentRow {
  id: string
  matrixId: string
  outletType: string
  agentName: string
  outlet: string
  territory: string
  currentFloat: number
  floatThreshold: number
  currentCash: number
  cashThreshold: number
  healthScore: number
  lastTopUp: string
  status: "critical" | "watch" | "healthy"
  nearStockout: boolean
}

export interface RiskBoardItem {
  id: string
  label: string
  sub: string
  float: number
  threshold: number
}

export interface RebalanceTask {
  id: string
  title: string
  amount: string
  status: "open" | "in_progress"
}

export interface RebalanceEvent {
  id: string
  time: string
  summary: string
  territory: string
}

export interface TerritoryLiquidityCell {
  territoryId: string
  name: string
  health: number
  belowThresholdAgents: number
}

/** W07 toolbar — first-pass filter contract */
export interface LiquidityToolbarFilters {
  outletType: string
  agentQuery: string
  stockoutState: "all" | "critical" | "watch" | "healthy"
  dateRange: string
}
