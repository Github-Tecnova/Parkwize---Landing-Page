/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const finished = useRef(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!ref.current || finished.current) return;
    ref.current.textContent = formatCount(
      reducedMotion ? value : 0,
      prefix,
      suffix,
    );
  }, [reducedMotion, value, prefix, suffix]);

  useEffect(() => {
    if (!inView || reducedMotion || finished.current) return;

    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE_OUT_EXPO,
      onUpdate: (current) => {
        if (ref.current) {
          ref.current.textContent = formatCount(current, prefix, suffix);
        }
      },
      onComplete: () => {
        finished.current = true;
      },
    });

    return () => controls.stop();
  }, [inView, reducedMotion, value, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {formatCount(value, prefix, suffix)}
    </span>
  );
}

function formatCount(current: number, prefix: string, suffix: string) {
  return `${prefix}${Math.round(current)}${suffix}`;
}
