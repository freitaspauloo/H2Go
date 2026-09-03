"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import clsx from "clsx";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Reveal: fade + rise into view                                       */
/* ------------------------------------------------------------------ */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "span" | "p" | "h1" | "h2" | "h3" | "li" | "figure";
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 28,
  once = true,
  as = "div",
}: RevealProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger: children animate in sequence                               */
/* ------------------------------------------------------------------ */

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const staggerItem = (y = 24): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
});

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div className={className} variants={staggerItem(y)}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* SplitWords: headline words rise in one by one                       */
/* ------------------------------------------------------------------ */

export function SplitWords({
  text,
  className,
  wordClassName,
  highlight,
  highlightClassName,
  delay = 0,
  stagger = 0.06,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  highlight?: string[];
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  return (
    <Tag className={clsx("text-balance", className)} aria-label={text}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,!?]/g, "").toLowerCase();
        const isHighlight = highlight?.some((h) => h.toLowerCase() === clean);
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span
              className={clsx("inline-block", wordClassName, isHighlight && highlightClassName)}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Counter: animated number                                            */
/* ------------------------------------------------------------------ */

export function Counter({
  value,
  suffix = "",
  prefix = "",
  className,
  duration = 1.8,
  format = (n: number) => Math.round(n).toLocaleString("en-US"),
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${format(v)}${suffix}`;
    });
    return unsub;
  }, [spring, prefix, suffix, format]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(0)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* ClipReveal: image wipes in from bottom, with subtle scale           */
/* ------------------------------------------------------------------ */

export function ClipReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const hidden = {
    up: "inset(100% 0 0 0 round 24px)",
    left: "inset(0 100% 0 0 round 24px)",
    right: "inset(0 0 0 100% round 24px)",
  }[direction];
  return (
    <motion.div
      className={clsx("relative", className)}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: "inset(0 0 0 0 round 24px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.4, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax: translate on scroll                                       */
/* ------------------------------------------------------------------ */

export function useParallax(distance = 80): {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return { ref, y };
}

export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const { ref, y } = useParallax(distance);
  return (
    <div ref={ref} className={clsx("overflow-hidden", className)}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee: infinite horizontal scroll                                 */
/* ------------------------------------------------------------------ */

export function Marquee({
  children,
  className,
  duration = 40,
  fade = true,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  fade?: boolean;
}) {
  return (
    <div className={clsx("overflow-hidden", fade && "mask-fade-x", className)}>
      <div
        className="flex w-max animate-marquee"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MagneticButton: subtle pull toward the cursor                       */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className={clsx("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export { EASE };
