/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { SwapValue } from "@/components/motion/swap-value";
import { SignageDictionary } from "@/content/dictionary";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type SignState = {
  spaces: number;
  occupancy: number;
  full: boolean;
  Icon: LucideIcon;
  Arrow: LucideIcon;
};

type LiveSignProps = {
  dict: SignageDictionary["demo"];
  rate: string;
  rateNote: string;
  message: string;
  state: SignState;
  animate: boolean;
};

export function LiveSign({
  dict,
  rate,
  rateNote,
  message,
  state,
  animate,
}: LiveSignProps) {
  return (
    <div
      role="group"
      aria-label={dict.signLabel}
      className="mx-auto w-full max-w-md rounded-[1.75rem] bg-bezel p-2.5 shadow-card-deep sm:p-3"
    >
      <div className="flex flex-col gap-5 rounded-[1.25rem] bg-navy p-4 text-inverse-foreground sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-deck font-display text-lg font-bold">
              P
            </span>
            <span className="truncate font-display text-lg font-semibold">
              {dict.lotName}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-inverse-muted">
            <span
              aria-hidden
              className={cn(
                "size-2 rounded-full bg-success",
                animate && "animate-pulse",
              )}
            />
            <span className="sr-only sm:not-sr-only">{dict.live}</span>
          </span>
        </div>

        <div className="border-t border-inverse-border pt-5">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-inverse-muted">
            {dict.rateLabel}
          </p>
          <SwapValue
            value={rate}
            animate={animate}
            className="mt-1 font-display text-[clamp(3rem,9vw,4.5rem)] font-bold tabular-nums leading-none"
          />
          <SwapValue
            value={rateNote}
            animate={animate}
            className="mt-2 text-sm font-semibold text-deck-bright"
          />
        </div>

        <div className="border-t border-inverse-border pt-5">
          <div className="flex items-end justify-between gap-3">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-inverse-muted">
              {dict.spacesLabel}
            </p>
            <SwapValue
              value={state.full ? dict.fullLabel : String(state.spaces)}
              animate={animate}
              className={cn(
                "shrink-0 font-display text-3xl font-bold uppercase tabular-nums leading-none sm:text-4xl",
                state.full && "text-destructive",
              )}
            />
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-raised">
            <motion.div
              className={cn(
                "h-full rounded-full",
                state.full ? "bg-destructive" : "bg-deck-bright",
              )}
              initial={false}
              animate={{ width: `${state.occupancy}%` }}
              transition={
                animate
                  ? { duration: 0.8, ease: EASE_OUT_EXPO }
                  : { duration: 0 }
              }
            />
          </div>
        </div>

        <div
          className={cn(
            "flex min-h-14 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-500",
            state.full ? "bg-destructive" : "bg-deck",
          )}
        >
          <state.Arrow aria-hidden className="size-5 shrink-0" />
          <SwapValue value={message} animate={animate} />
        </div>
      </div>
    </div>
  );
}
