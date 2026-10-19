/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ArrowRight, ArrowUpRight, Activity, MonitorPlay } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { LeadHero } from "@/components/sections/lead-hero";
import { ContactPageDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { DEMO_HREF, DEMO_URL, SYSTEM_STATUS_URL } from "@/lib/navigation";

type ContactHeroProps = {
  locale: Locale;
  dict: ContactPageDictionary;
};

export function ContactHero({ locale, dict }: ContactHeroProps) {
  const { hero } = dict;
  const channels = [
    {
      href: DEMO_URL,
      title: hero.liveDemo,
      body: hero.liveDemoBody,
      Icon: MonitorPlay,
    },
    {
      href: SYSTEM_STATUS_URL,
      title: hero.status,
      body: hero.statusBody,
      Icon: Activity,
    },
  ];

  return (
    <LeadHero
      eyebrow={hero.eyebrow}
      title={hero.title}
      lead={hero.lead}
      madeIn={hero.madeIn}
      form={<ContactForm locale={locale} dict={dict.form} />}
    >
      <h2 className="kicker mt-9 tracking-[0.14em] text-copy">
        {hero.exploreTitle}
      </h2>
      <p className="mt-2 text-sm text-copy">{hero.exploreBody}</p>
      <ul className="mt-4 grid gap-3">
        {channels.map(({ href, title, body, Icon }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-4 transition-colors hover:border-deck focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-deck-tint"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-deck-tint text-deck">
                <Icon aria-hidden className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-ink">{title}</span>
                <span className="block text-sm text-copy">{body}</span>
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-4 shrink-0 text-copy transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-deck"
              />
              <span className="sr-only">({hero.newTab})</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-copy">
        {hero.demoPrompt}{" "}
        <Link
          href={DEMO_HREF}
          lang={locale}
          className="inline-flex items-center gap-1 font-semibold text-deck underline-offset-2 hover:underline"
        >
          {hero.demoLink}
          <ArrowRight aria-hidden className="size-3.5" />
        </Link>
      </p>
    </LeadHero>
  );
}
