/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useSpring } from "motion/react";
import { CURSOR_SPRING } from "@/lib/motion";

type PointerTiltProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

const FINE_POINTER =
  "(pointer: fine) and (prefers-reduced-motion: no-preference)";

export function PointerTilt({
  children,
  className,
  maxTilt = 6,
}: PointerTiltProps) {
  const frame = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, CURSOR_SPRING);
  const rotateY = useSpring(0, CURSOR_SPRING);

  useEffect(() => {
    const element = frame.current;
    const area = element?.closest("section");
    if (!element || !area || !window.matchMedia(FINE_POINTER).matches) return;

    const handleMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      rotateY.set(Math.max(-1, Math.min(1, x * 2)) * maxTilt);
      rotateX.set(Math.max(-1, Math.min(1, -y * 2)) * maxTilt);
    };
    const handleLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    area.addEventListener("pointermove", handleMove);
    area.addEventListener("pointerleave", handleLeave);
    return () => {
      area.removeEventListener("pointermove", handleMove);
      area.removeEventListener("pointerleave", handleLeave);
    };
  }, [rotateX, rotateY, maxTilt]);

  return (
    <motion.div
      ref={frame}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1400 }}
    >
      {children}
    </motion.div>
  );
}
