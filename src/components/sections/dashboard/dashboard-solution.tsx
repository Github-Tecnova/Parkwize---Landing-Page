/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { DashboardDictionary } from "@/content/dictionary";
import { MEDIA } from "@/lib/media";

type DashboardSolutionProps = {
  dict: DashboardDictionary["solution"];
};

export function DashboardSolution({ dict }: DashboardSolutionProps) {
  const { dashboardIpad } = MEDIA.people;

  return (
    <section className="bg-surface-muted py-14 sm:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-[clamp(2.5rem,7vw,6rem)]">
        <Reveal className="max-w-xl">
          <SectionHeader
            eyebrow={dict.eyebrow}
            title={dict.title}
            lead={dict.lead}
          />
          <figure className="mt-8">
            <Image
              src={dashboardIpad.src}
              width={dashboardIpad.width}
              height={dashboardIpad.height}
              alt={dict.photoAlt}
              sizes="(min-width: 1024px) 520px, 92vw"
              className="w-full rounded-2xl shadow-media"
            />
            <figcaption className="mt-3.5 text-xs font-bold text-copy">
              {dict.photoCaption}
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="border-t border-hairline">
            {dict.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 border-b border-hairline py-[1.0625rem] text-[0.90625rem] leading-relaxed text-ink"
              >
                <ArrowUpRight
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-deck"
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
