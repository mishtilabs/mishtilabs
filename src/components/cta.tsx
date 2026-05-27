"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Calendar, Mail } from "lucide-react";
import { Logo } from "./logo";
import { useBookIntro } from "./book-intro/provider";

export function CTA() {
  const bookIntro = useBookIntro();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="contact" ref={ref} className="relative isolate py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <motion.div
          style={{ y }}
          className="relative overflow-hidden rounded-[2.5rem] border border-[var(--border-strong)]"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 aurora opacity-100" />
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="noise opacity-40" />
            <div
              aria-hidden
              className="absolute -inset-1"
              style={{
                background:
                  "radial-gradient(60% 80% at 50% 0%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 70%)",
              }}
            />
          </div>

          <div className="relative px-7 py-16 text-center md:px-14 md:py-24">
            <div className="mx-auto mb-6 inline-flex items-center gap-2">
              <Logo size={56} />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl font-display text-balance text-4xl leading-[1.04] tracking-tight md:text-6xl"
            >
              Got a hard problem and a kind team?{" "}
              <span className="font-serif-italic text-gradient italic">
                Let&rsquo;s make something sweet.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-5 max-w-xl text-base text-foreground-soft md:text-lg"
            >
              Tell us about your product, your team, and your timelines. We
              reply within one working day with a real human attached.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <a href="mailto:hello@mishtilabs.com" className="btn-primary">
                hello@mishtilabs.com <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={bookIntro.open}
                className="btn-ghost"
              >
                <Calendar className="h-4 w-4" />
                Book a 30-min intro
              </button>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
              {[
                { label: "Reply time", value: "< 1 working day" },
                { label: "Engagements", value: "8 weeks → 8 quarters" },
                { label: "Currencies", value: "INR · USD · EUR · GBP" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-[var(--surface)] px-5 py-4 text-left"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {m.label}
                  </div>
                  <div className="mt-1.5 font-display text-lg tracking-tight">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <Mail className="h-3 w-3" />
              No autoresponders. Real humans. Promise.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
