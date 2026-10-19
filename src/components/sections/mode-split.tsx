/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type ModeSplitProps = {
  modes: { label: string; title: string; body: string }[];
  className?: string;
};

export function ModeSplit({ modes, className }: ModeSplitProps) {
  return (
    <Reveal
      className={cn("grid border-t border-hairline sm:grid-cols-2", className)}
    >
      {modes.map((mode, index) => (
        <article
          key={mode.label}
          className={cn(
            "group relative min-w-0 py-7 sm:py-9",
            index === 0
              ? "sm:pr-12"
              : "border-t border-hairline sm:border-l sm:border-t-0 sm:pl-12",
          )}
        >
          <span className="kicker block tracking-[0.18em] text-deck">
            {mode.label}
          </span>
          <h3 className="mt-4 max-w-[22ch] font-display text-[clamp(1.5rem,2.3vw,2.125rem)] font-bold leading-[1.12] tracking-[-0.025em] text-ink transition-colors duration-300 group-hover:text-deck">
            {mode.title}
          </h3>
          <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-copy">
            {mode.body}
          </p>
          <span
            aria-hidden
            className={cn(
              "absolute -bottom-px right-0 h-0.5 origin-left scale-x-0 bg-deck transition-transform duration-700 group-hover:scale-x-100",
              index === 0 ? "left-0" : "left-0 sm:left-12",
            )}
          />
        </article>
      ))}
    </Reveal>
  );
}
