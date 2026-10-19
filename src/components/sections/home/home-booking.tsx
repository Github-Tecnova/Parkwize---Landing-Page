/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { AmbientVideo } from "@/components/media/ambient-video";
import { Reveal } from "@/components/motion/reveal";
import { AccentText } from "@/components/typography/accent-text";
import { ButtonLink } from "@/components/ui/button-link";
import { HomeDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { MEDIA, VIDEOS } from "@/lib/media";
import { SectorStrip } from "./sector-strip";

type HomeBookingProps = {
  locale: Locale;
  dict: HomeDictionary["booking"];
  sectors: HomeDictionary["sectors"];
};

export function HomeBooking({ locale, dict, sectors }: HomeBookingProps) {
  const { deckBooking } = MEDIA.product;

  return (
    <section className="bg-dot-grid bg-surface py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-[4.375rem]">
          <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-balance font-display text-h2 font-semibold text-ink">
              <AccentText text={dict.title} />
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-copy">
              {dict.lead}
            </p>
            <ul className="mt-7 grid gap-3 text-left">
              {dict.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-[0.6875rem] text-[0.90625rem] font-semibold text-ink"
                >
                  <span className="flex size-[1.625rem] shrink-0 items-center justify-center rounded-full bg-deck text-brand-foreground">
                    <Check aria-hidden className="size-4" strokeWidth={2.6} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/online-reservation"
              locale={locale}
              variant="subtle"
              withArrow
              className="mt-9"
            >
              {dict.cta}
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1} className="relative mb-[6%] pb-[15%] sm:pb-[18%]">
            <AmbientVideo
              sources={VIDEOS.bookingReady}
              poster={MEDIA.people.driverMobile.src}
              label={dict.videoLabel}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-media [object-position:35%_center]"
            />
            <Image
              src={deckBooking.src}
              width={deckBooking.width}
              height={deckBooking.height}
              alt={dict.phoneAlt}
              sizes="(min-width: 1024px) 280px, 64vw"
              className="absolute bottom-[-6%] right-0 w-[64%] object-contain drop-shadow-media sm:right-[6%] sm:w-[46%]"
            />
          </Reveal>
        </div>

        <SectorStrip dict={sectors} />
      </Container>
    </section>
  );
}
