/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  CanvasTexture,
  Group,
  Mesh,
  MeshBasicMaterial,
  Quaternion,
  Vector3,
} from "three";
import { approach } from "@/components/sections/home/os-garage/garage-build";
import { GaragePalette } from "@/components/sections/home/os-garage/garage-palette";
import {
  JourneyFrame,
  JourneyPhase,
  pedestrianAt,
} from "@/lib/os-garage-journey";

type PaletteProps = { palette: GaragePalette };
type JourneyProps = PaletteProps & { journey: RefObject<JourneyFrame> };

const ARM_LENGTH = 1.75;
const ARM_OPEN = 1.35;
const SCAN_TARGET = new Vector3(1.4, -1.8, -0.75);

function useStatusScreen(
  palette: GaragePalette,
  isActive: (time: number) => boolean,
) {
  const material = useRef<MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    material.current?.color.copy(
      isActive(clock.elapsedTime) ? palette.success : palette.accent,
    );
  });

  return material;
}

function usePhaseScreen(
  journey: RefObject<JourneyFrame>,
  palette: GaragePalette,
  phases: JourneyPhase[],
) {
  return useStatusScreen(palette, () => phases.includes(journey.current.phase));
}

export function Barrier({
  palette,
  journey,
  exit,
}: JourneyProps & { exit: boolean }) {
  const arm = useRef<Group>(null);
  const lamp = useRef<MeshBasicMaterial>(null);
  const openOn: JourneyPhase[] = exit ? ["exit"] : ["open", "enter"];

  useFrame((_, delta) => {
    const open = openOn.includes(journey.current.phase);
    if (arm.current) {
      arm.current.rotation.z = approach(
        arm.current.rotation.z,
        open ? ARM_OPEN : 0,
        delta * 0.6,
      );
    }
    lamp.current?.color.copy(open ? palette.success : palette.destructive);
  });

  return (
    <group>
      <mesh position={[0, 0.48, 0]}>
        <boxGeometry args={[0.28, 0.96, 0.32]} />
        <meshStandardMaterial color={palette.raised} roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[0.16, 0.08, 0.16]} />
        <meshBasicMaterial ref={lamp} color={palette.destructive} />
      </mesh>
      <group ref={arm} position={[0.1, 0.82, 0]}>
        <mesh position={[ARM_LENGTH / 2, 0, 0]}>
          <boxGeometry args={[ARM_LENGTH, 0.07, 0.07]} />
          <meshStandardMaterial color={palette.surface} />
        </mesh>
        {[0.45, 1.05, 1.6].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[0.16, 0.075, 0.075]} />
            <meshBasicMaterial color={palette.accent} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function CameraPole({ palette, journey }: JourneyProps) {
  const beam = useRef<Mesh>(null);
  const beamMaterial = useRef<MeshBasicMaterial>(null);
  const { position, quaternion, length } = useMemo(() => {
    const direction = SCAN_TARGET.clone();
    const distance = direction.length();
    return {
      position: direction.clone().multiplyScalar(0.5),
      quaternion: new Quaternion().setFromUnitVectors(
        new Vector3(0, -1, 0),
        direction.normalize(),
      ),
      length: distance,
    };
  }, []);

  useFrame(({ clock }) => {
    const reading = journey.current.phase === "read";
    if (beam.current) beam.current.visible = reading;
    if (beamMaterial.current) {
      beamMaterial.current.opacity =
        0.18 + Math.abs(Math.sin(clock.elapsedTime * 14)) * 0.14;
    }
  });

  return (
    <group>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 2.2, 8]} />
        <meshStandardMaterial color={palette.bezel} />
      </mesh>
      <mesh position={[0.22, 2.16, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.06]} />
        <meshStandardMaterial color={palette.bezel} />
      </mesh>
      <group position={[0.5, 2.12, 0]} rotation={[0.4, -0.5, -0.5]}>
        <mesh>
          <boxGeometry args={[0.42, 0.2, 0.22]} />
          <meshStandardMaterial color={palette.surface} />
        </mesh>
        <mesh position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 12]} />
          <meshBasicMaterial color={palette.accent} />
        </mesh>
      </group>
      <group position={[0.5, 2.12, 0]}>
        <mesh
          ref={beam}
          position={position}
          quaternion={quaternion}
          visible={false}
        >
          <coneGeometry args={[0.38, length, 16, 1, true]} />
          <meshBasicMaterial
            ref={beamMaterial}
            color={palette.accent}
            transparent
            opacity={0.2}
            depthWrite={false}
          />
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
    <group>
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} position={[x, 0.65, 0]}>
          <boxGeometry args={[0.08, 1.3, 0.08]} />
          <meshStandardMaterial color={palette.bezel} />
        </mesh>
      ))}
      <mesh position={[0, 1.62, 0]}>
        <boxGeometry args={[1.56, 0.9, 0.1]} />
        <meshStandardMaterial color={palette.bezel} />
      </mesh>
      <mesh position={[0, 1.62, 0.051]}>
        <planeGeometry args={[1.42, 0.78]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
}

export function ReservedPedestal({ palette, journey }: JourneyProps) {
  const screen = usePhaseScreen(journey, palette, [
    "read",
    "open",
    "enter",
    "park",
  ]);

  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.16, 0.9, 0.16]} />
        <meshStandardMaterial color={palette.bezel} />
      </mesh>
      <group position={[0, 0.98, 0]} rotation={[-0.5, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.36, 0.06]} />
          <meshStandardMaterial color={palette.bezel} />
        </mesh>
        <mesh position={[0, 0, 0.031]}>
          <planeGeometry args={[0.42, 0.28]} />
          <meshBasicMaterial ref={screen} color={palette.accent} />
        </mesh>
      </group>
    </group>
  );
}

export function KioskTower({
  palette,
  still,
}: PaletteProps & { still: boolean }) {
  const screen = useStatusScreen(
    palette,
    (time) => !still && pedestrianAt(time).paying,
  );

  return (
    <group>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.56, 1.5, 0.42]} />
        <meshStandardMaterial color={palette.raised} />
      </mesh>
      <mesh position={[0, 1.08, 0.211]}>
        <planeGeometry args={[0.4, 0.46]} />
        <meshBasicMaterial ref={screen} color={palette.accent} />
      </mesh>
      <mesh position={[0, 0.62, 0.211]}>
        <planeGeometry args={[0.26, 0.07]} />
        <meshBasicMaterial color={palette.bezel} />
      </mesh>
      <mesh position={[0, 1.56, 0]}>
        <boxGeometry args={[0.66, 0.08, 0.5]} />
        <meshStandardMaterial color={palette.surface} />
      </mesh>
    </group>
  );
}

export function PaymentTerminal({ palette, journey }: JourneyProps) {
  const screen = usePhaseScreen(journey, palette, ["pay", "exit"]);

  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.3, 0.9, 0.3]} />
        <meshStandardMaterial color={palette.raised} />
      </mesh>
      <group position={[0, 1.0, 0.04]} rotation={[-0.45, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.46, 0.34, 0.14]} />
          <meshStandardMaterial color={palette.bezel} />
        </mesh>
        <mesh position={[0, 0, 0.071]}>
          <planeGeometry args={[0.36, 0.24]} />
          <meshBasicMaterial ref={screen} color={palette.accent} />
        </mesh>
      </group>
    </group>
  );
}

export function Intercom({ palette }: PaletteProps) {
  return (
    <group>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.26]} />
        <meshStandardMaterial color={palette.surface} />
      </mesh>
      <mesh position={[0, 0.92, 0.131]}>
        <circleGeometry args={[0.09, 16]} />
        <meshBasicMaterial color={palette.bezel} />
      </mesh>
      <mesh position={[0, 0.68, 0.131]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color={palette.accent} />
      </mesh>
    </group>
  );
}
