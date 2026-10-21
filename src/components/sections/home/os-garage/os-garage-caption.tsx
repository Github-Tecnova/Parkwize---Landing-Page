/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject } from "react";
import { Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { HomeDictionary } from "@/content/dictionary";
import { FADE_BASE } from "@/lib/motion";
import { STORY_STEPS } from "@/lib/os-garage-journey";
import { cn } from "@/lib/utils";

type OsGarageCaptionProps = {
  story: HomeDictionary["os"]["hub"]["story"];
  step: number;
  paused: boolean;
  still: boolean;
  progress: RefObject<HTMLDivElement | null>;
  onToggle: () => void;
  className?: string;
};

export function OsGarageCaption({
  story,
  step,
  paused,
  still,
  progress,
  onToggle,
  className,
}: OsGarageCaptionProps) {
  const copy = story.steps[STORY_STEPS[step].key];
  const label = story.stepLabel
    .replace("{current}", String(step + 1))
    .replace("{total}", String(STORY_STEPS.length));

  return (
    <div className={cn("glass rounded-2xl p-4", className)}>
      <div className="flex min-h-6 items-center justify-between gap-3">
        <p className="eyebrow text-copy">{label}</p>
        {!still && (
          <button
            type="button"
            aria-pressed={paused}
            aria-label={paused ? story.play : story.pause}
            onClick={onToggle}
            className="-m-2.5 grid size-11 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {paused ? (
              <Play aria-hidden className="size-4" />
            ) : (
              <Pause aria-hidden className="size-4" />
            )}
          </button>
        )}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={FADE_BASE}
        >
          <p className="mt-1 font-display text-base font-semibold leading-snug text-ink">
            {copy.title}
          </p>
          <p className="mt-1 text-[0.8125rem] leading-snug text-copy">
            {copy.body}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-hairline">
        <div
          ref={progress}
          className="h-full origin-left scale-x-0 bg-deck-bright"
        />
      </div>
    </div>
  );
}
