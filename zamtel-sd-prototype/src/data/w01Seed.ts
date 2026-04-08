import type {
  ExceptionItem,
  FunnelStage,
  KpiCardData,
  MapZone,
  RankedEntity,
} from "../types/dashboard"

const spark = (base: number, variance = 0.08): { x: string; y: number }[] =>
  Array.from({ length: 14 }, (_, i) => ({
    x: `${i + 1}`,
    y: Math.round(base * (1 + (Math.sin(i / 2) * variance + (i % 3) * 0.01))),
  }))

export const w01Kpis: KpiCardData[] = [
  { id: "pv", title: "Planned Visits", value: "240", delta: "+2.1%", deltaUp: true, sparkline: spark(230), severity: "healthy" },
  { id: "cv", title: "Completed Visits", value: "186", delta: "-1.4%", deltaUp: false, sparkline: spark(192), severity: "watch" },
  { id: "mv", title: "Missed Visits", value: "34", delta: "+8%", deltaUp: false, sparkline: spark(28, 0.12), severity: "critical" },
  { id: "ra", title: "Route Adherence", value: "87%", delta: "+3.2%", deltaUp: true, sparkline: spark(82, 0.05), severity: "healthy" },
  { id: "gf", title: "Geo-Fence Exceptions", value: "7", delta: "-12%", deltaUp: true, sparkline: spark(9, 0.1), severity: "watch" },
  { id: "cr", title: "Active Coverage Rate", value: "76%", delta: "+0.6%", deltaUp: true, sparkline: spark(74), severity: "healthy" },
  { id: "ns", title: "Near Stockouts", value: "17", delta: "+4", deltaUp: false, sparkline: spark(14), severity: "watch" },
  { id: "ga", title: "GA vs Target", value: "86%", delta: "-2.1%", deltaUp: false, sparkline: spark(88), severity: "watch" },
  { id: "ac", title: "Activation Conversion", value: "64%", delta: "+1.8%", deltaUp: true, sparkline: spark(61), severity: "healthy" },
  { id: "rf", title: "Open Risk Flags", value: "9", delta: "+2", deltaUp: false, sparkline: spark(7), severity: "critical" },
]

export const w01Exceptions: ExceptionItem[] = [
  { id: "1", issueType: "Geo-fence override pending", severity: "critical", geography: "Lusaka Central A", owner: "Unassigned", ageHours: 2 },
  { id: "2", issueType: "Offline manual location", severity: "critical", geography: "Ndola CBD", owner: "TL: Mutale B.", ageHours: 5 },
  { id: "3", issueType: "Pricing non-compliance", severity: "watch", geography: "Kitwe West", owner: "TDR North", ageHours: 18 },
  { id: "4", issueType: "Missed visit escalation", severity: "watch", geography: "Livingstone Urban", owner: "ZBM South", ageHours: 26 },
  { id: "5", issueType: "Fraud risk flag", severity: "info", geography: "Kasama Town", owner: "Compliance", ageHours: 40 },
]

export const w01TopTerritories: RankedEntity[] = [
  { rank: 1, name: "Copperbelt — Ndola CBD", metric: "GA attainment", variance: "+12%", trend: "up" },
  { rank: 2, name: "Lusaka — Central B", metric: "Visit productivity", variance: "+8%", trend: "up" },
  { rank: 3, name: "Southern — Livingstone", metric: "Coverage", variance: "+5%", trend: "up" },
]

export const w01BottomTerritories: RankedEntity[] = [
  { rank: 1, name: "Northern — Kasama Town", metric: "Gap to target", variance: "-28%", trend: "down" },
  { rank: 2, name: "Lusaka — East Market", metric: "Missed visits", variance: "-18%", trend: "down" },
  { rank: 3, name: "Southern — Mazabuka", metric: "First-tx conversion", variance: "-11%", trend: "down" },
]

export const w01MapZones: MapZone[] = [
  { id: "LSK-CA", label: "Lusaka Central A", coverage: 0.82, liquidityRisk: 0.35, acquisitionGap: 0.22, riskScore: 0.28 },
  { id: "LSK-CB", label: "Lusaka Central B", coverage: 0.88, liquidityRisk: 0.18, acquisitionGap: 0.12, riskScore: 0.15 },
  { id: "LSK-EM", label: "Lusaka East Market", coverage: 0.71, liquidityRisk: 0.52, acquisitionGap: 0.31, riskScore: 0.41 },
  { id: "COP-ND", label: "Ndola CBD", coverage: 0.91, liquidityRisk: 0.25, acquisitionGap: 0.08, riskScore: 0.12 },
  { id: "COP-KW", label: "Kitwe West", coverage: 0.79, liquidityRisk: 0.44, acquisitionGap: 0.19, riskScore: 0.33 },
  { id: "NORTH-KS", label: "Kasama Town", coverage: 0.64, liquidityRisk: 0.38, acquisitionGap: 0.45, riskScore: 0.52 },
  { id: "SOUTH-LV", label: "Livingstone Urban", coverage: 0.77, liquidityRisk: 0.41, acquisitionGap: 0.24, riskScore: 0.35 },
  { id: "SOUTH-MZ", label: "Mazabuka Corridor", coverage: 0.73, liquidityRisk: 0.29, acquisitionGap: 0.34, riskScore: 0.31 },
]

export const w01MissedReasons = [
  { name: "Outlet closed", value: 12 },
  { name: "Agent absent", value: 8 },
  { name: "Access / security", value: 5 },
  { name: "Network issue", value: 4 },
  { name: "Time overrun", value: 5 },
]

export const w01AcquisitionFunnel: FunnelStage[] = [
  { stage: "Leads", count: 4800 },
  { stage: "Registrations", count: 3420, dropPct: 29 },
  { stage: "Activations", count: 2190, dropPct: 36 },
  { stage: "First tx", count: 1460, dropPct: 33 },
]

export const trendLiquidityRisk = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  risk: 35 + Math.round(Math.sin(i / 4) * 10 + i * 0.15),
}))

export const trendFieldPerf = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  adherence: 82 + Math.round(Math.cos(i / 5) * 4),
  productivity: 68 + Math.round(Math.sin(i / 3) * 6),
}))

export const unvisitedAging = [
  { outlet: "Kabwata SIM & Cash Point", days: 14, territory: "Lusaka East Market Route" },
  { outlet: "Kalingalinga MoMo Hub", days: 11, territory: "Lusaka Central A" },
  { outlet: "Matero TopUp Zone", days: 9, territory: "Lusaka Central B" },
  { outlet: "Ndola Trade Corner Agent", days: 8, territory: "Ndola CBD" },
]

export const complianceSummary = {
  pricingViolations: 18,
  brandingPartial: 12,
  competitorHeavyPct: 62,
  serviceIssues: 26,
}
