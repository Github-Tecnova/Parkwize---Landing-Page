/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { DashboardFeatures } from "@/components/sections/dashboard/dashboard-features";
import { DashboardHero } from "@/components/sections/dashboard/dashboard-hero";
import { DashboardShowcase } from "@/components/sections/dashboard/dashboard-showcase";
import { DashboardSolution } from "@/components/sections/dashboard/dashboard-solution";
import { MarqueeBand } from "@/components/sections/home/marquee-band";
import { ProductEcosystem } from "@/components/sections/product/product-ecosystem";
import { ProductResults } from "@/components/sections/product/product-results";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";

type DashboardPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: DashboardPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { products } = await getDictionary(resolveLocale(lang));

  return {
    title: products.dashboardManager.meta.title,
    description: products.dashboardManager.meta.description,
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const page = dict.products.dashboardManager;

  return (
    <>
      <DashboardHero locale={locale} dict={page.hero} />
      <DashboardShowcase dict={page.showcase} summary={page.summary} />
      <DashboardSolution dict={page.solution} />
      <DashboardFeatures dict={page.features} />
      <ProductEcosystem
        locale={locale}
        eyebrow={page.ecosystem.eyebrow}
        title={page.ecosystem.title}
        label={dict.home.ecosystem.indexLabel}
        cards={dict.productCards}
        exclude="dashboardManager"
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
