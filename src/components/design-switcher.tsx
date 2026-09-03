"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

const designs = [
  { href: "/design-1", label: "01", name: "Evergreen" },
  { href: "/design-2", label: "02", name: "Meadow" },
  { href: "/design-3", label: "03", name: "Northlight" },
  { href: "/design-4", label: "04", name: "Signal" },
];

export function DesignSwitcher() {
  const pathname = usePathname();
  return (
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2"
      aria-label="Switch design"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/70 p-1 shadow-2xl backdrop-blur-xl">
        <Link
          href="/"
          className="flex h-8 items-center rounded-full px-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/60 transition hover:text-white"
        >
          All
        </Link>
        {designs.map((d) => {
          const active = pathname === d.href;
          return (
            <Link
              key={d.href}
              href={d.href}
              className={clsx(
                "relative flex h-8 items-center gap-2 rounded-full px-3 text-[12px] font-medium transition",
                active ? "text-black" : "text-white/70 hover:text-white",
              )}
            >
              {active && (
                <motion.span
                  layoutId="switcher-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative font-mono text-[10px] opacity-60">{d.label}</span>
              <span className="relative hidden sm:inline">{d.name}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
