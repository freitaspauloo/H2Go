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
      {/* truncated for test */}
    </main>
  );
}
