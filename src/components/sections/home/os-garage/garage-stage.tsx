/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { CanvasTexture, OrthographicCamera, Vector3 } from "three";
import {
  Barrier,
  CameraPole,
  DisplaySign,
  Intercom,
  KioskTower,
  PaymentTerminal,
  ReservedPedestal,
} from "@/components/sections/home/os-garage/garage-devices";
import {
  PatrolOfficer,
  RoofAi,
} from "@/components/sections/home/os-garage/garage-figures";
import { GaragePalette } from "@/components/sections/home/os-garage/garage-palette";
import { GarageDeviceKey } from "@/lib/os-garage";
import { JourneyFrame } from "@/lib/os-garage-journey";

const FIT = { width: 19.5, height: 17.8 };
const LOOK_AT = new Vector3(0, 0.8, 0);

export function CameraFit() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  useEffect(() => {
    if (!(camera instanceof OrthographicCamera)) return;
    camera.zoom = Math.min(size.width / FIT.width, size.height / FIT.height);
    camera.lookAt(LOOK_AT);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

type DeviceContext = {
  palette: GaragePalette;
  journey: RefObject<JourneyFrame>;
  sign: CanvasTexture;
  still: boolean;
};

export function renderDevice(
  key: GarageDeviceKey,
  part: number,
  { palette, journey, sign, still }: DeviceContext,
) {
  switch (key) {
    case "display":
      return <DisplaySign palette={palette} texture={sign} />;
    case "cameras":
      return <CameraPole palette={palette} journey={journey} />;
    case "barriers":
      return <Barrier palette={palette} journey={journey} exit={part === 1} />;
    case "booking":
      return <ReservedPedestal palette={palette} journey={journey} />;
    case "kiosks":
      return <KioskTower palette={palette} still={still} />;
    case "payment":
      return <PaymentTerminal palette={palette} journey={journey} />;
    case "callCenter":
      return <Intercom palette={palette} />;
    case "enforcement":
      return <PatrolOfficer palette={palette} still={still} />;
    case "intelligence":
      return <RoofAi palette={palette} still={still} />;
  }
}

const placedPins = new WeakMap<HTMLElement, string>();

type ScreenSize = { width: number; height: number };

function toScreen(point: Vector3, size: ScreenSize) {
  return {
    x: Math.round(((point.x + 1) / 2) * size.width),
    y: Math.round(((1 - point.y) / 2) * size.height),
  };
}

export function placePin(
  pin: HTMLElement | null,
  head: Vector3,
  foot: Vector3,
  size: ScreenSize,
  appear: number,
) {
  if (!pin) return;
  const top = toScreen(head, size);
  const leader = Math.max(toScreen(foot, size).y - top.y, 0);
  const placement = `${top.x} ${top.y} ${leader} ${appear.toFixed(2)}`;
  if (placedPins.get(pin) === placement) return;
  placedPins.set(pin, placement);
  pin.style.transform = `translate3d(${top.x}px, ${top.y}px, 0)`;
  pin.style.setProperty("--leader", `${leader}px`);
  pin.style.setProperty("--appear", String(appear));
}
