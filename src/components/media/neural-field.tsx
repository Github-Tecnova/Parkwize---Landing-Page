/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { resolveCssColor } from "@/lib/dot-field";
import { createNetwork, drawNetwork, stepNetwork } from "@/lib/neural-field";
import { cn } from "@/lib/utils";

const MAX_PIXEL_RATIO = 2;
const MOBILE_BREAKPOINT = 640;
const NODES_DESKTOP = 72;
const NODES_MOBILE = 40;
const PARALLAX = 28;
const EASING = 0.06;

type NeuralFieldProps = {
  className?: string;
};

export function NeuralField({ className }: NeuralFieldProps) {
  return (
    <canvas
      ref={mountNeuralField}
      aria-hidden
      className={cn("neural-mask pointer-events-none block", className)}
    />
  );
}

function mountNeuralField(canvas: HTMLCanvasElement | null) {
  const context = canvas?.getContext("2d");
  if (!canvas || !context) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const colors = {
    line: resolveCssColor(canvas, "--deck-bright"),
    node: resolveCssColor(canvas, "--inverse-foreground"),
    pulse: resolveCssColor(canvas, "--deck-bright"),
  };
  const offset = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  let network = createNetwork(NODES_DESKTOP, 1);
  let width = 0;
  let height = 0;
  let frame = 0;
  let previous = 0;
  let time = 0;
  let visible = true;

  const render = () =>
    drawNetwork(context, network, width, height, time, offset, colors);

  const tick = (now: number) => {
    const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    time += delta;
    offset.x += (target.x - offset.x) * EASING;
    offset.y += (target.y - offset.y) * EASING;
    stepNetwork(network, delta);
    render();
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frame || reducedMotion || !visible) return;
    previous = 0;
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    network = createNetwork(
      width < MOBILE_BREAKPOINT ? NODES_MOBILE : NODES_DESKTOP,
      width / height,
    );
    render();
  };

  const handlePointer = (event: PointerEvent) => {
    target.x = (event.clientX / window.innerWidth - 0.5) * -PARALLAX;
    target.y = (event.clientY / window.innerHeight - 0.5) * -PARALLAX;
  };

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });

  resizeObserver.observe(canvas);
  intersectionObserver.observe(canvas);
  resize();

  if (!reducedMotion) {
    window.addEventListener("pointermove", handlePointer, { passive: true });
  }

  return () => {
    stop();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    window.removeEventListener("pointermove", handlePointer);
  };
}
