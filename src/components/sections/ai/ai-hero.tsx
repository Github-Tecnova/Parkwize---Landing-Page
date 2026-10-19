/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Container } from "@/components/layout/section/container";
import { Reveal } from "@/components/motion/reveal";
import { AiPageDictionary } from "@/content/dictionary";
import { MEDIA } from "@/lib/media";

type AiHeroProps = {
  dict: AiPageDictionary["hero"];
};

export function AiHero({ dict }: AiHeroProps) {
  const { parkwizeAiWhite } = MEDIA.brand;
  const { aiHeroLaptop } = MEDIA.product;

  return (
    <section className="under-top-bar relative isolate overflow-hidden bg-black text-white">
      <div aria-hidden className="ai-hero-glow absolute inset-0 -z-10" />
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
          <p className="mt-5 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white/60 sm:text-xs">
            {dict.tagline}
          </p>
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
