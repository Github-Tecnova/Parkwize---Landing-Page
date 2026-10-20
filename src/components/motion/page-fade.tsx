/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { FADE_BASE } from "@/lib/motion";

export function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const firstPath = useRef(pathname);
  const animate = pathname !== firstPath.current && !reducedMotion;

  useEffect(() => {
    if (pathname !== firstPath.current) firstPath.current = "";
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={FADE_BASE}
    >
      {children}
    </motion.div>
  );
}
