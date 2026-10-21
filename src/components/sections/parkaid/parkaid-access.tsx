/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ParkAidDictionary } from "@/content/dictionary";
import { Media, MEDIA } from "@/lib/media";

const LEVEL_MEDIA: Media[] = [MEDIA.parkaid.agentReady, MEDIA.parkaid.portal];

type ParkAidAccessProps = {
  dict: ParkAidDictionary["access"];
};

export function ParkAidAccess({ dict }: ParkAidAccessProps) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeader eyebrow={dict.eyebrow} title={dict.title} />
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {dict.levels.map((level, index) => {
            const media = LEVEL_MEDIA[index];

            return (
              <li key={level.tag}>
                <Reveal
                  delay={index * 0.1}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-hairline"
                >
                  <div className="bg-surface-muted px-5 pt-5 sm:px-8 sm:pt-8">
                    <Image
                      src={media.src}
                      width={media.width}
                      height={media.height}
                      alt={level.imageAlt}
                      sizes="(min-width: 1024px) 520px, 92vw"
                      className="aspect-[16/9] w-full rounded-t-xl object-cover object-top shadow-media"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="kicker tracking-[0.16em] text-deck">
                      {level.tag}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-bold text-ink">
                      {level.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-copy">
                      {level.body}
                    </p>
                    {level.points.length > 0 && (
                      <ul className="mt-5 grid gap-2.5">
                        {level.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-sm text-ink"
                          >
                            <Check
                              aria-hidden
                              className="mt-0.5 size-4 shrink-0 text-deck"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
