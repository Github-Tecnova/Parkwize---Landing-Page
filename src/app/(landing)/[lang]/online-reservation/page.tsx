/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { MarqueeBand } from "@/components/sections/home/marquee-band";
import { ProductEcosystem } from "@/components/sections/product/product-ecosystem";
import { ProductFeatures } from "@/components/sections/product/product-features";
import { ProductHero } from "@/components/sections/product/product-hero";
import { ProductProblem } from "@/components/sections/product/product-problem";
import { ProductResults } from "@/components/sections/product/product-results";
import { ProductSolution } from "@/components/sections/product/product-solution";
import { BookingDemo } from "@/components/sections/reservation/booking-demo";
import { ReservationField } from "@/components/sections/reservation/reservation-field";
import { getDictionary } from "@/content/dictionary";
import { resolveLocale } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";
import { PROBLEM_ICONS } from "@/lib/product-problems";

type ReservationPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ReservationPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { products } = await getDictionary(resolveLocale(lang));

  return {
    title: products.onlineReservation.meta.title,
    description: products.onlineReservation.meta.description,
  };
}

export default async function ReservationPage({
  params,
}: ReservationPageProps) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const page = dict.products.onlineReservation;

  return (
    <>
      <ProductHero
        locale={locale}
        dict={page.hero}
        media={MEDIA.product.bookingPhones}
        sizes="(min-width: 1024px) 480px, 92vw"
        mediaClassName="max-w-xl lg:max-w-none"
      />
      <ProductProblem
        dict={page.problem}
        icons={PROBLEM_ICONS.onlineReservation}
      />
      <BookingDemo dict={page.demo} />
      <ProductSolution dict={page.solution} />
      <ReservationField dict={page.field} />
      <ProductFeatures dict={page.features} media={MEDIA.places.garageLed} />
      <ProductEcosystem
        locale={locale}
        eyebrow={page.ecosystem.eyebrow}
        title={page.ecosystem.title}
        label={dict.home.ecosystem.indexLabel}
        cards={dict.productCards}
        exclude="onlineReservation"
      />
      <ProductResults
        eyebrow={page.results.eyebrow}
        title={page.results.title}
        items={page.results.items}
      />
      <MarqueeBand words={dict.marquee} />
      <ClosingCta locale={locale} dict={dict.closingCta} />
    </>
  );
}
