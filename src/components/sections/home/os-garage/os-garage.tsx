/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Link } from "@/components/navigation/link";
import { HomeDictionary } from "@/content/dictionary";
import { Locale, LOCALE_TAGS } from "@/lib/i18n";
import { DRAW_BASE } from "@/lib/motion";
import { GARAGE_DEVICES, GarageDeviceKey } from "@/lib/os-garage";
import { cn } from "@/lib/utils";

const loadScene = () =>
  import("@/components/sections/home/os-garage/os-garage-scene");

const OsGarageScene = dynamic(
  () => loadScene().then((module) => module.OsGarageScene),
  { ssr: false },
);

const COMPACT_QUERY = "(max-width: 767px)";
const LOAD_MARGIN = "1200px 0px";
const PREFETCH_DELAY_MS = 1500;
const READY_TIMEOUT_MS = 6000;

type OsGarageProps = {
  locale: Locale;
  dict: HomeDictionary["os"]["hub"];
};

function GaragePlaceholder() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 260"
      className="absolute inset-0 m-auto h-auto w-[86%] text-hairline"
    >
      <motion.path
        d="M200 40 L380 130 L200 220 L20 130 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={DRAW_BASE}
      />
    </svg>
  );
}

function useCompact() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(COMPACT_QUERY);
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return compact;
}

export function OsGarage({ locale, dict }: OsGarageProps) {
  const stage = useRef<HTMLDivElement>(null);
  const near = useInView(stage, { once: true, margin: LOAD_MARGIN });
  const inView = useInView(stage);
  const reducedMotion = useReducedMotion() ?? false;
  const compact = useCompact();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState<GarageDeviceKey | null>(null);
  const highlight = hovered ? [hovered] : null;
  const tags = useRef<(HTMLElement | null)[]>([]);
  const coreTag = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadScene().catch(() => setFailed(true));
    }, PREFETCH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!near || ready) return;
    const timer = window.setTimeout(() => setFailed(true), READY_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [near, ready]);

  const placed = ready && !failed;

  const links = GARAGE_DEVICES.map((device, index) => (
    <li
      key={device.key}
      ref={(node) => {
        tags.current[index] = node;
      }}
      data-dim={highlight !== null && !highlight.includes(device.key)}
      className={cn(
        !failed &&
          "absolute left-0 top-0 transition-[--dim] [--dim:1] [opacity:calc(var(--appear,0)*var(--dim))] data-[dim=true]:[--dim:0.3]",
        !failed && !placed && "invisible",
      )}
    >
      <Link
        href={`/${device.slug}`}
        lang={locale}
        onPointerEnter={() => setHovered(device.key)}
        onPointerLeave={() => setHovered(null)}
        onFocus={() => setHovered(device.key)}
        onBlur={() => setHovered(null)}
        className={cn(
          "pointer-events-auto relative inline-flex min-h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[0.6875rem] font-semibold shadow-media ring-1 transition-colors after:absolute after:-inset-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-xs",
          device.key === "intelligence"
            ? "bg-deck text-brand-foreground ring-deck"
            : "bg-surface text-ink ring-hairline hover:bg-deck hover:text-brand-foreground",
        )}
      >
        <span aria-hidden className="size-1.5 rounded-full bg-deck-bright" />
        {dict.nodes[device.key]}
      </Link>
    </li>
  ));

  return (
    <div>
      <div
        ref={stage}
        className={cn(
          "relative aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[16/10]",
          failed && "hidden",
        )}
      >
        {!ready && <GaragePlaceholder />}
        {near && !failed && (
          <div className="absolute inset-0">
            <OsGarageScene
              active={inView}
              reducedMotion={reducedMotion}
              compact={compact}
              highlight={highlight}
              tags={tags}
              coreTag={coreTag}
              localeTag={LOCALE_TAGS[locale]}
              onReady={() => setReady(true)}
            />
          </div>
        )}
        <span
          ref={coreTag}
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-0 top-0 inline-flex items-center gap-1.5 rounded-full bg-deck px-3 py-1 text-[0.6875rem] font-semibold text-brand-foreground shadow-media [opacity:var(--appear,0)] sm:text-xs",
            !placed && "invisible",
          )}
        >
          <span className="size-1.5 rounded-full bg-success motion-safe:animate-blink" />
          {dict.core}
        </span>
        {!failed && (
          <ul className="pointer-events-none absolute inset-0">{links}</ul>
        )}
      </div>

      {failed && (
        <ul className="flex flex-wrap justify-center gap-2">{links}</ul>
      )}
    </div>
  );
}
