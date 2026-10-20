/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { LegalPage } from "@/components/sections/legal/legal-page";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";

type PrivacyPolicyPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPolicyPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { legal } = await getDictionary(resolveLocale(lang));

  return {
    title: legal.privacy.meta.title,
    description: legal.privacy.meta.description,
  };
}

export default async function PrivacyPolicyPage({
  params,
}: PrivacyPolicyPageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);

  return (
    <>
      <LegalPage
        locale={locale}
        dict={dict.legal}
        document={dict.legal.privacy}
      />
      <ClosingCta locale={locale} dict={dict.closingCta} showCta={false} />
    </>
  );
}
