/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold, pathname]);

  return scrolled;
}
