import { useState } from "react";
import { BarChart3, CheckSquare, FileText, ListChecks, MoreHorizontal, Search, Users, Wallet } from "lucide-react";
import { ConceptLabel } from "./PageHero";

export function WorkspacePreview({ compact }: { compact?: boolean }) {
  const rows = [
    { icon: BarChart3, label: "Sales pipeline", status: "On track" },
    { icon: Wallet, label: "Cash flow review", status: "In review" },
    { icon: Users, label: "Team priorities", status: "In progress" },
    ...(compact ? [] : [{ icon: FileText, label: "Vendor contracts", status: "Scheduled" }]),
  ];
  return (
    <div className="panel-dark w-full max-w-sm p-4 text-on-dark">
      <div className="flex items-center justify-between border-b border-dark-border pb-3">
        <p className="text-sm font-semibold">Illustrative workspace</p>
        <MoreHorizontal className="size-4 text-on-dark-muted" aria-hidden />
      </div>
      <ul className="mt-2 divide-y divide-dark-border">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-3 py-2.5 text-sm">
            <span className="flex items-center gap-2.5"><r.icon className="size-4 text-on-dark-muted" aria-hidden />{r.label}</span>
            <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs text-on-dark">{r.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const demo = [
  {
    q: "What should we focus on this week?",
    a: "Three items look most time-sensitive: review the cash forecast before Friday's payroll, follow up on four open proposals older than ten days, and confirm next week's delivery schedule with the warehouse lead.",
    sources: ["Finance · Cash forecast", "CRM · Open proposals", "Operations · Delivery schedule"],
    actions: ["Review cash forecast", "Follow up proposals", "Confirm delivery schedule"],
    owner: "COO (fractional)",
  },
  {
    q: "Why did margins slip last month?",
    a: "In this example, material costs rose on two supplier invoices while job pricing stayed the same. Overtime also increased on three projects that ran past schedule.",
    sources: ["Bookkeeping · Supplier invoices", "Projects · Hours by job"],
    actions: ["Review supplier pricing", "Update quote template", "Check scheduling on long jobs"],
    owner: "CFO (fractional)",
  },
  {
    q: "Which leads need a response today?",
    a: "Two website inquiries from yesterday have no reply yet, and one returning customer asked for a quote on Monday. Prompt replies are part of your lead-response playbook.",
    sources: ["CRM · New inquiries", "STEP playbook · Lead response"],
    actions: ["Reply to two web inquiries", "Send returning-customer quote"],
    owner: "Sales lead",
  },
];

export function AskStepDemo({ interactive = true }: { interactive?: boolean }) {
  const [i, setI] = useState(0);
  const d = demo[i] ?? demo[0]!;
  return (
    <div className="panel-dark p-5 text-on-dark md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-bold"><ListChecks className="size-5 text-primary" aria-hidden /> ASK STEP</p>
        <ConceptLabel>Product concept</ConceptLabel>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
        {demo.map((x, idx) => (
          <button
            key={x.q}
            type="button"
            disabled={!interactive}
            aria-pressed={idx === i}
            onClick={() => setI(idx)}
            className={`rounded-full border px-3 py-1.5 text-left text-xs transition-colors ${idx === i ? "border-primary bg-primary/25" : "border-dark-border hover:bg-dark-surface"}`}
          >
            {x.q}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-md border border-dark-border px-3 py-2.5 text-sm">
        <Search className="size-4 text-on-dark-muted" aria-hidden /> {d.q}
      </div>
      <div aria-live="polite" className="mt-4 rounded-lg border border-dark-border p-4">
        <p className="text-sm leading-relaxed">{d.a}</p>
        <p className="mt-3 text-xs text-on-dark-muted">Sources: {d.sources.join(" · ")}</p>
      </div>
      <div className="mt-4 rounded-lg border border-dark-border p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-on-dark-muted">Mission summary</p>
        <p className="mt-1 text-sm">Owner: <span className="font-semibold">{d.owner}</span></p>
        <ul className="mt-2 space-y-1.5">
          {d.actions.map((a) => (
            <li key={a} className="flex items-center gap-2 text-sm"><CheckSquare className="size-4 text-primary" aria-hidden />{a}</li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-xs text-on-dark-muted">Illustrative demo with curated responses. Not connected to company data and does not call a live AI model.</p>
    </div>
  );
}
