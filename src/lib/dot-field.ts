/*
 * Copyright (c) 2025-2026. Tecnova
 */

export type Point = { x: number; y: number };

export type Rgb = [number, number, number];

export type Dot = {
  originX: number;
  originY: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  heat: number;
};

export type DotFieldMetrics = {
  width: number;
  height: number;
  spacing: number;
  radius: number;
  influence: number;
};

export type DotFieldShape = {
  paths: readonly string[];
  width: number;
  height: number;
};

const PADDING = { x: 2, top: 7, bottom: 2 };
const STIFFNESS = 0.12;
const DAMPING = 0.78;
const PUSH_STRENGTH = 0.55;
const HEAT_EASING = 0.14;
const REST_THRESHOLD = 0.02;
const ALPHA_THRESHOLD = 128;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getDotFieldAspectRatio(shape: DotFieldShape) {
  return (
    (shape.width + PADDING.x * 2) /
    (shape.height + PADDING.top + PADDING.bottom)
  );
}

export function getDotFieldMetrics(
  width: number,
  shape: DotFieldShape,
): DotFieldMetrics {
  const spacing = clamp(width / 220, 3.5, 7);

  return {
    width,
    height: width / getDotFieldAspectRatio(shape),
    spacing,
    radius: spacing * 0.36,
    influence: clamp(width * 0.09, 60, 140),
  };
}

export function sampleDots(
  shape: DotFieldShape,
  metrics: DotFieldMetrics,
): Dot[] {
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(metrics.width);
  canvas.height = Math.ceil(metrics.height);

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return [];

  const scale = metrics.width / (shape.width + PADDING.x * 2);
  context.setTransform(
    scale,
    0,
    0,
    scale,
    PADDING.x * scale,
    PADDING.top * scale,
  );
  shape.paths.forEach((path) => context.fill(new Path2D(path)));

  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  const dots: Dot[] = [];

  for (let y = metrics.spacing / 2; y < canvas.height; y += metrics.spacing) {
    for (let x = metrics.spacing / 2; x < canvas.width; x += metrics.spacing) {
      const alpha =
        data[(Math.floor(y) * canvas.width + Math.floor(x)) * 4 + 3];
      if (alpha > ALPHA_THRESHOLD) {
        dots.push({
          originX: x,
          originY: y,
          x,
          y,
          velocityX: 0,
          velocityY: 0,
          heat: 0,
        });
      }
    }
  }

  return dots;
}

export function stepDots(
  dots: Dot[],
  pointer: Point | null,
  metrics: DotFieldMetrics,
): boolean {
  let moving = false;

  for (const dot of dots) {
    let targetX = dot.originX;
    let targetY = dot.originY;
    let targetHeat = 0;

    if (pointer) {
      const deltaX = dot.originX - pointer.x;
      const deltaY = dot.originY - pointer.y;
      const distance = Math.hypot(deltaX, deltaY) || 1;

      if (distance < metrics.influence) {
        const falloff = (1 - distance / metrics.influence) ** 2;
        const push = falloff * metrics.influence * PUSH_STRENGTH;
        targetX += (deltaX / distance) * push;
        targetY += (deltaY / distance) * push;
        targetHeat = falloff;
      }
    }

    dot.velocityX = (dot.velocityX + (targetX - dot.x) * STIFFNESS) * DAMPING;
    dot.velocityY = (dot.velocityY + (targetY - dot.y) * STIFFNESS) * DAMPING;
    dot.x += dot.velocityX;
    dot.y += dot.velocityY;
    dot.heat += (targetHeat - dot.heat) * HEAT_EASING;

    if (
      Math.abs(dot.x - targetX) > REST_THRESHOLD ||
      Math.abs(dot.y - targetY) > REST_THRESHOLD ||
      Math.abs(dot.heat - targetHeat) > REST_THRESHOLD
    ) {
      moving = true;
    }
  }

  return moving;
}

function mixColor(from: Rgb, to: Rgb, amount: number) {
  const channel = (index: number) =>
    Math.round(from[index] + (to[index] - from[index]) * amount);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

export function drawDots(
  context: CanvasRenderingContext2D,
  dots: Dot[],
  metrics: DotFieldMetrics,
  colors: { base: Rgb; accent: Rgb },
) {
  context.clearRect(0, 0, metrics.width, metrics.height);

  context.beginPath();
  for (const dot of dots) {
    if (dot.heat >= REST_THRESHOLD) continue;
    context.moveTo(dot.x + metrics.radius, dot.y);
    context.arc(dot.x, dot.y, metrics.radius, 0, Math.PI * 2);
  }
  context.fillStyle = mixColor(colors.base, colors.accent, 0);
  context.fill();

  for (const dot of dots) {
    if (dot.heat < REST_THRESHOLD) continue;
    context.beginPath();
    context.arc(
      dot.x,
      dot.y,
      metrics.radius * (1 + dot.heat * 0.5),
      0,
      Math.PI * 2,
    );
    context.fillStyle = mixColor(
      colors.base,
      colors.accent,
      Math.min(dot.heat * 1.6, 1),
    );
    context.fill();
  }
}

export function resolveCssColor(element: HTMLElement, variable: string): Rgb {
  const probe = document.createElement("canvas").getContext("2d");
  const value = getComputedStyle(element).getPropertyValue(variable).trim();
  if (!probe || !value) return [255, 255, 255];

  probe.fillStyle = value;
  const hex = probe.fillStyle.replace("#", "");

  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}
