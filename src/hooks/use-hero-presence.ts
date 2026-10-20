/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useState } from "react";

const HERO_SELECTOR = ".under-top-bar";

export function useHeroPresence() {
  const [present, setPresent] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setPresent(document.querySelector(HERO_SELECTOR) !== null);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return present;
}
