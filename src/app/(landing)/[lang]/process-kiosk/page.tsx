/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { ProcessLogo } from "@/components/brand/process-logo";
import { ClosingCta } from "@/components/sections/closing-cta";
import { MarqueeBand } from "@/components/sections/home/marquee-band";
import { KioskDemo } from "@/components/sections/process/kiosk-demo";
import { ProcessAbout } from "@/components/sections/process/process-about";
import { ProcessCloud } from "@/components/sections/process/process-cloud";
import { ProcessHardware } from "@/components/sections/process/process-hardware";
import { ProductEcosystem } from "@/components/sections/product/product-ecosystem";
import { ProductFeatures } from "@/components/sections/product/product-features";
import { ProductHero } from "@/components/sections/product/product-hero";
import { ProductResults } from "@/components/sections/product/product-results";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";

type ProcessPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ProcessPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { products } = await getDictionary(resolveLocale(lang));

  return {
    title: products.processKiosk.meta.title,
    description: products.processKiosk.meta.description,
  };
}

export default async function ProcessPage({ params }: ProcessPageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const page = dict.products.processKiosk;

  return (
    <>
      <ProductHero
        locale={locale}
        dict={page.hero}
        media={MEDIA.product.processKiosk}
        sizes="(min-width: 1024px) 208px, 136px"
        mediaClassName="max-w-[8.5rem] sm:max-w-[10rem] lg:max-w-[13rem]"
        brand={
          <ProcessLogo
            title={page.hero.logoLabel}
            className="mt-4 w-36 text-ink"
          />
        }
      />
      <ProcessAbout dict={page.about} />
      <ProcessHardware dict={page.hardware} />
      <KioskDemo dict={page.demo} />
      <ProcessCloud dict={page.cloud} />
      <ProductFeatures dict={page.features} media={MEDIA.people.kioskUser} />
      <ProductEcosystem
        locale={locale}
        eyebrow={page.ecosystem.eyebrow}
        title={page.ecosystem.title}
        label={dict.home.ecosystem.indexLabel}
        cards={dict.productCards}
        exclude="processKiosk"
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
