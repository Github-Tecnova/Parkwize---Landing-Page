/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { LegalArticleSection } from "@/components/sections/legal/legal-article-section";
import { LegalToc } from "@/components/sections/legal/legal-toc";
import { ButtonLink } from "@/components/ui/button-link";
import { LegalDictionary, LegalDocument } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { CONTACT_HREF } from "@/lib/navigation";

type LegalPageProps = {
  locale: Locale;
  dict: LegalDictionary;
  document: LegalDocument;
};

export function LegalPage({ locale, dict, document }: LegalPageProps) {
  const entries = document.sections.map(({ id, title }) => ({ id, title }));

  return (
    <>
      <section className="under-top-bar relative isolate overflow-hidden pb-10 sm:pb-14">
        <div
          aria-hidden
          className="bg-hero-fade absolute inset-x-0 top-0 -z-10 h-[56rem]"
        />
        <Container className="pt-6 sm:pt-10 lg:pt-16">
          <p className="kicker text-deck">{dict.kicker}</p>
          <h1 className="mt-4 text-balance font-display text-h1 font-semibold text-ink">
            {document.title}
          </h1>
          <p className="eyebrow mt-4 text-copy">
            {dict.updatedLabel} · <time>{document.updated}</time>
          </p>
          <p className="mt-6 max-w-prose text-pretty text-[0.9375rem] leading-relaxed text-copy sm:text-base">
            {document.intro}
          </p>
        </Container>
      </section>
      <section className="pb-14 sm:pb-20">
        <Container className="grid gap-8 border-t border-hairline pt-8 sm:pt-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <nav
            aria-label={dict.tocLabel}
            className="lg:sticky lg:top-[calc(var(--top-bar-offset)+2rem)] lg:self-start"
          >
            <details className="group rounded-2xl border border-hairline lg:hidden">
              <summary className="flex min-h-12 list-none items-center justify-between gap-3 px-5 font-display text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
                {dict.tocLabel}
                <ChevronDown
                  aria-hidden
                  className="size-4 text-copy transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="border-t border-hairline px-5 py-3">
                <LegalToc entries={entries} />
              </div>
            </details>
            <div className="hidden lg:block">
              <p className="eyebrow text-copy">{dict.tocLabel}</p>
              <div className="mt-3">
                <LegalToc entries={entries} withRail />
              </div>
            </div>
          </nav>
          <article className="max-w-prose">
            {document.sections.map((section, index) => (
              <LegalArticleSection
                key={section.id}
                section={section}
                index={index + 1}
              />
            ))}
            <div className="mt-4 rounded-2xl border border-hairline bg-surface-muted p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                {dict.contact.title}
              </h2>
              <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-copy">
                {dict.contact.body}
              </p>
              <ButtonLink
                href={CONTACT_HREF}
                locale={locale}
                size="pill"
                withArrow
                className="mt-5"
              >
                {dict.contact.cta}
              </ButtonLink>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
