/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import {
  Bot,
  Headset,
  Languages,
  LucideIcon,
  PhoneIncoming,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { DemoStepNote } from "@/components/sections/demo-step-note";
import { CallConsole } from "@/components/sections/parkaid/call-console";
import { StepRail } from "@/components/sections/step-rail";
import { ParkAidDictionary } from "@/content/dictionary";
import { useStepCycle } from "@/hooks/use-step-cycle";

const STEP_DURATION = 3800;
const STEP_ICONS: LucideIcon[] = [
  PhoneIncoming,
  Languages,
  Bot,
  ShieldCheck,
  Headset,
];

type CallDemoProps = {
  dict: ParkAidDictionary["demo"];
};

export function CallDemo({ dict }: CallDemoProps) {
  const { ref, step, selectStep, reducedMotion } = useStepCycle(
    dict.steps.length,
    STEP_DURATION,
  );
  const content = dict.steps[step];

  return (
    <section className="bg-bay-grid bg-surface py-14 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={dict.eyebrow}
            title={dict.title}
            lead={dict.lead}
          />
        </Reveal>

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
            <CallConsole dict={dict} step={step} animate={!reducedMotion} />
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
