"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "./section-header";

const STEPS = [
  {
    n: "01",
    title: "Listen, then re-listen",
    body: "Two-week discovery: stakeholder interviews, competitive teardown, telemetry inspection, and a brutally honest one-pager you'll actually re-read.",
    keyword: "Discovery",
  },
  {
    n: "02",
    title: "Sketch in low-fi, decide in hi-fi",
    body: "Ten ideas, three contenders, one direction. We Figma-prototype the seam-prone flows so you can feel them before we touch code.",
    keyword: "Design",
  },
  {
    n: "03",
    title: "Build small, ship often",
    body: "Trunk-based delivery with weekly milestones. Production preview branches by Wednesday, stakeholder demos by Friday — every week.",
    keyword: "Build",
  },
  {
    n: "04",
    title: "Measure, refine, then teach",
    body: "Post-launch instrumentation, runbooks, internal training and a 60-day warranty. We hand over a system, not a wiki.",
    keyword: "Ship",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section id="process" className="relative isolate py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="The process"
          title="A four-step rhythm,"
          italic="repeated until it sings."
          description="No mystery, no hand-waving. Here's exactly how a Mishti engagement unfolds."
          align="center"
          className="text-center mb-20"
        />

        <div ref={ref} className="relative">
          {/* center line */}
          <div className="pointer-events-none absolute inset-y-0 left-[15px] hidden w-px bg-[var(--border)] md:block md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            className="pointer-events-none absolute top-0 left-[15px] hidden w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] md:block md:left-1/2 md:-translate-x-1/2"
            style={{ height: lineHeight }}
          />

          <ol className="space-y-16 md:space-y-28">
            {STEPS.map((s, i) => {
              const isRight = i % 2 === 1;
              return (
                <li
                  key={s.n}
                  className="relative grid grid-cols-1 gap-6 pl-12 md:grid-cols-2 md:gap-12 md:pl-0"
                >
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] font-mono text-[11px] tracking-widest text-[var(--accent)] md:left-1/2 md:top-2 md:-translate-x-1/2 [animation:var(--animate-pulse-glow)]"
                  >
                    {s.n}
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55 }}
                    className={
                      isRight
                        ? "md:col-start-2 md:pl-12"
                        : "md:col-start-1 md:pr-12 md:text-right"
                    }
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                      {s.keyword}
                    </span>
                    <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight md:text-4xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base text-foreground-soft md:text-lg">
                      {s.body}
                    </p>
                  </motion.div>

                  {/* Decorative monogram on opposite side */}
                  <div
                    className={
                      "hidden font-display text-[8rem] leading-none tracking-tight text-[color-mix(in_oklab,var(--accent)_20%,transparent)] md:block " +
                      (isRight ? "md:col-start-1 md:text-right md:pr-12" : "md:col-start-2 md:pl-12")
                    }
                    aria-hidden
                  >
                    {s.n}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
