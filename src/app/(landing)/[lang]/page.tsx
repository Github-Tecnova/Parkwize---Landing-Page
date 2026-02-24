/*
 * Copyright (c) 2025. Tecnova
 */

import { getDictionary } from "@/content/dictionary";
import LandingPage from "@/app/(landing)/landing-page";

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
