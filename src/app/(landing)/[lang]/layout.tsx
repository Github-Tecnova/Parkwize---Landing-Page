import React from "react";
import { notFound } from "next/navigation";
import HomeFooter from "@/components/nav/home-footer";
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
      <TopBar locale={lang} dict={dict.navigation} />
      <div className="pt-[var(--top-bar-offset)]">{children}</div>
      <HomeFooter lang={lang} dict={dict} />
    </>
  );
}
