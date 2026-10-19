/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { MarqueeBand } from "@/components/sections/home/marquee-band";
import { ProductEcosystem } from "@/components/sections/product/product-ecosystem";
import { ProductFeatures } from "@/components/sections/product/product-features";
import { ProductHero } from "@/components/sections/product/product-hero";
import { ProductProblem } from "@/components/sections/product/product-problem";
import { ProductResults } from "@/components/sections/product/product-results";
import { ProductSolution } from "@/components/sections/product/product-solution";
import { SignageDemo } from "@/components/sections/signage/signage-demo";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";
import { PROBLEM_ICONS } from "@/lib/product-problems";

type SignagePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: SignagePageProps): Promise<Metadata> {
  const { lang } = await params;
  const { products } = await getDictionary(resolveLocale(lang));

  return {
    title: products.digitalSignage.meta.title,
    description: products.digitalSignage.meta.description,
  };
}

export default async function SignagePage({ params }: SignagePageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const page = dict.products.digitalSignage;

  return (
    <>
      <ProductHero
        locale={locale}
        dict={page.hero}
        media={MEDIA.product.signageScreens}
        sizes="(min-width: 1024px) 416px, 352px"
        mediaClassName="max-w-[22rem] lg:max-w-[26rem]"
      />
      <ProductProblem
        dict={page.problem}
        icons={PROBLEM_ICONS.digitalSignage}
      />
      <SignageDemo dict={page.demo} />
      <ProductSolution dict={page.solution} />
      <ProductFeatures dict={page.features} media={MEDIA.people.displayUser} />
      <ProductEcosystem
        locale={locale}
        eyebrow={page.ecosystem.eyebrow}
        title={page.ecosystem.title}
        label={dict.home.ecosystem.indexLabel}
        cards={dict.productCards}
        exclude="digitalSignage"
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
