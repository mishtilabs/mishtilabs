"use client";

import { motion } from "motion/react";
import {
  Sparkles,
  Cpu,
  Layers,
  Code2,
  Compass,
  Boxes,
  Smartphone,
  CircuitBoard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "./section-header";

type Capability = {
  icon: LucideIcon;
  title: string;
  body: string;
  tags: string[];
  badge?: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: Compass,
    title: "Product strategy",
    body: "Discovery sprints, market shaping, and decisive PRDs. We help you choose the right thing to build, then build it ruthlessly well.",
    tags: ["Discovery", "PRDs", "Roadmaps", "GTM"],
    badge: "Lead",
  },
  {
    icon: Sparkles,
    title: "Brand & UI design",
    body: "Editorial, motion-aware, and unmistakably yours. Identity systems, design tokens, and component libraries that scale.",
    tags: ["Identity", "Tokens", "Motion", "Storybook"],
  },
  {
    icon: Code2,
    title: "Web engineering",
    body: "Next.js, Remix, Nuxt — production setups with edge rendering, type-safe data, and observability that pages you only when needed.",
    tags: ["Next.js", "tRPC", "Drizzle", "Edge"],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    body: "React Native, Swift, and Kotlin. We obsess over launch time, gestures, and memory — the things users feel even if they can't name them.",
    tags: ["React Native", "Expo", "Swift", "Kotlin"],
  },
  {
    icon: Cpu,
    title: "AI & data",
    body: "RAG, agents, and finely-tuned models. We measure twice, ship once, and never let an LLM near production without an eval suite.",
    tags: ["LLMs", "RAG", "Vector DBs", "Evals"],
    badge: "New",
  },
  {
    icon: CircuitBoard,
    title: "Platform & DevOps",
    body: "Multi-cloud orchestration, Kubernetes that doesn't bite back, IaC, and golden paths your engineers will thank you for.",
    tags: ["K8s", "Terraform", "CI/CD", "SRE"],
  },
  {
    icon: Layers,
    title: "Design systems",
    body: "Token-driven, accessibility-first systems with rich documentation and migration paths. Built so your next twenty products inherit, not reinvent.",
    tags: ["A11y", "Theming", "Docs", "Versioning"],
  },
  {
    icon: Boxes,
    title: "Custom software",
    body: "ERPs, internal tools, integrations and bespoke platforms. Long engagements, transparent estimates, no offshore mystery.",
    tags: ["ERP", "Integrations", "Internal tools"],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative isolate py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Capabilities"
          title="What we do, every day,"
          italic="with embarrassing care."
          description="Eight disciplines, one team. We embed senior practitioners who own outcomes — no juniors quietly doing your thinking."
          align="left"
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative flex flex-col gap-4 bg-[var(--surface)] p-7 transition hover:bg-[var(--surface-2)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--border-strong)] bg-[var(--background)] text-[var(--accent)] transition group-hover:rotate-3 group-hover:scale-110">
                  <c.icon className="h-5 w-5" />
                </span>
                {c.badge ? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                    {c.badge}
                  </span>
                ) : null}
              </div>

              <h3 className="font-display text-xl tracking-tight">{c.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-soft">
                {c.body}
              </p>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* hover beam */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px translate-y-0 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 transition group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
