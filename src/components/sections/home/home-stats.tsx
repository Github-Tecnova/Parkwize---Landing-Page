/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Container } from "@/components/layout/section/container";
import { CountUp } from "@/components/motion/count-up";
import { HomeDictionary } from "@/content/dictionary";
import { cn } from "@/lib/utils";

type HomeStatsProps = {
  dict: HomeDictionary["stats"];
};

export function HomeStats({ dict }: HomeStatsProps) {
  return (
    <section aria-label={dict.label} className="relative z-10 -mt-16">
      <Container className="max-w-[61rem]">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {dict.items.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col gap-1 py-4 lg:py-3",
                index % 2 === 1 ? "border-l border-hairline pl-4" : "pr-4",
                index < 2 && "border-b border-hairline lg:border-b-0",
                index > 0 && "lg:border-l lg:border-hairline lg:pl-6",
                "lg:pr-6",
              )}
            >
              <dt className="text-[0.625rem] font-bold uppercase leading-snug tracking-wide text-copy sm:text-xs">
                {stat.label}
              </dt>
              <dd className="order-first whitespace-nowrap font-display text-[clamp(1.875rem,4vw,3.375rem)] font-bold tabular-nums leading-tight">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="text-gradient-ink"
                />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
