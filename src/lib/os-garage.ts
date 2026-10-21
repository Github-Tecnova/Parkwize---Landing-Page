/*
 * Copyright (c) 2025-2026. Tecnova
 */

import type { ProductKey } from "@/lib/navigation";

export type GarageDeviceKey =
  | "display"
  | "cameras"
  | "barriers"
  | "booking"
  | "kiosks"
  | "payment"
  | "callCenter"
  | "enforcement"
  | "intelligence";

export type Vec3 = [number, number, number];

export type DevicePart = { position: Vec3; turn: number };

export type GarageDevice = {
  key: GarageDeviceKey;
  product: ProductKey;
  parts: DevicePart[];
  marker: number;
};

const part = (x: number, y: number, z: number, turn = 0): DevicePart => ({
  position: [x, y, z],
  turn,
});

export const LOT = {
  width: 18,
  depth: 12,
  street: { near: 4.5, far: 6, arrive: 4.85, depart: 5.65 },
  sidewalk: { near: 3.7, far: 4.5 },
  walkway: { near: 3, far: 3.7, half: 5.2 },
  lanes: { entry: -6.3, exit: 6.3, half: 0.8 },
  aisle: -0.9,
  stop: 3,
};

export const BAY = { width: 1.2, depth: 2.4, perRow: 8, firstX: -4.2 };

export const BAY_ROWS = [
  { z: -3.5, heading: -1 },
  { z: 1.7, heading: 1 },
];

export const PARKED_BAYS = [
  [0, 1, 2, 3, 4, 6, 7],
  [2, 3, 5, 6, 7],
];

export const RESERVED_BAYS = [0, 1];

export const JOURNEY_BAY = 1;

export const OFFICE = {
  position: [-6.9, 0, -5] as Vec3,
  size: [2.6, 1.4, 1.6] as Vec3,
  screen: [-7.25, 2.2, -5.25] as Vec3,
};

export const PATROL = {
  from: 1.9,
  to: 4.9,
  z: 4.1,
  seconds: 11,
  pause: 1.4,
};

export const PIN_LIFT = 1.3;

export const GARAGE_DEVICES: GarageDevice[] = [
  {
    key: "display",
    product: "digitalSignage",
    parts: [part(-1.8, 0, 4.1)],
    marker: 2.3,
  },
  {
    key: "cameras",
    product: "enforcement",
    parts: [part(-7.7, 0, 3.95)],
    marker: 2.6,
  },
  {
    key: "barriers",
    product: "processKiosk",
    parts: [part(-7.35, 0, LOT.stop), part(7.35, 0, LOT.stop, Math.PI)],
    marker: 1.3,
  },
  {
    key: "booking",
    product: "onlineReservation",
    parts: [part(-3.6, 0, 3.35, Math.PI / 4)],
    marker: 1.5,
  },
  {
    key: "kiosks",
    product: "processKiosk",
    parts: [part(0.6, 0, 3.35, Math.PI / 4)],
    marker: 2,
  },
  {
    key: "payment",
    product: "processKiosk",
    parts: [part(7.55, 0, 1.3, -Math.PI / 2)],
    marker: 1.5,
  },
  {
    key: "callCenter",
    product: "parkAid",
    parts: [part(7.55, 0, 2.3, -Math.PI / 2)],
    marker: 1.7,
  },
  {
    key: "enforcement",
    product: "enforcement",
    parts: [part(0, 0, PATROL.z)],
    marker: 1.45,
  },
  {
    key: "intelligence",
    product: "parkwizeAi",
    parts: [part(-5.85, OFFICE.size[1], -5.45)],
    marker: 1.1,
  },
];

export const BUILD_TIMING = {
  appear: 0.45,
  structure: 0.2,
  office: 0.4,
  devices: 0.55,
  deviceStep: 0.08,
  cars: 0.85,
  carStep: 0.04,
  marker: 0.3,
};

export type BuildSchedule = {
  devices: Map<GarageDeviceKey, number>;
  cars: number;
  total: number;
};

export function buildSchedule(): BuildSchedule {
  const devices = new Map<GarageDeviceKey, number>(
    GARAGE_DEVICES.map((device, index) => [
      device.key,
      BUILD_TIMING.devices + index * BUILD_TIMING.deviceStep,
    ]),
  );
  const parked = PARKED_BAYS.flat().length;
  const total =
    BUILD_TIMING.cars +
    (parked - 1) * BUILD_TIMING.carStep +
    BUILD_TIMING.appear;

  return { devices, cars: BUILD_TIMING.cars, total };
}

export function appearAmount(now: number, at: number) {
  return Math.min(Math.max((now - at) / BUILD_TIMING.appear, 0), 1);
}

export function easeOutBack(value: number) {
  const overshoot = 1.4;
  const shifted = value - 1;
  return 1 + (overshoot + 1) * shifted ** 3 + overshoot * shifted ** 2;
}

export function bayX(index: number) {
  return BAY.firstX + index * BAY.width;
}
