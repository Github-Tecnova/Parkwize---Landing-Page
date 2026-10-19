/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type ResultItem = {
  value: string;
  label: string;
  body: string;
};

type ProductResultsProps = {
  eyebrow: string;
  title: string;
  items: ResultItem[];
};

export function ProductResults({ eyebrow, title, items }: ProductResultsProps) {
  return (
    <section className="bg-dot-grid bg-surface py-14 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>
        <Reveal className="mt-10">
          <dl className="grid grid-cols-2 border-t border-hairline lg:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "flex flex-col gap-1.5 border-b border-hairline py-6 lg:border-b-0 lg:py-8",
                  index % 2 === 1 ? "border-l pl-4 sm:pl-6" : "pr-4 sm:pr-6",
                  index > 0 && "lg:border-l lg:pl-6",
                  index === 2 && "lg:pl-6",
                )}
              >
                <dt className="text-xs font-bold uppercase tracking-wide text-ink">
                  {item.label}
                </dt>
                <dd className="order-first font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-none tracking-tight text-deck">
                  {item.value}
                </dd>
                <dd className="text-sm leading-relaxed text-copy">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
