/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { motion, useReducedMotion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { DRAW_BASE, FADE_BASE } from "@/lib/motion";

type FormSuccessProps = {
  title: string;
  body: string;
  again: string;
  onAgain: () => void;
};

const STEP_DELAY = 0.14;

const RISE: Variants = {
  hidden: { opacity: 0, y: 10 },
  shown: (order: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...FADE_BASE, delay: 0.35 + order * STEP_DELAY },
  }),
};

const DRAW: Variants = {
  hidden: { pathLength: 0 },
  shown: (order: number) => ({
    pathLength: 1,
    transition: { ...DRAW_BASE, delay: order * STEP_DELAY },
  }),
};

export function FormSuccess({ title, body, again, onAgain }: FormSuccessProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={revealMessage}
      role="status"
      tabIndex={-1}
      initial={reducedMotion ? false : "hidden"}
      animate="shown"
      className="flex flex-col items-start gap-4 py-6 focus:outline-none"
    >
      <span className="badge-positive flex size-12 items-center justify-center rounded-full">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
        >
          <motion.circle cx="12" cy="12" r="10" variants={DRAW} custom={0} />
          <motion.path d="m8 12.5 2.8 2.8L16.5 9" variants={DRAW} custom={1} />
        </svg>
      </span>
      <motion.h2
        variants={RISE}
        custom={0}
        className="font-display text-2xl font-bold text-ink"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={RISE}
        custom={1}
        className="text-[0.9375rem] leading-relaxed text-copy"
      >
        {body}
      </motion.p>
      <motion.div variants={RISE} custom={2}>
        <Button type="button" variant="subtle" size="pill" onClick={onAgain}>
          {again}
        </Button>
      </motion.div>
    </motion.div>
  );
}

function revealMessage(node: HTMLDivElement | null) {
  if (!node) return;
  node.focus({ preventScroll: true });
  node.scrollIntoView({ block: "center" });
}
