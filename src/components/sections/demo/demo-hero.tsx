/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { DemoForm } from "@/components/sections/demo/demo-form";
import { LeadHero } from "@/components/sections/lead-hero";
import { DemoPageDictionary, PagesDictionary } from "@/content/dictionary";
import { cn } from "@/lib/utils";

type DemoHeroProps = {
  dict: DemoPageDictionary;
  pages: PagesDictionary;
};

export function DemoHero({ dict, pages }: DemoHeroProps) {
  const { hero } = dict;

  return (
    <LeadHero
      eyebrow={hero.eyebrow}
      title={hero.title}
      lead={hero.lead}
      madeIn={hero.madeIn}
      form={<DemoForm dict={dict.form} pages={pages} />}
    >
      <h2 className="kicker mt-9 tracking-[0.14em] text-copy">
        {hero.stepsLabel}
      </h2>
      <ol className="mt-4">
        {hero.steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
            {index < hero.steps.length - 1 && (
              <span
                aria-hidden
                className="absolute bottom-0 left-[0.9375rem] top-8 w-px bg-hairline"
              />
            )}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-deck text-sm font-bold text-brand-foreground">
              {index + 1}
            </span>
            <span className="pt-1">
              <span className="block font-bold text-ink">{step.title}</span>
              <span className="mt-0.5 block text-sm text-copy">
                {step.body}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <dl className="mt-9 grid grid-cols-3 border-y border-hairline">
        {hero.facts.map((fact, index) => (
          <div
            key={fact.label}
            className={cn(
              "flex flex-col py-4",
              index > 0 ? "border-l border-hairline pl-3 sm:pl-4" : "pr-3",
            )}
          >
            <dt className="text-xs leading-snug text-copy">{fact.label}</dt>
            <dd className="order-first font-display text-lg font-bold text-deck sm:text-2xl">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </LeadHero>
  );
}
