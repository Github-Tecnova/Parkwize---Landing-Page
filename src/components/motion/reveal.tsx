/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { REVEAL_BASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ ...REVEAL_BASE, delay }}
    >
      {children}
    </motion.div>
  );
}
