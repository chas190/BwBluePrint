export const brand = {
  name: "STEP",
  fullName: "Strategic Technology Enterprise Platform",
  promise: "The Enterprise Behind Your Vision.",
  purpose: "Accelerating Stakeholder Value.",
  crmUrl: "https://step-crm.charliedreynolds.chatgpt.site",
  siteUrl: "https://step-enterprise-v2.charliedreynolds.chatgpt.site",
} as const;

export const engagementModes = [
  {
    key: "advise",
    label: "Advise",
    summary: "Get clarity, specialist guidance, and a prioritized plan.",
    detail:
      "Senior advisors review where the business stands, test options with you, and leave you with clear priorities.",
  },
  {
    key: "lead",
    label: "Lead",
    summary: "Add experienced fractional, interim, or dedicated executives.",
    detail:
      "An accountable executive steps into the seat your business needs, part-time, interim, or full-time.",
  },
  {
    key: "execute",
    label: "Execute",
    summary: "Turn priorities into completed projects and improvements.",
    detail:
      "Defined missions with owners, dates, and measures, delivered by an assembled team of operators and specialists.",
  },
  {
    key: "support",
    label: "Support",
    summary: "Keep essential departments and operations running.",
    detail:
      "Ongoing managed departments such as bookkeeping, marketing operations, and IT coordination that run week after week.",
  },
] as const;

export const processSteps = [
  { n: 1, title: "Assess", output: "A clear picture of goals, gaps, systems, and constraints across the business." },
  { n: 2, title: "Prioritize", output: "A ranked short list of the improvements that matter most right now." },
  { n: 3, title: "Assemble", output: "An executive lead plus the right operators, specialists, and systems for the work." },
  { n: 4, title: "Execute", output: "Defined missions with owners, dates, and measures, worked on a steady cadence." },
  { n: 5, title: "Optimize", output: "Regular reporting and review that adjusts the plan as the business changes." },
] as const;
