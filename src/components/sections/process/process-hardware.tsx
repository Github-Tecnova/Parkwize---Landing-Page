/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ProcessDictionary } from "@/content/dictionary";
import { Media, MEDIA } from "@/lib/media";

const HARDWARE_MEDIA: Media[] = [
  MEDIA.product.processFlagshipKiosk,
  MEDIA.product.processCompactKiosk,
];

type ProcessHardwareProps = {
  dict: ProcessDictionary["hardware"];
};

export function ProcessHardware({ dict }: ProcessHardwareProps) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeader eyebrow={dict.eyebrow} title={dict.title} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {dict.items.map((item, index) => {
            const media = HARDWARE_MEDIA[index];

            return (
              <li key={item.title}>
                <Reveal
                  delay={index * 0.1}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface"
                >
                  <div className="flex h-72 items-end justify-center bg-surface-muted px-6 pt-8 sm:h-80">
                    <Image
                      src={media.src}
                      width={media.width}
                      height={media.height}
                      alt={item.imageAlt}
                      sizes="(min-width: 768px) 320px, 70vw"
                      className="h-full w-auto object-contain drop-shadow-soft"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="font-display text-2xl font-bold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-copy">
                      {item.body}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                      {item.specs.map((spec) => (
                        <li
                          key={spec}
                          className="rounded-full bg-deck-tint px-3 py-1 text-xs font-bold text-deck"
                        >
                          {spec}
                        </li>
                      ))}
                    </ul>
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
