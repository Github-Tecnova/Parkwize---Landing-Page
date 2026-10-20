/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Check } from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ProcessDictionary } from "@/content/dictionary";

type ProcessAboutProps = {
  dict: ProcessDictionary["about"];
};

export function ProcessAbout({ dict }: ProcessAboutProps) {
  return (
    <section className="bg-dot-grid bg-surface py-14 sm:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <SectionHeader
            eyebrow={dict.eyebrow}
            title={dict.title}
            lead={dict.lead}
          />
          <Reveal delay={0.1}>
            <h3 className="font-display text-xl font-bold text-ink">
              {dict.whyTitle}
            </h3>
            <ul className="mt-4 border-t border-hairline">
              {dict.why.map((reason) => (
                <li
                  key={reason}
                  className="flex items-start gap-3 border-b border-hairline py-3.5 text-[0.9375rem] text-ink"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-deck text-brand-foreground">
                    <Check aria-hidden className="size-3" strokeWidth={3} />
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-20">
          <p className="kicker text-copy">{dict.milestonesLabel}</p>
          <ol className="relative mt-6 grid gap-6 border-l border-hairline pl-6 lg:grid-cols-5 lg:gap-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-7">
            {dict.milestones.map((milestone) => (
              <li key={milestone.year} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[1.84rem] top-2 size-2.5 rounded-full bg-deck ring-4 ring-surface lg:-top-[2.06rem] lg:left-0"
                />
                <p className="font-display text-3xl font-bold tabular-nums text-deck">
                  {milestone.year}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-copy">
                  {milestone.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
