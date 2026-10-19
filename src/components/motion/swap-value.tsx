/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { AnimatePresence, motion } from "motion/react";
import { FADE_BASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SwapValueProps = {
  value: string;
  animate: boolean;
  className?: string;
};

export function SwapValue({ value, animate, className }: SwapValueProps) {
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="block"
          initial={animate ? { opacity: 0, y: "60%" } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={animate ? { opacity: 0, y: "-60%" } : undefined}
          transition={FADE_BASE}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
