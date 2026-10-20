/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Container } from "@/components/layout/section/container";
import { NeuralField } from "@/components/media/neural-field";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { AiPageDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";
import { DEMO_HREF } from "@/lib/navigation";

type AiHeroProps = {
  locale: Locale;
  dict: AiPageDictionary["hero"];
};

export function AiHero({ locale, dict }: AiHeroProps) {
  const { parkwizeAiWhite } = MEDIA.brand;
  const { aiHeroLaptop } = MEDIA.product;

  return (
    <section
      data-top-bar="dark"
      className="under-top-bar relative isolate overflow-hidden bg-navy text-inverse-foreground"
    >
      <div aria-hidden className="ai-hero-glow absolute inset-0 -z-20" />
      <NeuralField className="absolute inset-0 -z-10 size-full opacity-90" />
      <Container className="flex flex-col items-center pt-10 text-center sm:pt-16 lg:pt-20">
        <Reveal>
          <h1>
            <Image
              src={parkwizeAiWhite.src}
              width={parkwizeAiWhite.width}
              height={parkwizeAiWhite.height}
              alt={dict.logoAlt}
              priority
              sizes="340px"
              className="h-[clamp(1.875rem,3.4vw,2.75rem)] w-auto"
            />
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-inverse-muted sm:text-xs">
            {dict.tagline}
          </p>
          <ButtonLink
            href={DEMO_HREF}
            locale={locale}
            withArrow
            className="mt-7"
          >
            {dict.cta}
          </ButtonLink>
        </Reveal>

        <Reveal
          delay={0.3}
          className="mt-10 w-full max-w-4xl sm:mt-14 lg:mt-16"
        >
          <Image
            src={aiHeroLaptop.src}
            width={aiHeroLaptop.width}
            height={aiHeroLaptop.height}
            alt={dict.laptopAlt}
            priority
            sizes="(min-width: 1024px) 896px, 92vw"
            className="w-full"
          />
        </Reveal>
      </Container>
    </section>
  );
}
