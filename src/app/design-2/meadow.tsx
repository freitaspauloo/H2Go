"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/lib/content";

const { brand, nav, hero, services, about, testimonials, contact, footer } = siteContent;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function MeadowNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#faf8f4]/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link href="/design-2" className="flex items-center gap-2">
          <Image src="/h2go/logo.png" alt={brand.name} width={120} height={40} className="h-9 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-[#3d4a3a] transition hover:text-[#6b8f5e]">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={contact.ctaHref}
          className="hidden rounded-full bg-[#6b8f5e] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#5a7a4e] md:inline-block"
        >
          {contact.ctaLabel}
        </a>
        <button
          type="button"
          className="md:hidden text-[#3d4a3a]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-[#e8e4dc] bg-[#faf8f4] px-6 py-4 md:hidden">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="block py-2 text-sm font-medium text-[#3d4a3a]" onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href={contact.ctaHref} className="mt-2 block rounded-full bg-[#6b8f5e] px-5 py-2.5 text-center text-sm font-semibold text-white">
            {contact.ctaLabel}
          </a>
        </div>
      )}
    </header>
  );
}

function MeadowHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#faf8f4]">
      <div className="absolute inset-0">
        <Image src="/h2go/hero.jpg" alt="" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f4]/80 via-[#faf8f4]/60 to-[#faf8f4]" />
      </div>
      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 pt-24 pb-16">
        <Reveal>
          <span className="mb-4 inline-block rounded-full bg-[#6b8f5e]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#5a7a4e]">
            {hero.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.1] text-[#2a3328] md:text-7xl">
            {hero.headline}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5a6358]">{hero.subheadline}</p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={hero.primaryCta.href} className="rounded-full bg-[#6b8f5e] px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#5a7a4e]">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="rounded-full border-2 border-[#6b8f5e]/40 px-8 py-4 text-sm font-semibold text-[#5a7a4e] transition hover:border-[#6b8f5e] hover:bg-[#6b8f5e]/5">
              {hero.secondaryCta.label}
            </a>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-[#d4cfc4] pt-8 md:max-w-lg">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl text-[#6b8f5e]">{s.value}</p>
                <p className="mt-1 text-xs text-[#7a8278]">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MeadowServices() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6b8f5e]">{services.eyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl text-[#2a3328] md:text-5xl">{services.title}</h2>
          <p className="mt-4 max-w-2xl text-[#5a6358]">{services.description}</p>
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="group overflow-hidden rounded-3xl border border-[#e8e4dc] bg-[#faf8f4] transition hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-[#2a3328]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5a6358]">{item.description}</p>
                  <ul className="mt-4 space-y-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#3d4a3a]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#6b8f5e]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MeadowAbout() {
  return (
    <section id="about" className="bg-[#f0ebe3] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <Image src="/h2go/crew-1.jpg" alt="H2GO team" fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b8f5e]">{about.eyebrow}</p>
            <h2 className="mt-3 font-serif text-4xl text-[#2a3328] md:text-5xl">{about.title}</h2>
            <p className="mt-6 leading-relaxed text-[#5a6358]">{about.description}</p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {about.highlights.map((h) => (
                <div key={h.title} className="rounded-2xl bg-white/70 p-5">
                  <p className="font-serif text-xl text-[#6b8f5e]">{h.title}</p>
                  <p className="mt-2 text-sm text-[#5a6358]">{h.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MeadowTestimonials() {
  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6b8f5e]">{testimonials.eyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl text-[#2a3328]">{testimonials.title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.author} delay={i * 100}>
              <blockquote className="flex h-full flex-col rounded-3xl border border-[#e8e4dc] bg-[#faf8f4] p-8">
                <p className="flex-1 text-sm leading-relaxed text-[#5a6358]">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 border-t border-[#e8e4dc] pt-4">
                  <p className="font-semibold text-[#2a3328]">{t.author}</p>
                  <p className="text-xs text-[#7a8278]">{t.role}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MeadowContact() {
  return (
    <section id="contact" className="bg-[#6b8f5e] py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl">{contact.title}</h2>
            <p className="mt-4 text-white/85">{contact.description}</p>
            <div className="mt-8 space-y-4">
              <p><span className="font-semibold">Phone:</span> {contact.phone}</p>
              <p><span className="font-semibold">Email:</span> {contact.email}</p>
              <p><span className="font-semibold">Service Area:</span> {contact.serviceArea}</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <form className="rounded-3xl bg-white/10 p-8 backdrop-blur-sm">
              <div className="grid gap-4">
                <input type="text" placeholder="Name" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40" />
                <input type="email" placeholder="Email" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40" />
                <textarea rows={4} placeholder="Tell us about your project" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40" />
                <button type="button" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#6b8f5e] transition hover:bg-[#faf8f4]">
                  {contact.formSubmitLabel}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MeadowFooter() {
  return (
    <footer className="bg-[#2a3328] py-12 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <Image src="/h2go/logo-white.png" alt={brand.name} width={100} height={32} className="h-8 w-auto opacity-90" />
        <p className="text-sm">{footer.copyright}</p>
        <div className="flex gap-6">
          {footer.links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm transition hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function MeadowDesign() {
  return (
    <div className="min-h-screen bg-[#faf8f4] font-sans antialiased">
      <MeadowNav />
      <main>
        <MeadowHero />
        <MeadowServices />
        <MeadowAbout />
        <MeadowTestimonials />
        <MeadowContact />
      </main>
      <MeadowFooter />
    </div>
  );
}
