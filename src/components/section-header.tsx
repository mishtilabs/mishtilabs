"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  italic,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="chip chip-dot"
      >
        <span className="font-mono">{eyebrow}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="font-display text-balance text-4xl leading-[1.02] tracking-tight md:text-5xl lg:text-6xl"
      >
        {title}
        {italic ? (
          <>
            {" "}
            <span className="font-serif-italic text-gradient italic">
              {italic}
            </span>
          </>
        ) : null}
      </motion.h2>

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "max-w-2xl text-balance text-base text-foreground-soft md:text-lg",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
