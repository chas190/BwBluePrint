export type ServiceFilter = "leadership" | "departments" | "projects" | "professionals";

export const serviceFilters: { key: ServiceFilter; label: string }[] = [
  { key: "leadership", label: "Leadership" },
  { key: "departments", label: "Managed Departments" },
  { key: "projects", label: "Projects" },
  { key: "professionals", label: "Professional Partners" },
];

export type Service = {
  id: string;
  title: string;
  group: "Executive function" | "Operating department";
  summary: string;
  capabilities: string[];
  filters: ServiceFilter[];
};

export const services: Service[] = [
  {
    id: "executive-leadership",
    title: "Executive Leadership",
    group: "Executive function",
    summary: "Experienced executives who own outcomes alongside the founder, in the capacity that fits.",
    capabilities: ["Fractional or interim CEO, COO, CFO, CTO, CMO, CRO", "Leadership team design", "Board and owner reporting", "Specialist executive roles"],
    filters: ["leadership"],
  },
  {
    id: "strategy",
    title: "Strategy",
    group: "Executive function",
    summary: "A practical plan that connects the owner's vision to priorities the team can act on.",
    capabilities: ["Business and growth planning", "Priority setting and roadmaps", "Operating cadence design", "Owner transition planning"],
    filters: ["leadership", "projects"],
  },
  {
    id: "finance",
    title: "Finance & Bookkeeping",
    group: "Operating department",
    summary: "Know where the money is, where it is going, and what to do next.",
    capabilities: ["Bookkeeping and reconciliations", "Cash flow forecasting", "Budgeting and management reporting", "Receivables and payables"],
    filters: ["leadership", "departments", "projects"],
  },
  {
    id: "marketing",
    title: "Marketing",
    group: "Operating department",
    summary: "Be found, be understood, and stay top of mind with the customers you want.",
    capabilities: ["Positioning and messaging", "Local visibility and search", "Campaigns and content", "Marketing operations"],
    filters: ["leadership", "departments", "projects"],
  },
  {
    id: "sales",
    title: "Sales",
    group: "Operating department",
    summary: "Respond faster, follow up consistently, and turn more interest into customers.",
    capabilities: ["Lead response process", "Pipeline management", "Proposal and quoting workflow", "Customer growth programs"],
    filters: ["leadership", "departments", "projects"],
  },
  {
    id: "operations-logistics",
    title: "Operations & Logistics",
    group: "Operating department",
    summary: "Smoother scheduling, purchasing, and delivery so the work gets done reliably.",
    capabilities: ["Scheduling and dispatch", "Procurement and vendors", "Inventory management", "Process improvement"],
    filters: ["leadership", "departments", "projects"],
  },
  {
    id: "technology-data",
    title: "Technology & Data",
    group: "Operating department",
    summary: "Connected systems and clean data instead of scattered spreadsheets and logins.",
    capabilities: ["CRM and ERP setup", "Communications and collaboration", "Integrations and automation", "Infrastructure and IT coordination"],
    filters: ["leadership", "departments", "projects"],
  },
  {
    id: "customer-experience",
    title: "Customer Experience",
    group: "Operating department",
    summary: "Consistent, responsive service that keeps customers coming back.",
    capabilities: ["Customer support operations", "Service standards and scripts", "Feedback and review programs", "Retention planning"],
    filters: ["departments", "projects"],
  },
  {
    id: "people",
    title: "People & Specialists",
    group: "Operating department",
    summary: "Hire well, train well, and give your team the structure to do their best work.",
    capabilities: ["Recruiting support", "Onboarding and training", "Roles and responsibilities", "Specialist staffing"],
    filters: ["leadership", "departments", "projects"],
  },
  {
    id: "legal-risk",
    title: "Legal & Risk",
    group: "Operating department",
    summary: "Access to qualified professionals for contracts, compliance, and risk matters.",
    capabilities: ["Coordination with licensed attorneys", "Insurance and risk review via qualified advisors", "Contract process support", "Compliance checklists"],
    filters: ["professionals"],
  },
  {
    id: "partnerships",
    title: "Partnerships",
    group: "Executive function",
    summary: "Relationships that open new channels, capabilities, and growth options.",
    capabilities: ["Partner identification", "Channel and referral programs", "Growth and capital relationships", "Vendor and alliance management"],
    filters: ["leadership", "projects", "professionals"],
  },
];

export const homeServiceCards = [
  { id: "executive-leadership", title: "Executive Leadership", body: "CEO, COO, CFO, CTO, CMO, CRO, and specialist leadership.", benefit: "Experienced judgment without carrying every decision alone.", icon: "users" },
  { id: "finance", title: "Finance & Bookkeeping", body: "Cash flow, budgeting, management reporting, receivables, and payables.", benefit: "Clear numbers you can plan around.", icon: "database" },
  { id: "marketing", title: "Marketing & Sales", body: "Positioning, local visibility, lead response, pipeline, and customer growth.", benefit: "More of the right customers, followed up consistently.", icon: "megaphone" },
  { id: "operations-logistics", title: "Operations & Logistics", body: "Scheduling, procurement, inventory, vendors, delivery, and process improvement.", benefit: "Work that runs reliably without the owner chasing it.", icon: "box" },
  { id: "technology-data", title: "Technology & Systems", body: "CRM, ERP, communications, integrations, infrastructure, and IT coordination.", benefit: "Connected tools instead of scattered spreadsheets.", icon: "laptop" },
  { id: "people", title: "People & Specialists", body: "Recruiting, training, customer support, and appropriate professional partners.", benefit: "The right people in the right roles.", icon: "usercog" },
] as const;
