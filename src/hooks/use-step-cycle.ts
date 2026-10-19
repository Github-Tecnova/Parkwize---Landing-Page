/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function useStepCycle(count: number, interval: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || !inView || reducedMotion) return;
    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % count),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [auto, inView, reducedMotion, count, interval]);

  const selectStep = (index: number) => {
    setAuto(false);
    setStep(index);
  };

  return { ref, step, selectStep, reducedMotion };
}
