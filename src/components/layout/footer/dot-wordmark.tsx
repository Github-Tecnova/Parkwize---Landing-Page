/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { LOGO_PATHS, LOGO_VIEWBOX } from "@/components/brand/parkwize-logo";
import {
  createDotField,
  createGrain,
  DotField,
  DotFieldShape,
  drawDotField,
  getDotFieldAspectRatio,
  Point,
  resolveCssColor,
  Shockwave,
  stepDotField,
} from "@/lib/dot-field";
import { cn } from "@/lib/utils";

const SHAPE: DotFieldShape = { paths: LOGO_PATHS, ...LOGO_VIEWBOX };
const MAX_PIXEL_RATIO = 2;
const POINTER_END_EVENTS = ["pointerleave", "pointercancel"] as const;

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
    ink: resolveCssColor(canvas, "--inverse-foreground"),
    warm: resolveCssColor(canvas, "--brand"),
  };
  const grain = createGrain();

  let field: DotField | null = null;
  let pointer: Point | null = null;
  let shockwave: Shockwave | null = null;
  let frame = 0;
  let visible = true;

  const tick = (now: number) => {
    frame = 0;
    if (!field || !visible) return;
    const moving = stepDotField(field, pointer, shockwave, now);
    drawDotField(context, field, colors, grain);
    if (moving) frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!frame && visible && !reducedMotion) {
      frame = requestAnimationFrame(tick);
    }
  };

  const layout = () => {
    const width = Math.round(canvas.clientWidth);
    if (!width) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    field = createDotField(SHAPE, width);
    canvas.width = Math.round(field.width * pixelRatio);
    canvas.height = Math.round(field.height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    drawDotField(context, field, colors, grain);
  };

  const locate = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const handlePointerMove = (event: PointerEvent) => {
    pointer = locate(event);
    start();
  };

  const handlePointerDown = (event: PointerEvent) => {
    shockwave = { ...locate(event), startedAt: performance.now() };
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
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    POINTER_END_EVENTS.forEach((type) =>
      canvas.addEventListener(type, handlePointerEnd),
    );
  }

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    canvas.removeEventListener("pointermove", handlePointerMove);
    canvas.removeEventListener("pointerdown", handlePointerDown);
    POINTER_END_EVENTS.forEach((type) =>
      canvas.removeEventListener(type, handlePointerEnd),
    );
  };
}
