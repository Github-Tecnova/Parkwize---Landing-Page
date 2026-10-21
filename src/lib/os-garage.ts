/*
 * Copyright (c) 2025-2026. Tecnova
 */

export type GarageDeviceKey =
  | "payment"
  | "display"
  | "barriers"
  | "cameras"
  | "booking"
  | "enforcement"
  | "intelligence"
  | "callCenter"
  | "kiosks";

export type Vec3 = [number, number, number];

export type GarageDevice = {
  key: GarageDeviceKey;
  slug: string;
  position: Vec3;
  tagHeight: number;
};

export const GARAGE_DEVICES: GarageDevice[] = [
  {
    key: "barriers",
    slug: "process-kiosk",
    position: [-6.4, 0, 2.6],
    tagHeight: 1.4,
  },
  {
    key: "cameras",
    slug: "enforcement",
    position: [-7.4, 0, -1.4],
    tagHeight: 2.7,
  },
  {
    key: "display",
    slug: "digital-signage",
    position: [-7.6, 0, 4.3],
    tagHeight: 2.2,
  },
  {
    key: "payment",
    slug: "process-kiosk",
    position: [-2.8, 0, 4.7],
    tagHeight: 1.5,
  },
  {
    key: "kiosks",
    slug: "process-kiosk",
    position: [0.9, 0, 4.7],
    tagHeight: 1.9,
  },
  {
    key: "booking",
    slug: "online-reservation",
    position: [4.2, 1.3, 4.5],
    tagHeight: 0.9,
  },
  {
    key: "enforcement",
    slug: "enforcement",
    position: [6, 0, 0.5],
    tagHeight: 1.3,
  },
  {
    key: "callCenter",
    slug: "parkaid",
    position: [7, 0, -3.6],
    tagHeight: 1.9,
  },
  {
    key: "intelligence",
    slug: "parkwize-ai",
    position: [3, 1.7, -3.4],
    tagHeight: 0.9,
  },
];

export const CORE_POSITION: Vec3 = [-1.4, 4.2, -5.1];

export type GarageChapterKey =
  "entry" | "payment" | "operations" | "intelligence";

export const GARAGE_CHAPTERS: {
  key: GarageChapterKey;
  devices: GarageDeviceKey[];
}[] = [
  { key: "entry", devices: ["barriers", "cameras", "display"] },
  { key: "payment", devices: ["payment", "kiosks", "booking"] },
  { key: "operations", devices: ["enforcement", "callCenter"] },
  { key: "intelligence", devices: ["intelligence"] },
];

export const BUILD_TIMING = {
  slab: 0.7,
  lines: 0.6,
  device: 0.38,
  chapterGap: 0.55,
  appear: 0.55,
  finale: 0.6,
  parking: 0.7,
};

export type BuildSchedule = {
  devices: Map<GarageDeviceKey, number>;
  core: number;
  traffic: number;
  total: number;
};

export function buildSchedule(): BuildSchedule {
  const devices = new Map<GarageDeviceKey, number>();
  let time = BUILD_TIMING.slab + BUILD_TIMING.lines;

  GARAGE_CHAPTERS.forEach((chapter) => {
    chapter.devices.forEach((key) => {
      devices.set(key, time);
      time += BUILD_TIMING.device;
    });
    time += BUILD_TIMING.chapterGap;
  });

  const core = time;
  const traffic = core + BUILD_TIMING.finale;
  return {
    devices,
    core,
    traffic,
    total: traffic + BUILD_TIMING.appear + BUILD_TIMING.parking,
  };
}

export function appearAmount(now: number, at: number) {
  return Math.min(Math.max((now - at) / BUILD_TIMING.appear, 0), 1);
}

export function easeOutBack(value: number) {
  const overshoot = 1.4;
  const shifted = value - 1;
  return 1 + (overshoot + 1) * shifted ** 3 + overshoot * shifted ** 2;
}

export const SLAB = { width: 17, depth: 11 };

export const BAY_WIDTH = 1.25;
export const BAY_DEPTH = 2.2;
export const BAYS_PER_ROW = 8;
export const FIRST_BAY_X = -4.4;

export const BAY_ROWS = [
  { z: -3.6, facing: 1 },
  { z: 0.5, facing: -1 },
];

export const PARKED_BAYS = [
  [0, 1, 3, 4, 6, 7],
  [0, 2, 3, 5, 6],
];

export const CAR_LOOP: [number, number][] = [
  [-10, 2.6],
  [-3, 2.6],
  [5, 2.6],
  [7.4, 1.4],
  [7.4, -1.2],
  [5, -1.6],
  [-3, -1.6],
  [-6.6, -1.2],
  [-8.6, 0.2],
  [-10, 2.6],
];

export const BARRIER_LANE = { x: -6.4, z: 2.6, reach: 1.6 };

export const MOVING_CARS = { desktop: 2, compact: 1 };

export const LOOP_SECONDS = 26;
