/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { AccentText } from "@/components/typography/accent-text";
import { HomeDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
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

        <Reveal className="mt-10 grid border-t border-hairline sm:mt-12 sm:grid-cols-2">
          {dict.modes.map((mode, index) => (
            <article
              key={mode.label}
              className={cn(
                "group relative min-w-0 py-7 sm:py-9",
                index === 0
                  ? "sm:pr-12"
                  : "border-t border-hairline sm:border-l sm:border-t-0 sm:pl-12",
              )}
            >
              <span className="kicker block tracking-[0.18em] text-deck">
                {mode.label}
              </span>
              <h3 className="mt-4 max-w-[22ch] font-display text-[clamp(1.5rem,2.3vw,2.125rem)] font-bold leading-[1.12] tracking-[-0.025em] text-ink transition-colors duration-300 group-hover:text-deck">
                {mode.title}
              </h3>
              <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-copy">
                {mode.body}
              </p>
              <span
                aria-hidden
                className={cn(
                  "absolute -bottom-px right-0 h-0.5 origin-left scale-x-0 bg-deck transition-transform duration-700 group-hover:scale-x-100",
                  index === 0 ? "left-0" : "left-0 sm:left-12",
                )}
              />
            </article>
          ))}
        </Reveal>

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
