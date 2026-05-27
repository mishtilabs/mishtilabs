"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Logo } from "@/components/logo";
import { ArrowUpRight, RotateCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error reporter of choice (Sentry, Datadog, etc.) here.
    if (process.env.NODE_ENV !== "production") {
      console.error("[mishtilabs] uncaught error", error);
    }
  }, [error]);

  return (
    <main className="relative isolate flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="aurora absolute inset-0 -z-10 opacity-90" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-40" />

      <Logo size={56} />

      <p className="mt-8 chip chip-dot">
        <span className="font-mono">Status · 500 · something tripped</span>
      </p>

      <h1 className="mt-5 font-display text-balance text-4xl leading-[1.04] tracking-tight md:text-6xl">
        Something <span className="font-serif-italic italic text-[var(--accent-2)]">unsweet</span>{" "}
        just happened.
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-base text-foreground-soft md:text-lg">
        We were shipping fast and a corner case caught us. The team has been
        nudged. In the meantime, try again — or head home.
      </p>

      {error.digest ? (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          ref · {error.digest}
        </p>
      ) : null}

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          <RotateCw className="h-4 w-4" /> Try again
        </button>
        <Link href="/" className="btn-ghost">
          Back home <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
