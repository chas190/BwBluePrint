import { services } from "@/data/services";

export const businessTypes = ["Trades & home services", "Retail", "Professional services", "Hospitality & food", "Healthcare practice", "Manufacturing & distribution", "Technology", "Other"];
export const stages = ["Starting out", "Growing", "Established", "Scaling or expanding", "Preparing for transition"];
export const teamSizes = ["Just me", "2–10", "11–50", "51–200", "200+"];
export const revenueRanges = ["Prefer not to say", "Under $500K", "$500K–$2M", "$2M–$10M", "$10M–$50M", "$50M+"];

export const goals = [
  { key: "owner-time", label: "Free up owner time" },
  { key: "sales", label: "Increase sales" },
  { key: "profitability", label: "Improve profitability" },
  { key: "cash-flow", label: "Strengthen cash flow" },
  { key: "efficiency", label: "Operate more efficiently" },
  { key: "systems", label: "Better systems" },
  { key: "leadership", label: "Stronger leadership" },
  { key: "expansion", label: "Expand or open new markets" },
] as const;

export const gaps = [
  { key: "finance", label: "Finance" },
  { key: "marketing", label: "Marketing" },
  { key: "sales", label: "Sales" },
  { key: "operations", label: "Operations" },
  { key: "technology", label: "Technology" },
  { key: "people", label: "People" },
  { key: "strategy", label: "Strategy" },
  { key: "partnerships", label: "Partnerships" },
] as const;

export const systemsOptions = ["Mostly spreadsheets & email", "Accounting software only", "Some tools, not connected", "CRM in place", "ERP or integrated suite"];
export const engagementTypes = ["Advise", "Lead", "Execute", "Support", "Not sure yet"];
export const timings = ["Immediately", "Within 1–3 months", "3–6 months", "Just exploring"];

export type Answers = {
  businessType: string;
  stage: string;
  teamSize: string;
  revenue: string;
  goals: string[];
  gaps: string[];
  systems: string;
  bottleneck: string;
  engagement: string;
  timing: string;
  name: string;
  email: string;
  company: string;
  requestContact: boolean;
};

export const emptyAnswers: Answers = {
  businessType: "", stage: "", teamSize: "", revenue: "", goals: [], gaps: [],
  systems: "", bottleneck: "", engagement: "", timing: "", name: "", email: "", company: "", requestContact: false,
};

const gapToService: Record<string, string> = {
  finance: "finance", marketing: "marketing", sales: "sales", operations: "operations-logistics",
  technology: "technology-data", people: "people", strategy: "strategy", partnerships: "partnerships",
};

const goalToServices: Record<string, string[]> = {
  "owner-time": ["executive-leadership", "operations-logistics"],
  sales: ["sales", "marketing"],
  profitability: ["finance", "operations-logistics"],
  "cash-flow": ["finance"],
  efficiency: ["operations-logistics", "technology-data"],
  systems: ["technology-data"],
  leadership: ["executive-leadership", "strategy"],
  expansion: ["strategy", "partnerships"],
};

export type Suggestion = { serviceId: string; title: string; score: number; reasons: string[] };

export function scoreAssessment(a: Answers): Suggestion[] {
  const map = new Map<string, Suggestion>();
  const add = (id: string, pts: number, reason: string) => {
    const svc = services.find((s) => s.id === id);
    if (!svc) return;
    const cur = map.get(id) ?? { serviceId: id, title: svc.title, score: 0, reasons: [] };
    cur.score += pts;
    if (!cur.reasons.includes(reason)) cur.reasons.push(reason);
    map.set(id, cur);
  };
  for (const g of a.gaps) {
    const label = gaps.find((x) => x.key === g)?.label ?? g;
    add(gapToService[g] ?? g, 3, `You identified ${label.toLowerCase()} as a capability gap.`);
  }
  for (const g of a.goals) {
    const label = goals.find((x) => x.key === g)?.label ?? g;
    for (const id of goalToServices[g] ?? []) add(id, 2, `Supports your goal: ${label.toLowerCase()}.`);
  }
  if (a.systems === "Mostly spreadsheets & email" || a.systems === "Some tools, not connected") {
    add("technology-data", 1, `Your current systems are described as "${a.systems.toLowerCase()}".`);
  }
  if (a.engagement === "Lead") add("executive-leadership", 1, "You prefer adding an experienced leader.");
  return [...map.values()].sort((x, y) => y.score - x.score || x.title.localeCompare(y.title)).slice(0, 3);
}

export function ninetyDayPlan(top: Suggestion[]): { window: string; focus: string }[] {
  const names = top.map((t) => t.title);
  const first = names[0] ?? "your top priority";
  return [
    { window: "Days 1–15", focus: `Confirm the assessment, assign an executive lead, and baseline ${first.toLowerCase()}.` },
    { window: "Days 16–45", focus: `Launch the first mission on ${first.toLowerCase()} with owners, dates, and measures.` },
    { window: "Days 46–75", focus: names[1] ? `Add a second mission on ${names[1].toLowerCase()} and review progress.` : "Review progress and adjust the plan." },
    { window: "Days 76–90", focus: names[2] ? `Scope ${names[2].toLowerCase()} and set the next-quarter plan.` : "Report results to date and set the next-quarter plan." },
  ];
}

export function reportText(a: Answers, top: Suggestion[]): string {
  const lines = [
    "STEP — Preliminary assessment",
    "This is a rule-based summary of your answers, not an AI diagnosis or a guaranteed recommendation.",
    "",
    `Business type: ${a.businessType}`, `Stage: ${a.stage}`, `Team size: ${a.teamSize}`, `Revenue range: ${a.revenue || "Not provided"}`,
    `Goals: ${a.goals.map((g) => goals.find((x) => x.key === g)?.label).join(", ")}`,
    `Capability gaps: ${a.gaps.map((g) => gaps.find((x) => x.key === g)?.label).join(", ")}`,
    `Current systems: ${a.systems}`, `Biggest bottleneck: ${a.bottleneck}`, `Preferred engagement: ${a.engagement}`, `Timing: ${a.timing}`,
    "",
    "Suggested priorities:",
    ...top.flatMap((t, i) => [`${i + 1}. ${t.title}`, ...t.reasons.map((r) => `   - ${r}`)]),
    "",
    "Example 90-day sequence (illustrative, not a commitment to results):",
    ...ninetyDayPlan(top).map((p) => `${p.window}: ${p.focus}`),
  ];
  return lines.join("\n");
}
