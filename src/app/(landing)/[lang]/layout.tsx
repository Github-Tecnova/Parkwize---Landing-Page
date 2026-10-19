import React from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer/footer";
import { TopBar } from "@/components/layout/top-bar/top-bar";
import { getDictionary } from "@/content/dictionary";
import { isLocale, LOCALES } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <TopBar locale={lang} dict={dict.navigation} pages={dict.pages} />
      <div className="pt-[var(--top-bar-offset)]">{children}</div>
      <Footer locale={lang} dict={dict.footer} pages={dict.pages} />
    </>
  );
}
