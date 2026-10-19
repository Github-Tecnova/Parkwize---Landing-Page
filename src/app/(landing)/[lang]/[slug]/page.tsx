/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/sections/coming-soon";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";
import { COMING_SOON_LINKS, findComingSoonPage } from "@/lib/navigation";

type ComingSoonPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return COMING_SOON_LINKS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ComingSoonPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = findComingSoonPage(slug);
  if (!page) return {};

  const dict = await getDictionary(resolveLocale(lang));

  return {
    title: `${dict.pages[page.key].name} | Parkwize`,
    description: dict.pages[page.key].description,
  };
}

export default async function ComingSoonPage({ params }: ComingSoonPageProps) {
  const { lang, slug } = await params;
  const page = findComingSoonPage(slug);
  if (!page) notFound();

  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);

  return (
    <ComingSoon
      locale={locale}
      title={dict.pages[page.key].name}
      Icon={page.Icon}
      dict={dict.comingSoon}
      signInLabel={dict.navigation.signIn}
    />
  );
}
