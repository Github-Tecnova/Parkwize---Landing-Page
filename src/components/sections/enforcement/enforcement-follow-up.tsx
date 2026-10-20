/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { EnforcementDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";
import { DEMO_HREF } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type EnforcementFollowUpProps = {
  locale: Locale;
  dict: EnforcementDictionary["followUp"];
};

export function EnforcementFollowUp({
  locale,
  dict,
}: EnforcementFollowUpProps) {
  const { enforcementPatrolPortrait } = MEDIA.os;
  const lastIndex = dict.events.length - 1;

  return (
    <section className="bg-surface py-14 sm:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.title}
          lead={dict.lead}
          actions={
            <ButtonLink
              href={DEMO_HREF}
              locale={locale}
              variant="subtle"
              withArrow
            >
              {dict.cta}
            </ButtonLink>
          }
        />

        <Reveal
          delay={0.1}
          className="grid grid-cols-1 items-end gap-6 overflow-hidden rounded-3xl bg-deck-tint px-5 pt-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:px-8 sm:pt-8"
        >
          <Image
            src={enforcementPatrolPortrait.src}
            width={enforcementPatrolPortrait.width}
            height={enforcementPatrolPortrait.height}
            alt={dict.imageAlt}
            sizes="(min-width: 1024px) 200px, 30vw"
            className="mx-auto hidden max-h-[26rem] w-auto drop-shadow-soft sm:block"
          />
          <ol
            aria-label={dict.timelineLabel}
            className="mb-6 rounded-2xl bg-surface p-5 shadow-media sm:mb-8"
          >
            {dict.events.map((event, index) => (
              <li
                key={event.title}
                className="relative flex gap-4 pb-5 last:pb-0"
              >
                {index < lastIndex && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-[0.3125rem] top-4 w-px bg-hairline"
                  />
                )}
                <span
                  aria-hidden
                  className={cn(
                    "relative mt-1.5 size-2.5 shrink-0 rounded-full",
                    index === lastIndex ? "bg-success" : "bg-deck",
                  )}
                />
                <span className="min-w-0">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-bold text-ink">{event.title}</span>
                    <span className="text-xs font-semibold tabular-nums text-copy">
                      {event.time}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-sm text-copy">
                    {event.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
