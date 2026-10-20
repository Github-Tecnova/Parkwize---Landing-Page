/*
 * Copyright (c) 2025-2026. Tecnova
 */

export const LOT_VIEWBOX = { width: 640, height: 360 };

export const BAY_COUNT = 20;

const BAYS_PER_ROW = 10;
const BAY_WIDTH = 52;
const FIRST_BAY_X = 86;
const TOP_ROW_Y = 84;
const BOTTOM_ROW_Y = 276;

export const AISLE_Y = 180;
export const ENTRY_X = -40;

const ARRIVAL_ORDER = [
  3, 14, 7, 11, 0, 18, 5, 9, 16, 2, 12, 6, 19, 1, 15, 8, 4, 17, 10, 13,
];

const ARRIVAL_SPAN = 0.88;
const DRIVE_SPAN = 0.12;
const TURN_AT = 0.72;

export type Bay = {
  x: number;
  y: number;
  top: boolean;
  order: number;
};

export const BAYS: Bay[] = Array.from({ length: BAY_COUNT }, (_, index) => {
  const top = index < BAYS_PER_ROW;
  return {
    x: FIRST_BAY_X + (index % BAYS_PER_ROW) * BAY_WIDTH,
    y: top ? TOP_ROW_Y : BOTTOM_ROW_Y,
    top,
    order: ARRIVAL_ORDER.indexOf(index),
  };
});

export const BAY_LINES = Array.from(
  { length: BAYS_PER_ROW + 1 },
  (_, index) => FIRST_BAY_X - BAY_WIDTH / 2 + index * BAY_WIDTH,
);

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

export function carProgress(order: number, fill: number) {
  const start = (order / BAY_COUNT) * (ARRIVAL_SPAN - DRIVE_SPAN);
  return clamp((fill - start) / DRIVE_SPAN);
}

export function carPose(bay: Bay, progress: number) {
  if (progress < TURN_AT) {
    return {
      x: lerp(ENTRY_X, bay.x, progress / TURN_AT),
      y: AISLE_Y,
      rotate: 0,
    };
  }

  const turn = (progress - TURN_AT) / (1 - TURN_AT);
  return {
    x: bay.x,
    y: lerp(AISLE_Y, bay.y, turn),
    rotate: lerp(0, bay.top ? -90 : 90, turn),
  };
}

export function parkedCount(fill: number) {
  return BAYS.filter((bay) => carProgress(bay.order, fill) >= 1).length;
}

export function priceTier(parked: number) {
  const share = parked / BAY_COUNT;
  if (share < 0.5) return 0;
  if (share < 0.8) return 1;
  return 2;
}
