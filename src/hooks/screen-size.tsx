/*
 * Copyright (c) 2025. Tecnova
 */

"use client";

import { useEffect, useState } from "react";

interface ScreenSize {
  width: number;
  height: number;
  isSmall: boolean;
}

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isSmall: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isSmall: window.innerWidth < 768,
      });
    };

    window.addEventListener("resize", handleResize);

    // Call once to set initial size
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
