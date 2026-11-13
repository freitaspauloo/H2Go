"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/components/motion";

const concepts = [
  {
    href: "/design-1",
    n: "01",
    name: "Evergreen",
    ref: "Cleanora reference",
    desc: "Deep-navy hero card with electric-cyan accents, staggered photo strip, animated stats and a HomeCare Club block.",
    swatches: ["#0d2f52", "#5fe0ff", "#f1f5f9", "#0a1f36"],
    image: "/h2go/crew-2.jpg",
    bg: "bg-[#0d2f52]",
    fg: "text-white",
    accent: "text-[#5fe0ff]",
  },
  {
    href: "/design-2",
    n: "02",
    name: "Meadow",
    ref: "Finaro reference",
    desc: "Paper card floating on ocean blue, pill nav, concentric rings, bento cards with live UI and a stats grid.",
    swatches: ["#1c4f86", "#6ed3ff", "#f8fbfe", "#0c1f36"],
    image: "/h2go/house.jpg",
    bg: "bg-[#f8fbfe]",
    fg: "text-[#0c1f36]",
    accent: "text-[#14416f]",
  },
  {
    href: "/design-3",
    n: "03",
    name: "Northlight",
    ref: "Upmind reference",
    desc: "Full-bleed photographic hero with floating tags, electric-blue-on-midnight partnerships band, editorial services list.",
    swatches: ["#060e1a", "#4fd0ff", "#f4f7fb", "#cfe1f2"],
    image: "/h2go/crew-1.jpg",
    bg: "bg-[#060e1a]",
    fg: "text-white",
    accent: "text-[#4fd0ff]",
  },
  {
    href: "/design-4",
    n: "04",
    name: "Signal",
    ref: "Rachel reference",
    desc: "Vivid blue frame, black canvas, portrait hero with booking card, oversized quote and a founder story.",
    swatches: ["#1f6dff", "#0a0b0e", "#eef3fb", "#141721"],
    image: "/h2go/social-2.jpg",
    bg: "bg-[#0a0b0e]",
    fg: "text-white",
    accent: "text-[#1f6dff]",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070a12] px-5 py-16 text-white sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">H2GO Mobile Wash</p>
          <h1 className="mt-3 max-w-2xl font-display text-[40px] font-medium leading-[1.02] tracking-[-0.03em] sm:text-[60px]">
            Four landing page concepts, one brand.
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/55">
            Each concept translates a visual reference into a full H2GO landing page—real photography, real
            services, motion throughout. Pick one to explore.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {concepts.map((c, i) => (
            <motion.div
              key={c.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 }}
            >
              <Link
                href={c.href}
                className={`group relative flex h-[420px] flex-col justify-between overflow-hidden rounded-[24px] ${c.bg} ${c.fg} p-7 transition hover:-translate-y-1`}
              >
                <div className="absolute inset-0">
                  <Image src={c.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover opacity-30 transition duration-700 group-hover:scale-105 group-hover:opacity-40" />
                  <div className={`absolute inset-0 ${c.bg} opacity-60 mix-blend-multiply`} />
                </div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[11px] opacity-60">{c.n} · {c.ref}</p>
                    <h2 className={`mt-2 font-display text-[40px] font-medium leading-none tracking-[-0.03em] ${c.accent}`}>{c.name}</h2>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-current/30 transition group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="relative">
                  <p className="max-w-md text-[14px] leading-relaxed opacity-80">{c.desc}</p>
                  <div className="mt-5 flex gap-1.5">
                    {c.swatches.map((s) => (
                      <span key={s} className="h-5 w-5 rounded-full border border-white/20" style={{ background: s }} />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-[12px] text-white/35">
          Built with Next.js, Tailwind CSS and Framer Motion. Imagery sourced from h2gomobilewash.com. Stats and
          client names are placeholders to be confirmed with H2GO.
        </p>
      </div>
    </main>
  );
}
