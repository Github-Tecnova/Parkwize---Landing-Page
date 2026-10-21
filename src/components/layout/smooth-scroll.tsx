/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerSmoothScroll } from "@/lib/smooth-scroll";

const SCROLL_DURATION = 1.1;

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("GestureEvent" in window) return;

    const lenis = new Lenis({
      duration: SCROLL_DURATION,
      autoRaf: true,
      anchors: true,
    });
    registerSmoothScroll(lenis);

    return () => {
      registerSmoothScroll(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
