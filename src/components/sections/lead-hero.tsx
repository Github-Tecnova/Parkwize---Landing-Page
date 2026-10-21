/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ReactNode } from "react";
import { MapleLeaf } from "@/components/brand/maple-leaf";
import { Container } from "@/components/layout/section/container";
import { AccentText } from "@/components/typography/accent-text";

type LeadHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  madeIn: string;
  form: ReactNode;
  children: ReactNode;
};

export function LeadHero({
  eyebrow,
  title,
  lead,
  madeIn,
  form,
  children,
}: LeadHeroProps) {
  return (
    <section className="under-top-bar bg-bay-lines relative isolate pb-16 lg:pb-24">
      <div
        aria-hidden
        className="bg-hero-fade absolute inset-x-0 top-0 -z-10 h-[56rem]"
      />
      <Container className="grid items-start gap-12 pt-6 sm:pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:pt-16">
        <div className="lg:sticky lg:top-[calc(var(--top-bar-offset)+2rem)]">
          <p className="kicker text-deck">{eyebrow}</p>
          <h1 className="mt-4 text-balance font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
            <AccentText text={title} />
          </h1>
          <p className="mt-5 text-pretty text-[0.9375rem] leading-relaxed text-copy sm:text-base">
            {lead}
          </p>
          {children}
          <p className="mt-6 flex items-center gap-2 text-[0.71875rem] font-semibold uppercase tracking-[0.16em] text-copy">
            <MapleLeaf className="h-[13px] w-3 text-maple" />
            {madeIn}
          </p>
        </div>
        {form}
      </Container>
    </section>
  );
}
