/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";

type ProductSolutionProps = {
  dict: {
    eyebrow: string;
    title: string;
    lead: string;
    points: string[];
  };
};

export function ProductSolution({ dict }: ProductSolutionProps) {
  return (
    <section className="bg-ink py-14 text-white sm:py-20">
      <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeader
            tone="inverse"
            eyebrow={dict.eyebrow}
            title={dict.title}
            lead={dict.lead}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="border-t border-white/20">
            {dict.points.map((point) => (
              <li
                key={point}
                className="flex gap-3.5 border-b border-white/20 py-[1.0625rem] text-sm leading-relaxed text-white/85"
              >
                <ArrowUpRight
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-deck-bright"
                />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
