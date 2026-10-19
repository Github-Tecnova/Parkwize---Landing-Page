/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type DemoStepNoteProps = {
  step: number;
  title: string;
  kicker: string;
  heading: string;
  detail: string;
  Icon: LucideIcon;
  alert?: boolean;
  animate: boolean;
  className?: string;
};

export function DemoStepNote({
  step,
  title,
  kicker,
  heading,
  detail,
  Icon,
  alert = false,
  animate,
  className,
}: DemoStepNoteProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={step}
        initial={animate ? { opacity: 0, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={animate ? { opacity: 0, y: -8 } : undefined}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        className={className}
      >
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-deck text-sm font-bold text-brand-foreground">
            {step + 1}
          </span>
          <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
            {title}
          </h3>
        </div>
        <p className="kicker mb-3 mt-8 tracking-[0.12em] text-copy">{kicker}</p>
        <div className="flex items-center gap-4 rounded-2xl bg-surface p-4 shadow-sm">
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl",
              alert ? "badge-negative" : "bg-deck-tint text-deck",
            )}
          >
            <Icon aria-hidden className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-ink">{heading}</span>
            <span className="mt-0.5 block text-sm text-copy">{detail}</span>
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
