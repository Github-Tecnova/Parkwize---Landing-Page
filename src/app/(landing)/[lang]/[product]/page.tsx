/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/sections/coming-soon";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";
import { findProductBySlug, PRODUCT_LINKS } from "@/lib/navigation";

type ProductPageProps = {
  params: Promise<{ lang: string; product: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_LINKS.map(({ slug }) => ({ product: slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { lang, product: slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) return {};

  const dict = await getDictionary(resolveLocale(lang));

  return {
    title: `${dict.navigation.products[product.key].name} | Parkwize`,
    description: dict.comingSoon.metaDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { lang, product: slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) notFound();

  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);

  return (
    <ComingSoon
      locale={locale}
      title={dict.navigation.products[product.key].name}
      Icon={product.Icon}
      dict={dict.comingSoon}
      signInLabel={dict.navigation.signIn}
    />
  );
}
