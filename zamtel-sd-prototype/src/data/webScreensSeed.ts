import type { ExceptionItem, KpiCardData } from "../types/dashboard"

const sp = (n: number) =>
  Array.from({ length: 12 }, (_, i) => ({ x: `${i}`, y: n + i % 4 }))

export const w02Kpis: KpiCardData[] = [
  { id: "w2-1", title: "Planned today", value: "240", delta: "+2%", deltaUp: true, sparkline: sp(238), severity: "healthy" },
  { id: "w2-2", title: "Completed", value: "186", delta: "-2%", deltaUp: false, sparkline: sp(190), severity: "watch" },
  { id: "w2-3", title: "PoV compliance", value: "94%", delta: "+0.4%", deltaUp: true, sparkline: sp(93), severity: "healthy" },
  { id: "w2-4", title: "Avg time / outlet", value: "18m", delta: "-1m", deltaUp: true, sparkline: sp(19), severity: "healthy" },
]

export const w03Exceptions: ExceptionItem[] = [
  { id: "w3-1", issueType: "Geo-fence violation", severity: "critical", geography: "LSK-East", owner: "TL", ageHours: 1 },
  { id: "w3-2", issueType: "Route deviation > 2km", severity: "watch", geography: "ND-CBD", owner: "TDR", ageHours: 6 },
  { id: "w3-3", issueType: "Manual GPS pending approval", severity: "info", geography: "Kitwe", owner: "TL", ageHours: 12 },
]

export const w06Queues: ExceptionItem[] = [
  ...w03Exceptions,
  { id: "w6-1", issueType: "Missed visit — no reason", severity: "critical", geography: "Livingstone", owner: "TL", ageHours: 3 },
  { id: "w6-2", issueType: "Pricing non-compliance", severity: "watch", geography: "Lusaka", owner: "Audit", ageHours: 20 },
]

export const w08LogRows = [
  { id: "l1", when: "2026-03-31 08:42", from: "Float pool LSK", to: "ASE Ruth Tembo", amount: "15,000", territory: "Lusaka", status: "Completed", mode: "Portal" },
  { id: "l2", when: "2026-03-30 16:10", from: "ASE Peter S.", to: "ASE Brian M.", amount: "4,500", territory: "Copperbelt", status: "Completed", mode: "A2A" },
  { id: "l3", when: "2026-03-30 11:55", from: "Ndola hub", to: "Cluster buffer", amount: "22,000", territory: "Ndola", status: "Pending", mode: "Portal" },
]

export const w09Funnel = [
  { stage: "Leads", count: 4800 },
  { stage: "Registrations", count: 3420 },
  { stage: "Activations", count: 2190 },
  { stage: "First tx", count: 1460 },
]

export const w09ChannelMix = [
  { channel: "Retail", pct: 38 },
  { channel: "Agent", pct: 44 },
  { channel: "Direct", pct: 18 },
]

export const w10Stages = [
  { stage: "Identified", count: 210 },
  { stage: "Engaged", count: 164 },
  { stage: "KYC pending", count: 98 },
  { stage: "KYC submitted", count: 72 },
  { stage: "Float deposit", count: 54 },
  { stage: "Activated", count: 41 },
]

export const coverageGaps = [
  { cluster: "Lusaka East", gapPct: 22, unvisited: 18 },
  { cluster: "Kasama North", gapPct: 19, unvisited: 14 },
  { cluster: "Livingstone", gapPct: 12, unvisited: 9 },
]
