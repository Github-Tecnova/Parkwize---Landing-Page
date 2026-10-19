/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/section/container";
import { Reveal } from "@/components/motion/reveal";
import { AccentText } from "@/components/typography/accent-text";
import { ButtonLink } from "@/components/ui/button-link";
import { Locale } from "@/lib/i18n";
import { Media } from "@/lib/media";
import { CONTACT_HREF } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type ProductHeroProps = {
  locale: Locale;
  dict: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    imageAlt: string;
  };
  media: Media;
  sizes: string;
  mediaClassName?: string;
  brand?: ReactNode;
  ctaHref?: string;
};

export function ProductHero({
  locale,
  dict,
  media,
  sizes,
  mediaClassName,
  brand,
  ctaHref = CONTACT_HREF,
}: ProductHeroProps) {
  return (
    <section className="under-top-bar bg-hero-fade bg-bay-lines overflow-hidden pb-16 lg:pb-24">
      <Container className="grid max-w-[61rem] items-center gap-10 pt-6 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:pt-16">
        <div className="mx-auto flex max-w-md flex-col items-center text-center lg:mx-0 lg:max-w-[27rem] lg:items-start lg:text-left">
          <p className="kicker text-deck">{dict.eyebrow}</p>
          {brand}
          <h1 className="mt-4 text-balance font-display text-[clamp(2.375rem,1.6rem+2.8vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-ink">
            <AccentText text={dict.title} />
          </h1>
          <p className="mt-6 text-pretty text-[0.9375rem] leading-relaxed text-copy">
            {dict.lead}
          </p>
          <ButtonLink href={ctaHref} locale={locale} withArrow className="mt-7">
            {dict.cta}
          </ButtonLink>
        </div>

        <Reveal delay={0.15} className={cn("mx-auto w-full", mediaClassName)}>
          <Image
            src={media.src}
            width={media.width}
            height={media.height}
            alt={dict.imageAlt}
            priority
            sizes={sizes}
            className="w-full drop-shadow-media"
          />
        </Reveal>
      </Container>
    </section>
  );
}
