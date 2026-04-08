import type { MobileFormDrafts } from "../types/mobileDrafts"

export function buildVisitPayloadSummary(visitType: string | null, drafts: MobileFormDrafts): string {
  switch (visitType) {
    case "sim":
      return `SIM ${drafts.sim.registrations} · ${drafts.sim.channel}`
    case "float":
      return `Float ZMW ${drafts.float.floatBalance} / cash ${drafts.float.cashOnHand} · ${drafts.float.adequacy}`
    case "prospect":
      return `Prospect ${drafts.prospect.customerType} · ${drafts.prospect.interest}`
    case "master":
      return `Master · ${drafts.master.issueType}`
    case "react":
      return `Recruit · ${drafts.recruitment.prospectName || "draft"}`
    case "missed":
    case null:
      return ""
    default:
      return visitType
  }
}
