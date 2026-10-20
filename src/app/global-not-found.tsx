/*
 * Copyright (c) 2025-2026. Tecnova
 */

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { NotFoundPanel } from "@/components/sections/not-found-panel";
import { getDictionary } from "@/content/dictionary";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "404 | Parkwize",
};

export default async function GlobalNotFound() {
  const [en, fr] = await Promise.all([
    getDictionary("en"),
    getDictionary("fr"),
  ]);

  return (
    <html lang="en-CA" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} min-h-svh bg-surface antialiased`}>
        <NotFoundPanel
          messages={[
            { locale: "en", ...en.notFound },
            { locale: "fr", ...fr.notFound },
          ]}
        />
      </body>
    </html>
  );
}
