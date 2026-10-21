/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import {
  CircleAlert,
  FileCheck2,
  LucideIcon,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { SwapValue } from "@/components/motion/swap-value";
import { DemoStepNote } from "@/components/sections/demo-step-note";
import { PatrolDevice } from "@/components/sections/enforcement/patrol-device";
import { StepRail } from "@/components/sections/step-rail";
import { EnforcementDictionary } from "@/content/dictionary";
import { useStepCycle } from "@/hooks/use-step-cycle";
import { cn } from "@/lib/utils";

type StatKey = keyof EnforcementDictionary["demo"]["stats"];

const STEP_DURATION = 4200;
const STEP_ICONS: LucideIcon[] = [
  ScanLine,
  ShieldCheck,
  CircleAlert,
  FileCheck2,
];
const STAT_KEYS: StatKey[] = ["checked", "valid", "flagged"];
const STEP_STATS: Record<StatKey, number>[] = [
  { checked: 41, valid: 39, flagged: 2 },
  { checked: 42, valid: 40, flagged: 2 },
  { checked: 43, valid: 40, flagged: 3 },
  { checked: 43, valid: 40, flagged: 3 },
];

type PatrolDemoProps = {
  dict: EnforcementDictionary["demo"];
};

export function PatrolDemo({ dict }: PatrolDemoProps) {
  const { ref, step, selectStep, reducedMotion } = useStepCycle(
    dict.steps.length,
    STEP_DURATION,
  );
  const content = dict.steps[step];
  const stats = STEP_STATS[step];

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
            <PatrolDevice
              label={dict.deviceLabel}
              dict={dict.device}
              step={step}
              animate={!reducedMotion}
            />

            <div className="flex flex-col">
              <p className="kicker tracking-[0.12em] text-copy">
                {dict.statsLabel}
              </p>
              <dl className="mt-3 grid grid-cols-3 divide-x divide-hairline rounded-2xl bg-surface py-4 shadow-sm">
                {STAT_KEYS.map((key) => (
                  <div
                    key={key}
                    className="flex flex-col items-center gap-1 px-2"
                  >
                    <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-copy">
                      {dict.stats[key]}
                    </dt>
                    <dd className="order-first">
                      <SwapValue
                        value={String(stats[key])}
                        animate={!reducedMotion}
                        className={cn(
                          "font-display text-[clamp(2rem,5vw,2.75rem)] font-bold tabular-nums leading-none",
                          key === "flagged" ? "text-destructive" : "text-ink",
                        )}
                      />
                    </dd>
                  </div>
                ))}
              </dl>

              <DemoStepNote
                step={step}
                title={content.title}
                kicker={dict.behindLabel}
                heading={content.behind}
                detail={content.detail}
                Icon={STEP_ICONS[step]}
                alert={step === 2}
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
