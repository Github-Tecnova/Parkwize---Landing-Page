/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Container } from "@/components/layout/section/container";
import { AmbientVideo } from "@/components/media/ambient-video";
import { ButtonLink } from "@/components/ui/button-link";
import { DashboardDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { MEDIA, VIDEOS } from "@/lib/media";
import { DEMO_HREF } from "@/lib/navigation";

type DashboardHeroProps = {
  locale: Locale;
  dict: DashboardDictionary["hero"];
};

export function DashboardHero({ locale, dict }: DashboardHeroProps) {
  return (
    <section className="under-top-bar relative isolate overflow-hidden bg-black pb-12 text-white">
      <Image
        src={MEDIA.places.parkingGarage.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[center_44%] opacity-[0.13] grayscale"
      />
      <div aria-hidden className="night-fade absolute inset-0 -z-10" />
      <Container className="grid items-center gap-9 pt-8 text-center sm:pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14 lg:pt-16 lg:text-left">
        <div className="flex flex-col items-center lg:items-start">
          <span className="kicker rounded-full border border-white/25 px-[1.125rem] py-2 text-[0.6875rem] tracking-[0.12em] text-white">
            {dict.eyebrow}
          </span>
          <h1 className="mb-[1.125rem] mt-6 max-w-[14ch] text-balance font-display text-[clamp(2.7rem,5.4vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            {dict.title}
          </h1>
          <p className="mb-8 max-w-[41rem] text-pretty text-[0.9375rem] leading-relaxed text-white/70 sm:text-[1.0625rem]">
            {dict.lead}
          </p>
          <ButtonLink href={DEMO_HREF} locale={locale} withArrow>
            {dict.cta}
          </ButtonLink>
        </div>
        <AmbientVideo
          sources={VIDEOS.dashboardOperator}
          poster={MEDIA.people.dashboardOperatorPoster.src}
          label={dict.videoLabel}
          className="aspect-video w-full rounded-2xl object-cover"
        />
      </Container>
    </section>
  );
}
