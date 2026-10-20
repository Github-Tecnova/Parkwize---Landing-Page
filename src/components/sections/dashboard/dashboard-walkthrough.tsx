/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionProps,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Container } from "@/components/layout/section/container";
import { DashboardDictionary } from "@/content/dictionary";
import { useStepCycle } from "@/hooks/use-step-cycle";
import { MEDIA } from "@/lib/media";
import { CAMERA_MOVE, FADE_BASE, SCROLL_SPRING } from "@/lib/motion";
import { scrollToPosition } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

type ShowcaseDictionary = DashboardDictionary["showcase"];

type CameraStop = { scale: number; x: number; y: number };

const CAMERA_STOPS: CameraStop[] = [
  { scale: 1, x: 0, y: 0 },
  { scale: 2.14, x: 30.9, y: 63 },
  { scale: 1.78, x: 13.3, y: -43.3 },
  { scale: 1.7, x: -53.9, y: -38.4 },
];

const PROGRESS_FRAMES = [0, 0.12, 0.3, 0.42, 0.6, 0.72, 0.9, 1];
const STEP_THRESHOLDS = [0.21, 0.51, 0.81];
const STEP_TARGETS = [0.06, 0.36, 0.66, 0.95];
const STEP_INTERVAL = 4200;

function holdFrames(key: keyof CameraStop) {
  return CAMERA_STOPS.flatMap((stop) => [stop[key], stop[key]]);
}

const percent = (value: number) => `${value}%`;

type WalkthroughStageProps = Pick<
  MotionProps,
  "style" | "animate" | "transition"
> & {
  alt: string;
};

function WalkthroughStage({
  alt,
  style,
  animate,
  transition,
}: WalkthroughStageProps) {
  const { dashboardMockup } = MEDIA.product;

  return (
    <div className="relative aspect-[1716/1846] w-full overflow-hidden rounded-3xl border border-inverse-border bg-navy-raised">
      <motion.div
        className="absolute inset-0"
        style={style}
        initial={false}
        animate={animate}
        transition={transition}
      >
        <Image
          src={dashboardMockup.src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 1200px, 100vw"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}

type WalkthroughCopyProps = {
  dict: ShowcaseDictionary;
  current: number;
  onSelect: (index: number) => void;
  vertical?: boolean;
};

function WalkthroughCopy({
  dict,
  current,
  onSelect,
  vertical = false,
}: WalkthroughCopyProps) {
  const active = dict.steps[current];

  return (
    <div>
      <p className="kicker text-inverse-muted">{dict.eyebrow}</p>
      <h2 className="mt-4 text-balance font-display text-3xl font-semibold text-inverse-foreground lg:text-[2.25rem] lg:leading-tight">
        {dict.caption}
      </h2>
      <ol
        aria-label={dict.railLabel}
        className={cn(
          "mt-8",
          vertical
            ? "flex flex-col border-l border-inverse-border"
            : "grid grid-cols-4 border-b border-inverse-border",
        )}
      >
        {dict.steps.map((step, index) => {
          const selected = index === current;

          return (
            <li key={step.label} className="relative">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(index)}
                className={cn(
                  "flex min-h-11 w-full items-center gap-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  vertical
                    ? "px-5 py-3"
                    : "flex-col justify-center gap-1.5 px-1 py-3 text-center sm:flex-row sm:gap-2",
                  selected
                    ? "text-inverse-foreground"
                    : "text-inverse-muted hover:text-inverse-hover",
                )}
              >
                <span
                  className={cn(
                    "eyebrow",
                    selected ? "text-deck-bright" : "text-inverse-muted",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-semibold",
                    vertical
                      ? "font-display text-lg"
                      : "text-[0.6875rem] uppercase tracking-wide sm:text-xs",
                  )}
                >
                  {step.label}
                </span>
              </button>
              {selected && (
                <motion.span
                  aria-hidden
                  layoutId={vertical ? "walkthrough-rail" : "walkthrough-tab"}
                  transition={FADE_BASE}
                  className={cn(
                    "absolute bg-deck-bright",
                    vertical
                      ? "inset-y-0 -left-px w-0.5"
                      : "inset-x-0 -bottom-px h-0.5",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
      <div
        aria-live="polite"
        className={cn(
          "relative",
          vertical ? "mt-10 min-h-36" : "mt-6 min-h-32",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={FADE_BASE}
          >
            <h3 className="font-display text-2xl font-semibold text-inverse-foreground sm:text-[1.75rem]">
              {active.title}
            </h3>
            <p className="mt-3 max-w-md text-pretty text-[0.9375rem] leading-relaxed text-inverse-muted">
              {active.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PinnedWalkthrough({ dict }: { dict: ShowcaseDictionary }) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const scale = useTransform(progress, PROGRESS_FRAMES, holdFrames("scale"));
  const x = useTransform(
    progress,
    PROGRESS_FRAMES,
    holdFrames("x").map(percent),
  );
  const y = useTransform(
    progress,
    PROGRESS_FRAMES,
    holdFrames("y").map(percent),
  );

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setCurrent(
      STEP_THRESHOLDS.filter((threshold) => value >= threshold).length,
    );
  });

  const goTo = (index: number) => {
    const element = track.current;
    if (!element) return;
    const start = element.getBoundingClientRect().top + window.scrollY;
    const distance = element.offsetHeight - window.innerHeight;
    scrollToPosition(start + STEP_TARGETS[index] * distance);
  };

  return (
    <div ref={track} className="relative hidden h-[340svh] lg:block">
      <div className="sticky top-0 flex h-svh items-center pt-[var(--top-bar-offset)]">
        <Container className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-16">
          <WalkthroughCopy
            dict={dict}
            current={current}
            onSelect={goTo}
            vertical
          />
          <div className="mx-auto w-full max-w-[calc((100svh-var(--top-bar-offset)-4rem)*0.93)]">
            <WalkthroughStage alt={dict.imageAlt} style={{ scale, x, y }} />
          </div>
        </Container>
      </div>
    </div>
  );
}

function SteppedWalkthrough({
  dict,
  className,
}: {
  dict: ShowcaseDictionary;
  className?: string;
}) {
  const { ref, step, selectStep, reducedMotion } = useStepCycle(
    CAMERA_STOPS.length,
    STEP_INTERVAL,
  );
  const stop = CAMERA_STOPS[step];

  return (
    <div ref={ref} className={className}>
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <div className="mx-auto w-full max-w-xl lg:order-last">
          <WalkthroughStage
            alt={dict.imageAlt}
            animate={{
              scale: stop.scale,
              x: percent(stop.x),
              y: percent(stop.y),
            }}
            transition={reducedMotion ? { duration: 0 } : CAMERA_MOVE}
          />
        </div>
        <WalkthroughCopy dict={dict} current={step} onSelect={selectStep} />
      </Container>
    </div>
  );
}

export function DashboardWalkthrough({ dict }: { dict: ShowcaseDictionary }) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {!reducedMotion && <PinnedWalkthrough dict={dict} />}
      <SteppedWalkthrough
        dict={dict}
        className={reducedMotion ? undefined : "lg:hidden"}
      />
    </>
  );
}
