import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Upsports3.png";

export const siteLinks = [
  { label: "Our mission", href: "/#mission" },
  { label: "What we do", href: "/#what-we-do" },
  { label: "Our community", href: "/#community" },
  { label: "Events", href: "/#events" },
];

const navLink = "text-sm font-semibold text-ink-foreground/80 transition-colors hover:text-ink-foreground";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <header className="relative z-20 bg-ink text-ink-foreground">
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10 lg:px-16">
        <Link to="/" aria-label="UpSports home" className="flex shrink-0 items-center">
          <img src={logo} alt="UpSports" width={759} height={197} className="h-auto w-[164px] md:w-[194px]" />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 xl:flex">
          {siteLinks.map((l) => <a key={l.href} href={l.href} className={navLink}>{l.label}</a>)}
          <Link to="/hometown-economy" className={navLink} activeProps={{ className: "text-ink-foreground underline decoration-brand decoration-2 underline-offset-8" }}>Hometown Economy</Link>
        </nav>
        <div className="hidden xl:block">
          <Button asChild variant="brand" size="lg"><a href="/#get-involved">Get involved <ArrowUpRight /></a></Button>
        </div>
        <Button variant="navIcon" size="icon" className="xl:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {menuOpen && (
        <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-ink-foreground/15 bg-ink px-5 pb-6 pt-4 shadow-xl xl:hidden">
          {siteLinks.map((l) => <a key={l.href} href={l.href} onClick={close} className="py-3 text-base font-semibold">{l.label}</a>)}
          <Link to="/hometown-economy" onClick={close} className="py-3 text-base font-semibold">Hometown Economy</Link>
          <Button asChild variant="brand" className="mt-3 self-start"><a href="/#get-involved" onClick={close}>Get involved <ArrowUpRight /></a></Button>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink py-12 text-ink-foreground">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 md:flex-row md:items-end md:px-10 lg:px-16">
        <div>
          <Link to="/" aria-label="UpSports home"><img src={logo} alt="UpSports" width={759} height={197} className="w-[180px]" /></Link>
          <p className="mt-4 max-w-[360px] text-sm leading-6 text-ink-foreground/65">Mentoring tomorrow’s champions. Building stronger towns.</p>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-ink-foreground/80">
          {siteLinks.map((l) => <a key={l.href} href={l.href} className="hover:text-ink-foreground">{l.label}</a>)}
          <Link to="/hometown-economy" className="hover:text-ink-foreground">Hometown Economy</Link>
          <a href="/#get-involved" className="hover:text-ink-foreground">Get involved</a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1440px] border-t border-ink-foreground/20 px-5 pt-5 text-xs text-ink-foreground/50 md:px-10 lg:px-16">© {new Date().getFullYear()} UpSports. All rights reserved.</div>
    </footer>
  );
}

