/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import Image from "next/image";
import { ClosingCta } from "@/components/sections/closing-cta";
import { MarqueeBand } from "@/components/sections/home/marquee-band";
import { CallDemo } from "@/components/sections/parkaid/call-demo";
import { ParkAidAccess } from "@/components/sections/parkaid/parkaid-access";
import { ParkAidAi } from "@/components/sections/parkaid/parkaid-ai";
import { ParkAidConsole } from "@/components/sections/parkaid/parkaid-console";
import { ParkAidFocus } from "@/components/sections/parkaid/parkaid-focus";
import { ParkAidTeams } from "@/components/sections/parkaid/parkaid-teams";
import { ProductEcosystem } from "@/components/sections/product/product-ecosystem";
import { ProductHero } from "@/components/sections/product/product-hero";
import { ProductResults } from "@/components/sections/product/product-results";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";

type ParkAidPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ParkAidPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { products } = await getDictionary(resolveLocale(lang));

  return {
    title: products.parkAid.meta.title,
    description: products.parkAid.meta.description,
  };
}

export default async function ParkAidPage({ params }: ParkAidPageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const page = dict.products.parkAid;
  const { parkaidLogo } = MEDIA.brand;

  return (
    <>
      <ProductHero
        locale={locale}
        dict={page.hero}
        media={MEDIA.people.callCenter}
        sizes="(min-width: 1024px) 432px, 92vw"
        mediaClassName="max-w-xl overflow-hidden rounded-2xl shadow-media lg:max-w-none"
        brand={
          <Image
            src={parkaidLogo.src}
            width={parkaidLogo.width}
            height={parkaidLogo.height}
            alt={page.hero.logoAlt}
            priority
            sizes="208px"
            className="mt-4 h-auto w-44 sm:w-52"
          />
        }
      />
      <ParkAidFocus dict={page.focus} />
      <CallDemo dict={page.demo} />
      <ParkAidAi dict={page.ai} />
      <ParkAidTeams dict={page.teams} />
      <ParkAidConsole dict={page.console} />
      <ParkAidAccess dict={page.access} />
      <ProductEcosystem
        locale={locale}
        eyebrow={page.ecosystem.eyebrow}
        title={page.ecosystem.title}
        label={dict.home.ecosystem.indexLabel}
        cards={dict.productCards}
        exclude="parkAid"
      />
      <ProductResults
        eyebrow={page.results.eyebrow}
        title={page.results.title}
        items={page.results.items}
      />
      <MarqueeBand words={dict.marquee} />
      <ClosingCta locale={locale} dict={dict.closingCta} />
    </>
  );
}
