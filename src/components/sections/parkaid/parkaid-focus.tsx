/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ParkAidDictionary } from "@/content/dictionary";
import { MEDIA } from "@/lib/media";
import { cn } from "@/lib/utils";

type ParkAidFocusProps = {
  dict: ParkAidDictionary["focus"];
};

export function ParkAidFocus({ dict }: ParkAidFocusProps) {
  const { agentCall } = MEDIA.parkaid;

  return (
    <section className="bg-dot-grid bg-surface py-14 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow={dict.eyebrow}
              title={dict.title}
              lead={dict.lead}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Image
              src={agentCall.src}
              width={agentCall.width}
              height={agentCall.height}
              alt={dict.imageAlt}
              sizes="(min-width: 1024px) 420px, 92vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-media"
            />
          </Reveal>
        </div>

        <Reveal className="mt-12 grid border-t border-hairline md:grid-cols-3">
          {dict.points.map((point, index) => (
            <article
              key={point.tag}
              className={cn(
                "py-7",
                index > 0 &&
                  "border-t border-hairline md:border-l md:border-t-0 md:pl-8",
                index < dict.points.length - 1 && "md:pr-8",
              )}
            >
              <p className="kicker tracking-[0.16em] text-deck">{point.tag}</p>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">
                {point.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-copy">
                {point.body}
              </p>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
