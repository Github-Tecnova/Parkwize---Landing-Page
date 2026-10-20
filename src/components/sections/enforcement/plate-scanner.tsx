/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CAR_REAR_PLATE, CarRear } from "@/components/media/car-rear";
import { FADE_BASE, SPRING_SMOOTH } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ScanPhase = "sweep" | "lock" | "read" | "done";

type PlateScannerProps = {
  plate: string;
  scanning: boolean;
  animate: boolean;
  scanningLabel: string;
  confidence: string;
};

const SWEEP_MS = 900;

const SCHEDULE: [ScanPhase, number][] = [
  ["lock", SWEEP_MS],
  ["read", 1300],
  ["done", 2000],
];

const GLYPHS = "ABCDEFGHJKLMNPRSTVWXYZ0123456789";
const CHAR_STEP = 90;
const SCRAMBLE_TICK = 45;

const FULL_FRAME = { left: "4%", top: "6%", width: "92%", height: "88%" };
const PLATE_FRAME = { left: "31%", top: "56%", width: "38%", height: "24%" };

const CORNERS = [
  "left-0 top-0 border-l-2 border-t-2 rounded-tl-lg",
  "right-0 top-0 border-r-2 border-t-2 rounded-tr-lg",
  "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg",
  "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg",
];

function scramble(plate: string, elapsed: number) {
  return plate
    .split("")
    .map((char, index) =>
      char === " " || elapsed >= index * CHAR_STEP
        ? char
        : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    )
    .join("");
}

function useScanPhase(active: boolean) {
  const [phase, setPhase] = useState<ScanPhase>(active ? "sweep" : "done");

  useEffect(() => {
    if (!active) {
      setPhase("done");
      return;
    }

    setPhase("sweep");
    const timers = SCHEDULE.map(([next, at]) =>
      window.setTimeout(() => setPhase(next), at),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [active]);

  return phase;
}

function useResolvedPlate(plate: string, reading: boolean) {
  const [shown, setShown] = useState(plate);

  useEffect(() => {
    if (!reading) {
      setShown(plate);
      return;
    }

    const start = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - start;
      setShown(scramble(plate, elapsed));
      if (elapsed >= plate.length * CHAR_STEP) window.clearInterval(timer);
    }, SCRAMBLE_TICK);

    return () => window.clearInterval(timer);
  }, [plate, reading]);

  return shown;
}

export function PlateScanner({
  plate,
  scanning,
  animate,
  scanningLabel,
  confidence,
}: PlateScannerProps) {
  const phase = useScanPhase(scanning && animate);
  const hidden = phase === "sweep" || phase === "lock";
  const shown = useResolvedPlate(plate, phase === "read");
  const locked = phase !== "sweep";

  return (
    <div className="relative mx-auto w-full max-w-[13.5rem] px-2.5 py-2">
      {CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden
          className={cn("absolute size-4 border-deck-bright", corner)}
        />
      ))}

      <div className="relative">
        <CarRear />
        <span
          className="absolute flex items-center justify-center whitespace-nowrap rounded-[0.3rem] border border-hairline bg-surface font-display text-[0.8125rem] font-bold tracking-[0.06em] text-ink"
          style={CAR_REAR_PLATE}
        >
          <span className={cn(hidden && "opacity-0")}>{shown}</span>
        </span>

        {animate && phase === "sweep" && (
          <motion.span
            aria-hidden
            className="absolute inset-x-0 h-0.5 rounded-full bg-deck-bright"
            initial={{ top: "4%" }}
            animate={{ top: "94%" }}
            transition={{ duration: SWEEP_MS / 1000, ease: "easeInOut" }}
          />
        )}

        <motion.span
          aria-hidden
          className="absolute rounded-md border-2 border-deck-bright"
          initial={false}
          animate={locked ? PLATE_FRAME : FULL_FRAME}
          transition={animate ? SPRING_SMOOTH : { duration: 0 }}
        />
      </div>

      <div className="mt-2 flex h-5 justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phase === "done" ? "done" : "scanning"}
            className={cn(
              "eyebrow rounded-full px-2 leading-5",
              phase === "done" ? "bg-deck-tint text-deck" : "text-copy",
            )}
            initial={animate ? { opacity: 0, y: 4 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={FADE_BASE}
          >
            {phase === "done" ? confidence : scanningLabel}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
