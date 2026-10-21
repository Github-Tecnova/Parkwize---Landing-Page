/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ReactNode, RefObject, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, Color, Group, Mesh, Vector3 } from "three";
import { GaragePalette } from "@/components/sections/home/os-garage/garage-palette";
import {
  appearAmount,
  BARRIER_LANE,
  easeOutBack,
  GarageDevice,
  Vec3,
} from "@/lib/os-garage";

type PaletteProps = { palette: GaragePalette };

const HOVER_SCALE = 1.14;
const DROP_HEIGHT = 1.4;
const DIMMED_OPACITY = 0.18;
const EASE = 8;

const approach = (current: number, target: number, delta: number) =>
  current + (target - current) * Math.min(delta * EASE, 1);

export function GarageCar({ color, palette }: { color: Color } & PaletteProps) {
  return (
    <group>
      <mesh position={[0, 0.24, 0]}>
        <boxGeometry args={[1, 0.3, 0.56]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[-0.06, 0.48, 0]}>
        <boxGeometry args={[0.54, 0.22, 0.48]} />
        <meshStandardMaterial color={palette.raised} roughness={0.3} />
      </mesh>
      {[
        [0.32, 0.29],
        [0.32, -0.29],
        [-0.32, 0.29],
        [-0.32, -0.29],
      ].map(([x, z]) => (
        <mesh
          key={`${x}${z}`}
          position={[x, 0.11, z]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.11, 0.11, 0.08, 10]} />
          <meshStandardMaterial color={palette.bezel} />
        </mesh>
      ))}
    </group>
  );
}

type BuildInProps = {
  at: number;
  build: RefObject<number>;
  drop?: number;
  position?: Vec3;
  children: ReactNode;
};

export function BuildIn({
  at,
  build,
  drop = 0,
  position,
  children,
}: BuildInProps) {
  const group = useRef<Group>(null);

  useFrame(() => {
    const node = group.current;
    if (!node) return;
    const amount = appearAmount(build.current, at);
    const eased = amount === 1 ? 1 : easeOutBack(amount);
    node.visible = amount > 0;
    node.scale.setScalar(Math.max(eased, 0.0001));
    node.position.y = (position?.[1] ?? 0) + (1 - Math.min(eased, 1)) * drop;
  });

  return (
    <group ref={group} position={position} visible={false}>
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
  children: ReactNode;
};

export function DeviceSlot({
  device,
  at,
  build,
  highlighted,
  dimmed,
  children,
}: DeviceSlotProps) {
  const group = useRef<Group>(null);
  const emphasis = useRef(1);

  useEffect(() => {
    group.current?.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      materials.forEach((material) => {
        material.transparent = dimmed;
        material.opacity = dimmed ? DIMMED_OPACITY : 1;
        material.needsUpdate = true;
      });
    });
  }, [dimmed]);

  useFrame((_, delta) => {
    const node = group.current;
    if (!node) return;
    emphasis.current = approach(
      emphasis.current,
      highlighted ? HOVER_SCALE : 1,
      delta,
    );
    const amount = appearAmount(build.current, at);
    const eased = amount === 1 ? 1 : easeOutBack(amount);
    node.visible = amount > 0;
    node.scale.setScalar(Math.max(eased * emphasis.current, 0.0001));
    node.position.y =
      device.position[1] + (1 - Math.min(eased, 1)) * DROP_HEIGHT;
  });

  return (
    <group ref={group} position={device.position} visible={false}>
      {children}
    </group>
  );
}

export function Barrier({
  palette,
  cars,
}: PaletteProps & { cars: RefObject<Vector3[]> }) {
  const arm = useRef<Group>(null);

  useFrame((_, delta) => {
    const node = arm.current;
    if (!node) return;
    const near = cars.current.some(
      (car) =>
        Math.abs(car.x - BARRIER_LANE.x) < BARRIER_LANE.reach &&
        Math.abs(car.z - BARRIER_LANE.z) < 1,
    );
    node.rotation.x = approach(node.rotation.x, near ? 1.25 : 0, delta);
  });

  return (
    <group>
      <mesh position={[0, 0.45, -1]}>
        <boxGeometry args={[0.3, 0.9, 0.3]} />
        <meshStandardMaterial color={palette.raised} />
      </mesh>
      <group ref={arm} position={[0, 0.82, -1]}>
        <mesh position={[0, 0, 1.1]}>
          <boxGeometry args={[0.08, 0.08, 2.2]} />
          <meshStandardMaterial color={palette.accent} />
        </mesh>
      </group>
    </group>
  );
}

export function PaymentTerminal({ palette }: PaletteProps) {
  return (
    <group>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.5, 1.1, 0.36]} />
        <meshStandardMaterial color={palette.bezel} />
      </mesh>
      <mesh position={[0, 0.78, 0.19]}>
        <planeGeometry args={[0.34, 0.28]} />
        <meshBasicMaterial color={palette.accent} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function CameraPole({ palette }: PaletteProps) {
  const head = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (head.current)
      head.current.rotation.y = Math.sin(clock.elapsedTime * 0.6) * 0.7;
  });

  return (
    <group>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 2.2, 8]} />
        <meshStandardMaterial color={palette.bezel} />
      </mesh>
      <group ref={head} position={[0, 2.2, 0]}>
        <mesh position={[0.18, 0, 0]}>
          <boxGeometry args={[0.46, 0.22, 0.24]} />
          <meshStandardMaterial color={palette.surface} />
        </mesh>
        <mesh position={[0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 12]} />
          <meshBasicMaterial color={palette.accent} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export function DisplaySign({
  palette,
  texture,
}: PaletteProps & { texture: CanvasTexture }) {
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.6, 0]}>
          <boxGeometry args={[0.08, 1.2, 0.08]} />
          <meshStandardMaterial color={palette.bezel} />
        </mesh>
      ))}
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[1.5, 0.86, 0.1]} />
        <meshStandardMaterial color={palette.bezel} />
      </mesh>
      <mesh position={[0, 1.55, 0.051]}>
        <planeGeometry args={[1.38, 0.76]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function BookingPhone({ palette }: PaletteProps) {
  const phone = useRef<Group>(null);

  useFrame(({ clock }) => {
    const node = phone.current;
    if (!node) return;
    node.position.y = Math.sin(clock.elapsedTime * 1.4) * 0.12;
    node.rotation.y = Math.PI / 4 + Math.sin(clock.elapsedTime * 0.7) * 0.25;
  });

  return (
    <group ref={phone}>
      <mesh>
        <boxGeometry args={[0.5, 0.96, 0.06]} />
        <meshStandardMaterial color={palette.bezel} />
      </mesh>
      <mesh position={[0, 0, 0.031]}>
        <planeGeometry args={[0.42, 0.84]} />
        <meshBasicMaterial color={palette.accent} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.05, 0.033]}>
        <planeGeometry args={[0.3, 0.18]} />
        <meshBasicMaterial color={palette.surface} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function PatrolFigure({ palette }: PaletteProps) {
  const figure = useRef<Group>(null);

  useFrame(({ clock }) => {
    const node = figure.current;
    if (!node) return;
    const phase = clock.elapsedTime * 0.35;
    node.position.x = Math.sin(phase) * 1.2;
    node.rotation.y = Math.cos(phase) > 0 ? Math.PI / 2 : -Math.PI / 2;
  });

  return (
    <group ref={figure}>
      <mesh position={[0, 0.42, 0]}>
        <capsuleGeometry args={[0.16, 0.42, 4, 8]} />
        <meshStandardMaterial color={palette.deck} />
      </mesh>
      <mesh position={[0, 0.86, 0]}>
        <sphereGeometry args={[0.13, 12, 10]} />
        <meshStandardMaterial color={palette.surface} />
      </mesh>
      <mesh position={[0.16, 0.5, 0.08]}>
        <boxGeometry args={[0.04, 0.16, 0.1]} />
        <meshBasicMaterial color={palette.accent} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function CallBooth({ palette }: PaletteProps) {
  return (
    <group rotation={[0, -Math.PI / 6, 0]}>
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[1, 1.4, 0.9]} />
        <meshStandardMaterial color={palette.raised} />
      </mesh>
      <mesh position={[0, 0.85, 0.451]}>
        <planeGeometry args={[0.7, 0.6]} />
        <meshBasicMaterial color={palette.accent} toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.6, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.22, 0.05, 8, 20, Math.PI]} />
        <meshStandardMaterial color={palette.surface} />
      </mesh>
    </group>
  );
}

export function KioskTower({ palette }: PaletteProps) {
  return (
    <group rotation={[0, -Math.PI / 4, 0]}>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.52, 1.6, 0.4]} />
        <meshStandardMaterial color={palette.raised} />
      </mesh>
      <mesh position={[0, 1.15, 0.201]}>
        <planeGeometry args={[0.38, 0.5]} />
        <meshBasicMaterial color={palette.accent} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.62, 0.201]}>
        <planeGeometry args={[0.24, 0.08]} />
        <meshBasicMaterial color={palette.bezel} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function AiCore({ palette }: PaletteProps) {
  const core = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const node = core.current;
    if (!node) return;
    node.rotation.y = clock.elapsedTime * 0.5;
    node.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.3;
    node.position.y = Math.sin(clock.elapsedTime * 1.1) * 0.1;
  });

  return (
    <mesh ref={core}>
      <icosahedronGeometry args={[0.46, 0]} />
      <meshStandardMaterial
        color={palette.accent}
        flatShading
        roughness={0.25}
      />
    </mesh>
  );
}
