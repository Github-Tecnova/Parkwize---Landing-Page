/*
 * Copyright (c) 2025-2026. Tecnova
 */

export type Point = { x: number; y: number };

export type Rgb = [number, number, number];

export type DotFieldShape = {
  paths: readonly string[];
  width: number;
  height: number;
};

export type DotField = {
  width: number;
  height: number;
  dots: Float32Array;
  count: number;
};

export type Shockwave = Point & { startedAt: number };

export type DotFieldColors = { ink: Rgb; warm: Rgb };

const MARK_OVERSCAN = 1.02;
const MARK_CROP = 0.17;
const HEADROOM = 0.22;
const DOT_GAP = 6;
const DOT_GAP_COMPACT = 4.5;
const COMPACT_WIDTH = 720;
const COVERAGE_SAMPLES = 3;
const MIN_COVERAGE = 0.06;
const RADIUS_PER_GAP = 0.56;
const STRIDE = 7;
const PUSH_RADIUS = 80;
const PUSH_FORCE = 2.6;
const STIFFNESS = 0.05;
const DAMPING = 0.84;
const WARM_SPAN = 28;
const SHOCK_DURATION = 900;
const SHOCK_SPEED = 0.9;
const SHOCK_BAND = 26;
const SHOCK_FORCE = 3.2;
const REST_VELOCITY = 0.02;
const REST_OFFSET = 0.05;
const GRAIN_SIZE = 256;
const GRAIN_ALPHA = 0.045;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getMarkHeightRatio(shape: DotFieldShape) {
  return (shape.height / shape.width) * MARK_OVERSCAN;
}

export function getDotFieldAspectRatio(shape: DotFieldShape) {
  return 1 / (getMarkHeightRatio(shape) * (1 - MARK_CROP + HEADROOM));
}

export function createDotField(shape: DotFieldShape, width: number): DotField {
  const markWidth = width * MARK_OVERSCAN;
  const markHeight = width * getMarkHeightRatio(shape);
  const height = Math.round(width / getDotFieldAspectRatio(shape));
  const empty = { width, height, dots: new Float32Array(0), count: 0 };

  const mask = document.createElement("canvas");
  mask.width = width;
  mask.height = height;
  const context = mask.getContext("2d", { willReadFrequently: true });
  if (!context) return empty;

  const scale = markWidth / shape.width;
  context.setTransform(
    scale,
    0,
    0,
    scale,
    (width - markWidth) / 2,
    markHeight * HEADROOM,
  );
  shape.paths.forEach((path) => context.fill(new Path2D(path)));
  const { data } = context.getImageData(0, 0, width, height);

  const gap = width < COMPACT_WIDTH ? DOT_GAP_COMPACT : DOT_GAP;
  const columns = Math.ceil(width / gap);
  const rows = Math.ceil(height / gap);
  const values: number[] = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      let alpha = 0;
      for (let sampleY = 0; sampleY < COVERAGE_SAMPLES; sampleY++) {
        for (let sampleX = 0; sampleX < COVERAGE_SAMPLES; sampleX++) {
          const x = Math.min(
            width - 1,
            Math.floor(
              column * gap + ((sampleX + 0.5) * gap) / COVERAGE_SAMPLES,
            ),
          );
          const y = Math.min(
            height - 1,
            Math.floor(row * gap + ((sampleY + 0.5) * gap) / COVERAGE_SAMPLES),
          );
          alpha += data[(y * width + x) * 4 + 3];
        }
      }

      const coverage = alpha / (COVERAGE_SAMPLES ** 2 * 255);
      if (coverage < MIN_COVERAGE) continue;

      const homeX = column * gap + gap / 2;
      const homeY = row * gap + gap / 2;
      const radius = Math.sqrt(clamp(coverage, 0, 1)) * gap * RADIUS_PER_GAP;
      values.push(homeX, homeY, 0, 0, homeX, homeY, radius);
    }
  }

  return {
    width,
    height,
    dots: new Float32Array(values),
    count: values.length / STRIDE,
  };
}

export function stepDotField(
  field: DotField,
  pointer: Point | null,
  shockwave: Shockwave | null,
  now: number,
): boolean {
  const { dots } = field;
  const shockAge = shockwave ? now - shockwave.startedAt : Infinity;
  const shockActive = shockAge < SHOCK_DURATION;
  const shockRadius = shockAge * SHOCK_SPEED;
  let moving = shockActive || pointer !== null;

  for (let index = 0; index < field.count; index++) {
    const offset = index * STRIDE;
    let x = dots[offset];
    let y = dots[offset + 1];
    let velocityX = dots[offset + 2];
    let velocityY = dots[offset + 3];
    const homeX = dots[offset + 4];
    const homeY = dots[offset + 5];

    if (shockwave && shockActive) {
      const deltaX = homeX - shockwave.x;
      const deltaY = homeY - shockwave.y;
      const distance = Math.hypot(deltaX, deltaY) + 0.001;
      const band =
        1 - Math.min(1, Math.abs(distance - shockRadius) / SHOCK_BAND);
      if (band > 0) {
        const force = band * SHOCK_FORCE * (1 - shockAge / SHOCK_DURATION);
        velocityX += (deltaX / distance) * force;
        velocityY += (deltaY / distance) * force;
      }
    }

    if (pointer) {
      const deltaX = x - pointer.x;
      const deltaY = y - pointer.y;
      const distance = Math.hypot(deltaX, deltaY) + 0.001;
      if (distance < PUSH_RADIUS) {
        const force = (1 - distance / PUSH_RADIUS) * PUSH_FORCE;
        velocityX += (deltaX / distance) * force;
        velocityY += (deltaY / distance) * force;
      }
    }

    velocityX = (velocityX + (homeX - x) * STIFFNESS) * DAMPING;
    velocityY = (velocityY + (homeY - y) * STIFFNESS) * DAMPING;
    x += velocityX;
    y += velocityY;

    const settled =
      Math.abs(velocityX) + Math.abs(velocityY) <= REST_VELOCITY &&
      Math.abs(x - homeX) + Math.abs(y - homeY) <= REST_OFFSET;

    if (settled) {
      x = homeX;
      y = homeY;
      velocityX = 0;
      velocityY = 0;
    } else {
      moving = true;
    }

    dots[offset] = x;
    dots[offset + 1] = y;
    dots[offset + 2] = velocityX;
    dots[offset + 3] = velocityY;
  }

  return moving;
}

function mixColor(from: Rgb, to: Rgb, amount: number) {
  const channel = (index: number) =>
    Math.round(from[index] + (to[index] - from[index]) * amount);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

export function createGrain() {
  const tile = document.createElement("canvas");
  tile.width = GRAIN_SIZE;
  tile.height = GRAIN_SIZE;
  const context = tile.getContext("2d");
  if (!context) return null;

  const image = context.createImageData(GRAIN_SIZE, GRAIN_SIZE);
  for (let index = 0; index < image.data.length; index += 4) {
    const value = Math.random() * 255;
    image.data[index] = value;
    image.data[index + 1] = value;
    image.data[index + 2] = value;
    image.data[index + 3] = Math.random() < 0.5 ? 0 : 255;
  }
  context.putImageData(image, 0, 0);
  return tile;
}

export function drawDotField(
  context: CanvasRenderingContext2D,
  field: DotField,
  colors: DotFieldColors,
  grain: HTMLCanvasElement | null,
) {
  const { dots } = field;
  const ink = mixColor(colors.ink, colors.warm, 0);
  context.clearRect(0, 0, field.width, field.height);

  context.beginPath();
  for (let index = 0; index < field.count; index++) {
    const offset = index * STRIDE;
    const x = dots[offset];
    const y = dots[offset + 1];
    if (x !== dots[offset + 4] || y !== dots[offset + 5]) continue;
    const radius = dots[offset + 6];
    context.moveTo(x + radius, y);
    context.arc(x, y, radius, 0, Math.PI * 2);
  }
  context.fillStyle = ink;
  context.fill();

  for (let index = 0; index < field.count; index++) {
    const offset = index * STRIDE;
    const x = dots[offset];
    const y = dots[offset + 1];
    const homeX = dots[offset + 4];
    const homeY = dots[offset + 5];
    if (x === homeX && y === homeY) continue;
    const warmth = Math.min(1, Math.hypot(x - homeX, y - homeY) / WARM_SPAN);
    context.beginPath();
    context.arc(x, y, dots[offset + 6], 0, Math.PI * 2);
    context.fillStyle = mixColor(colors.ink, colors.warm, warmth);
    context.fill();
  }

  const pattern = grain && context.createPattern(grain, "repeat");
  if (pattern) {
    context.globalAlpha = GRAIN_ALPHA;
    context.globalCompositeOperation = "source-atop";
    context.fillStyle = pattern;
    context.fillRect(0, 0, field.width, field.height);
    context.globalAlpha = 1;
    context.globalCompositeOperation = "source-over";
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
