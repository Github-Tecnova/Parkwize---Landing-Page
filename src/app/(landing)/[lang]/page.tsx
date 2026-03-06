/*
 * Copyright (c) 2025. Tecnova
 */

import { getDictionary } from "@/content/dictionary";
import LandingPage from "@/app/(landing)/landing-page";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "en" || lang === "fr" ? lang : "en";
  const dict = await getDictionary(locale);

  return {
    title:
      locale === "fr"
        ? "Parkwize | Plateforme intelligente de stationnement"
        : "Parkwize | Intelligent Parking Platform",
    description: dict.homepage.landing.header.description,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(
    lang === "en" || lang === "fr" ? lang : "en",
  );

  return <LandingPage dict={dict} />;
}
