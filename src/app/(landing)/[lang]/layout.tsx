import React from "react";
import HomeFooter from "@/components/nav/home-footer";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const footerLang = lang === "fr" ? "fr" : "en";

  return (
    <>
      {children}
      <HomeFooter lang={footerLang} />
    </>
  );
}
