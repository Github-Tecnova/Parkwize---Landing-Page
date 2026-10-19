/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { EnforcementFollowUp } from "@/components/sections/enforcement/enforcement-follow-up";
import { PatrolDemo } from "@/components/sections/enforcement/patrol-demo";
import { MarqueeBand } from "@/components/sections/home/marquee-band";
import { ProductEcosystem } from "@/components/sections/product/product-ecosystem";
import { ProductFeatures } from "@/components/sections/product/product-features";
import { ProductHero } from "@/components/sections/product/product-hero";
import { ProductProblem } from "@/components/sections/product/product-problem";
import { ProductResults } from "@/components/sections/product/product-results";
import { ProductSolution } from "@/components/sections/product/product-solution";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";
import { PROBLEM_ICONS } from "@/lib/product-problems";

type EnforcementPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: EnforcementPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { products } = await getDictionary(resolveLocale(lang));

  return {
    title: products.enforcement.meta.title,
    description: products.enforcement.meta.description,
  };
}

export default async function EnforcementPage({
  params,
}: EnforcementPageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const page = dict.products.enforcement;

  return (
    <>
      <ProductHero
        locale={locale}
        dict={page.hero}
        media={MEDIA.os.enforcementScan}
        sizes="(min-width: 1024px) 384px, 320px"
        mediaClassName="max-w-[20rem] lg:max-w-[24rem]"
      />
      <ProductProblem dict={page.problem} icons={PROBLEM_ICONS.enforcement} />
      <PatrolDemo dict={page.demo} />
      <ProductSolution dict={page.solution} />
      <EnforcementFollowUp locale={locale} dict={page.followUp} />
      <ProductFeatures
        dict={page.features}
        media={MEDIA.people.enforcementUser}
      />
      <ProductEcosystem
        locale={locale}
        eyebrow={page.ecosystem.eyebrow}
        title={page.ecosystem.title}
        label={dict.home.ecosystem.indexLabel}
        cards={dict.productCards}
        exclude="enforcement"
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
