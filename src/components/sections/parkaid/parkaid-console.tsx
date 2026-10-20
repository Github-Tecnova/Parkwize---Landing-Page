/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { MousePointerClick } from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ParkAidDictionary } from "@/content/dictionary";
import { MEDIA } from "@/lib/media";

type ParkAidConsoleProps = {
  dict: ParkAidDictionary["console"];
};

export function ParkAidConsole({ dict }: ParkAidConsoleProps) {
  const { consoleCall } = MEDIA.parkaid;

  return (
    <section className="bg-navy py-14 text-inverse-foreground sm:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <Reveal>
            <SectionHeader
              tone="inverse"
              eyebrow={dict.eyebrow}
              title={dict.title}
              lead={dict.lead}
            />
            <ul className="mt-8 border-t border-inverse-border">
              {dict.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 border-b border-inverse-border py-3.5 text-sm text-inverse-muted"
                >
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 bg-deck-bright"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:pt-4">
            <Image
              src={consoleCall.src}
              width={consoleCall.width}
              height={consoleCall.height}
              alt={dict.imageAlt}
              sizes="(min-width: 1024px) 600px, 92vw"
              className="w-full rounded-2xl bg-surface shadow-card-deep"
            />
            <div className="mt-6 flex gap-4 rounded-2xl border border-inverse-border bg-navy-raised p-5 sm:p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-deck">
                <MousePointerClick aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold leading-snug">
                  {dict.highlightTitle}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-inverse-muted">
                  {dict.highlightBody}
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
