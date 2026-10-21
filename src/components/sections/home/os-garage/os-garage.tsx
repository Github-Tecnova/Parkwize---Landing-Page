/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion } from "motion/react";
import { OsGarageSystems } from "@/components/sections/home/os-garage/os-garage-systems";
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
  const [pinned, setPinned] = useState<GarageDeviceKey | null>(null);
  const highlight = hovered ?? pinned;
  const markers = useRef<(HTMLElement | null)[]>([]);
  const rows = useRef<(HTMLElement | null)[]>([]);

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

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-center lg:gap-8">
      <div
        ref={stage}
        className={cn(
          "relative aspect-[4/3] w-full sm:aspect-[16/11]",
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
              markers={markers}
              rows={rows}
              localeTag={LOCALE_TAGS[locale]}
              onReady={() => setReady(true)}
            />
          </div>
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {GARAGE_DEVICES.map((device, index) => (
            <span
              key={device.key}
              ref={(node) => {
                markers.current[index] = node;
              }}
              data-active={highlight === device.key}
              data-dim={highlight !== null && highlight !== device.key}
              data-live="false"
              className="invisible absolute left-0 top-0 grid size-5 place-items-center rounded-full bg-surface text-[0.625rem] font-semibold text-ink shadow-media ring-1 ring-hairline transition-colors [opacity:var(--appear,0)] data-[active=true]:bg-deck data-[active=true]:text-brand-foreground data-[live=true]:ring-2 data-[live=true]:ring-success data-[dim=true]:[opacity:calc(var(--appear,0)*0.35)] sm:size-6 sm:text-[0.6875rem]"
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>

      <OsGarageSystems
        locale={locale}
        dict={dict}
        highlight={highlight}
        pinned={pinned}
        rows={rows}
        onHover={setHovered}
        onPin={(key) => setPinned((current) => (current === key ? null : key))}
      />
    </div>
  );
}
