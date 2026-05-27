"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { SectionHeader } from "./section-header";

const VOICES = [
  {
    quote:
      "Mishti rebuilt our admin platform in eight weeks. It is, no exaggeration, the calmest piece of software in our company.",
    name: "Aarav Mehta",
    role: "COO, Tarang Sports",
    avatar:
      "/img/testimonials/aarav.webp",
    accent: "#2563eb",
  },
  {
    quote:
      "We almost went with a tier-1 consultancy. Glad we didn't. The Mishti team thinks like product owners and ships like a startup we wish we were.",
    name: "Priya Subramanian",
    role: "VP Engineering, Annapurna",
    avatar:
      "/img/testimonials/priya.webp",
    accent: "#ea580c",
  },
  {
    quote:
      "GrowRight feels like it was built by people who actually had a baby last week — because it was. That's what makes Mishti different.",
    name: "Hannah Park",
    role: "Founding Designer, GrowRight",
    avatar:
      "/img/testimonials/hannah.webp",
    accent: "#7c3aed",
  },
  {
    quote:
      "Their estimates were honest, their PRs were tasteful, and their post-launch support was unfairly good.",
    name: "Daniel O'Connell",
    role: "CTO, Sequoia-backed fintech",
    avatar:
      "/img/testimonials/daniel.webp",
    accent: "#fb923c",
  },
  {
    quote:
      "What sealed it for us was a tiny detail: the way error states are written. Mishti understands that copy is design.",
    name: "Rhea Kapoor",
    role: "Head of Product, WeddingVerse",
    avatar:
      "/img/testimonials/rhea.webp",
    accent: "#9d174d",
  },
  {
    quote:
      "Twelve quarters in. Still our most reliable build partner. Still answers Slack on a Saturday.",
    name: "Vikram Sahay",
    role: "Founder, Vimaan Logistics",
    avatar:
      "/img/testimonials/vikram.webp",
    accent: "#0ea5e9",
  },
];

export function Testimonials() {
  return (
    <section id="voices" className="relative isolate py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Voices"
          title="Loved by teams who"
          italic="fund our roadmap, not our pitch."
          description="The kindest words come from the people who write us cheques. Here are a few."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {VOICES.map((v, i) => (
            <motion.figure
              key={v.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 transition hover:border-[var(--border-strong)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-40 blur-3xl transition group-hover:opacity-80"
                style={{ background: v.accent }}
              />

              <Quote className="h-7 w-7 text-[var(--accent)] opacity-80" />

              <blockquote className="font-display text-xl leading-tight tracking-tight text-foreground md:text-2xl">
                &ldquo;{v.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-auto flex items-center gap-3 pt-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[var(--border-strong)]">
                  <Image
                    src={v.avatar}
                    alt={v.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{v.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {v.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
