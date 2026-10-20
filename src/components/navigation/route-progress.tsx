/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { EASE_OUT_EXPO, FADE_BASE } from "@/lib/motion";
import { onRouteProgressStart } from "@/lib/route-progress";

const SAFETY_TIMEOUT = 8000;

type Phase = "idle" | "loading" | "done";

export function RouteProgress() {
  const [phase, setPhase] = useState<Phase>("idle");
  const pathname = usePathname();
  const timer = useRef<number | undefined>(undefined);

  useEffect(
    () =>
      onRouteProgressStart(() => {
        window.clearTimeout(timer.current);
        setPhase("loading");
        timer.current = window.setTimeout(
          () => setPhase("done"),
          SAFETY_TIMEOUT,
        );
      }),
    [],
  );

  useEffect(() => {
    window.clearTimeout(timer.current);
    setPhase((current) => (current === "loading" ? "done" : current));
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          key="route-progress"
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
          exit={{ opacity: 0 }}
          transition={FADE_BASE}
        >
          <motion.div
            className="h-full origin-left bg-deck shadow-deck"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "done" ? 1 : 0.8 }}
            transition={
              phase === "done"
                ? { duration: 0.25, ease: EASE_OUT_EXPO }
                : { duration: 2.4, ease: EASE_OUT_EXPO }
            }
            onAnimationComplete={() => {
              if (phase === "done") setPhase("idle");
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
