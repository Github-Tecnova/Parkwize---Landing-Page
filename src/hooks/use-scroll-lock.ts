/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect } from "react";

export function useScrollLock(
  active: boolean,
  mediaQuery = "(max-width: 767px)",
) {
  useEffect(() => {
    if (!active || !window.matchMedia(mediaQuery).matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active, mediaQuery]);
}
