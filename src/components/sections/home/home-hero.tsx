/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Container } from "@/components/layout/section/container";
import { AmbientVideo } from "@/components/media/ambient-video";
import { PointerTilt } from "@/components/motion/pointer-tilt";
import { HeroScreen } from "@/components/sections/home/hero-screen";
import { ButtonLink } from "@/components/ui/button-link";
import { HomeDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { MEDIA, VIDEOS } from "@/lib/media";
import { CONTACT_HREF } from "@/lib/navigation";

type HomeHeroProps = {
  locale: Locale;
  dict: HomeDictionary["hero"];
};

export function HomeHero({ locale, dict }: HomeHeroProps) {
  const { heroLaptop } = MEDIA.product;

  return (
    <section className="under-top-bar bg-hero-fade bg-bay-lines overflow-hidden pb-24 lg:pb-44">
      <Container className="grid max-w-[61rem] items-start gap-10 pt-6 sm:pt-10 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-10 lg:pt-16">
        <div className="mx-auto flex max-w-md flex-col items-center text-center lg:mx-0 lg:max-w-[25rem] lg:items-start lg:pt-8 lg:text-left">
          <h1 className="font-display text-[clamp(2.5rem,1.6rem+3.2vw,3.625rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
            {dict.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            {dict.titleAccent.map((line) => (
              <span key={line} className="block text-deck">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[25rem] text-pretty text-[0.9375rem] leading-relaxed text-copy">
            {dict.lead}
          </p>
          <ButtonLink
            href={CONTACT_HREF}
            locale={locale}
            withArrow
            className="mt-7"
          >
            {dict.cta}
          </ButtonLink>
        </div>

        <PointerTilt className="relative mx-auto aspect-[543/506] w-full max-w-xl lg:max-w-none">
          <AmbientVideo
            sources={VIDEOS.heroBanner}
            poster={MEDIA.people.heroTeam.src}
            label={dict.videoLabel}
            className="absolute right-0 top-0 h-1/2 w-[86%] rounded-2xl object-cover shadow-media [object-position:60%_42%]"
          />
          <div className="absolute bottom-0 left-0 z-[2] w-[92%]">
            <Image
              src={heroLaptop.src}
              width={heroLaptop.width}
              height={heroLaptop.height}
              alt={dict.dashboardAlt}
              priority
              sizes="(min-width: 1024px) 500px, 92vw"
              className="w-full drop-shadow-media"
            />
            <HeroScreen locale={locale} dict={dict.screen} />
          </div>
        </PointerTilt>
      </Container>
    </section>
  );
}
