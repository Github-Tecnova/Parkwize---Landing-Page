/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ModeSplit } from "@/components/sections/mode-split";
import { AccentText } from "@/components/typography/accent-text";
import { HomeDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { OsHub } from "./os-hub";

type HomeOsProps = {
  locale: Locale;
  dict: HomeDictionary["os"];
};

export function HomeOs({ locale, dict }: HomeOsProps) {
  return (
    <section
      id="ours-or-yours"
      className="bg-dot-grid bg-bay-grid bg-surface py-16 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={dict.eyebrow}
            title={dict.title}
            lead={dict.lead}
            className="max-w-[54rem]"
          />
        </Reveal>

        <ModeSplit modes={dict.modes} className="mt-10 sm:mt-12" />

        <div className="mt-14 sm:mt-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="kicker tracking-[0.15em] text-deck">
              {dict.hub.eyebrow}
            </p>
            <h3 className="mt-4 text-balance font-display text-[clamp(1.875rem,4.2vw,3.625rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
              <AccentText
                text={dict.hub.title}
                accentClassName="text-deck-bright"
              />
            </h3>
            <p className="mt-3 text-copy">{dict.hub.lead}</p>
          </Reveal>
          <div className="mx-auto mt-6 max-w-6xl py-2 lg:py-6">
            <OsHub locale={locale} dict={dict.hub} />
          </div>
        </div>
      </Container>
    </section>
  );
}
