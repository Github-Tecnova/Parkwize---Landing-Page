/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ReactNode, RefObject, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { appearAmount, easeOutBack, GarageDevice, Vec3 } from "@/lib/os-garage";

const HOVER_SCALE = 1.18;
const DROP_HEIGHT = 0.8;
const DIMMED_OPACITY = 0.18;
const EASE = 8;

export const approach = (current: number, target: number, delta: number) =>
  current + (target - current) * Math.min(delta * EASE, 1);

function settle(amount: number) {
  return amount === 1 ? 1 : easeOutBack(amount);
}

type BuildInProps = {
  at: number;
  build: RefObject<number>;
  drop?: number;
  position?: Vec3;
  rotation?: number;
  children: ReactNode;
};

export function BuildIn({
  at,
  build,
  drop = 0,
  position,
  rotation = 0,
  children,
}: BuildInProps) {
  const group = useRef<Group>(null);

  useFrame(() => {
    const node = group.current;
    if (!node) return;
    const amount = appearAmount(build.current, at);
    const eased = settle(amount);
    node.visible = amount > 0;
    node.scale.setScalar(Math.max(eased, 0.0001));
    node.position.y = (position?.[1] ?? 0) + (1 - Math.min(eased, 1)) * drop;
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[0, rotation, 0]}
      visible={false}
    >
      {children}
    </group>
  );
}

type DeviceSlotProps = {
  device: GarageDevice;
  at: number;
  build: RefObject<number>;
  highlighted: boolean;
  dimmed: boolean;
  instant: boolean;
  render: (part: number) => ReactNode;
};

export function DeviceSlot({
  device,
  at,
  build,
  highlighted,
  dimmed,
  instant,
  render,
}: DeviceSlotProps) {
  const parts = useRef<(Group | null)[]>([]);
  const emphasis = useRef(1);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    parts.current.forEach((part) =>
      part?.traverse((child) => {
        if (!(child instanceof Mesh)) return;
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((material) => {
          material.transparent = dimmed;
          material.opacity = dimmed ? DIMMED_OPACITY : 1;
          material.needsUpdate = true;
        });
      }),
    );
    invalidate();
  }, [dimmed, highlighted, invalidate]);

  useFrame((_, delta) => {
    const target = highlighted ? HOVER_SCALE : 1;
    emphasis.current = instant
      ? target
      : approach(emphasis.current, target, delta);
    const amount = appearAmount(build.current, at);
    const eased = settle(amount);

    parts.current.forEach((node, index) => {
      if (!node) return;
      node.visible = amount > 0;
      node.scale.setScalar(Math.max(eased * emphasis.current, 0.0001));
      node.position.y =
        device.parts[index].position[1] +
        (1 - Math.min(eased, 1)) * DROP_HEIGHT;
    });
  });

  return device.parts.map((part, index) => (
    <group
      key={index}
      ref={(node) => {
        parts.current[index] = node;
      }}
      position={part.position}
      rotation={[0, part.turn, 0]}
      visible={false}
    >
      {render(index)}
    </group>
  ));
}
