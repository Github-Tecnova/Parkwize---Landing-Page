/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { CreditCard, LucideIcon, MapPin, QrCode, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { SwapValue } from "@/components/motion/swap-value";
import { DemoStepNote } from "@/components/sections/demo-step-note";
import { BookingPhone } from "@/components/sections/reservation/booking-phone";
import { StepRail } from "@/components/sections/step-rail";
import { ReservationDictionary } from "@/content/dictionary";
import { useStepCycle } from "@/hooks/use-step-cycle";
import { EASE_OUT_EXPO } from "@/lib/motion";

const STEP_DURATION = 4200;
const TARGET_SECONDS = 30;
const STEP_ICONS: LucideIcon[] = [MapPin, Sparkles, CreditCard, QrCode];

type BookingDemoProps = {
  dict: ReservationDictionary["demo"];
};

export function BookingDemo({ dict }: BookingDemoProps) {
  const { ref, step, selectStep, reducedMotion } = useStepCycle(
    dict.steps.length,
    STEP_DURATION,
  );
  const content = dict.steps[step];
  const [minutes, seconds] = content.clock.split(":").map(Number);
  const progress = ((minutes * 60 + seconds) / TARGET_SECONDS) * 100;

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

          <div className="grid grid-cols-1 items-center gap-10 bg-deck-tint p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:p-12">
            <BookingPhone
              label={dict.phoneLabel}
              dict={dict.phone}
              step={step}
              animate={!reducedMotion}
            />

            <div className="flex flex-col">
              <p className="kicker tracking-[0.12em] text-copy">
                {dict.clockLabel}
              </p>
              <SwapValue
                value={content.clock}
                animate={!reducedMotion}
                className="mt-2 font-display text-[clamp(3.5rem,8vw,5.5rem)] font-bold tabular-nums leading-none text-ink"
              />
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface">
                <motion.div
                  className="h-full rounded-full bg-deck"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { duration: 0.8, ease: EASE_OUT_EXPO }
                  }
                />
              </div>

              <DemoStepNote
                step={step}
                title={content.title}
                kicker={dict.behindLabel}
                heading={content.behind}
                detail={content.detail}
                Icon={STEP_ICONS[step]}
                animate={!reducedMotion}
                className="mt-10"
              />
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-copy">{dict.note}</p>
      </Container>
    </section>
  );
}
