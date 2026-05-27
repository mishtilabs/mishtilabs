"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ITEMS = [
  "TypeScript",
  "Rust",
  "Go",
  "Next.js",
  "React Native",
  "Three.js",
  "PostgreSQL",
  "Cloudflare",
  "Vercel",
  "Stripe",
  "OpenAI",
  "Anthropic",
  "AWS",
  "GCP",
  "Supabase",
  "tRPC",
  "Prisma",
  "Redis",
  "Kafka",
  "Kubernetes",
  "Tailwind",
  "Figma",
  "Storybook",
];

export function Marquee({
  reverse = false,
  className,
}: {
  reverse?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { rootMargin: "100px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative flex w-full overflow-hidden border-y border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_45%,transparent)] py-5 backdrop-blur",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-12 px-6 will-change-transform",
          reverse ? "[animation:var(--animate-marquee-reverse)]" : "[animation:var(--animate-marquee)]",
        )}
        style={{ animationPlayState: running ? "running" : "paused" }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] [box-shadow:0_0_12px_rgba(var(--glow),0.6)]" />
            <span className="font-display text-2xl tracking-tight text-foreground-soft transition group-hover:text-foreground md:text-3xl">
              {item}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              ·
            </span>
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent" />
    </div>
  );
}
