import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Logo } from "./Logo";
import { brand } from "@/data/brand";
import { footerLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="no-print surface-dark border-t border-dark-border pb-24 pt-14 md:pb-14">
      <div className="container-site grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <Logo className="h-7 w-auto" />
          <p className="mt-4 text-sm font-semibold">{brand.fullName}</p>
          <p className="mt-1 text-sm text-on-dark-muted">{brand.promise} {brand.purpose}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          {footerLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-on-dark-muted hover:text-on-dark">{l.label}</Link>
          ))}
          <a href={brand.crmUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-on-dark-muted hover:text-on-dark">
            STEP CRM <ExternalLink className="size-3.5" aria-hidden /><span className="sr-only">(opens in new tab)</span>
          </a>
        </nav>
      </div>
      <div className="container-site mt-10 border-t border-dark-border pt-6 text-xs text-on-dark-muted">
        © {new Date().getFullYear()} STEP · {brand.fullName}
      </div>
    </footer>
  );
}

export function MobileActionBar() {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-dark-border bg-navy/95 p-3 backdrop-blur md:hidden">
      <Link to="/services" className="rounded-md border border-on-dark/50 py-2.5 text-center text-sm font-semibold text-on-dark">Services</Link>
      <Link to="/assessment" className="rounded-md bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground">Assessment</Link>
    </div>
  );
}
