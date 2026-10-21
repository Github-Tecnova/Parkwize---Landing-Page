/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type ProductProblemProps = {
  dict: {
    eyebrow: string;
    title: string;
    lead: string;
    items: { title: string; body: string }[];
  };
  icons: readonly LucideIcon[];
};

export function ProductProblem({ dict, icons }: ProductProblemProps) {
  return (
    <section className="py-14 sm:py-20">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.title}
          lead={dict.lead}
        />
        <Reveal delay={0.1}>
          <ul className="grid border-t border-hairline sm:grid-cols-2">
            {dict.items.map((item, index) => {
              const Icon = icons[index % icons.length];

              return (
                <li
                  key={item.title}
                  className={cn(
                    "flex gap-4 border-b border-hairline py-6",
                    index % 2 === 0 ? "sm:border-r sm:pr-6" : "sm:pl-6",
                  )}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-deck-tint text-deck">
                    <Icon aria-hidden className="size-[1.125rem]" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold text-ink">
                      {item.title}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-copy">
                      {item.body}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
