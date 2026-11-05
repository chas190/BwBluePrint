export type NavLink = { label: string; to: string; description?: string };

export const platformLinks: NavLink[] = [
  { label: "How STEP Works", to: "/how-it-works", description: "From assessment to coordinated execution." },
  { label: "Systems", to: "/systems", description: "CRM, ERP, finance, projects, and dashboards together." },
];

export const primaryLinks: NavLink[] = [
  { label: "Services", to: "/services" },
  { label: "AI Intelligence", to: "/intelligence" },
  { label: "Partners", to: "/partners" },
  { label: "About", to: "/about" },
];

export const footerLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Services", to: "/services" },
  { label: "Systems", to: "/systems" },
  { label: "AI Intelligence", to: "/intelligence" },
  { label: "Partners", to: "/partners" },
  { label: "About", to: "/about" },
  { label: "Assessment", to: "/assessment" },
  { label: "Contact", to: "/contact" },
];
