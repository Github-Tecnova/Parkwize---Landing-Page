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

const FIT = { width: 21.5, height: 16.5 };
const LOOK_AT = new Vector3(0, 0.7, 0.2);

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
      return <KioskTower palette={palette} />;
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

const placedMarkers = new WeakMap<HTMLElement, string>();

export function placeMarker(
  marker: HTMLElement | null,
  point: Vector3,
  size: { width: number; height: number },
  appear: number,
) {
  if (!marker) return;
  const x = Math.round(((point.x + 1) / 2) * size.width);
  const y = Math.round(((1 - point.y) / 2) * size.height);
  const placement = `${x} ${y} ${appear.toFixed(2)}`;
  if (placedMarkers.get(marker) === placement) return;
  placedMarkers.set(marker, placement);
  marker.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  marker.style.setProperty("--appear", String(appear));
  marker.style.visibility = appear > 0 ? "visible" : "hidden";
}
