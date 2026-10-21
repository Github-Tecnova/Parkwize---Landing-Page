/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ParkAidDictionary } from "@/content/dictionary";

type ParkAidAiProps = {
  dict: ParkAidDictionary["ai"];
};

export function ParkAidAi({ dict }: ParkAidAiProps) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <Reveal className="ai-panel rounded-3xl px-5 py-10 text-brand-foreground sm:p-[clamp(2.5rem,6vw,4.5rem)]">
          <SectionHeader
            tone="inverse"
            eyebrow={dict.eyebrow}
            title={dict.title}
            lead={dict.lead}
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dict.actions.map((item) => (
              <li
                key={item.tag}
                className="flex flex-col rounded-2xl border border-panel-rule bg-panel-tile p-5"
              >
                <p className="kicker tracking-[0.14em] text-inverse-foreground">
                  {item.tag}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug">
                  {item.situation}
                </h3>
                <p className="mt-3 flex gap-2 text-sm leading-relaxed text-inverse-foreground">
                  <ArrowRight
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-deck-bright"
                  />
                  {item.action}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
