/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { ParkwizeLogo } from "@/components/brand/parkwize-logo";
import { SwapValue } from "@/components/motion/swap-value";
import { HomeDictionary } from "@/content/dictionary";
import { Locale, LOCALE_TAGS } from "@/lib/i18n";
import { CHART_MORPH, FADE_BASE, FADE_FAST } from "@/lib/motion";

type HeroScreenProps = {
  locale: Locale;
  dict: HomeDictionary["hero"]["screen"];
};

const TICK_MS = 2800;
const CHART = { width: 200, height: 64, points: 12 };
const FEED_SIZE = 3;
const START = { occupancy: 0.84, revenue: 12480, events: 1875 };
const SIDEBAR_ROWS = 7;

const SEED_SERIES = [
  0.42, 0.5, 0.46, 0.58, 0.62, 0.55, 0.66, 0.72, 0.64, 0.7, 0.78, 0.74,
];

function chartPath(series: number[], closed: boolean) {
  const step = CHART.width / (series.length - 1);
  const line = series
    .map((value, index) => {
      const x = (index * step).toFixed(1);
      const y = (CHART.height - value * CHART.height).toFixed(1);
      return `${index === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");
  return closed
    ? `${line} L${CHART.width} ${CHART.height} L0 ${CHART.height} Z`
    : line;
}

function nextValue(series: number[]) {
  const last = series[series.length - 1];
  const drift = (Math.random() - 0.45) * 0.16;
  return Math.min(Math.max(last + drift, 0.2), 0.95);
}

export function HeroScreen({ locale, dict }: HeroScreenProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame);
  const reducedMotion = useReducedMotion();
  const [series, setSeries] = useState(SEED_SERIES);
  const [stats, setStats] = useState(START);
  const [feedStart, setFeedStart] = useState(0);
  const formats = useMemo(() => {
    const tag = LOCALE_TAGS[locale];
    return {
      percent: new Intl.NumberFormat(tag, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
      money: new Intl.NumberFormat(tag, {
        style: "currency",
        currency: "CAD",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
      count: new Intl.NumberFormat(tag),
    };
  }, [locale]);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const timer = window.setInterval(() => {
      setSeries((current) => [...current.slice(1), nextValue(current)]);
      setStats((current) => ({
        occupancy: Math.min(
          Math.max(current.occupancy + (Math.random() - 0.5) * 0.02, 0.78),
          0.9,
        ),
        revenue: current.revenue + Math.ceil(Math.random() * 180),
        events: current.events + Math.ceil(Math.random() * 6),
      }));
      setFeedStart((current) => (current + 1) % dict.feedItems.length);
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [inView, reducedMotion, dict.feedItems.length]);

  const feed = Array.from(
    { length: FEED_SIZE },
    (_, index) => dict.feedItems[(feedStart + index) % dict.feedItems.length],
  );
  const kpis = [
    { label: dict.occupancy, value: formats.percent.format(stats.occupancy) },
    { label: dict.revenue, value: formats.money.format(stats.revenue) },
    { label: dict.events, value: formats.count.format(stats.events) },
  ];
  const animate = !reducedMotion;

  return (
    <div
      ref={frame}
      aria-hidden
      className="absolute left-[13.6%] top-[3.1%] h-[85%] w-[72.2%] [container-type:size]"
    >
      <div className="grid size-full grid-cols-[17%_minmax(0,1fr)] overflow-hidden rounded-[0.2rem] bg-surface text-[2.4cqw] leading-tight text-ink">
        <div className="flex flex-col gap-[3cqh] border-r border-hairline px-[2cqw] py-[4cqh]">
          <ParkwizeLogo title="Parkwize" className="w-full" />
          {Array.from({ length: SIDEBAR_ROWS }, (_, index) => (
            <span
              key={index}
              className={
                index === 0
                  ? "h-[3cqh] rounded-sm bg-deck-tint"
                  : "h-[1.6cqh] w-[80%] rounded-sm bg-surface-muted"
              }
            />
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-[3cqh] p-[3cqw]">
          <div className="flex items-center justify-between">
            <span className="font-display text-[4cqw] font-semibold">
              {dict.overview}
            </span>
            <span className="flex items-center gap-[1cqw] rounded-full border border-hairline px-[1.6cqw] py-[0.6cqh] text-copy">
              <span className="size-[1.4cqw] rounded-full bg-success motion-safe:animate-blink" />
              {dict.period}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-[2cqw]">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-[0.35rem] border border-hairline p-[1.8cqw]"
              >
                <p className="truncate text-copy">{kpi.label}</p>
                <SwapValue
                  value={kpi.value}
                  animate={animate}
                  className="mt-[0.8cqh] font-display text-[3.6cqw] font-semibold tabular-nums"
                />
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-[2cqw]">
            <div className="flex min-h-0 flex-col rounded-[0.35rem] border border-hairline p-[1.8cqw]">
              <p className="text-copy">{dict.chart}</p>
              <svg
                viewBox={`0 0 ${CHART.width} ${CHART.height}`}
                preserveAspectRatio="none"
                className="mt-[1.5cqh] min-h-0 w-full flex-1 overflow-visible"
              >
                <motion.path
                  className="fill-deck-tint"
                  initial={false}
                  animate={{ d: chartPath(series, true) }}
                  transition={animate ? CHART_MORPH : { duration: 0 }}
                />
                <motion.path
                  className="fill-none stroke-deck-bright"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  initial={false}
                  animate={{ d: chartPath(series, false) }}
                  transition={animate ? CHART_MORPH : { duration: 0 }}
                />
              </svg>
            </div>
            <div className="flex min-h-0 flex-col overflow-hidden rounded-[0.35rem] border border-hairline p-[1.8cqw]">
              <p className="text-copy">{dict.feed}</p>
              <ul className="mt-[1.5cqh] flex flex-col gap-[1.4cqh]">
                <AnimatePresence initial={false} mode="popLayout">
                  {feed.map((item) => (
                    <motion.li
                      key={item}
                      layout
                      initial={animate ? { opacity: 0, y: 6 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6, transition: FADE_FAST }}
                      transition={FADE_BASE}
                      className="flex items-center gap-[1.2cqw] truncate"
                    >
                      <span className="size-[1.4cqw] shrink-0 rounded-full bg-deck-bright" />
                      <span className="truncate">{item}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
