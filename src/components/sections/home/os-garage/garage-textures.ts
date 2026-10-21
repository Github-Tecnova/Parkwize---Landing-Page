/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { CanvasTexture, SRGBColorSpace } from "three";
import {
  GaragePalette,
  GarageType,
} from "@/components/sections/home/os-garage/garage-palette";

const SCREEN_SIZE = { width: 640, height: 384 };
const SIGN_SIZE = { width: 256, height: 144 };
const CHART_POINTS = 14;

type Painter<T> = {
  texture: CanvasTexture;
  paint: (value: T) => void;
};

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return { context, texture };
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
}

export function nextChartSeries(series: number[]) {
  const last = series[series.length - 1] ?? 0.5;
  const drift = (Math.random() - 0.42) * 0.22;
  return [...series.slice(1), Math.min(Math.max(last + drift, 0.15), 0.95)];
}

export function initialChartSeries() {
  return Array.from(
    { length: CHART_POINTS },
    (_, index) => 0.35 + Math.sin(index / 2.2) * 0.18 + index * 0.02,
  );
}

export function createScreenPainter(
  palette: GaragePalette,
  type: GarageType,
): Painter<number[]> {
  const percent = new Intl.NumberFormat(type.localeTag, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  const money = new Intl.NumberFormat(type.localeTag, {
    style: "currency",
    currency: "CAD",
    currencyDisplay: "narrowSymbol",
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const count = new Intl.NumberFormat(type.localeTag);
  const { width, height } = SCREEN_SIZE;
  const { context, texture } = createCanvas(width, height);

  const paint = (series: number[]) => {
    if (!context) return;
    context.fillStyle = palette.navy.getStyle();
    context.fillRect(0, 0, width, height);

    context.fillStyle = palette.raised.getStyle();
    roundedRect(context, 24, 24, width - 48, 56, 14);
    context.fillStyle = palette.accent.getStyle();
    roundedRect(context, 44, 44, 16, 16, 4);
    context.fillStyle = palette.surface.getStyle();
    context.font = `600 22px ${type.display}`;
    context.fillText("Parkwize", 72, 60);
    context.fillStyle = palette.success.getStyle();
    context.beginPath();
    context.arc(width - 56, 52, 7, 0, Math.PI * 2);
    context.fill();

    const tileWidth = (width - 48 - 32) / 3;
    const last = series[series.length - 1] ?? 0.5;
    const figures = [
      percent.format(0.7 + last * 0.25),
      money.format(12000 + last * 6000),
      count.format(1800 + Math.round(last * 140)),
    ];
    figures.forEach((figure, index) => {
      const x = 24 + index * (tileWidth + 16);
      context.fillStyle = palette.raised.getStyle();
      roundedRect(context, x, 96, tileWidth, 84, 14);
      context.fillStyle = palette.muted.getStyle();
      roundedRect(context, x + 18, 116, tileWidth * 0.45, 8, 4);
      context.fillStyle = palette.surface.getStyle();
      context.font = `600 30px ${type.display}`;
      context.fillText(figure, x + 18, 162);
    });

    const chart = { x: 24, y: 196, width: width - 48, height: height - 220 };
    context.fillStyle = palette.raised.getStyle();
    roundedRect(context, chart.x, chart.y, chart.width, chart.height, 14);

    const step = (chart.width - 40) / (series.length - 1);
    const point = (value: number, index: number) => ({
      x: chart.x + 20 + index * step,
      y: chart.y + chart.height - 20 - value * (chart.height - 40),
    });

    context.beginPath();
    series.forEach((value, index) => {
      const { x, y } = point(value, index);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.lineTo(chart.x + chart.width - 20, chart.y + chart.height - 20);
    context.lineTo(chart.x + 20, chart.y + chart.height - 20);
    context.closePath();
    context.globalAlpha = 0.28;
    context.fillStyle = palette.accent.getStyle();
    context.fill();
    context.globalAlpha = 1;

    context.beginPath();
    series.forEach((value, index) => {
      const { x, y } = point(value, index);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.strokeStyle = palette.accent.getStyle();
    context.lineWidth = 4;
    context.lineJoin = "round";
    context.stroke();

    texture.needsUpdate = true;
  };

  return { texture, paint };
}

export function createSignPainter(
  palette: GaragePalette,
  type: GarageType,
): Painter<number> {
  const { width, height } = SIGN_SIZE;
  const { context, texture } = createCanvas(width, height);

  const paint = (free: number) => {
    if (!context) return;
    context.fillStyle = palette.bezel.getStyle();
    context.fillRect(0, 0, width, height);
    context.fillStyle = palette.accent.getStyle();
    roundedRect(context, 16, 24, 80, 96, 14);
    context.fillStyle = palette.surface.getStyle();
    context.font = `700 64px ${type.display}`;
    context.fillText("P", 36, 96);
    context.fillStyle =
      free > 0 ? palette.success.getStyle() : palette.destructive.getStyle();
    context.font = `700 64px ${type.mono}`;
    context.fillText(String(free).padStart(2, "0"), 120, 96);
    texture.needsUpdate = true;
  };

  return { texture, paint };
}
