/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

type MarqueeBandProps = {
  words: string[];
};

const COPIES = 2;

export function MarqueeBand({ words }: MarqueeBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "80px" });

  return (
    <div
      ref={ref}
      aria-hidden
      className="overflow-hidden border-t border-hairline bg-surface pb-[clamp(1.5rem,3.4vw,2.75rem)] pt-[clamp(2.375rem,5vw,4.75rem)]"
    >
      <div
        style={{ animationPlayState: inView ? "running" : "paused" }}
        className="flex w-max animate-marquee whitespace-nowrap motion-reduce:animate-none"
      >
        {Array.from({ length: COPIES }, (_, copy) =>
          words.map((word, index) => (
            <span
              key={`${copy}-${word}`}
              className={cn(
                "inline-flex items-center gap-[0.5em] pr-[0.5em] font-display text-[clamp(1.75rem,4.4vw,4rem)] font-bold leading-none tracking-[-0.03em]",
                index % 2 === 1 ? "text-outline-brand" : "text-ink",
              )}
            >
              {word}
              <span className="text-[0.45em] text-deck [-webkit-text-stroke:0]">
                ✦
              </span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}
