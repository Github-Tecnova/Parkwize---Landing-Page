/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { motion, useReducedMotion, Variants } from "motion/react";
import {
  AccentSegment,
  splitAccent,
} from "@/components/typography/accent-text";
import { REVEAL_BASE, WORD_STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealTitleProps = {
  text: string;
  accentClassName?: string;
};

const WORD: Variants = {
  hidden: { y: "110%" },
  shown: (index: number) => ({
    y: 0,
    transition: { ...REVEAL_BASE, delay: index * WORD_STAGGER },
  }),
};

function toWords(segments: AccentSegment[]) {
  const words: AccentSegment[][] = [];
  let current: AccentSegment[] = [];

  segments.forEach((segment) => {
    segment.text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        if (current.length) words.push(current);
        current = [];
        return;
      }
      current.push({ text: part, accent: segment.accent });
    });
  });

  if (current.length) words.push(current);
  return words;
}

export function RevealTitle({ text, accentClassName }: RevealTitleProps) {
  const reducedMotion = useReducedMotion();
  const segments = splitAccent(text);
  const words = toWords(segments);

  return (
    <motion.span
      initial={reducedMotion ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {words.map((word, index) => (
        <span key={index}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className="inline-block"
              variants={WORD}
              custom={index}
            >
              {word.map((piece, pieceIndex) => (
                <span
                  key={pieceIndex}
                  className={cn(piece.accent && ["text-deck", accentClassName])}
                >
                  {piece.text}
                </span>
              ))}
            </motion.span>
          </span>
          {index < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
