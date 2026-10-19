/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/footer/footer";
import { TopBar } from "@/components/layout/top-bar/top-bar";
import { getDictionary } from "@/content/dictionary";
import { isLocale, LOCALES } from "@/lib/i18n";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Parkwize",
  description: "Parkwize developed by Tecnova",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

type LangLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = await params;

  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang === "fr" ? "fr-CA" : "en-CA"}
      className={`${inter.variable} ${poppins.variable} ${jetBrainsMono.variable} scroll-smooth`}
    >
      <body className={`${inter.className} min-h-svh bg-surface antialiased`}>
        <TopBar locale={lang} dict={dict.navigation} pages={dict.pages} />
        <div className="pt-[var(--top-bar-offset)]">{children}</div>
        <Footer locale={lang} dict={dict.footer} pages={dict.pages} />
        <Analytics />
      </body>
    </html>
  );
}
