import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, HeartHandshake } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/webheropg1upsports.png";
import mentorImage from "@/assets/webpic4pg1upsports.png";
import communityImage from "@/assets/webpic2pg1upsports.png";
import countyConnectionImage from "@/assets/upsports-county-connection.png";
import eventsImage from "@/assets/upsports-events.jpeg";

const title = "UpSports | Mentoring Tomorrow's Champions";
const description = "UpSports brings young athletes, local mentors, and families together through sports to build stronger teammates and stronger towns.";

export const Route = createFileRoute("/")({
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
  component: Index,
});


function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main id="top">
        <section className="hero relative flex min-h-[590px] items-center overflow-hidden md:min-h-[650px] lg:min-h-[700px]">
          <img src={heroImage} alt="Young players in UpSports jerseys chasing the ball across a grass field while a coach watches" width={1531} height={1027} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[70%_70%]" />
          <div className="hero-shade absolute inset-0" />
          <div className="relative mx-auto w-full max-w-[1440px] px-5 py-20 md:px-10 lg:px-16">
            <div className="max-w-[760px]">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-hero-foreground"><span className="h-0.5 w-8 bg-brand" /> More than a game</p>
              <h1 className="font-display text-[clamp(3.5rem,7vw,7.25rem)] leading-[0.94] font-bold text-hero-foreground">Mentoring<br />Tomorrow’s<br />Champions.</h1>
              <p className="mt-7 max-w-[560px] text-lg leading-relaxed text-hero-foreground/90 md:text-xl">Helping young people grow into better teammates, more confident individuals, and leaders in their communities.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="brand" size="xl"><a href="#mission">Discover our mission <ArrowRight /></a></Button>
                <Button asChild variant="heroOutline" size="xl"><a href="#get-involved">Join our team <ArrowUpRight /></a></Button>
              </div>
            </div>
          </div>
          <a href="#mission" aria-label="Scroll to our mission" className="absolute bottom-6 left-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-hero-foreground/85 md:left-10 lg:left-16">Explore <ArrowDown className="size-4" /></a>
        </section>

        <section id="mission" className="scroll-mt-6 border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-16">
            <div><p className="section-kicker"><span /> Our mission / 01</p><h2 className="mt-6 max-w-[420px] font-display text-4xl font-bold leading-[1.05] md:text-5xl">A bigger win for every young athlete.</h2></div>
            <div className="lg:pt-11"><p className="max-w-[710px] text-xl leading-relaxed text-foreground md:text-2xl">Sports have the power to shape who we become. UpSports brings local coaches, former athletes, professionals, and neighbors together to help young people find their strength—on and off the field.</p><p className="mt-6 max-w-[650px] text-base leading-8 text-muted-foreground">We believe a good pass can matter as much as a winning shot. Showing up, supporting a teammate, and trying again after a mistake are lessons that last long after the game ends.</p></div>
          </div>
        </section>

        <section id="what-we-do" className="scroll-mt-6 bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-kicker"><span /> What we do / 02</p><h2 className="mt-5 max-w-[670px] font-display text-4xl font-bold leading-[1.05] md:text-5xl">The lessons go beyond the scoreboard.</h2></div><p className="max-w-[330px] text-base leading-7 text-muted-foreground">Every practice, conversation, and shared goal is a chance to grow.</p></div>
            <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              <div className="min-h-[300px] bg-background p-7 md:p-9"><span className="font-display text-5xl font-bold text-brand">01</span><h3 className="mt-11 font-display text-2xl font-bold">Play with purpose</h3><p className="mt-4 leading-7 text-muted-foreground">Youth sports, skills clinics, and team experiences give young players room to practice discipline, teamwork, and resilience.</p></div>
              <div className="min-h-[300px] bg-background p-7 md:p-9"><span className="font-display text-5xl font-bold text-brand">02</span><h3 className="mt-11 font-display text-2xl font-bold">Learn from mentors</h3><p className="mt-4 leading-7 text-muted-foreground">Local coaches, former players, and community leaders share their experience and help young athletes see what’s possible.</p></div>
              <div className="min-h-[300px] bg-background p-7 md:p-9"><span className="font-display text-5xl font-bold text-brand">03</span><h3 className="mt-11 font-display text-2xl font-bold">Grow together</h3><p className="mt-4 leading-7 text-muted-foreground">Games and gatherings connect families, volunteers, and businesses around something worth supporting together.</p></div>
            </div>
          </div>
        </section>

        <section className="bg-ink text-ink-foreground">
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-20 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-16 lg:py-28">
            <div className="order-2 lg:order-1"><p className="section-kicker section-kicker-light"><span /> The power of a mentor / 03</p><h2 className="mt-6 max-w-[560px] font-display text-4xl font-bold leading-[1.05] md:text-5xl">Someone who sees what you can become.</h2><p className="mt-7 max-w-[550px] text-lg leading-8 text-ink-foreground/75">A mentor might teach footwork one moment and how to handle disappointment the next. When someone from your own town returns to teach and take an interest, possibility feels closer.</p><div className="mt-10 flex items-center gap-3 text-sm font-bold text-ink-foreground"><span className="flex size-10 items-center justify-center rounded-full bg-brand"><HeartHandshake className="size-5" /></span> Real guidance. Lasting impact.</div></div>
            <div className="order-1 aspect-[4/3] overflow-hidden lg:order-2"><img src={mentorImage} alt="A coach in an UpSports cap and hoodie crouched in a huddle with four teenage players on an indoor basketball court" loading="lazy" width={1438} height={1093} className="h-full w-full object-cover object-center" /></div>
          </div>
        </section>

        <section id="community" className="scroll-mt-6 bg-background py-20 md:py-28">
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-16">
            <div className="aspect-[4/3] overflow-hidden"><img src={communityImage} alt="Families and young players in UpSports colours cheering from the sideline of a youth soccer game" loading="lazy" width={1558} height={1009} className="h-full w-full object-cover" /></div>
            <div><p className="section-kicker"><span /> Stronger together / 04</p><h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] md:text-5xl">When a team grows, a town grows with it.</h2><p className="mt-7 text-lg leading-8 text-muted-foreground">A team connects more than the players on its roster. Families meet. Neighbors show up. Local businesses find a way to contribute. Familiar faces become lasting relationships.</p><p className="mt-5 text-lg leading-8 text-muted-foreground">As part of the wider BwTown vision, UpSports gives that spirit of cooperation a place to begin—and a reason to keep going.</p></div>
          </div>
        </section>

        <section aria-labelledby="county-connection-title" className="bg-ink text-ink-foreground">
          <div className="mx-auto max-w-[1440px] px-5 pt-12 md:px-10 lg:px-16">
            <p className="section-kicker section-kicker-light"><span /> The BwTown vision</p>
            <h2 id="county-connection-title" className="mt-5 font-display text-4xl font-bold leading-[1.05] md:text-5xl">One county. Many towns. One team.</h2>
            <p className="mt-5 max-w-[780px] text-lg leading-8 text-ink-foreground/80">UpSports connects the people who make a town stronger—players, coaches, families, schools, and local businesses. Across neighboring towns, those relationships can become a shared foundation for the BwTown blueprint.</p>
          </div>
          <figure className="mx-auto mt-9 max-w-[1440px] pb-10">
            <img src={countyConnectionImage} alt="Concept illustration of an UpSports coach mentoring young athletes, with families, a local market, and neighboring towns connected across rolling hills" loading="lazy" width={1672} height={941} className="h-auto w-full" />
            <figcaption className="px-5 pt-4 text-sm text-ink-foreground/65 md:px-10 lg:px-16">An illustration of the BwTown vision for connected communities.</figcaption>
          </figure>
        </section>

        <section id="events" className="scroll-mt-6 bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <div><p className="section-kicker"><span /> Promotions &amp; events / 05</p><h2 className="mt-6 max-w-[520px] font-display text-4xl font-bold leading-[1.05] md:text-5xl">There’s always something happening.</h2><p className="mt-7 max-w-[520px] text-lg leading-8 text-muted-foreground">Game nights, car washes, market mornings, and mentoring sessions — every event is another way for a town to show up for its young athletes.</p><p className="mt-5 max-w-[520px] text-lg leading-8 text-muted-foreground">Local farms, banks, and shops host us and sponsor what we do. When they invest, the kids notice. So does everyone else.</p></div>
              <div className="overflow-hidden border border-border"><img src={eventsImage} alt="Collage of UpSports events: a farm market, a basketball game, a car wash fundraiser, a cheer and dance showdown, a pizza shop night, and a mentoring session" loading="lazy" width={1920} height={1920} className="aspect-square h-full w-full object-cover" /></div>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              <div className="bg-background p-7 md:p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Game days</p><h3 className="mt-4 font-display text-2xl font-bold">Come cheer out loud.</h3><p className="mt-3 leading-7 text-muted-foreground">Home games, street-ball tournaments, and cheer and dance showdowns give the whole town a reason to pack the stands.</p></div>
              <div className="bg-background p-7 md:p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Fundraisers</p><h3 className="mt-4 font-display text-2xl font-bold">Small efforts, real gear.</h3><p className="mt-3 leading-7 text-muted-foreground">Car washes, cookie tables, and free-pizza nights keep uniforms, travel, and clinic fees within reach.</p></div>
              <div className="bg-background p-7 md:p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Mentoring days</p><h3 className="mt-4 font-display text-2xl font-bold">Plans for after the game.</h3><p className="mt-3 leading-7 text-muted-foreground">High school sessions on financial literacy, leadership, entrepreneurship, and career pathways.</p></div>
            </div>
          </div>
        </section>

        <section className="bg-ink text-ink-foreground">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 py-14 md:flex-row md:items-center md:px-10 lg:px-16">
            <div><h2 className="font-display text-3xl font-bold md:text-4xl">Help your hometown thrive.</h2><p className="mt-3 max-w-[560px] text-lg leading-8 text-ink-foreground/80">Discover how team connections can support local businesses and community opportunity.</p></div>
            <Button asChild variant="brand" size="lg" className="self-start md:self-auto"><Link to="/hometown-economy">Hometown Economy <ArrowRight /></Link></Button>
          </div>
        </section>

        <section id="get-involved" className="scroll-mt-6 bg-brand py-20 text-brand-foreground md:py-24">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16"><p className="text-xs font-bold uppercase tracking-[0.2em]">Be part of the story / 06</p><div className="mt-6 flex flex-col justify-between gap-10 lg:flex-row lg:items-end"><h2 className="max-w-[780px] font-display text-4xl font-bold leading-[1.05] md:text-6xl">It takes a team to build a stronger tomorrow.</h2><p className="max-w-[320px] text-lg leading-8">Whether you’re a coach, parent, former athlete, business, or neighbor, there’s a place for you in the UpSports community.</p></div><div className="mt-12 grid gap-px border-y border-brand-foreground/35 bg-brand-foreground/35 md:grid-cols-3"><div className="bg-brand py-7 md:pr-8"><p className="text-xs font-bold uppercase tracking-[0.16em]">For mentors</p><p className="mt-3 text-lg font-semibold">Share what you’ve learned.</p></div><div className="bg-brand py-7 md:px-8"><p className="text-xs font-bold uppercase tracking-[0.16em]">For families</p><p className="mt-3 text-lg font-semibold">Grow alongside the team.</p></div><div className="bg-brand py-7 md:pl-8"><p className="text-xs font-bold uppercase tracking-[0.16em]">For communities</p><p className="mt-3 text-lg font-semibold">Make local support count.</p></div></div></div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
