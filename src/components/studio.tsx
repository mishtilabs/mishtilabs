"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export function Studio() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [120, -100]);
  const yC = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const rotA = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const rotB = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <section
      id="studio"
      ref={ref}
      className="relative isolate py-28 lg:py-40"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="chip chip-dot mb-6"
          >
            <span className="font-mono">The studio</span>
          </motion.div>

          <h2 className="font-display text-4xl leading-[1.04] tracking-tight md:text-5xl lg:text-[3.6rem]">
            We are{" "}
            <span className="text-gradient">42 humans</span> in three cities,
            building software that{" "}
            <span className="font-serif-italic italic text-foreground/90">
              feels homemade
            </span>
            .
          </h2>

          <p className="mt-6 max-w-xl text-base text-foreground-soft md:text-lg">
            Mishti means <em className="text-[var(--accent)] not-italic font-serif-italic italic">sweet</em>{" "}
            in Bengali. We borrow the word for what it implies: warmth, care,
            and a craftsman&rsquo;s pride. We design like a magazine, ship like a
            startup, and support like a family business.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-3 text-sm text-foreground-soft">
            {[
              "Product studio + agency for hire",
              "Bengaluru · Kolkata · Remote first",
              "ISO 27001 · SOC 2 Type II in flight",
              "Founder-owned, profitable since 2021",
            ].map((line) => (
              <li
                key={line}
                className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] px-4 py-3 backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] [box-shadow:0_0_12px_rgba(var(--glow),0.7)]" />
                {line}
              </li>
            ))}
          </ul>

          <Link href="#contact" className="btn-primary mt-9">
            Meet the team <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/*
          Photo collage:
          - Mobile: a clean stagger — relative flow with mild offsets, no parallax.
          - lg+: original absolute parallax collage (unchanged).
        */}
        <div className="relative lg:col-span-7 lg:min-h-[40rem]">
          <motion.div
            style={{ y: yA, rotate: rotA }}
            className="relative w-[78%] overflow-hidden rounded-2xl border border-[var(--border-strong)] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] lg:absolute lg:left-0 lg:top-0 lg:w-3/5 lg:rounded-3xl lg:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
          >
            <Image
              src="/img/studio/team-coding.webp"
              alt="A team coding"
              width={800}
              height={1000}
              sizes="(max-width: 1024px) 60vw, 30vw"
              className="aspect-[4/5] object-cover"
              loading="lazy"
              decoding="async"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/40 to-transparent" />
            <span className="absolute bottom-3 left-3 chip">Workbench</span>
          </motion.div>

          <motion.div
            style={{ y: yB, rotate: rotB }}
            className="relative -mt-6 ml-auto w-[78%] overflow-hidden rounded-2xl border border-[var(--border-strong)] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] lg:absolute lg:right-0 lg:top-32 lg:mt-0 lg:w-3/5 lg:rounded-3xl lg:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
          >
            <Image
              src="/img/studio/designers.webp"
              alt="Designers at work"
              width={800}
              height={640}
              sizes="(max-width: 1024px) 60vw, 30vw"
              className="aspect-[5/4] object-cover"
              loading="lazy"
              decoding="async"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/40 to-transparent" />
            <span className="absolute bottom-3 left-3 chip">Critique room</span>
          </motion.div>

          <motion.div
            style={{ y: yC }}
            className="relative -mt-6 w-[68%] overflow-hidden rounded-2xl border border-[var(--border-strong)] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] lg:absolute lg:bottom-0 lg:left-12 lg:mt-0 lg:w-1/2 lg:rounded-3xl lg:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
          >
            <Image
              src="/img/studio/engineers.webp"
              alt="Engineers shipping"
              width={720}
              height={870}
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="aspect-[5/6] object-cover"
              loading="lazy"
              decoding="async"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/40 to-transparent" />
            <span className="absolute bottom-3 left-3 chip">Ship room</span>
          </motion.div>

          {/* Decorative quote tag — horizontal, sits at the lower right of
              the photo collage on desktop. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-2 bottom-12 z-10 hidden sm:block"
          >
            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
              <p className="font-serif-italic text-2xl italic leading-none text-[var(--accent)]">
                &ldquo;Tasteful, thoughtful, and unreasonably reliable.&rdquo;
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                — A founder we work with
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
