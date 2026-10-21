/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Ban,
  CalendarDays,
  Check,
  Gauge,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { LiveSign, SignState } from "@/components/sections/signage/live-sign";
import { StepRail } from "@/components/sections/step-rail";
import { SignageDictionary } from "@/content/dictionary";
import { useStepCycle } from "@/hooks/use-step-cycle";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STEP_DURATION = 4600;

const SIGN_STATES: SignState[] = [
  { spaces: 186, occupancy: 38, full: false, Icon: Gauge, Arrow: ArrowRight },
  {
    spaces: 122,
    occupancy: 59,
    full: false,
    Icon: CalendarDays,
    Arrow: ArrowRight,
  },
  { spaces: 15, occupancy: 95, full: false, Icon: Sparkles, Arrow: ArrowRight },
  { spaces: 0, occupancy: 100, full: true, Icon: Ban, Arrow: ArrowUpRight },
];

type SignageDemoProps = {
  dict: SignageDictionary["demo"];
};

export function SignageDemo({ dict }: SignageDemoProps) {
  const { ref, step, selectStep, reducedMotion } = useStepCycle(
    dict.steps.length,
    STEP_DURATION,
  );
  const content = dict.steps[step];
  const state = SIGN_STATES[step];

  return (
    <section className="relative isolate py-14 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.title}
          lead={dict.lead}
        />

        <div
          ref={ref}
          className="mt-10 overflow-hidden rounded-3xl border border-hairline bg-surface shadow-media"
        >
          <StepRail
            label={dict.railLabel}
            steps={dict.steps}
            current={step}
            onSelect={selectStep}
          />

          <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:p-10">
            <LiveSign
              dict={dict}
              rate={content.rate}
              rateNote={content.rateNote}
              message={content.message}
              state={state}
              animate={!reducedMotion}
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="flex flex-col justify-center"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-deck-tint text-sm font-bold text-deck">
                    {step + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                    {content.title}
                  </h3>
                </div>

                <p className="kicker mb-3 mt-8 tracking-[0.12em] text-copy">
                  {dict.triggerLabel}
                </p>
                <div className="flex items-center gap-4 rounded-2xl border border-hairline p-4">
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-xl",
                      state.full ? "badge-negative" : "bg-deck-tint text-deck",
                    )}
                  >
                    <state.Icon aria-hidden className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold text-ink">
                      {content.trigger}
                    </span>
                    <span className="mt-0.5 block text-sm text-copy">
                      {content.detail}
                    </span>
                  </span>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4 border-b border-hairline pb-3">
                  <span className="text-sm font-semibold text-copy">
                    {dict.occupancyLabel}
                  </span>
                  <span className="font-display text-3xl font-bold tabular-nums text-ink">
                    {state.occupancy}
                    {dict.percentSuffix}
                  </span>
                </div>

                <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-copy">
                  <span className="badge-positive flex size-5 items-center justify-center rounded-full">
                    <Check aria-hidden className="size-3" />
                  </span>
                  <span className="font-semibold text-ink">
                    {dict.pushLabel}
                  </span>
                  {dict.pushTime}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-4 text-xs text-copy">{dict.note}</p>
      </Container>
    </section>
  );
}
