/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { HomeAi } from "@/components/sections/home/home-ai";
import { HomeBooking } from "@/components/sections/home/home-booking";
import { HomeEcosystem } from "@/components/sections/home/home-ecosystem";
import { HomeHero } from "@/components/sections/home/home-hero";
import { HomeLot } from "@/components/sections/home/home-lot";
import { HomeOs } from "@/components/sections/home/home-os";
import { HomeRoad } from "@/components/sections/home/home-road";
import { HomeStats } from "@/components/sections/home/home-stats";
import { MarqueeBand } from "@/components/sections/home/marquee-band";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const { home } = await getDictionary(resolveLocale(lang));

  return {
    title: home.meta.title,
    description: home.meta.description,
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const { home } = dict;

  return (
    <>
      <HomeHero locale={locale} dict={home.hero} />
      <HomeStats dict={home.stats} />
      <HomeRoad>
        <HomeLot dict={home.lot} />
        <HomeEcosystem
          locale={locale}
          dict={home.ecosystem}
          cards={dict.productCards}
        />
        <HomeOs locale={locale} dict={home.os} />
        <HomeAi locale={locale} dict={home.ai} />
        <HomeBooking
          locale={locale}
          dict={home.booking}
          sectors={home.sectors}
        />
      </HomeRoad>
      <MarqueeBand words={dict.marquee} />
      <ClosingCta locale={locale} dict={dict.closingCta} />
    </>
  );
}
