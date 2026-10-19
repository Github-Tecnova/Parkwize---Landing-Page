/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useRef, useState } from "react";
import {
  BadgeDollarSign,
  BarChart3,
  Building2,
  CalendarDays,
  Car,
  Check,
  Clock,
  Cloud,
  Construction,
  DollarSign,
  Flag,
  LucideIcon,
  Plane,
  RefreshCw,
  TrainFront,
  Users,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { AiPageDictionary } from "@/content/dictionary";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ForecastDictionary = AiPageDictionary["forecast"];
type InternalKey = keyof ForecastDictionary["internal"];
type SignalKey = keyof ForecastDictionary["signals"];

const STEP_DURATION = 5200;

const INTERNAL: { key: InternalKey; Icon: LucideIcon }[] = [
  { key: "occupancy", Icon: BarChart3 },
  { key: "revenue", Icon: DollarSign },
  { key: "cycles", Icon: RefreshCw },
  { key: "turnover", Icon: Clock },
  { key: "members", Icon: Users },
];

const SIGNALS: { key: SignalKey; Icon: LucideIcon }[] = [
  { key: "weather", Icon: Cloud },
  { key: "events", Icon: CalendarDays },
  { key: "traffic", Icon: Car },
  { key: "roadworks", Icon: Construction },
  { key: "holidays", Icon: Flag },
  { key: "transit", Icon: TrainFront },
  { key: "prices", Icon: BadgeDollarSign },
  { key: "neighbors", Icon: Building2 },
  { key: "tourism", Icon: Plane },
];

const NET_IMPACT = [-5, -1, 21, 4, 12, 21, 0];
const BASE_FORECAST = [46, 50, 54, 55, 62, 66, 50];
const ADJUSTED_FORECAST = [44, 50, 65, 57, 69, 79, 50];

type AiForecastDemoProps = {
  dict: ForecastDictionary;
};

export function AiForecastDemo({ dict }: AiForecastDemoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const formatPercent = (value: number) =>
    `${value > 0 ? "+" : ""}${value}${dict.percentSuffix}`;

  useEffect(() => {
    if (!auto || !inView || reducedMotion) return;
    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % dict.steps.length),
      STEP_DURATION,
    );
    return () => window.clearInterval(timer);
  }, [auto, inView, reducedMotion, dict.steps.length]);

  const selectStep = (index: number) => {
    setAuto(false);
    setStep(index);
  };

  return (
    <section className="bg-dot-grid bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeader eyebrow={dict.eyebrow} title={dict.title} />

        <div
          ref={ref}
          className="mt-10 overflow-hidden rounded-3xl border border-hairline bg-surface shadow-media"
        >
          <ol
            aria-label={dict.railLabel}
            className="grid grid-cols-4 border-b border-hairline"
          >
            {dict.steps.map((item, index) => (
              <li key={item.label} className="relative">
                <button
                  type="button"
                  aria-pressed={step === index}
                  onClick={() => selectStep(index)}
                  className={cn(
                    "flex w-full flex-col items-center gap-2 px-1 py-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:flex-row sm:justify-center sm:gap-3 sm:py-5",
                    step === index ? "text-ink" : "text-copy hover:text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                      step >= index
                        ? "bg-deck text-white"
                        : "border border-hairline bg-surface text-copy",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wide sm:text-xs">
                    {item.label}
                  </span>
                </button>
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-[-1px] h-0.5 origin-left bg-deck transition-transform duration-500",
                    step === index ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </li>
            ))}
          </ol>

          <div className="min-h-[34rem] p-5 sm:min-h-[30rem] sm:p-8 lg:min-h-[27rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-deck-tint text-sm font-bold text-deck">
                    {step + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                    {dict.steps[step].title}
                  </h3>
                </div>
                <div className="mt-6">
                  {step === 0 && <InternalStep dict={dict} />}
                  {step === 1 && (
                    <SignalsStep dict={dict} formatPercent={formatPercent} />
                  )}
                  {step === 2 && (
                    <ImpactStep dict={dict} formatPercent={formatPercent} />
                  )}
                  {step === 3 && <ActionStep dict={dict} />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-4 text-xs text-copy">{dict.note}</p>
      </Container>
    </section>
  );
}

function StepLabel({ children }: { children: string }) {
  return <p className="kicker mb-4 tracking-[0.12em] text-copy">{children}</p>;
}

function InternalStep({ dict }: { dict: ForecastDictionary }) {
  return (
    <>
      <StepLabel>{dict.internalLabel}</StepLabel>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {INTERNAL.map(({ key, Icon }) => (
          <li
            key={key}
            className="flex items-center gap-3 rounded-2xl border border-hairline px-4 py-3.5"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-deck-tint text-deck">
              <Icon aria-hidden className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-bold text-ink">
                {dict.internal[key].title}
              </span>
              <span className="block text-xs text-copy">
                {dict.internal[key].body}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function SignalsStep({
  dict,
  formatPercent,
}: {
  dict: ForecastDictionary;
  formatPercent: (value: number) => string;
}) {
  return (
    <>
      <StepLabel>{dict.signalsLabel}</StepLabel>
      <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {SIGNALS.map(({ key, Icon }) => {
          const signal = dict.signals[key];

          return (
            <li
              key={key}
              className="flex items-center gap-3 rounded-2xl border border-hairline px-3.5 py-3"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-deck-tint text-deck">
                <Icon aria-hidden className="size-3.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-ink">
                  {signal.title}
                </span>
                <span className="block truncate text-xs text-copy">
                  {signal.body}
                </span>
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums",
                  signal.value < 0 ? "badge-negative" : "badge-positive",
                )}
              >
                {formatPercent(signal.value)}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function ImpactStep({
  dict,
  formatPercent,
}: {
  dict: ForecastDictionary;
  formatPercent: (value: number) => string;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold text-ink">{dict.chartTitle}</p>
        <p className="flex items-center gap-4 text-xs text-copy">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-sm bg-hairline" />
            {dict.legendBase}
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-sm bg-deck" />
            {dict.legendAdjusted}
          </span>
        </p>
      </div>
      <div className="mt-5 grid h-56 grid-cols-7 items-end gap-2 border-b border-hairline sm:gap-4">
        {dict.days.map((day, index) => (
          <div
            key={day}
            className="flex h-full flex-col items-center justify-end"
          >
            <span
              className={cn(
                "mb-2 rounded-full px-1.5 text-[0.625rem] font-bold tabular-nums sm:text-xs",
                NET_IMPACT[index] < 0 && "badge-negative",
                NET_IMPACT[index] > 0 && "badge-positive",
                NET_IMPACT[index] === 0 && "text-copy",
              )}
            >
              {formatPercent(NET_IMPACT[index])}
            </span>
            <div className="flex h-full w-full items-end justify-center gap-1">
              <motion.span
                className="w-1/2 max-w-5 rounded-t-md bg-hairline"
                initial={{ height: 0 }}
                animate={{ height: `${BASE_FORECAST[index]}%` }}
                transition={{
                  duration: 0.7,
                  ease: EASE_OUT_EXPO,
                  delay: index * 0.05,
                }}
              />
              <motion.span
                className="w-1/2 max-w-5 rounded-t-md bg-deck"
                initial={{ height: 0 }}
                animate={{ height: `${ADJUSTED_FORECAST[index]}%` }}
                transition={{
                  duration: 0.7,
                  ease: EASE_OUT_EXPO,
                  delay: 0.2 + index * 0.05,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2 text-center text-xs text-copy sm:gap-4">
        {dict.days.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <p className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-ink sm:text-sm">
        <span className="rounded-full border border-hairline px-3 py-1">
          {dict.formulaBase}
        </span>
        <span className="text-copy">×</span>
        <span className="rounded-full bg-deck-tint px-3 py-1 text-deck">
          {dict.formulaNet}
        </span>
        <span className="text-copy">=</span>
        <span className="rounded-full bg-deck px-3 py-1 text-white">
          {dict.formulaResult}
        </span>
      </p>
    </>
  );
}

function ActionStep({ dict }: { dict: ForecastDictionary }) {
  return (
    <div className="max-w-xl rounded-2xl border border-hairline p-5 shadow-sm sm:p-6">
      <p className="flex items-center gap-2 text-sm font-bold text-ink">
        <span aria-hidden className="size-2 rounded-full bg-deck" />
        {dict.recommendation}
      </p>
      <dl className="mt-4 divide-y divide-hairline">
        {dict.facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-center justify-between gap-4 py-2.5 text-sm"
          >
            <dt className="text-copy">{fact.label}</dt>
            <dd className="font-bold text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-deck px-5 py-2.5 text-sm font-semibold text-white">
        <Check aria-hidden className="size-4" />
        {dict.apply}
      </span>
    </div>
  );
}
