/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { MapleLeaf } from "@/components/brand/maple-leaf";
import { Container } from "@/components/layout/section/container";
import { Reveal } from "@/components/motion/reveal";
import { AccentText } from "@/components/typography/accent-text";
import { ButtonLink } from "@/components/ui/button-link";
import { ClosingCtaDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";
import { CONTACT_HREF } from "@/lib/navigation";

type ClosingCtaProps = {
  locale: Locale;
  dict: ClosingCtaDictionary;
};

export function ClosingCta({ locale, dict }: ClosingCtaProps) {
  const { pMark, porsche911 } = MEDIA.brand;

  return (
    <section className="bg-dot-grid-sm relative isolate z-[2] bg-surface pb-[clamp(9.75rem,21vw,17.75rem)] pt-20 text-center sm:pt-24">
      <span
        aria-hidden
        className="bg-bay-grid pointer-events-none absolute inset-0 -z-10"
      />
      <Container className="relative z-[2]">
        <Reveal className="flex flex-col items-center">
          <Image
            src={pMark.src}
            width={pMark.width}
            height={pMark.height}
            alt=""
            sizes="40px"
            className="mb-5 h-[clamp(2.25rem,4vw,3.125rem)] w-auto"
          />
          <p className="kicker text-deck">{dict.eyebrow}</p>
          <h2 className="mb-7 mt-3.5 max-w-[50rem] text-balance font-display text-h2 font-semibold text-ink">
            <AccentText text={dict.title} />
          </h2>
          <ButtonLink href={CONTACT_HREF} locale={locale} withArrow>
            {dict.cta}
          </ButtonLink>
          <p className="mt-6 flex items-center gap-2 text-[0.71875rem] font-semibold uppercase tracking-[0.16em] text-copy">
            <MapleLeaf className="h-[13px] w-3 text-maple" />
            {dict.madeIn}
          </p>
        </Reveal>
      </Container>
      <span
        aria-hidden
        className="car-shadow absolute inset-x-0 bottom-[-7px] z-0 mx-auto h-[26px] w-[min(74%,400px)] md:inset-x-auto md:bottom-[clamp(-11px,-0.7vw,-7px)] md:right-[clamp(12px,4vw,84px)] md:w-[clamp(300px,40vw,600px)]"
      />
      <Image
        src={porsche911.src}
        width={porsche911.width}
        height={porsche911.height}
        alt=""
        sizes="(min-width: 768px) 42vw, 78vw"
        className="pointer-events-none absolute inset-x-0 bottom-[-11px] z-[1] mx-auto w-[min(78%,420px)] drop-shadow-soft md:inset-x-auto md:bottom-[clamp(-13px,-0.9vw,-9px)] md:right-[clamp(12px,4vw,84px)] md:w-[clamp(320px,42vw,640px)]"
      />
    </section>
  );
}
