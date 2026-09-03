"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Droplets, Flame, Leaf, Clock, Building2, Home, Factory, ShieldCheck, Star } from "lucide-react";
import { useRef } from "react";
import { Counter, Magnetic, Marquee, Reveal, SplitWords, Stagger, StaggerItem, ClipReveal, EASE } from "@/components/motion";
import { DesignSwitcher } from "@/components/design-switcher";
import { VideoBackground } from "@/components/video-background";
import { h2go, services, trustedBy, detailServices, testimonial, videos } from "@/lib/content";

const tags = [
  { label: "Eco-friendly", color: "#4fd0ff", icon: Leaf, pos: "left-[6%] top-[38%]", delay: 1.1, dur: "7s" },
  { label: "Hot water & steam", color: "#ffb26b", icon: Flame, pos: "right-[7%] top-[34%]", delay: 1.25, dur: "6.2s" },
  { label: "24/7 dispatch", color: "#7dd3fc", icon: Clock, pos: "left-[10%] top-[62%]", delay: 1.4, dur: "8s" },
  { label: "Commercial", color: "#f9a8d4", icon: Building2, pos: "right-[10%] top-[58%]", delay: 1.55, dur: "6.8s" },
  { label: "Residential", color: "#c4b5fd", icon: Home, pos: "left-[22%] top-[80%]", delay: 1.7, dur: "7.4s" },
  { label: "Industrial", color: "#fde68a", icon: Factory, pos: "right-[22%] top-[78%]", delay: 1.85, dur: "6.5s" },
];

export function Northlight() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-screen bg-nl-paper text-nl-ink">
      <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:px-8">
          <Link href="/design-3" className="flex items-center gap-2 font-display text-[15px] font-semibold"><Droplets className="h-4 w-4" strokeWidth={2.4} /> H2GO</Link>
          <nav className="hidden gap-9 text-[10.5px] font-medium uppercase tracking-[0.2em] md:flex">{["Home", "Services", "About us", "Club", "Contact"].map((n) => (<a key={n} href={`#${n.toLowerCase().replace(/\s/g, "-")}`} className="opacity-80 transition hover:opacity-100">{n}</a>))}</nav>
          <a href="#contact" className="rounded-full border border-white/60 bg-black/20 px-4 py-2 text-[10.5px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm transition hover:bg-white hover:text-black">Get a quote</a>
        </div>
      </motion.header>

      <section ref={heroRef} id="home" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-nl-deep text-white">
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 will-change-transform">
          <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease: EASE }} className="absolute inset-0">
            <VideoBackground youtubeId={videos.fleet.youtubeId} mp4={videos.fleet.mp4} poster="/h2go/crew-1.jpg" posterAlt="H2GO technician power washing a brick wall" posterClassName="object-[60%_35%]" start={videos.fleet.start} />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(79,208,255,0.28),transparent_55%)] mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-b from-nl-deep/20 via-nl-deep/25 to-nl-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-nl-deep/40 via-transparent to-nl-deep/40" />
        {tags.map((t) => (
          <motion.div key={t.label} initial={{ opacity: 0, scale: 0.8, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: t.delay }} className={`absolute hidden ${t.pos} md:block`}>
            <div className="animate-float flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/90 shadow-lg backdrop-blur-md" style={{ ["--float-duration" as string]: t.dur }}>
              <span className="grid h-4.5 w-4.5 place-items-center rounded-full" style={{ background: t.color }}><t.icon className="h-2.5 w-2.5 text-nl-deep" strokeWidth={3} /></span>{t.label}
            </div>
          </motion.div>
        ))}
        <motion.div style={{ y: textY, opacity: fade }} className="absolute inset-x-0 bottom-[12%] px-5 text-center sm:bottom-[14%]">
          <SplitWords text="Cleaner surfaces. Real results. Sustainable growth." className="mx-auto max-w-4xl font-display text-[38px] font-normal leading-[1.04] tracking-[-0.03em] sm:text-[56px] lg:text-[66px]" delay={0.5} stagger={0.07} />
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 1 }} className="mx-auto mt-5 max-w-md text-[13.5px] leading-relaxed text-white/75">We help homeowners, property managers and fleet operators restore, sanitize and maintain every exterior—with mobile hot-water crews available around the clock.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 1.15 }} className="mt-7 flex items-center justify-center gap-3">
            <a href="#services" className="rounded-full border border-white/40 px-5 py-2.5 text-[10.5px] font-medium uppercase tracking-[0.2em] transition hover:bg-white/10">View services</a>
            <Magnetic strength={0.2}><a href="#contact" className="rounded-full bg-nl-lime px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-nl-deep transition hover:brightness-95">Book a call</a></Magnetic>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] text-white/40">Scroll</motion.div>
      </section>

      <section className="bg-nl-deep pb-14 pt-20 text-white">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.5fr_1.5fr]">
          <Reveal><p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-nl-lime">• Partnerships</p></Reveal>
          <div>
            <Reveal delay={0.05}><h2 className="max-w-3xl font-display text-[30px] font-normal leading-[1.08] tracking-[-0.03em] text-nl-lime sm:text-[44px]">Over a decade keeping Ontario&apos;s homes, buildings and fleets spotless.</h2></Reveal>
            <Reveal delay={0.12}><p className="mt-5 max-w-2xl text-[13.5px] leading-relaxed text-white/60">From a single deck to Mike Holmes&apos; ten-acre property, we combine a proprietary high-flow wash system with eco-friendly chemistry so every client gets the same result: surfaces that look new, with nothing harmful left behind.</p></Reveal>
            <Stagger className="mt-10 grid grid-cols-3 gap-6" stagger={0.1}>{[{ v: 98, s: "%", l: "Client satisfaction" },{ v: 24, s: "/7", l: "Dispatch, every day" },{ v: 5, s: "k+", l: "Properties restored" }].map((s) => (<StaggerItem key={s.l}><div className="font-display text-[34px] font-normal leading-none tracking-tight text-nl-lime sm:text-[44px]"><Counter value={s.v} suffix={s.s} /></div><p className="mt-2 text-[11.5px] text-white/50">{s.l}</p></StaggerItem>))}</Stagger>
          </div>
        </div>
        <Reveal delay={0.1} className="mt-14"><Marquee duration={36} fade={false}>{[...trustedBy, ...trustedBy].map((t, i) => (<span key={`${t}-${i}`} className="mx-2 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 text-[13px] font-semibold text-nl-ink"><ShieldCheck className="h-4 w-4 text-nl-ink/50" /> {t}</span>))}</Marquee></Reveal>
      </section>

      <section id="about-us" className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-32">
        <div>
          <Reveal><p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-nl-ink/60">• About us</p></Reveal>
          <Reveal delay={0.05}><h2 className="mt-4 max-w-xl font-display text-[32px] font-normal leading-[1.08] tracking-[-0.03em] sm:text-[42px]">We help property owners make smarter maintenance decisions and protect what they&apos;ve built.</h2></Reveal>
          <Reveal delay={0.12}><p className="mt-5 max-w-md text-[13.5px] leading-relaxed text-nl-ink/60">Focused on health and environmental sustainability, H2GO uses only the highest quality eco-friendly products. Our 24/7/365 operations let you schedule ahead, set recurring visits, or call for an emergency clean-up.</p></Reveal>
          <Reveal delay={0.2}><a href="#services" className="mt-7 inline-flex items-center gap-2 rounded-full bg-nl-ink px-5 py-2.5 text-[12px] font-medium text-white transition hover:bg-black">Learn more <ArrowRight className="h-3.5 w-3.5" /></a></Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="rounded-[22px] bg-nl-mist p-3">
            <div className="rounded-[16px] bg-white p-5 shadow-sm"><p className="text-[13px] font-semibold">Performance</p><p className="text-[10px] text-nl-ink/45">Season to date</p></div>
            <div className="mt-3 rounded-[16px] bg-nl-deep p-5 text-white">
              <div className="flex items-end justify-between"><div><div className="font-display text-[40px] font-normal leading-none text-nl-lime"><Counter value={49} suffix="%" /></div><p className="mt-1 text-[10.5px] text-white/50">Less water than a traditional wash</p></div><span className="rounded-full bg-nl-lime/15 px-2 py-0.5 text-[10px] text-nl-lime">Live</span></div>
              <div className="mt-5 flex flex-wrap gap-1.5">{["Eco-friendly", "Hot water", "Steam", "Fleet-ready", "24/7", "Insured", "Recurring"].map((c) => (<span key={c} className="rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] text-white/85">{c}</span>))}</div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="services" className="bg-nl-deep py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.5fr_1.5fr]"><Reveal><p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-nl-lime">• Services</p></Reveal><Reveal delay={0.05}><h2 className="max-w-2xl font-display text-[30px] font-normal leading-[1.08] tracking-[-0.03em] sm:text-[44px]">Three markets. One mobile wash technology.</h2></Reveal></div>
          <div className="mt-14 divide-y divide-white/10">{services.map((s, i) => (<Reveal key={s.title} delay={i * 0.05}><article className="group grid gap-6 py-8 lg:grid-cols-[0.5fr_1fr_0.6fr] lg:items-center"><div className="flex items-baseline gap-4"><span className="text-[11px] text-white/40">0{i + 1}</span><h3 className="font-display text-[30px] font-normal tracking-tight text-nl-lime sm:text-[36px]">{s.title}</h3></div><p className="max-w-xl text-[13.5px] leading-relaxed text-white/60">{s.blurb}</p><ClipReveal className="relative aspect-[16/9] overflow-hidden rounded-[16px]" direction="left" delay={0.1}><Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 30vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /></ClipReveal></article></Reveal>))}</div>
          <Stagger className="mt-10 flex flex-wrap gap-2" stagger={0.03}>{detailServices.map((d) => (<StaggerItem key={d.title} y={8}><span className="rounded-full border border-white/15 px-3.5 py-2 text-[12px] text-white/80">{d.title}</span></StaggerItem>))}</Stagger>
        </div>
      </section>

      <section id="club" className="mx-auto grid max-w-[1320px] gap-6 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
        <ClipReveal className="relative min-h-[420px] overflow-hidden rounded-[22px]"><Image src="/h2go/mike-holmes-talking.png" alt="Mike Holmes with the H2GO team" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-nl-deep/90 via-nl-deep/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white"><div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-nl-lime text-nl-lime" />))}</div><p className="mt-3 max-w-md font-display text-[20px] leading-snug tracking-tight sm:text-[24px]">"{testimonial.quote}"</p><p className="mt-3 text-[12px] text-white/70">{testimonial.name} · {testimonial.role}</p></div></ClipReveal>
        <Reveal delay={0.1}><div className="flex h-full flex-col justify-between rounded-[22px] bg-nl-lime p-8 text-nl-deep"><div><p className="text-[10.5px] font-semibold uppercase tracking-[0.2em]">• HomeCare Club</p><h3 className="mt-4 font-display text-[32px] font-normal leading-[1.05] tracking-[-0.03em] sm:text-[42px]">Ontario&apos;s first exterior maintenance membership.</h3><p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-nl-deep/75">Seasonal service, priority access and premium exterior care made simple. One membership, a spotless property all year.</p></div><div className="mt-10 flex flex-wrap items-center justify-between gap-4"><ul className="space-y-1.5 text-[12.5px]"><li>— Spring & fall washes included</li><li>— Priority 24/7 scheduling</li><li>— Member-only pricing</li></ul><Magnetic strength={0.2}><a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-nl-deep px-5 py-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-nl-lime">Join <ArrowRight className="h-3.5 w-3.5" /></a></Magnetic></div></div></Reveal>
      </section>

      <section id="contact" className="relative overflow-hidden bg-nl-deep py-28 text-center text-white">
        <div className="absolute inset-0 opacity-45"><VideoBackground youtubeId={videos.monument.youtubeId} mp4={videos.monument.mp4} poster="/h2go/hero.jpg" start={videos.monument.start} /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-nl-deep via-nl-deep/60 to-nl-deep" />
        <div className="relative mx-auto max-w-2xl px-5">
          <Reveal><h2 className="font-display text-[36px] font-normal leading-[1.04] tracking-[-0.03em] sm:text-[58px]">Let&apos;s bring your property <span className="text-nl-lime">back to life.</span></h2></Reveal>
          <Reveal delay={0.1}><p className="mx-auto mt-5 max-w-md text-[13.5px] text-white/65">Free quotes, same-day estimates, crews available 24/7.</p></Reveal>
          <Reveal delay={0.18}><div className="mt-8 flex flex-wrap items-center justify-center gap-3"><Magnetic strength={0.2}><a href="#" className="rounded-full bg-nl-lime px-6 py-3 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-nl-deep">Get a free quote</a></Magnetic><a href={h2go.phoneHref} className="rounded-full border border-white/40 px-6 py-3 text-[10.5px] font-medium uppercase tracking-[0.2em]">{h2go.phone}</a></div></Reveal>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1320px] flex-col gap-3 px-5 py-8 text-[11.5px] text-nl-ink/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {h2go.name} · {h2go.address}</p>
        <p>Concept 03 · Northlight</p>
      </footer>

      <DesignSwitcher />
    </main>
  );
}
