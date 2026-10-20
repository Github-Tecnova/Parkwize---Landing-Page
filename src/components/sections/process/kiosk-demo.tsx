/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import {
  CreditCard,
  LucideIcon,
  RefreshCw,
  ScanLine,
  Table2,
} from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { DemoStepNote } from "@/components/sections/demo-step-note";
import { KioskScreen } from "@/components/sections/process/kiosk-screen";
import { StepRail } from "@/components/sections/step-rail";
import { ProcessDictionary } from "@/content/dictionary";
import { useStepCycle } from "@/hooks/use-step-cycle";

const STEP_DURATION = 4200;
const STEP_ICONS: LucideIcon[] = [Table2, ScanLine, CreditCard, RefreshCw];

type KioskDemoProps = {
  dict: ProcessDictionary["demo"];
};

export function KioskDemo({ dict }: KioskDemoProps) {
  const { ref, step, selectStep, reducedMotion } = useStepCycle(
    dict.steps.length,
    STEP_DURATION,
  );
  const content = dict.steps[step];

  return (
    <section className="bg-bay-grid bg-surface py-14 sm:py-20">
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
            <KioskScreen
              label={dict.kioskLabel}
              dict={dict.kiosk}
              step={step}
              animate={!reducedMotion}
            />
            <DemoStepNote
              step={step}
              title={content.title}
              kicker={dict.behindLabel}
              heading={content.behind}
              detail={content.detail}
              Icon={STEP_ICONS[step]}
              animate={!reducedMotion}
            />
          </div>
        </div>
        <p className="mt-4 text-xs text-copy">{dict.note}</p>
      </Container>
    </section>
  );
}
