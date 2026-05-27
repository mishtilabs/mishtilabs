"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Filter } from "lucide-react";
import { PRODUCTS, CATEGORIES, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";

export function ProductsGrid() {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(() => {
    if (active === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <section
      id="products"
      className="relative isolate py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-[color-mix(in_oklab,var(--accent)_8%,transparent)] to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 dot-bg opacity-50" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="The catalogue · 30+ software offerings"
            title="A studio that ships"
            italic="actually-used software."
            description="From an India-first CRM to a wedding planner the entire family approves of, every product is owned, operated and lovingly maintained by the team that built it."
          />

          {/* Category pills:
              - Mobile: horizontal scroll-snap rail (saves vertical space, feels native).
              - lg+: wrap inline with the section header (unchanged from before). */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative -mx-5 px-5 lg:mx-0 lg:px-0"
          >
            <div className="flex max-w-full snap-x snap-mandatory items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:overflow-visible">
              <span className="chip shrink-0 snap-start">
                <Filter className="h-3 w-3" />
                <span>Filter</span>
              </span>
              {(["All", ...CATEGORIES] as const).map((c) => {
                const isActive = active === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActive(c as string)}
                    className={cn(
                      "shrink-0 snap-start rounded-full border px-3.5 py-2 text-xs font-medium transition active:scale-[0.97] lg:py-1.5",
                      isActive
                        ? "border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] text-foreground shadow-[0_0_24px_rgba(var(--glow),0.35)]"
                        : "border-[var(--border)] text-foreground-soft hover:border-[var(--border-strong)] hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                );
              })}
              {/* Trailing spacer so last pill isn't flush to the edge on mobile */}
              <span aria-hidden className="shrink-0 pr-3 lg:hidden" />
            </div>
            {/* Right edge fade hint that there's more to scroll */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--background)] to-transparent lg:hidden"
            />
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer line */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-[var(--border)] pt-8 text-sm text-foreground-soft md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
              ✦
            </span>
            <span>
              <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
              <span className="font-medium text-foreground">{PRODUCTS.length}</span> products shown.
              All maintained in-house.
            </span>
          </div>
          <a href="#contact" className="btn-ghost">
            Need something we don&rsquo;t have? <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hover, setHover] = useState(false);
  const isExternal = Boolean(product.url);
  return (
    <motion.article
      layout
      id={product.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "group relative scroll-mt-24 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--border-strong)]",
        isExternal && "cursor-pointer",
      )}
      style={{
        // Per-card accent halo on hover
        ["--card-accent" as never]: product.accent,
      }}
    >
      {/* Full-card click target — only when the product has a real
          external destination. Sits above visuals but below the
          right-top arrow chip + status row so those remain accessible.
          Uses target=_blank so visitors keep their place on the studio
          site after exploring the product. */}
      {isExternal ? (
        <Link
          href={product.url!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${product.name} — opens in a new tab`}
          className="absolute inset-0 z-20 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
        >
          <span className="sr-only">
            Visit {product.name} (opens in a new tab)
          </span>
        </Link>
      ) : null}

      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          unoptimized
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/30 to-transparent opacity-95"
        />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay opacity-50 transition-opacity duration-500 group-hover:opacity-90"
          style={{
            background: `radial-gradient(120% 80% at 50% 100%, ${product.accent}, transparent 65%)`,
          }}
        />
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2">
          <StatusBadge status={product.status} />
          <span className="chip">{product.category}</span>
        </div>

        <motion.div
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[var(--border-strong)] bg-[color-mix(in_oklab,var(--background)_70%,transparent)] text-foreground backdrop-blur",
            isExternal &&
              "border-[color-mix(in_oklab,var(--card-accent)_55%,var(--border-strong))]",
          )}
          animate={{ rotate: hover ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
        >
          <ArrowUpRight className="h-4 w-4" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl tracking-tight">{product.name}</h3>
          {product.metric ? (
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="text-[var(--accent)]">{product.metric.value}</span>{" "}
              · {product.metric.label}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-foreground-soft leading-relaxed">
          {product.tagline}
        </p>
        <p className="text-[13px] text-muted leading-relaxed">
          {product.description}
        </p>
        {isExternal ? (
          <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--accent)]">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
            />
            Visit live site
            <ArrowUpRight className="h-3 w-3" />
          </span>
        ) : null}
      </div>

      {/* Hover halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(60% 60% at 50% 0%, ${product.accent}33 0%, transparent 70%)`,
        }}
      />
      {/* Animated border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-px rounded-[calc(1.5rem-1px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, transparent, color-mix(in oklab, var(--card-accent) 35%, transparent), transparent)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
    </motion.article>
  );
}

function StatusBadge({ status }: { status: Product["status"] }) {
  const map = {
    Live: { dot: "#22c55e", label: "Live" },
    Beta: { dot: "#fb923c", label: "Beta" },
    "Coming Soon": { dot: "#a78bfa", label: "Soon" },
  } as const;
  const { dot, label } = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[color-mix(in_oklab,var(--background)_70%,transparent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground backdrop-blur">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: dot, boxShadow: `0 0 10px ${dot}` }}
      />
      {label}
    </span>
  );
}
