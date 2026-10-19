/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ContactHero } from "@/components/sections/contact/contact-hero";
import { MarqueeBand } from "@/components/sections/home/marquee-band";
import { ProductEcosystem } from "@/components/sections/product/product-ecosystem";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";

type ContactPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { contactPage } = await getDictionary(resolveLocale(lang));

  return {
    title: contactPage.meta.title,
    description: contactPage.meta.description,
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const page = dict.contactPage;

  return (
    <>
      <ContactHero locale={locale} dict={page} />
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
