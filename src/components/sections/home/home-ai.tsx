/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import {
  BarChart3,
  CalendarDays,
  Clock3,
  CloudSun,
  LucideIcon,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { Reveal } from "@/components/motion/reveal";
import { AiChatReplay } from "@/components/sections/ai-chat-replay";
import { AccentText } from "@/components/typography/accent-text";
import { RevealTitle } from "@/components/motion/reveal-title";
import { ButtonLink } from "@/components/ui/button-link";
import { HomeDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { Media, MEDIA } from "@/lib/media";
import { CONTACT_HREF } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type HomeAiProps = {
  locale: Locale;
  dict: HomeDictionary["ai"];
  showCta?: boolean;
};

type CapabilityKey = keyof HomeDictionary["ai"]["capabilities"];
type SourceKey = keyof HomeDictionary["ai"]["sources"]["items"];

const CAPABILITIES: { key: CapabilityKey; media: Media }[] = [
  { key: "forecasting", media: MEDIA.ai.forecasting },
  { key: "pricing", media: MEDIA.ai.pricing },
  { key: "conversational", media: MEDIA.ai.conversational },
  { key: "agent", media: MEDIA.ai.agent },
];

const SOURCES: { key: SourceKey; Icon: LucideIcon }[] = [
  { key: "weather", Icon: CloudSun },
  { key: "events", Icon: CalendarDays },
  { key: "traffic", Icon: MapPin },
  { key: "history", Icon: BarChart3 },
  { key: "venues", Icon: Clock3 },
  { key: "revenue", Icon: TrendingUp },
];

export function HomeAi({ locale, dict, showCta = true }: HomeAiProps) {
  const { operationsTeam } = MEDIA.people;
  const { deckAi } = MEDIA.product;
  const { parkwizeAiBlack, parkwizeAiWhite } = MEDIA.brand;

  return (
    <section id="parkwize-ai" className="bg-surface py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[4.375rem]">
          <Reveal className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Image
              src={parkwizeAiBlack.src}
              width={parkwizeAiBlack.width}
              height={parkwizeAiBlack.height}
              alt={dict.logoAlt}
              sizes="170px"
              className="h-[clamp(1.0625rem,1.5vw,1.375rem)] w-auto"
            />
            <h2 className="mt-4 text-balance font-display text-h2 font-semibold text-ink">
              <RevealTitle text={dict.title} />
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-copy">
              {dict.lead}
            </p>
            {showCta && (
              <ButtonLink
                href="/parkwize-ai"
                locale={locale}
                withArrow
                className="mt-8"
              >
                {dict.cta}
              </ButtonLink>
            )}
          </Reveal>
          <Reveal delay={0.1} className="relative pb-[15%] sm:pb-[18%]">
            <Image
              src={operationsTeam.src}
              width={operationsTeam.width}
              height={operationsTeam.height}
              alt={dict.photoAlt}
              sizes="(min-width: 1024px) 540px, 92vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover [object-position:42%_center]"
            />
            <Image
              src={deckAi.src}
              width={deckAi.width}
              height={deckAi.height}
              alt={dict.screenAlt}
              sizes="(min-width: 1024px) 360px, 60vw"
              className="absolute bottom-0 right-0 max-h-[47%] w-[60%] object-contain drop-shadow-media sm:right-[-2%] sm:w-[64%]"
            />
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {CAPABILITIES.map(({ key, media }, index) => {
            const capability = dict.capabilities[key];

            return (
              <li key={key}>
                <Reveal delay={index * 0.13}>
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src={media.src}
                      width={media.width}
                      height={media.height}
                      alt=""
                      sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 92vw"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <h3 className="mb-2 mt-4 font-display text-lg font-bold text-ink">
                    {capability.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-copy">
                    {capability.body}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="ai-panel relative mt-20 grid grid-cols-1 gap-9 overflow-hidden rounded-3xl px-5 py-8 text-brand-foreground sm:p-[clamp(2.5rem,6vw,5rem)] lg:mt-28 lg:grid-cols-2 lg:gap-[clamp(2.25rem,5vw,4.5rem)]">
          <div className="flex flex-col justify-center">
            <Image
              src={parkwizeAiWhite.src}
              width={parkwizeAiWhite.width}
              height={parkwizeAiWhite.height}
              alt={dict.logoAlt}
              sizes="360px"
              className="mb-7 h-9 w-auto self-start sm:h-12"
            />
            <h3 className="font-display text-[clamp(1.75rem,3vw,2.375rem)] font-bold leading-tight">
              {dict.sources.title}
            </h3>
            <p className="mb-7 mt-4 text-[1.0625rem] leading-relaxed text-inverse-foreground">
              {dict.sources.lead}
            </p>
            <ul className="grid border-t border-panel-rule md:grid-cols-2">
              {SOURCES.map(({ key, Icon }, index) => {
                const source = dict.sources.items[key];

                return (
                  <li
                    key={key}
                    className={cn(
                      "flex items-center gap-3.5 border-b border-panel-rule py-4 transition-colors hover:bg-panel-tile md:py-5",
                      index % 2 === 0 ? "md:border-r md:pr-5" : "md:pl-5",
                    )}
                  >
                    <span className="flex size-[2.125rem] shrink-0 items-center justify-center rounded-md bg-panel-tile">
                      <Icon aria-hidden className="size-[1.125rem]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold">
                        {source.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-inverse-foreground">
                        {source.body}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0 self-start rounded-2xl bg-surface p-6 text-ink shadow-card-deep sm:p-[clamp(1.75rem,3.5vw,2.5rem)]">
            <p className="text-[0.9375rem] font-extrabold text-ink">
              <AccentText
                text={dict.chat.eyebrow}
                accentClassName="text-deck-bright"
              />
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-ink">
              {dict.chat.title}
            </h3>
            <p className="mb-6 mt-2 text-sm leading-relaxed text-copy">
              {dict.chat.lead}
            </p>
            <AiChatReplay
              conversation={dict.chat.conversation}
              assistant={dict.chat.assistant}
              you={dict.chat.you}
              placeholder={dict.chat.placeholder}
              transcriptLabel={dict.chat.transcriptLabel}
            />
          </div>
        </Reveal>

        <Reveal className="mt-20 flex flex-col items-center gap-6 text-center lg:mt-28">
          <p className="max-w-[22ch] text-balance font-display text-[clamp(1.375rem,2.6vw,2.125rem)] font-bold leading-[1.18] tracking-[-0.02em] text-ink">
            {dict.outcome}
          </p>
          <ButtonLink href={CONTACT_HREF} locale={locale} withArrow>
            {dict.outcomeCta}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
