/*
 * Copyright (c) 2025-2026. Tecnova
 */

import type Lenis from "lenis";

let instance: Lenis | null = null;

export function registerSmoothScroll(lenis: Lenis | null) {
  instance = lenis;
}

export function pauseSmoothScroll() {
  instance?.stop();
}

export function resumeSmoothScroll() {
  instance?.start();
}

export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0);
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToPosition(top: number) {
  if (instance) {
    instance.scrollTo(top);
    return;
  }
  window.scrollTo({ top, behavior: "smooth" });
}
