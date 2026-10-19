/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { AiForecastDemo } from "@/components/sections/ai/ai-forecast-demo";
import { AiHero } from "@/components/sections/ai/ai-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import { HomeAi } from "@/components/sections/home/home-ai";
import { MarqueeBand } from "@/components/sections/home/marquee-band";
import { ProductEcosystem } from "@/components/sections/product/product-ecosystem";
import { ProductFeatures } from "@/components/sections/product/product-features";
import { ProductResults } from "@/components/sections/product/product-results";
import { ProductSolution } from "@/components/sections/product/product-solution";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";

type AiPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: AiPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { products } = await getDictionary(resolveLocale(lang));

  return {
    title: products.parkwizeAi.meta.title,
    description: products.parkwizeAi.meta.description,
  };
}

export default async function AiPage({ params }: AiPageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const page = dict.products.parkwizeAi;

  return (
    <>
      <AiHero dict={page.hero} />
      <HomeAi locale={locale} dict={dict.home.ai} showCta={false} />
      <AiForecastDemo dict={page.forecast} />
      <ProductSolution dict={page.solution} />
      <ProductFeatures
        dict={page.features}
        media={MEDIA.people.operationsTeamWide}
      />
      <ProductEcosystem
        locale={locale}
        eyebrow={page.ecosystem.eyebrow}
        title={page.ecosystem.title}
        label={dict.home.ecosystem.indexLabel}
        cards={dict.productCards}
        exclude="parkwizeAi"
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
