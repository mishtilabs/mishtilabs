"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { ArrowDown, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SweetMark } from "./sweet-mark";

const ThreeScene = dynamic(
  () => import("./three-scene").then((m) => m.ThreeScene),
  { ssr: false },
);

const PRODUCT_PILLS = [
  "Pravah CRM",
  "FlowLife",
  "GrowRight",
  "WeddingVerse",
  "Vidya AI",
  "Annapurna",
  "Yatra OS",
  "Drishti CV",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -220]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pause the WebGL render loop when the hero scrolls out of view.
  // 200px rootMargin so it never pauses while the user is still seeing it.
  const [scenePaused, setScenePaused] = useState(false);
  useEffect(() => {
    const node = sceneRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setScenePaused(!entry.isIntersecting),
      { rootMargin: "200px 0px 200px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32"
    >
      {/* 3D scene layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 aurora opacity-80" />
        <motion.div
          ref={sceneRef}
          style={{ y: y2, opacity }}
          className="absolute inset-0 [filter:saturate(120%)]"
        >
          <ThreeScene paused={scenePaused} />
        </motion.div>
        <div className="noise opacity-50" />
      </div>

      {/* Decorative meridian lines */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent opacity-30" />

      {/* Soft warm darken behind the headline — no blur, no mask edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 45%, var(--readability-veil) 0%, color-mix(in oklab, var(--readability-veil) 40%, transparent) 50%, transparent 100%)",
        }}
      />

      {/* Backdrop-blur halo — masked with a 7-stop radial gradient that
          fades all the way out to 100%, so there is no perceptible boundary
          between the blurred zone and the crisp 3D scene around it. The
          blur is intentionally light so the orb still glints through. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[4]"
        style={{
          backdropFilter: "blur(7px) saturate(110%)",
          WebkitBackdropFilter: "blur(7px) saturate(110%)",
          maskImage:
            "radial-gradient(ellipse 95% 75% at 50% 42%, black 0%, rgba(0,0,0,0.95) 18%, rgba(0,0,0,0.78) 36%, rgba(0,0,0,0.52) 54%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0.10) 88%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 75% at 50% 42%, black 0%, rgba(0,0,0,0.95) 18%, rgba(0,0,0,0.78) 36%, rgba(0,0,0,0.52) 54%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0.10) 88%, transparent 100%)",
        }}
      />

      <motion.div
        style={{ y: y1 }}
        className="mx-auto max-w-6xl px-5 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 sm:mb-7"
        >
          <span className="chip chip-dot">
            <span className="hidden font-mono sm:inline">
              EST. 2018 · BENGALURU ↔ KOLKATA
            </span>
            <span className="font-mono sm:hidden">EST. 2018 · INDIA</span>
          </span>
        </motion.div>

        {/* Phone, tablet, and narrow-window headline — clean, balanced,
            naturally-wrapping static layout. Hidden at lg+ so true desktop
            keeps the original SplitWord reveal. */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance text-[2rem] leading-[1.04] tracking-tight sm:text-[2.75rem] md:text-[3.5rem] lg:hidden"
          style={{
            wordBreak: "normal",
            overflowWrap: "anywhere",
            hyphens: "auto",
            textShadow:
              "0 1px 2px color-mix(in oklab, var(--background) 55%, transparent), 0 8px 28px color-mix(in oklab, var(--background) 70%, transparent)",
          }}
        >
          A software studio with <SweetMark /> precision.
        </motion.h1>

        {/* Desktop headline — original SplitWord reveal, unchanged. */}
        <h1
          className="hidden font-display text-balance leading-[0.95] tracking-tight lg:block lg:text-[5.5rem]"
          style={{
            textShadow:
              "0 1px 2px color-mix(in oklab, var(--background) 55%, transparent), 0 10px 36px color-mix(in oklab, var(--background) 70%, transparent)",
          }}
        >
          <SplitWord text="A software" delay={0} />
          <br />
          <SplitWord text="studio with" delay={0.08} />
          <SweetMark />
          <SplitWord text="precision." delay={0.18} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mx-auto mt-7 max-w-2xl text-balance text-lg text-foreground-soft md:text-xl"
          style={{
            textShadow:
              "0 1px 16px color-mix(in oklab, var(--background) 80%, transparent)",
          }}
        >
          <span className="text-foreground">30+ software offerings.</span>{" "}
          Reach us for any business need — from consultation to branding,
          from software to hardware. Made with the sweetness of{" "}
          <span className="font-serif-italic text-[var(--accent)]">mishti</span>{" "}
          in our hearts and engineered with the rigor of a research lab.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-9 flex flex-col items-stretch justify-center gap-3 px-2 sm:flex-row sm:items-center sm:px-0 lg:mt-10"
        >
          <Link
            href="#products"
            className="btn-primary justify-center sm:justify-start"
          >
            Explore the catalogue <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="#contact"
            className="btn-ghost justify-center sm:justify-start"
          >
            <Sparkles className="h-4 w-4" />
            Start a project
          </Link>
        </motion.div>

        {/* Floating product pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-2 px-2 text-xs text-foreground-soft"
        >
          <span className="hidden font-mono uppercase tracking-[0.2em] text-muted sm:inline">
            Products in production
          </span>
          {PRODUCT_PILLS.map((p, i) => (
            <motion.span
              key={p}
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 4 + (i % 4) * 0.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_50%,transparent)] px-3 py-1 backdrop-blur"
            >
              {p}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute inset-x-0 bottom-8 mx-auto flex w-max items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted"
      >
        <span className="font-mono">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}

function SplitWord({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-3">
      {words.map((w, i) => (
        <span key={i} className="reveal-line">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ delay: delay + i * 0.05, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
