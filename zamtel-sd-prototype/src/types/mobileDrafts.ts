export interface MobileFormDrafts {
  sim: {
    registrations: string
    channel: string
    campaign: string
    notes: string
    activationState: string
  }
  float: {
    floatBalance: string
    cashOnHand: string
    adequacy: "ok" | "low" | "critical"
    branding: string
    rebalancer: string
    topUp: string
    notes: string
  }
  prospect: {
    customerType: string
    product: string
    interest: string
    followUp: string
    phone: string
  }
  master: {
    stockState: string
    floatSupport: string
    replenishment: string
    lastTopUpRef: string
    issueType: string
    actionTaken: string
    followUp: string
  }
  recruitment: {
    openSection: number
    agentId: string
    prospectName: string
    notes: string
  }
  compliance: {
    branding: string
    pricing: string
    competitors: string[]
    competitorNotes: string
    riskFlag: string
    serviceIssue: string
    feedback: string
  }
}

export function defaultFormDrafts(): MobileFormDrafts {
  return {
    sim: {
      registrations: "12",
      channel: "Retail",
      campaign: "Q1 urban push",
      notes: "",
      activationState: "Expect activation within 24h",
    },
    float: {
      floatBalance: "650",
      cashOnHand: "980",
      adequacy: "low",
      branding: "Full",
      rebalancer: "Yes",
      topUp: "No",
      notes: "",
    },
    prospect: {
      customerType: "Consumer",
      product: "MoMo wallet",
      interest: "High",
      followUp: "",
      phone: "+260 9",
    },
    master: {
      stockState: "Adequate",
      floatSupport: "Medium",
      replenishment: "SIM + float",
      lastTopUpRef: "TX-44821",
      issueType: "Slow refill",
      actionTaken: "Logged task",
      followUp: "48h callback",
    },
    recruitment: {
      openSection: 0,
      agentId: "",
      prospectName: "",
      notes: "",
    },
    compliance: {
      branding: "Full",
      pricing: "OK",
      competitors: ["Airtel"],
      competitorNotes: "",
      riskFlag: "None",
      serviceIssue: "",
      feedback: "",
    },
  }
}
