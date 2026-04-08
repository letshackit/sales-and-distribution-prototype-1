import type { KpiCardData } from "../types/dashboard"
import type {
  LiquidityAgentRow,
  RebalanceEvent,
  RebalanceTask,
  RiskBoardItem,
  TerritoryLiquidityCell,
} from "../types/liquidity"

const spark = (base: number): { x: string; y: number }[] =>
  Array.from({ length: 12 }, (_, i) => ({
    x: `${i}`,
    y: Math.round(base + Math.sin(i / 2) * 4),
  }))

export const w07Kpis: KpiCardData[] = [
  { id: "cs", title: "Critical Stockouts", value: "9", delta: "+1", deltaUp: false, sparkline: spark(8), severity: "critical" },
  { id: "ns", title: "Near Stockouts", value: "17", delta: "+3", deltaUp: false, sparkline: spark(15), severity: "watch" },
  { id: "af", title: "Avg Float Coverage", value: "72%", delta: "-2%", deltaUp: false, sparkline: spark(74), severity: "watch" },
  { id: "ac", title: "Avg Cash Coverage", value: "81%", delta: "+1%", deltaUp: true, sparkline: spark(80), severity: "healthy" },
  { id: "df", title: "Dormant Float Count", value: "13", delta: "-2", deltaUp: true, sparkline: spark(14), severity: "watch" },
  { id: "rv", title: "Rebalancing Vol. (24h)", value: "ZMW 184k", delta: "+12%", deltaUp: true, sparkline: spark(160), severity: "healthy" },
  { id: "tb", title: "Territories Below Threshold", value: "4", delta: "0", deltaUp: true, sparkline: spark(4), severity: "watch" },
  { id: "ch", title: "Chronic Top-Up Agents", value: "22", delta: "+4", deltaUp: false, sparkline: spark(19), severity: "critical" },
]

export const w07CriticalStockouts: RiskBoardItem[] = [
  { id: "1", label: "Ndola Trade Corner Agent", sub: "Ndola CBD · Master Agent", float: 320, threshold: 1000 },
  { id: "2", label: "Kalingalinga MoMo Hub", sub: "Lusaka East · Agent", float: 210, threshold: 800 },
  { id: "3", label: "Kitwe Market Smart Shop", sub: "Kitwe West · Retail", float: 180, threshold: 750 },
]

export const w07NearStockouts: RiskBoardItem[] = [
  { id: "n1", label: "Kabwata SIM & Cash Point", sub: "Lusaka East", float: 520, threshold: 700 },
  { id: "n2", label: "Matero TopUp Zone", sub: "Lusaka Central B", float: 610, threshold: 800 },
  { id: "n3", label: "Livingstone Cross Border", sub: "Livingstone", float: 440, threshold: 650 },
]

export const w07RebalanceTasks: RebalanceTask[] = [
  { id: "t1", title: "Shift float LSK-Central → LSK-East", amount: "ZMW 25,000", status: "open" },
  { id: "t2", title: "Priority top-up Ndola CBD cluster", amount: "ZMW 40,000", status: "in_progress" },
  { id: "t3", title: "Redistribute dormant Kasama pool", amount: "ZMW 12,500", status: "open" },
]

export const w07TerritoryMatrix: TerritoryLiquidityCell[] = [
  { territoryId: "LSK-CA", name: "Lusaka Central A", health: 78, belowThresholdAgents: 2 },
  { territoryId: "LSK-EM", name: "Lusaka East Market", health: 52, belowThresholdAgents: 5 },
  { territoryId: "ND-CBD", name: "Ndola CBD", health: 61, belowThresholdAgents: 4 },
  { territoryId: "KT-W", name: "Kitwe West", health: 69, belowThresholdAgents: 3 },
  { territoryId: "KS-T", name: "Kasama Town", health: 58, belowThresholdAgents: 4 },
  { territoryId: "LV-U", name: "Livingstone Urban", health: 74, belowThresholdAgents: 2 },
]

export const w07DormantFloat = [
  { id: "d1", outlet: "Zamtel Point Cairo Road", territory: "Lusaka Central A", idle: "ZMW 18,400", suggestion: "Move to LSK-East near-stockout board" },
  { id: "d2", outlet: "Kasama Connect Outlet", territory: "Kasama Town", idle: "ZMW 9,200", suggestion: "Pair with chronic top-up agent OUT-027" },
]

export const w07ChronicIssues = [
  { id: "c1", agent: "Brian Mulenga", territory: "Copperbelt", topUps30d: 8, health: 46 },
  { id: "c2", agent: "Peter Sinkala", territory: "Lusaka", topUps30d: 7, health: 51 },
  { id: "c3", agent: "Mutale Banda", territory: "Northern", topUps30d: 9, health: 41 },
]

export const w07Timeline: RebalanceEvent[] = [
  { id: "e1", time: "08:42", summary: "ZMW 15k LSK → NDL completed", territory: "Cross-region" },
  { id: "e2", time: "10:05", summary: "Agent-to-agent transfer approved", territory: "Kitwe West" },
  { id: "e3", time: "11:18", summary: "Dormant float sweep initiated", territory: "Kasama" },
  { id: "e4", time: "13:51", summary: "Near-stockout auto-alert cleared", territory: "Livingstone" },
]

export const w07TimeToStockout = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  hours: 18 + Math.round(Math.sin(i / 3) * 6 + i * 0.4),
}))

export const w07TopupHistory = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  vol: 120 + Math.round(Math.cos(i / 2) * 25 + i * 3),
}))

export const w07AgentTable: LiquidityAgentRow[] = [
  { id: "a1", matrixId: "ND-CBD", outletType: "Master Agent", agentName: "Ndola Trade Corner Agent", outlet: "OUT-NDL-021", territory: "Ndola CBD", currentFloat: 320, floatThreshold: 1000, currentCash: 2400, cashThreshold: 1500, healthScore: 46, lastTopUp: "2026-03-29", status: "critical", nearStockout: true },
  { id: "a2", matrixId: "LSK-EM", outletType: "Mobile Money Agent", agentName: "Kabwata SIM & Cash Point", outlet: "OUT-LSK-014", territory: "Lusaka East", currentFloat: 520, floatThreshold: 700, currentCash: 980, cashThreshold: 800, healthScore: 62, lastTopUp: "2026-03-30", status: "watch", nearStockout: true },
  { id: "a3", matrixId: "LSK-CA", outletType: "Retail", agentName: "Zamtel Point Cairo Road", outlet: "OUT-LSK-003", territory: "Lusaka Central A", currentFloat: 2100, floatThreshold: 1500, currentCash: 3100, cashThreshold: 2000, healthScore: 88, lastTopUp: "2026-03-30", status: "healthy", nearStockout: false },
  { id: "a4", matrixId: "KT-W", outletType: "Retail", agentName: "Kitwe Market Smart Shop", outlet: "OUT-KIT-008", territory: "Kitwe West", currentFloat: 180, floatThreshold: 750, currentCash: 1100, cashThreshold: 900, healthScore: 44, lastTopUp: "2026-03-28", status: "critical", nearStockout: true },
  { id: "a5", matrixId: "LV-U", outletType: "Mobile Money Agent", agentName: "Livingstone Cross Border", outlet: "OUT-LIV-012", territory: "Livingstone Urban", currentFloat: 440, floatThreshold: 650, currentCash: 720, cashThreshold: 600, healthScore: 58, lastTopUp: "2026-03-30", status: "watch", nearStockout: true },
]
