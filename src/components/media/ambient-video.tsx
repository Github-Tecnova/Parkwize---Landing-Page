/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { VideoSource } from "@/lib/media";

type AmbientVideoProps = {
  sources: readonly VideoSource[];
  poster: string;
  label: string;
  className?: string;
};

export function AmbientVideo({
  sources,
  poster,
  label,
  className,
}: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "120px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (inView && !reducedMotion) {
      video.play().catch(() => video.pause());
    } else {
      video.pause();
    }
  }, [inView, reducedMotion]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
      className={className}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
