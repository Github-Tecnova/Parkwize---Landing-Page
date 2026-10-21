/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { CanvasTexture, OrthographicCamera, Vector3 } from "three";
import {
  AiCore,
  Barrier,
  BookingPhone,
  BuildIn,
  CallBooth,
  CameraPole,
  DisplaySign,
  KioskTower,
  PatrolFigure,
  PaymentTerminal,
} from "@/components/sections/home/os-garage/garage-models";
import { GaragePalette } from "@/components/sections/home/os-garage/garage-palette";
import { CORE_POSITION, GarageDeviceKey } from "@/lib/os-garage";

const FIT = { width: 19.5, height: 15.5 };
const LOOK_AT = new Vector3(0.6, 0.4, 0.6);

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

export function renderDevice(
  key: GarageDeviceKey,
  palette: GaragePalette,
  cars: RefObject<Vector3[]>,
  sign: CanvasTexture,
) {
  switch (key) {
    case "barriers":
      return <Barrier palette={palette} cars={cars} />;
    case "payment":
      return <PaymentTerminal palette={palette} />;
    case "cameras":
      return <CameraPole palette={palette} />;
    case "display":
      return <DisplaySign palette={palette} texture={sign} />;
    case "booking":
      return <BookingPhone palette={palette} />;
    case "enforcement":
      return <PatrolFigure palette={palette} />;
    case "intelligence":
      return <AiCore palette={palette} />;
    case "callCenter":
      return <CallBooth palette={palette} />;
    case "kiosks":
      return <KioskTower palette={palette} />;
  }
}

const placedTags = new WeakMap<HTMLElement, string>();

export function placeTag(
  tag: HTMLElement | null,
  point: Vector3,
  size: { width: number; height: number },
  appear: number,
) {
  if (!tag) return;
  const x = Math.round(((point.x + 1) / 2) * size.width);
  const y = Math.round(((1 - point.y) / 2) * size.height);
  const placement = `${x} ${y} ${appear.toFixed(2)}`;
  if (placedTags.get(tag) === placement) return;
  placedTags.set(tag, placement);
  tag.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;
  tag.style.setProperty("--appear", String(appear));
  tag.style.visibility = appear > 0 ? "visible" : "hidden";
}

type CoreScreenProps = {
  palette: GaragePalette;
  texture: CanvasTexture;
  build: RefObject<number>;
  at: number;
};

export function CoreScreen({ palette, texture, build, at }: CoreScreenProps) {
  return (
    <BuildIn at={at} build={build} drop={1} position={CORE_POSITION}>
      <group rotation={[0, Math.PI / 4, 0]}>
        <group rotation={[-0.32, 0, 0]}>
          <mesh>
            <boxGeometry args={[3.8, 2.3, 0.12]} />
            <meshStandardMaterial color={palette.bezel} />
          </mesh>
          <mesh position={[0, 0, 0.061]}>
            <planeGeometry args={[3.6, 2.16]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
          </mesh>
        </group>
        <mesh position={[0, -2.75, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 3.1, 8]} />
          <meshStandardMaterial color={palette.bezel} />
        </mesh>
      </group>
    </BuildIn>
  );
}
