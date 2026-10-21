/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import { GaragePalette } from "@/components/sections/home/os-garage/garage-palette";
import { patrolAt } from "@/lib/os-garage-journey";

type FigureProps = { palette: GaragePalette; still: boolean };

const STEP_RATE = 9;
const STEP_HEIGHT = 0.04;

export function PatrolOfficer({ palette, still }: FigureProps) {
  const officer = useRef<Group>(null);

  useFrame(({ clock }) => {
    const node = officer.current;
    if (!node) return;
    const time = still ? 0 : clock.elapsedTime;
    const patrol = patrolAt(time);
    node.position.x = patrol.x;
    node.rotation.y = patrol.heading;
    node.position.y =
      Math.abs(Math.sin(time * STEP_RATE)) * STEP_HEIGHT * patrol.stride;
  });

  return (
    <group ref={officer}>
      <mesh position={[0, 0.44, 0]}>
        <capsuleGeometry args={[0.15, 0.42, 4, 10]} />
        <meshStandardMaterial color={palette.deck} />
      </mesh>
      <mesh position={[0, 0.88, 0]}>
        <sphereGeometry args={[0.12, 14, 10]} />
        <meshStandardMaterial color={palette.surface} />
      </mesh>
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.05, 14]} />
        <meshStandardMaterial color={palette.raised} />
      </mesh>
      <mesh position={[0.17, 0.52, 0]}>
        <boxGeometry args={[0.1, 0.16, 0.05]} />
        <meshBasicMaterial color={palette.accent} />
      </mesh>
    </group>
  );
}

export function RoofAi({ palette, still }: FigureProps) {
  const core = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!core.current || still) return;
    core.current.rotation.y = clock.elapsedTime * 0.6;
    core.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.25;
  });

  return (
    <group>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.34, 0.4, 0.16, 16]} />
        <meshStandardMaterial color={palette.raised} />
      </mesh>
      <mesh position={[0, 0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.3, 24]} />
        <meshBasicMaterial color={palette.accent} />
      </mesh>
      <mesh ref={core} position={[0, 0.56, 0]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={palette.accent}
          flatShading
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}
