/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { GaragePalette } from "@/components/sections/home/os-garage/garage-palette";
import {
  GARAGE_DEVICES,
  GarageDeviceKey,
  OFFICE,
  PATROL,
  Vec3,
} from "@/lib/os-garage";
import { JourneyFrame, JourneyPhase, patrolAt } from "@/lib/os-garage-journey";

const LIFT = 2.2;
const RISE = 0.9;
const TRAIL = [0, 0.05, 0.1];
const HIGHLIGHT_SPEED = 0.55;

const EVENTS: { phase: JourneyPhase; device: GarageDeviceKey }[] = [
  { phase: "read", device: "cameras" },
  { phase: "pay", device: "payment" },
];

function origin(key: GarageDeviceKey, time: number): Vec3 {
  const device = GARAGE_DEVICES.find((item) => item.key === key);
  const [x, y, z] = device?.parts[0].position ?? OFFICE.screen;
  if (key === "enforcement") return [patrolAt(time).x, RISE, PATROL.z];
  return [x, y + RISE, z];
}

function arcPoint(from: Vec3, progress: number, target: Mesh) {
  const [toX, toY, toZ] = OFFICE.screen;
  const rest = 1 - progress;
  const controlY = Math.max(from[1], toY) + LIFT;
  target.position.set(
    from[0] + (toX - from[0]) * progress,
    rest * rest * from[1] +
      2 * rest * progress * controlY +
      progress * progress * toY,
    from[2] + (toZ - from[2]) * progress,
  );
}

type PulsesProps = {
  palette: GaragePalette;
  journey: RefObject<JourneyFrame>;
  highlight: GarageDeviceKey | null;
  still: boolean;
};

export function GaragePulses({
  palette,
  journey,
  highlight,
  still,
}: PulsesProps) {
  const dots = useRef<(Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const time = still ? 0 : clock.elapsedTime;
    const frame = journey.current;
    const active = EVENTS.find((event) => event.phase === frame.phase);
    const patrol = patrolAt(time);
    const scan = !active && patrol.scanning;
    const source = highlight ?? active?.device ?? (scan ? "enforcement" : null);
    const progress = highlight
      ? (time * HIGHLIGHT_SPEED) % 1
      : scan
        ? patrol.scan
        : frame.progress;

    TRAIL.forEach((lag, index) => {
      const dot = dots.current[index];
      if (!dot) return;
      const at = progress - lag;
      dot.visible = source !== null && !still && at > 0;
      if (!dot.visible || !source) return;
      arcPoint(origin(source, time), at, dot);
      dot.scale.setScalar(1 - index * 0.28);
    });
  });

  return TRAIL.map((lag, index) => (
    <mesh
      key={lag}
      ref={(node) => {
        dots.current[index] = node;
      }}
      visible={false}
    >
      <sphereGeometry args={[0.1, 12, 10]} />
      <meshBasicMaterial color={palette.accent} />
    </mesh>
  ));
}
