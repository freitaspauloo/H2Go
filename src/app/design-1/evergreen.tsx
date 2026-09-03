"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Droplets, Leaf, Phone, Star, Clock } from "lucide-react";
import {
  ClipReveal,
  Counter,
  Magnetic,
  Reveal,
  SplitWords,
  Stagger,
  StaggerItem,
  EASE,
} from "@/components/motion";
import { DesignSwitcher } from "@/components/design-switcher";
import { h2go, services, stats, testimonial, trustedBy, detailServices } from "@/lib/content";

const nav = ["About", "Services", "HomeCare Club", "Reviews", "Contact"];

const heroPhotos = [
  { src: "/h2go/crew-2.jpg", alt: "H2GO technician washing a home exterior", offset: "mt-0" },
  { src: "/h2go/driveway.jpg", alt: "Driveway being power washed", offset: "mt-10" },
  { src: "/h2go/social-2.jpg", alt: "H2GO crew on site", offset: "mt-0" },
  { src: "/h2go/deck.jpg", alt: "Freshly washed deck", offset: "mt-10" },
];

export function Evergreen() {
  return (
    <main className="min-h-screen bg-ev-bg text-ev-ink">
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="sticky top-0 z-50 bg-ev-bg/85 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <Link href="/design-1" className="flex items-center gap-2 font-display text-[17px] font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-ev-forest text-ev-lime">
              <Droplets className="h-4 w-4" strokeWidth={2.4} />
            </span>
            H2GO<span className="text-ev-lime">.</span>
          </Link>
          <nav className="hidden items-center gap-7 text-[13px] font-medium text-ev-ink/70 md:flex">
            {nav.map((n) => (
              <a key={n} href={`#${n.toLowerCase().replace(/\s/g, "-")}`} className="transition hover:text-ev-ink">
                {n}
              </a>
            ))}
          </nav>
          <Magnetic strength={0.2}>
            <a
              href={h2go.phoneHref}
              className="group flex items-center gap-2 rounded-full bg-ev-forest px-4 py-2 text-[13px] font-medium text-white transition hover:bg-ev-forest-deep"
            >
              Get in touch
              <span className="grid h-5 w-5 place-items-center rounded-full bg-ev-lime text-ev-forest transition group-hover:translate-x-0.5">
                <ArrowRight className="h-3 w-3" strokeWidth={2.6} />
              </span>
            </a>
          </Magnetic>
        </div>
      </motion.header>

      <section className="mx-auto max-w-[1240px] px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[28px] bg-ev-forest text-white noise">
          <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-ev-lime/10 blur-3xl" />
          <div className="relative px-6 pt-10 sm:px-10 sm:pt-14 lg:px-14">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/80">
              <Star className="h-3.5 w-3.5 fill-ev-lime text-ev-lime" />
              4.9/5 on Google · 1,200+ reviews
            </motion.div>
            <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
              <SplitWords text="Bringing the shine back to every surface." highlight={["shine"]} highlightClassName="text-ev-lime" className="font-display text-[40px] font-medium leading-[1.02] tracking-[-0.03em] sm:text-[56px] lg:text-[68px]" delay={0.2} />
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.7 }} className="max-w-md lg:pb-2">
                <p className="text-[15px] leading-relaxed text-white/70">Hot-water and steam power washing that refreshes homes, buildings and fleets—delivered by mobile crews, 24/7, with eco-friendly detergents.</p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <Magnetic strength={0.2}>
                    <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-ev-lime px-5 py-3 text-[13px] font-semibold text-ev-forest transition hover:bg-ev-lime-soft">
                      Book a wash
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-ev-forest text-ev-lime transition group-hover:translate-x-0.5"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} /></span>
                    </a>
                  </Magnetic>
                  <a href="#services" className="group inline-flex items-center gap-1 text-[13px] font-medium text-ev-lime">See services<ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
                </div>
              </motion.div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4">
              {heroPhotos.map((p, i) => (
                <motion.div key={p.src} initial={{ opacity: 0, y: 60, rotate: i % 2 ? 1.5 : -1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.85 + i * 0.12 }} whileHover={{ y: -8, transition: { duration: 0.35, ease: EASE } }} className={`relative aspect-[4/5] overflow-hidden rounded-t-[20px] sm:aspect-[3/4] ${i % 2 ? "lg:translate-y-8" : ""}`}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 hover:scale-105" priority={i < 2} />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative border-t border-white/10 bg-ev-forest-deep/60 px-6 py-10 sm:px-10 lg:px-14">
            <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
              {stats.map((s) => (
                <StaggerItem key={s.label}>
                  <div className="font-display text-[40px] font-medium leading-none tracking-tight text-ev-lime sm:text-[48px]"><Counter value={s.value} suffix={s.suffix} /></div>
                  <p className="mt-3 max-w-[220px] text-[13px] leading-relaxed text-white/65">{s.detail}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pt-14 sm:px-8">
        <Reveal><p className="text-center text-[12px] font-medium text-ev-muted">Trusted by property managers, fleets and homeowners across Ontario.</p></Reveal>
        <Stagger className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" stagger={0.06}>
          {trustedBy.map((name) => (
            <StaggerItem key={name}><div className="flex h-[76px] items-center justify-center rounded-2xl border border-black/5 bg-white px-4 text-center text-[13px] font-semibold tracking-tight text-ev-ink/75 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-20px_rgba(10,31,54,0.4)]">{name}</div></StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="about" className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <ClipReveal className="relative aspect-[4/3] overflow-hidden rounded-[24px]"><Image src="/h2go/crew-1.jpg" alt="H2GO technician power washing brick" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /></ClipReveal>
        <div>
          <Reveal><p className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ev-forest"><span className="h-1.5 w-1.5 rounded-full bg-ev-lime" /> About us</p></Reveal>
          <Reveal delay={0.08}><h2 className="font-display text-[34px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px]">Where power washing meets <span className="text-ev-accent">true care.</span></h2></Reveal>
          <Reveal delay={0.16}><p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ev-muted">H2GO designed a proprietary high-pressure, high-flow wash system that meets the demands of any application. With hot water and steam blasting capabilities, we restore and sanitize residential, commercial and industrial properties—using only eco-friendly products.</p></Reveal>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2" stagger={0.08} delay={0.2}>
            {[{ icon: Clock, title: "24/7/365 operations", text: "Schedule ahead, set recurring visits, or call for an emergency clean-up." },{ icon: Leaf, title: "Eco-friendly by default", text: "Biodegradable detergents and landscaping rinsed before and after." },{ icon: Droplets, title: "Hot water & steam", text: "Sanitization and restoration a cold-water rig simply can't match." },{ icon: Check, title: "Fully insured crews", text: "Uniformed technicians, marked vehicles, guaranteed work." }].map((f) => (
              <StaggerItem key={f.title}><div className="rounded-2xl border border-black/5 bg-white p-5"><f.icon className="h-5 w-5 text-ev-forest" strokeWidth={2} /><h3 className="mt-3 text-[15px] font-semibold tracking-tight">{f.title}</h3><p className="mt-1 text-[13px] leading-relaxed text-ev-muted">{f.text}</p></div></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal><p className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ev-forest"><span className="h-1.5 w-1.5 rounded-full bg-ev-lime" /> Services</p><h2 className="font-display text-[34px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px]">One crew for every <span className="text-ev-accent">kind of property.</span></h2></Reveal>
          <Reveal delay={0.1}><a href="#contact" className="group inline-flex items-center gap-1 text-[13px] font-medium text-ev-forest">Request a quote<ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a></Reveal>
        </div>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3" stagger={0.1}>
          {services.map((s, i) => (
            <StaggerItem key={s.title}>
              <motion.article whileHover="hover" className="group relative flex h-[440px] flex-col justify-end overflow-hidden rounded-[24px] bg-ev-forest text-white">
                <motion.div className="absolute inset-0" variants={{ hover: { scale: 1.06 } }} transition={{ duration: 0.7, ease: EASE }}><Image src={s.image} alt={s.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" /></motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ev-forest-deep via-ev-forest-deep/40 to-transparent" />
                <div className="relative p-6">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ev-lime">0{i + 1} — {s.tag}</span>
                  <h3 className="mt-2 font-display text-[28px] font-medium tracking-tight">{s.title}</h3>
                  <motion.p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/75" variants={{ hover: { opacity: 1, y: 0 } }} initial={{ opacity: 0.85, y: 0 }}>{s.blurb}</motion.p>
                  <span className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ev-lime text-ev-forest transition group-hover:translate-x-1"><ArrowRight className="h-4 w-4" strokeWidth={2.4} /></span>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
        <Stagger className="mt-6 flex flex-wrap gap-2" stagger={0.03}>
          {detailServices.map((d) => (<StaggerItem key={d.title} y={10}><span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-3.5 py-2 text-[13px] font-medium text-ev-ink/80"><span className="h-1.5 w-1.5 rounded-full bg-ev-lime" />{d.title}</span></StaggerItem>))}
        </Stagger>
      </section>

      <section id="homecare-club" className="mx-auto max-w-[1240px] px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[28px] bg-ev-forest px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-20 noise">
          <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-ev-lime/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <Reveal><span className="inline-flex items-center gap-2 rounded-full bg-ev-lime px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ev-forest">New · Ontario&apos;s first</span></Reveal>
              <Reveal delay={0.08}><h2 className="mt-5 font-display text-[36px] font-medium leading-[1.02] tracking-[-0.03em] sm:text-[52px]">The HomeCare Club. Exterior care, <span className="text-ev-lime">on autopilot.</span></h2></Reveal>
              <Reveal delay={0.16}><p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">Seasonal service, priority access and premium exterior care made simple. Join once and your home stays spotless from spring to snow.</p></Reveal>
              <Reveal delay={0.24}><ul className="mt-6 space-y-3 text-[14px]">{["Spring & fall exterior washes included", "Priority scheduling and 24/7 support", "Member pricing on decks, driveways and windows"].map((li) => (<li key={li} className="flex items-start gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ev-lime text-ev-forest"><Check className="h-3 w-3" strokeWidth={3} /></span><span className="text-white/85">{li}</span></li>))}</ul></Reveal>
              <Reveal delay={0.3}><Magnetic strength={0.2} className="mt-8"><a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-ev-lime px-5 py-3 text-[13px] font-semibold text-ev-forest transition hover:bg-ev-lime-soft">Join the club<span className="grid h-6 w-6 place-items-center rounded-full bg-ev-forest text-ev-lime transition group-hover:translate-x-0.5"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} /></span></a></Magnetic></Reveal>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[{ src: "/h2go/house.jpg", cls: "col-span-2 aspect-[16/8]" },{ src: "/h2go/patio.jpg", cls: "aspect-square" },{ src: "/h2go/fence.jpg", cls: "aspect-square" }].map((p, i) => (<ClipReveal key={p.src} delay={i * 0.12} className={`relative overflow-hidden rounded-[20px] ${p.cls}`}><Image src={p.src} alt="" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover" /></ClipReveal>))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <ClipReveal className="relative aspect-[16/10] overflow-hidden rounded-[24px]"><Image src="/h2go/mike-holmes-talking.png" alt="Mike Holmes with the H2GO team" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" /></ClipReveal>
          <div>
            <Reveal><div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-ev-accent text-ev-accent" />))}</div></Reveal>
            <Reveal delay={0.08}><blockquote className="mt-5 font-display text-[26px] font-medium leading-[1.25] tracking-[-0.02em] sm:text-[34px]">"{testimonial.quote}"</blockquote></Reveal>
            <Reveal delay={0.16}><div className="mt-6 flex items-center gap-3"><div className="relative h-11 w-11 overflow-hidden rounded-full"><Image src={testimonial.avatar} alt={testimonial.name} fill sizes="44px" className="object-cover object-left" /></div><div><p className="text-[14px] font-semibold">{testimonial.name}</p><p className="text-[12px] text-ev-muted">{testimonial.role}</p></div></div></Reveal>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1240px] px-3 pb-4 sm:px-5">
        <div className="relative overflow-hidden rounded-[28px] bg-ev-forest px-6 py-16 text-center text-white sm:px-10 lg:py-24 noise">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ev-lime/10 blur-3xl" />
          <Reveal><h2 className="relative mx-auto max-w-2xl font-display text-[36px] font-medium leading-[1.02] tracking-[-0.03em] sm:text-[56px]">Ready for the <span className="text-ev-lime">shiniest</span> property on the block?</h2></Reveal>
          <Reveal delay={0.1}><p className="relative mx-auto mt-5 max-w-md text-[15px] text-white/70">Free, no-obligation quotes. Most estimates returned the same day.</p></Reveal>
          <Reveal delay={0.18}><div className="relative mt-8 flex flex-wrap items-center justify-center gap-4"><Magnetic strength={0.2}><a href="#" className="group inline-flex items-center gap-2 rounded-full bg-ev-lime px-6 py-3.5 text-[14px] font-semibold text-ev-forest transition hover:bg-ev-lime-soft">Get a free quote<span className="grid h-6 w-6 place-items-center rounded-full bg-ev-forest text-ev-lime transition group-hover:translate-x-0.5"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} /></span></a></Magnetic><a href={h2go.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[14px] font-medium text-white transition hover:bg-white/5"><Phone className="h-4 w-4" /> {h2go.phone}</a></div></Reveal>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-8 text-[12px] text-ev-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {h2go.name}. {h2go.address}</p>
        <p>Concept 01 · Evergreen</p>
      </footer>

      <DesignSwitcher />
    </main>
  );
}
