/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { LOGO_PATHS, LOGO_VIEWBOX } from "@/components/brand/parkwize-logo";
import {
  Dot,
  DotFieldMetrics,
  DotFieldShape,
  drawDots,
  getDotFieldAspectRatio,
  getDotFieldMetrics,
  Point,
  resolveCssColor,
  sampleDots,
  stepDots,
} from "@/lib/dot-field";
import { cn } from "@/lib/utils";

const SHAPE: DotFieldShape = { paths: LOGO_PATHS, ...LOGO_VIEWBOX };
const MAX_PIXEL_RATIO = 2;
const POINTER_MOVE_EVENTS = ["pointermove", "pointerdown"] as const;
const POINTER_END_EVENTS = [
  "pointerleave",
  "pointercancel",
  "pointerup",
] as const;

type DotWordmarkProps = {
  className?: string;
};

export function DotWordmark({ className }: DotWordmarkProps) {
  return (
    <div
      aria-hidden
      className={cn("w-full select-none", className)}
      style={{ aspectRatio: getDotFieldAspectRatio(SHAPE) }}
    >
      <canvas ref={mountDotWordmark} className="block size-full touch-pan-y" />
    </div>
  );
}

function mountDotWordmark(canvas: HTMLCanvasElement | null) {
  const context = canvas?.getContext("2d");
  if (!canvas || !context) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const colors = {
    base: resolveCssColor(canvas, "--inverse-foreground"),
    accent: resolveCssColor(canvas, "--brand"),
  };

  let dots: Dot[] = [];
  let metrics: DotFieldMetrics | null = null;
  let pointer: Point | null = null;
  let frame = 0;
  let visible = true;

  const render = () => {
    if (metrics) drawDots(context, dots, metrics, colors);
  };

  const tick = () => {
    frame = 0;
    if (!metrics || !visible) return;
    const moving = stepDots(dots, pointer, metrics);
    render();
    if (moving || pointer) frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!frame && visible && !reducedMotion) {
      frame = requestAnimationFrame(tick);
    }
  };

  const layout = () => {
    const width = canvas.clientWidth;
    if (!width) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    metrics = getDotFieldMetrics(width, SHAPE);
    canvas.width = Math.round(metrics.width * pixelRatio);
    canvas.height = Math.round(metrics.height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    dots = sampleDots(SHAPE, metrics);
    render();
  };

  const handlePointerMove = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    start();
  };

  const handlePointerEnd = () => {
    pointer = null;
    start();
  };

  const resizeObserver = new ResizeObserver(layout);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  });

  resizeObserver.observe(canvas);
  intersectionObserver.observe(canvas);

  if (!reducedMotion) {
    POINTER_MOVE_EVENTS.forEach((type) =>
      canvas.addEventListener(type, handlePointerMove),
    );
    POINTER_END_EVENTS.forEach((type) =>
      canvas.addEventListener(type, handlePointerEnd),
    );
  }

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    POINTER_MOVE_EVENTS.forEach((type) =>
      canvas.removeEventListener(type, handlePointerMove),
    );
    POINTER_END_EVENTS.forEach((type) =>
      canvas.removeEventListener(type, handlePointerEnd),
    );
  };
}
