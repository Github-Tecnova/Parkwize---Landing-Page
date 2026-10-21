/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject } from "react";
import { CanvasTexture } from "three";
import { BuildIn } from "@/components/sections/home/os-garage/garage-build";
import { GaragePalette } from "@/components/sections/home/os-garage/garage-palette";
import { BUILD_TIMING, LOT, OFFICE, Vec3 } from "@/lib/os-garage";

const CURB_HEIGHT = 0.1;
const SLAB_DEPTH = 0.3;

type Box = { from: [number, number]; to: [number, number] };

const half = LOT.width / 2;
const { entry, exit, half: lane } = LOT.lanes;

const CURBS: Box[] = [
  { from: [-half, LOT.sidewalk.near], to: [entry - lane, LOT.sidewalk.far] },
  { from: [exit + lane, LOT.sidewalk.near], to: [half, LOT.sidewalk.far] },
  {
    from: [entry + lane + 0.2, LOT.walkway.near],
    to: [exit - lane - 0.2, LOT.sidewalk.far],
  },
  {
    from: [entry - lane - 0.95, 1],
    to: [entry - lane - 0.05, LOT.sidewalk.near],
  },
  {
    from: [exit + lane + 0.05, 0.6],
    to: [exit + lane + 0.95, LOT.sidewalk.near],
  },
];

type LotProps = {
  palette: GaragePalette;
  ground: CanvasTexture;
  build: RefObject<number>;
};

export function GarageLot({ palette, ground, build }: LotProps) {
  return (
    <>
      <BuildIn at={0} build={build}>
        <mesh position={[0, -SLAB_DEPTH / 2, 0]}>
          <boxGeometry args={[LOT.width, SLAB_DEPTH, LOT.depth]} />
          <meshStandardMaterial color={palette.slab} roughness={0.9} />
        </mesh>
        <mesh position={[0, -SLAB_DEPTH - 0.04, 0]}>
          <boxGeometry args={[LOT.width + 0.24, 0.08, LOT.depth + 0.24]} />
          <meshBasicMaterial color={palette.line} />
        </mesh>
        <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[LOT.width, LOT.depth]} />
          <meshBasicMaterial map={ground} />
        </mesh>
      </BuildIn>
      <BuildIn at={BUILD_TIMING.structure} build={build}>
        {CURBS.map(({ from, to }) => (
          <mesh
            key={`${from[0]}${from[1]}`}
            position={[
              (from[0] + to[0]) / 2,
              CURB_HEIGHT / 2,
              (from[1] + to[1]) / 2,
            ]}
          >
            <boxGeometry
              args={[to[0] - from[0], CURB_HEIGHT, to[1] - from[1]]}
            />
            <meshStandardMaterial color={palette.surface} roughness={0.85} />
          </mesh>
        ))}
      </BuildIn>
    </>
  );
}

type OfficeProps = {
  palette: GaragePalette;
  screen: CanvasTexture;
  build: RefObject<number>;
};

export function ControlOffice({ palette, screen, build }: OfficeProps) {
  const [width, height, depth] = OFFICE.size;
  const screenOffset: Vec3 = [
    OFFICE.screen[0] - OFFICE.position[0],
    OFFICE.screen[1],
    OFFICE.screen[2] - OFFICE.position[2],
  ];

  return (
    <BuildIn
      at={BUILD_TIMING.office}
      build={build}
      drop={0.6}
      position={OFFICE.position}
    >
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={palette.surface} roughness={0.8} />
      </mesh>
      <mesh position={[0, height + 0.04, 0]}>
        <boxGeometry args={[width + 0.12, 0.08, depth + 0.12]} />
        <meshStandardMaterial color={palette.raised} />
      </mesh>
      <mesh position={[0, height * 0.58, depth / 2 + 0.002]}>
        <planeGeometry args={[width * 0.86, 0.42]} />
        <meshBasicMaterial color={palette.raised} />
      </mesh>
      <mesh
        position={[width / 2 + 0.002, height * 0.58, -0.15]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[depth * 0.55, 0.42]} />
        <meshBasicMaterial color={palette.raised} />
      </mesh>
      <mesh
        position={[width / 2 + 0.002, 0.42, 0.5]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[0.36, 0.84]} />
        <meshBasicMaterial color={palette.deck} />
      </mesh>
      <group position={screenOffset} rotation={[0, Math.PI / 4, 0]}>
        {[-0.7, 0.7].map((x) => (
          <mesh key={x} position={[x, -0.5, -0.02]}>
            <boxGeometry args={[0.06, 0.4, 0.06]} />
            <meshStandardMaterial color={palette.bezel} />
          </mesh>
        ))}
        <mesh>
          <boxGeometry args={[1.98, 1.16, 0.08]} />
          <meshStandardMaterial color={palette.bezel} />
        </mesh>
        <mesh position={[0, 0, 0.041]}>
          <planeGeometry args={[1.86, 1.08]} />
          <meshBasicMaterial map={screen} />
        </mesh>
      </group>
    </BuildIn>
  );
}
