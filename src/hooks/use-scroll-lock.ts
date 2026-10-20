/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect } from "react";
import { pauseSmoothScroll, resumeSmoothScroll } from "@/lib/smooth-scroll";

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    pauseSmoothScroll();
    const { body } = document;
    const scrollY = window.scrollY;
    const lockedPath = window.location.pathname;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      window.scrollTo({
        top: window.location.pathname === lockedPath ? scrollY : 0,
        behavior: "instant",
      });
      resumeSmoothScroll();
    };
  }, [active]);
}
