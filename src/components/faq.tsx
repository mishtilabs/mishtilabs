"use client";

import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/site";
import { SectionHeader } from "./section-header";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative isolate py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Questions you've probably already asked"
          title="Frequently"
          italic="answered."
          description="The kind of questions every founder asks before signing — answered up-front."
          align="center"
          className="text-center mb-14"
        />

        <ul className="flex flex-col gap-3">
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={f.q}
                className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--border-strong)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                >
                  <h3 className="font-display text-lg leading-snug tracking-tight md:text-xl">
                    {f.q}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 18 }}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--border-strong)] text-[var(--accent)]"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-base leading-relaxed text-foreground-soft md:px-8 md:pb-7">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
