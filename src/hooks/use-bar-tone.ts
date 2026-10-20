/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type BarTone = "light" | "dark";

const DARK_SELECTOR = '[data-top-bar="dark"]';

export function useBarTone(ref: RefObject<HTMLElement | null>) {
  const [tone, setTone] = useState<BarTone>("light");
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const bar = ref.current?.getBoundingClientRect();
      if (!bar) return;
      const probe = bar.top + bar.height / 2;
      const dark = [...document.querySelectorAll(DARK_SELECTOR)].some(
        (section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= probe && rect.bottom >= probe;
        },
      );
      setTone(dark ? "dark" : "light");
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, pathname]);

  return tone;
}
