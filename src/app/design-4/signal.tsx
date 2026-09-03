"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Menu, ShieldCheck, Star, Droplets } from "lucide-react";
import { useRef } from "react";
import { ClipReveal, Counter, Magnetic, Reveal, SplitWords, Stagger, StaggerItem, EASE } from "@/components/motion";
import { DesignSwitcher } from "@/components/design-switcher";
import { VideoBackground } from "@/components/video-background";
import { h2go, services, detailServices, testimonial, videos } from "@/lib/content";

const avatars = ["/h2go/crew-1.jpg", "/h2go/crew-2.jpg", "/h2go/social-2.jpg"];

export function Signal() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <main className="min-h-screen bg-sg-orange p-2 text-sg-paper sm:p-4 lg:p-6">
      <div className="relative overflow-hidden rounded-[22px] bg-sg-black sm:rounded-[28px]">
        <motion.header initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="absolute inset-x-0 top-0 z-40 flex items-center justify-between p-5 sm:p-7">
          <Link href="/design-4" className="flex items-center gap-2 rounded-full bg-sg-black/70 px-3.5 py-2 text-[13px] font-semibold backdrop-blur-md">
            <Droplets className="h-3.5 w-3.5 text-sg-orange" strokeWidth={2.6} />
            H2GO
            <span className="mx-1 h-3 w-px bg-white/20" />
            <Menu className="h-3.5 w-3.5 opacity-80" />
          </Link>
          <a href="#contact" className="hidden rounded-full bg-sg-orange px-4 py-2 text-[12px] font-semibold text-sg-black transition hover:bg-sg-paper sm:inline-flex">Book a call</a>
        </motion.header>
        <section ref={heroRef} className="relative h-[100svh] min-h-[660px] overflow-hidden">
          <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 will-change-transform">
            <motion.div initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: EASE }} className="absolute inset-0">
              <VideoBackground youtubeId={videos.tower.youtubeId} mp4={videos.tower.mp4} poster="/h2go/social-2.jpg" posterAlt="H2GO technician at work" posterClassName="object-[70%_20%] saturate-[0.85] contrast-[1.05]" start={videos.tower.start} />
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-sg-black via-sg-black/30 to-sg-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-6 pb-20 sm:p-10 lg:p-14">
            <SplitWords text="Because your property deserves better than good enough." className="max-w-2xl font-display text-[38px] font-light leading-[1.04] tracking-[-0.03em] sm:text-[54px] lg:text-[64px]" delay={0.6} stagger={0.06} />
          </div>
        </section>
        <footer className="flex flex-col gap-3 border-t border-white/8 px-6 py-6 text-[11.5px] text-sg-muted sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
          <p>© {new Date().getFullYear()} {h2go.name} · {h2go.address}</p>
          <p>Concept 04 · Signal</p>
        </footer>
      </div>
      <DesignSwitcher />
    </main>
  );
}
