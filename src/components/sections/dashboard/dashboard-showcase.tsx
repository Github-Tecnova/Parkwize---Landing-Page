/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Container } from "@/components/layout/section/container";
import { DashboardWalkthrough } from "@/components/sections/dashboard/dashboard-walkthrough";
import { DashboardDictionary } from "@/content/dictionary";
import { cn } from "@/lib/utils";

type DashboardShowcaseProps = {
  dict: DashboardDictionary["showcase"];
  summary: DashboardDictionary["summary"];
};

export function DashboardShowcase({ dict, summary }: DashboardShowcaseProps) {
  return (
    <section
      aria-label={dict.label}
      className="bg-navy pb-16 pt-10 text-inverse-foreground sm:pb-24 sm:pt-14"
    >
      <DashboardWalkthrough dict={dict} />
      <Container>
        <dl className="mt-16 grid w-full border-t border-inverse-border sm:grid-cols-3">
          {summary.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "flex flex-col border-b border-inverse-border py-5 sm:border-b-0 sm:pb-0 sm:pt-8",
                index === 0 ? "sm:pr-8" : "sm:border-l sm:px-8",
              )}
            >
              <dt className="mt-3.5 text-base font-bold">{item.title}</dt>
              <dd className="order-first font-display text-[2rem] font-semibold leading-none">
                {item.value}
              </dd>
              <dd className="mt-1.5 text-[0.8125rem] text-inverse-muted">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
