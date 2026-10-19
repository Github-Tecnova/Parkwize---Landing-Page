/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { DemoHero } from "@/components/sections/demo/demo-hero";
import { MarqueeBand } from "@/components/sections/home/marquee-band";
import { ProductEcosystem } from "@/components/sections/product/product-ecosystem";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";

type DemoPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: DemoPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { demoPage } = await getDictionary(resolveLocale(lang));

  return {
    title: demoPage.meta.title,
    description: demoPage.meta.description,
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const page = dict.demoPage;

  return (
    <>
      <DemoHero dict={page} pages={dict.pages} />
      <ProductEcosystem
        locale={locale}
        eyebrow={page.see.eyebrow}
        title={page.see.title}
        label={dict.home.ecosystem.indexLabel}
        cards={dict.productCards}
      />
      <MarqueeBand words={dict.marquee} />
      <ClosingCta locale={locale} dict={dict.closingCta} />
    </>
  );
}
