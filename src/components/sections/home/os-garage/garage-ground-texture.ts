/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { CanvasTexture, Color, SRGBColorSpace } from "three";
import { GaragePalette } from "@/components/sections/home/os-garage/garage-palette";
import { BAY, BAY_ROWS, bayX, LOT, RESERVED_BAYS } from "@/lib/os-garage";

const PIXELS_PER_UNIT = 112;
const MARK = 0.07;
const SHADOW_SIZE = 128;
const RESERVED_ALPHA = 0.16;

type Painter = {
  context: CanvasRenderingContext2D;
  x: (value: number) => number;
  z: (value: number) => number;
  unit: (value: number) => number;
};

function createTexture(canvas: HTMLCanvasElement, anisotropy: number) {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = anisotropy;
  return texture;
}

function withAlpha(color: Color, alpha: number) {
  return color.getStyle().replace("rgb(", "rgba(").replace(")", `,${alpha})`);
}

function rect(
  painter: Painter,
  x0: number,
  z0: number,
  x1: number,
  z1: number,
) {
  const { context, x, z } = painter;
  context.fillRect(x(x0), z(z0), x(x1) - x(x0), z(z1) - z(z0));
}

function arrow(painter: Painter, cx: number, cz: number, angle: number) {
  const { context, x, z, unit } = painter;
  context.save();
  context.translate(x(cx), z(cz));
  context.rotate(angle);
  context.beginPath();
  context.moveTo(unit(0.55), 0);
  context.lineTo(unit(0.1), unit(-0.32));
  context.lineTo(unit(0.1), unit(-0.11));
  context.lineTo(unit(-0.5), unit(-0.11));
  context.lineTo(unit(-0.5), unit(0.11));
  context.lineTo(unit(0.1), unit(0.11));
  context.lineTo(unit(0.1), unit(0.32));
  context.closePath();
  context.fill();
  context.restore();
}

function paintStreet(painter: Painter, palette: GaragePalette) {
  const half = LOT.width / 2;
  const { near, far, arrive, depart } = LOT.street;
  const middle = (arrive + depart) / 2;
  painter.context.fillStyle = palette.line.getStyle();
  rect(painter, -half, near, half, far);

  painter.context.fillStyle = palette.surface.getStyle();
  for (let x = -half + 0.2; x < half; x += 0.9) {
    rect(painter, x, middle - MARK / 2, x + 0.5, middle + MARK / 2);
  }
  for (let stripe = -2; stripe <= 2; stripe++) {
    const x = 0.6 + stripe * 0.3;
    rect(painter, x - 0.08, near + 0.08, x + 0.08, far - 0.08);
  }
}

function paintBays(painter: Painter, palette: GaragePalette) {
  const left = bayX(0) - BAY.width / 2;
  const right = bayX(BAY.perRow - 1) + BAY.width / 2;
  const front = BAY_ROWS[1];

  painter.context.fillStyle = withAlpha(palette.deck, RESERVED_ALPHA);
  RESERVED_BAYS.forEach((bay) => {
    const x = bayX(bay);
    rect(
      painter,
      x - BAY.width / 2,
      front.z - BAY.depth / 2,
      x + BAY.width / 2,
      front.z + BAY.depth / 2,
    );
  });

  painter.context.fillStyle = palette.surface.getStyle();
  BAY_ROWS.forEach((row) => {
    const far = row.z + (row.heading * BAY.depth) / 2;
    for (let line = 0; line <= BAY.perRow; line++) {
      const x = left + line * BAY.width;
      rect(
        painter,
        x - MARK / 2,
        row.z - BAY.depth / 2,
        x + MARK / 2,
        row.z + BAY.depth / 2,
      );
    }
    rect(painter, left, far - MARK / 2, right, far + MARK / 2);
  });
}

function paintLanes(painter: Painter, palette: GaragePalette) {
  const { entry, exit, half } = LOT.lanes;
  painter.context.fillStyle = palette.surface.getStyle();
  [entry, exit].forEach((lane) =>
    rect(painter, lane - half, LOT.stop - 0.06, lane + half, LOT.stop + 0.06),
  );
  arrow(painter, entry, 1.4, -Math.PI / 2);
  arrow(painter, exit, 0.2, Math.PI / 2);
  arrow(painter, -1.4, LOT.aisle, 0);
  arrow(painter, 2.6, LOT.aisle, 0);
}

export function createGroundTexture(palette: GaragePalette) {
  const canvas = document.createElement("canvas");
  canvas.width = LOT.width * PIXELS_PER_UNIT;
  canvas.height = LOT.depth * PIXELS_PER_UNIT;
  const context = canvas.getContext("2d");

  if (context) {
    const painter: Painter = {
      context,
      x: (value) => (value + LOT.width / 2) * PIXELS_PER_UNIT,
      z: (value) => (value + LOT.depth / 2) * PIXELS_PER_UNIT,
      unit: (value) => value * PIXELS_PER_UNIT,
    };
    context.fillStyle = palette.asphalt.getStyle();
    context.fillRect(0, 0, canvas.width, canvas.height);
    paintStreet(painter, palette);
    paintBays(painter, palette);
    paintLanes(painter, palette);
  }

  return createTexture(canvas, 8);
}

export function createShadowTexture(palette: GaragePalette) {
  const canvas = document.createElement("canvas");
  canvas.width = SHADOW_SIZE;
  canvas.height = SHADOW_SIZE;
  const context = canvas.getContext("2d");

  if (context) {
    const center = SHADOW_SIZE / 2;
    const gradient = context.createRadialGradient(
      center,
      center,
      0,
      center,
      center,
      center,
    );
    gradient.addColorStop(0, withAlpha(palette.bezel, 1));
    gradient.addColorStop(0.55, withAlpha(palette.bezel, 0.55));
    gradient.addColorStop(1, withAlpha(palette.bezel, 0));
    context.fillStyle = gradient;
    context.fillRect(0, 0, SHADOW_SIZE, SHADOW_SIZE);
  }

  return createTexture(canvas, 1);
}
