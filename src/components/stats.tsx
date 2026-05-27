"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

const STATS = [
  {
    value: 30,
    suffix: "+",
    label: "Software offerings",
    note: "Owned and operated in-house",
  },
  {
    value: 12.4,
    suffix: "M",
    label: "Monthly active users",
    note: "Across our portfolio",
  },
  {
    value: 99.98,
    suffix: "%",
    label: "Uptime SLA",
    note: "Across the last 365 days",
  },
  {
    value: 42,
    suffix: "",
    label: "Humans on the team",
    note: "Bengaluru · Kolkata · Remote",
  },
];

function CountUp({
  to,
  decimals = 0,
  suffix = "",
  start,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  start: boolean;
}) {
  const mv = useMotionValue(0);
  const sm = useSpring(mv, { stiffness: 70, damping: 22 });
  const out = useTransform(sm, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (start) mv.set(to);
  }, [start, mv, to]);

  return (
    <span className="tabular-nums">
      <motion.span>{out}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative isolate py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex items-center justify-between gap-4"
        >
          <span className="chip chip-dot">
            <span className="font-mono">In numbers · today</span>
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted md:inline">
            Updated weekly · last sync 2 days ago
          </span>
        </motion.div>

        {/* The strip */}
        <div
          ref={ref}
          className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)] [box-shadow:0_30px_80px_-40px_rgba(0,0,0,0.45)]"
        >
          {/* Top "drawing" hairline */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "0% 50%" }}
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          />

          {/* Corner brackets */}
          <CornerBracket position="tl" />
          <CornerBracket position="tr" />
          <CornerBracket position="bl" />
          <CornerBracket position="br" />

          {/* Cells */}
          <div className="grid grid-cols-2 divide-y divide-x divide-[var(--border)] lg:grid-cols-4 lg:divide-y-0">
            {STATS.map((s, i) => {
              const decimals = String(s.value).includes(".")
                ? String(s.value).split(".")[1].length
                : 0;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 28 }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          y: [28, -6, 2, 0],
                          x: [0, -2, 1, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.5, 0.78, 1],
                  }}
                  className="group relative flex min-h-[8.5rem] flex-col justify-between gap-3 p-5 sm:min-h-[10rem] sm:gap-4 sm:p-7 lg:p-9"
                >
                  {/* Index marker */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                      0{i + 1} <span className="text-[var(--accent)]">/</span> 04
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-50 [box-shadow:0_0_8px_rgba(var(--glow),0.6)]" />
                  </div>

                  {/* The number */}
                  <div className="font-display text-[2rem] leading-[0.95] tracking-tight sm:text-[2.6rem] md:text-5xl lg:text-[3.6rem]">
                    <CountUp
                      to={s.value}
                      decimals={decimals}
                      suffix={s.suffix}
                      start={inView}
                    />
                  </div>

                  {/* Labels */}
                  <div>
                    <p className="text-[13.5px] font-medium tracking-tight text-foreground sm:text-[15px]">
                      {s.label}
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted sm:mt-1 sm:text-[13px]">
                      {s.note}
                    </p>
                  </div>

                  {/* Hover hairline beam */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-7 bottom-3 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--accent)] to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerBracket({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const map: Record<typeof position, string> = {
    tl: "top-3 left-3 border-t border-l rounded-tl-md",
    tr: "top-3 right-3 border-t border-r rounded-tr-md",
    bl: "bottom-3 left-3 border-b border-l rounded-bl-md",
    br: "bottom-3 right-3 border-b border-r rounded-br-md",
  };
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-3 w-3 border-[var(--accent)] ${map[position]}`}
    />
  );
}
