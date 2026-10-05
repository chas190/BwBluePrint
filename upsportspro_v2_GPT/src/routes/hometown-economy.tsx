import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { futureLinks, siteAssets } from "@/lib/site-config";

const title = "Hometown Economy | UpSports";
const description = "A proposed model for how UpSports teams, families, and local businesses can work together to support hometown commerce and youth programs.";

export const Route = createFileRoute("/hometown-economy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HometownEconomy,
});

const wrap = "mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16";
const h2 = "mt-6 font-display text-4xl font-bold leading-[1.05] md:text-5xl";

function HometownEconomy() {
  const hero = siteAssets.hometownEconomyHero;
  const biz = siteAssets.hometownBusinessPhoto;
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />
      <main>
        {/* 1 Hero */}
        <section className="hero relative flex min-h-[560px] items-center overflow-hidden bg-ink md:min-h-[620px]">
          {hero.url ? (
            <><img src={hero.url} alt={hero.alt} className="absolute inset-0 h-full w-full object-cover" /><div className="hero-shade absolute inset-0" /></>
          ) : (
            <div aria-hidden className="economy-fallback absolute inset-0" />
          )}
          <div className={`relative w-full py-20 ${wrap}`}>
            <div className="max-w-[780px]">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-hero-foreground"><span className="h-0.5 w-8 shrink-0 bg-brand" /> Local teams. Local families. Local opportunity.</p>
              <h1 className="font-display text-[clamp(3.25rem,7vw,6.75rem)] font-bold leading-[0.94] text-hero-foreground">The Home Court Economy.</h1>
              <p className="mt-7 max-w-[580px] text-lg leading-relaxed text-hero-foreground/90 md:text-xl">Every team brings people together. Together, those relationships can help hometown businesses thrive and create more opportunity for the families who live here.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="brand" size="xl"><a href="#model">See how it works <ArrowDown /></a></Button>
                <Button asChild variant="heroOutline" size="xl"><a href="#roles">Find your role <ArrowRight /></a></Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2 Leaky bucket */}
        <section className="border-b border-border py-20 md:py-28">
          <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${wrap}`}>
            <div>
              <p className="section-kicker"><span /> The leaky bucket / 01</p>
              <h2 className={h2}>What happens when spending leaves town?</h2>
              <p className="mt-7 text-lg leading-8 text-muted-foreground">When families buy goods and services, some of that spending supports businesses, workers, and suppliers nearby. Some flows to businesses and supply chains elsewhere. The leaky bucket idea asks a practical question: how can we keep more economic activity connected to the people and places we call home?</p>
              <p className="mt-6 text-lg font-semibold leading-8">The goal is to make supporting local businesses easier, more useful, and more rewarding.</p>
            </div>
            <FlowIllustration />
          </div>
        </section>

        {/* 3 Sports connection */}
        <section className="bg-surface py-20 md:py-28">
          <div className={wrap}>
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div><p className="section-kicker"><span /> The sports connection / 02</p><h2 className={h2}>A trusted network already starts with the team.</h2></div>
              <div className="md:pt-11">
                <p className="text-lg leading-8 text-muted-foreground">School teams, after-school programs, clubs, and pro-am teams connect players with parents, coaches, volunteers, and supporters. UpSports proposes bringing participating organizations together under a shared community sports identity—while preserving the names, traditions, and independence of each team.</p>
                <p className="mt-5 border-l-2 border-brand pl-4 text-base leading-7">Participation would require partnerships and permission from each organization. UpSports does not speak for schools or have authority over independent teams.</p>
              </div>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              {[
                ["Shared identity", "A recognizable invitation to participate."],
                ["Trusted relationships", "Coaches and community leaders helping families discover opportunities."],
                ["County-wide connection", "Towns supporting their own businesses while connecting with neighboring communities."],
              ].map(([t, d], i) => (
                <div key={t} className="bg-background p-7 md:p-9"><span className="font-display text-5xl font-bold text-brand">0{i + 1}</span><h3 className="mt-8 font-display text-2xl font-bold">{t}</h3><p className="mt-3 leading-7 text-muted-foreground">{d}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Model */}
        <section id="model" className="scroll-mt-6 bg-ink py-20 text-ink-foreground md:py-28">
          <div className={`grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 ${wrap}`}>
            <div>
              <p className="section-kicker section-kicker-light"><span /> How the model works / 03</p>
              <h2 className={h2}>From team pride to hometown participation.</h2>
              <div className="mt-7 space-y-5 text-lg leading-8 text-ink-foreground/80">
                <p>Teams can introduce families to nearby restaurants, shops, farms, and service providers through game-day activities, community events, and clearly disclosed sponsorships.</p>
                <p>Where a business agrees to contribute, its sponsorship or a defined purchase-linked contribution can help support a team or community initiative.</p>
                <p className="font-semibold text-ink-foreground">Any contribution formula, recipient, and payment process should be published before the promotion begins.</p>
              </div>
            </div>
            <ol className="divide-y divide-ink-foreground/20 border-y border-ink-foreground/20">
              {["Connect participating teams and families.", "Introduce participating local businesses.", "Promote useful offers, events, and services.", "Encourage voluntary local purchases.", "Share measured results and support agreed community programs."].map((s, i) => (
                <li key={s} className="flex items-baseline gap-6 py-6"><span className="font-display text-4xl font-bold text-brand">{i + 1}</span><span className="text-lg font-semibold md:text-xl">{s}</span></li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5 County */}
        <section className="py-20 md:py-28">
          <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${wrap}`}>
            <div>
              <p className="section-kicker"><span /> One county. Many hometowns. / 04</p>
              <h2 className={h2}>Rooted in each town. Connected across the county.</h2>
              <p className="mt-7 text-lg leading-8 text-muted-foreground">A family may live in one town, attend school in another, and travel across the county for games. A connected UpSports network can help them discover participating businesses throughout that journey.</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Local identity stays local.", "Participating teams share opportunities.", "Families choose where to participate.", "Town and county benefits are tracked separately."].map((t) => (
                  <li key={t} className="flex gap-3 text-base font-semibold"><span className="mt-2 size-2 shrink-0 rounded-full bg-brand" />{t}</li>
                ))}
              </ul>
            </div>
            <NetworkIllustration />
          </div>
        </section>

        {/* 6 Calculator */}
        <Calculator />

        {/* 7 Infographic */}
        <Infographic />

        {/* Business photo slot */}
        <section className="pb-4">
          <div className={wrap}>
            {biz.url ? (
              <img src={biz.url} alt={biz.alt} loading="lazy" className="aspect-[21/9] w-full object-cover" />
            ) : (
              <div className="economy-fallback flex aspect-[21/9] min-h-[200px] w-full items-end p-6 md:p-10"><p className="font-display text-2xl font-bold text-hero-foreground md:text-4xl">Main Street. Game day. Home.</p></div>
            )}
          </div>
        </section>

        {/* 8 Roles */}
        <section id="roles" className="scroll-mt-6 py-20 md:py-28">
          <div className={wrap}>
            <p className="section-kicker"><span /> Find your role / 07</p>
            <h2 className={`${h2} max-w-[700px]`}>Everyone has a way to contribute.</h2>
            <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Families", "Discover participating businesses and choose useful local options."],
                ["Teams & Coaches", "Share approved opportunities and help organize community activities."],
                ["Businesses", "Offer value to families and consider transparent sponsorships."],
                ["Community Partners", "Help coordinate projects and report outcomes."],
              ].map(([t, d]) => (
                <div key={t} className="flex flex-col bg-background p-7">
                  <h3 className="font-display text-2xl font-bold">{t}</h3>
                  <p className="mt-3 flex-1 leading-7 text-muted-foreground">{d}</p>
                  <a href="/#get-involved" className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-primary hover:underline">Get involved <ArrowUpRight className="size-4" /></a>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-[760px] text-base leading-7 text-muted-foreground">Youth involvement stays age-appropriate. Adults manage any commercial partnerships, and young athletes are never responsible for sales targets.</p>
          </div>
        </section>

        {/* 9 BwTown */}
        <section className="bg-ink py-20 text-ink-foreground md:py-28">
          <div className={wrap}>
            <p className="section-kicker section-kicker-light"><span /> Connect to BwTown / 08</p>
            <div className="mt-6 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
              <h2 className="max-w-[820px] font-display text-4xl font-bold leading-[1.05] md:text-6xl">Sports open the door. BwTown connects the possibilities.</h2>
              <div className="max-w-[420px]">
                <p className="text-lg leading-8 text-ink-foreground/80">UpSports can bring people together around a team. The BwTown blueprint connects that participation with a wider vision for local commerce, food and farming, housing, and community development.</p>
                <Button asChild variant="brand" size="lg" className="mt-7"><a href={futureLinks.bwtownBlueprint ?? "/#community"}>Explore the vision <ArrowRight /></a></Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function FlowIllustration() {
  return (
    <figure className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
      <div className="bg-background p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Spending flows away</p>
        <svg viewBox="0 0 200 160" className="mt-4 w-full" aria-hidden>
          <circle cx="50" cy="80" r="28" fill="var(--primary)" />
          <text x="50" y="85" textAnchor="middle" fontSize="12" fill="var(--primary-foreground)" fontWeight="700">Town</text>
          {[30, 80, 130].map((y) => <path key={y} d={`M80 80 Q130 ${y} 185 ${y}`} stroke="var(--muted-foreground)" strokeWidth="3" fill="none" strokeDasharray="6 5" markerEnd="url(#a)" />)}
          <defs><marker id="a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted-foreground)" /></marker></defs>
        </svg>
      </div>
      <div className="bg-background p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Spending circulates locally</p>
        <svg viewBox="0 0 200 160" className="mt-4 w-full" aria-hidden>
          <circle cx="100" cy="80" r="55" stroke="var(--brand)" strokeWidth="3" fill="none" strokeDasharray="10 6" />
          {[["Households", 100, 25], ["Businesses", 155, 120], ["Suppliers", 45, 120]].map(([l, x, y]) => (
            <g key={l as string}><circle cx={x as number} cy={y as number} r="20" fill="var(--brand)" /><text x={x as number} y={(y as number) + 36} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--foreground)">{l}</text></g>
          ))}
        </svg>
      </div>
      <figcaption className="bg-background p-5 text-base leading-7 text-muted-foreground sm:col-span-2">Illustration: some spending leaves town through outside businesses and supply chains, while some circulates between local households, businesses, and suppliers. Both are a normal part of any economy.</figcaption>
    </figure>
  );
}

function NetworkIllustration() {
  const towns = [["Town A", 70, 60], ["Town B", 330, 60], ["Town C", 70, 250], ["Town D", 330, 250]] as const;
  return (
    <figure className="border border-border bg-surface p-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Illustrative network</p>
      <svg viewBox="0 0 400 310" className="mt-3 w-full" role="img" aria-label="Illustrative network: four generic towns, each with teams, families, and businesses, all connected through a central UpSports hub.">
        {towns.map(([, x, y]) => <line key={`${x}${y}`} x1={x} y1={y} x2="200" y2="155" stroke="var(--brand)" strokeWidth="3" strokeDasharray="6 5" />)}
        {towns.map(([n, x, y]) => (
          <g key={n}>
            <rect x={x - 58} y={y - 42} width="116" height="84" rx="4" fill="var(--background)" stroke="var(--border)" strokeWidth="2" />
            <text x={x} y={y - 18} textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--foreground)">{n}</text>
            <text x={x} y={y + 2} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">Teams · Families</text>
            <text x={x} y={y + 20} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">Businesses</text>
          </g>
        ))}
        <circle cx="200" cy="155" r="42" fill="var(--ink)" />
        <text x="200" y="160" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--ink-foreground)">UpSports</text>
      </svg>
    </figure>
  );
}

function NumberField({ id, label, value, onChange, max, prefix }: { id: string; label: string; value: number; onChange: (n: number) => void; max: number; prefix?: string }) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-bold">{label}</span>
      <div className="mt-2 flex min-h-12 items-center border border-input bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
        {prefix && <span className="mr-1 text-muted-foreground">{prefix}</span>}
        <input id={id} type="number" inputMode="numeric" min={0} max={max} step={1} value={Number.isNaN(value) ? "" : value}
          onChange={(e) => { const n = e.target.valueAsNumber; onChange(Number.isNaN(n) ? NaN : Math.min(max, Math.max(0, n))); }}
          className="w-full bg-transparent py-2 text-lg font-semibold outline-none" />
      </div>
    </label>
  );
}

function Calculator() {
  const [h, setH] = useState(1000);
  const [s, setS] = useState(50);
  const [m, setM] = useState(12);
  const v = (n: number) => (Number.isNaN(n) ? 0 : n);
  const total = v(h) * v(s) * v(m);
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className={`grid gap-12 lg:grid-cols-2 lg:gap-20 ${wrap}`}>
        <div>
          <p className="section-kicker"><span /> Small shifts, clear math / 05</p>
          <h2 className={h2}>Small changes can add up.</h2>
          <p className="mt-6 inline-block bg-brand px-3 py-1.5 text-sm font-bold uppercase tracking-[0.12em] text-brand-foreground">Illustrative scenario—not a forecast</p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">This is redirected sales volume, not new household wealth, business profit, a community fund balance, or money guaranteed to remain local.</p>
          <p className="mt-4 text-base text-muted-foreground">Formula: households × monthly redirected spending × months.</p>
        </div>
        <div className="border border-border bg-background p-6 md:p-8">
          <div className="grid gap-5 sm:grid-cols-3">
            <NumberField id="calc-h" label="Participating households" value={h} onChange={setH} max={1000000} />
            <NumberField id="calc-s" label="Monthly redirected per household" value={s} onChange={setS} max={100000} prefix="$" />
            <NumberField id="calc-m" label="Months" value={m} onChange={setM} max={120} />
          </div>
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">Spending redirected to participating businesses</p>
            <output htmlFor="calc-h calc-s calc-m" aria-live="polite" className="mt-2 block break-words font-display text-5xl font-bold text-primary md:text-6xl">
              {total.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
            </output>
          </div>
        </div>
      </div>
    </section>
  );
}

function Infographic() {
  const img = siteAssets.hometownEconomyInfographic;
  if (!img.url) return null;
  return (
    <section className="py-20 md:py-28">
      <div className={wrap}>
        <p className="section-kicker"><span /> The concept / 06</p>
        <h2 className={h2}>The Home Court Economy concept.</h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
          <figure>
            <div className="border border-border bg-surface p-2">
              <img src={img.url} alt={img.alt} width={img.width} height={img.height} loading="lazy" className="aspect-[3/2] w-full object-contain" />
            </div>
            <figcaption className="mt-3 text-base leading-7 text-muted-foreground">Concept illustration. Financial and impact figures shown in this graphic are illustrative and have not been validated for a particular town or county.</figcaption>
          </figure>
          <div>
            <h3 className="font-display text-2xl font-bold">In short</h3>
            <p className="mt-3 text-lg leading-8 text-muted-foreground">The graphic imagines a trusted team as an anchor that draws families, coaches, and businesses together. Local purchases and transparent sponsorships could help support youth sports and community projects, forming a cycle where team pride and hometown commerce reinforce each other.</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="mt-7"><Maximize2 /> View full image</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[95vh] w-[96vw] max-w-[1400px] overflow-auto p-3 sm:p-4">
                <DialogTitle className="sr-only">The Home Court Economy concept</DialogTitle>
                <DialogDescription className="sr-only">Full-size view of the concept infographic. Figures are illustrative.</DialogDescription>
                <div className="overflow-auto"><img src={img.url} alt={img.alt} width={img.width} height={img.height} className="h-auto w-full min-w-[720px] object-contain" /></div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}

