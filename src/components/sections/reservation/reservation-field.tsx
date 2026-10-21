/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { AmbientVideo } from "@/components/media/ambient-video";
import { Reveal } from "@/components/motion/reveal";
import { ReservationDictionary } from "@/content/dictionary";
import { MEDIA, VIDEOS } from "@/lib/media";

type ReservationFieldProps = {
  dict: ReservationDictionary["field"];
};

export function ReservationField({ dict }: ReservationFieldProps) {
  return (
    <section className="py-14 sm:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <Reveal>
          <SectionHeader
            eyebrow={dict.eyebrow}
            title={dict.title}
            lead={dict.lead}
          />
          <ul className="mt-8 border-t border-hairline">
            {dict.moments.map((moment) => (
              <li
                key={moment.title}
                className="flex gap-3.5 border-b border-hairline py-4"
              >
                <span aria-hidden className="mt-2 size-2 shrink-0 bg-deck" />
                <span>
                  <span className="block font-bold text-ink">
                    {moment.title}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-copy">
                    {moment.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <AmbientVideo
            sources={VIDEOS.bookingReady}
            poster={MEDIA.people.driverMobile.src}
            label={dict.videoLabel}
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-media [object-position:35%_center]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
