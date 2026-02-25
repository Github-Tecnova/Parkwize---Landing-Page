import React from "react";
import HomeFooter from "@/components/nav/home-footer";
import { getDictionary } from "@/content/dictionary";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const footerLang = lang === "fr" ? "fr" : "en";
  const dict = await getDictionary(footerLang);

  return (
    <>
      {children}
      <HomeFooter lang={footerLang} dict={dict} />
    </>
  );
}
