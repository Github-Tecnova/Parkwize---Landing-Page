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
  PointerState,
  resolveCssColor,
  sampleDots,
  stepDots,
} from "@/lib/dot-field";
import { cn } from "@/lib/utils";

const SHAPE: DotFieldShape = { paths: LOGO_PATHS, ...LOGO_VIEWBOX };
const MAX_PIXEL_RATIO = 2;
const POINTER_END_EVENTS = ["pointerleave", "pointercancel"] as const;
const VELOCITY_SMOOTHING = 0.35;
const VELOCITY_DECAY = 0.86;

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
  const pointer: PointerState = {
    position: null,
    velocity: { x: 0, y: 0 },
  };
  let frame = 0;
  let visible = true;

  const render = () => {
    if (metrics) drawDots(context, dots, metrics, colors);
  };

  const tick = () => {
    frame = 0;
    if (!metrics || !visible) return;
    const moving = stepDots(dots, pointer, metrics);
    pointer.velocity.x *= VELOCITY_DECAY;
    pointer.velocity.y *= VELOCITY_DECAY;
    render();
    if (moving || pointer.position) frame = requestAnimationFrame(tick);
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

  const locate = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const handlePointerMove = (event: PointerEvent) => {
    const next = locate(event);
    if (pointer.position) {
      pointer.velocity.x +=
        (next.x - pointer.position.x - pointer.velocity.x) * VELOCITY_SMOOTHING;
      pointer.velocity.y +=
        (next.y - pointer.position.y - pointer.velocity.y) * VELOCITY_SMOOTHING;
    }
    pointer.position = next;
    start();
  };

  const handlePointerEnd = () => {
    pointer.position = null;
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
    canvas.addEventListener("pointermove", handlePointerMove);
    POINTER_END_EVENTS.forEach((type) =>
      canvas.addEventListener(type, handlePointerEnd),
    );
  }

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    canvas.removeEventListener("pointermove", handlePointerMove);
    POINTER_END_EVENTS.forEach((type) =>
      canvas.removeEventListener(type, handlePointerEnd),
    );
  };
}
