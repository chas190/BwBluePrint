import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { platformLinks, primaryLinks } from "@/data/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [platformOpen, setPlatformOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!platformOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setPlatformOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlatformOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [platformOpen]);

  const linkCls = "rounded-md px-3 py-2 text-sm font-medium text-on-dark-muted transition-colors hover:text-on-dark";

  return (
    <header className="no-print sticky top-0 z-50 border-b border-dark-border bg-navy/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="STEP home" className="shrink-0">
          <Logo className="h-6 w-auto md:h-7" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <div className="relative" ref={ref}>
            <button
              type="button"
              className={`${linkCls} inline-flex items-center gap-1`}
              aria-expanded={platformOpen}
              aria-controls="platform-menu"
              onClick={() => setPlatformOpen((o) => !o)}
            >
              Platform <ChevronDown className={`size-4 transition-transform ${platformOpen ? "rotate-180" : ""}`} aria-hidden />
            </button>
            {platformOpen && (
              <div id="platform-menu" className="absolute left-0 top-full mt-2 w-72 rounded-lg border bg-popover p-2 text-popover-foreground shadow-[var(--shadow-card)]">
                {platformLinks.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setPlatformOpen(false)} className="block rounded-md p-3 hover:bg-accent">
                    <span className="block text-sm font-semibold">{l.label}</span>
                    <span className="block text-xs text-muted-foreground">{l.description}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {primaryLinks.map((l) => (
            <Link key={l.to} to={l.to} className={linkCls} activeProps={{ className: "text-on-dark" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="hero" className="hidden sm:inline-flex">
            <Link to="/assessment">Start Your Assessment</Link>
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button type="button" className="rounded-md p-2 text-on-dark lg:hidden" aria-label="Open menu">
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-navy text-on-dark border-dark-border [&>button]:hidden">
              <div className="flex items-center justify-between">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo className="h-6 w-auto" />
                <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-md p-2">
                  <X className="size-6" />
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
                <p className="eyebrow px-3 pb-1">Platform</p>
                {[...platformLinks, ...primaryLinks, { label: "Contact", to: "/contact" }].map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-base font-medium hover:bg-dark-surface">
                    {l.label}
                  </Link>
                ))}
                <Button asChild variant="hero" size="lg" className="mt-4">
                  <Link to="/assessment" onClick={() => setMobileOpen(false)}>Start Your Assessment</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
