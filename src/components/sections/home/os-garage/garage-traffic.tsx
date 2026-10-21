/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  Group,
  Mesh,
  QuadraticBezierCurve3,
  Vector3,
} from "three";
import {
  BuildIn,
  GarageCar,
} from "@/components/sections/home/os-garage/garage-models";
import { GaragePalette } from "@/components/sections/home/os-garage/garage-palette";
import {
  BAY_DEPTH,
  BAY_ROWS,
  BAY_WIDTH,
  BAYS_PER_ROW,
  CAR_LOOP,
  CORE_POSITION,
  FIRST_BAY_X,
  GARAGE_DEVICES,
  LOOP_SECONDS,
  PARKED_BAYS,
} from "@/lib/os-garage";

const PACKET_SPEED = 0.24;
const CAR_STAGGER = 0.05;
const PACKET_LIFT = 2.6;

function carColors(palette: GaragePalette) {
  return [palette.surface, palette.accent, palette.muted, palette.deck];
}

type BuildProps = {
  palette: GaragePalette;
  build: RefObject<number>;
  at: number;
};

export function ParkedCars({ palette, build, at }: BuildProps) {
  const colors = carColors(palette);
  let order = 0;

  return BAY_ROWS.flatMap((row, rowIndex) =>
    PARKED_BAYS[rowIndex].map((bay, index) => {
      order += 1;
      return (
        <BuildIn
          key={`${rowIndex}-${bay}`}
          at={at + order * CAR_STAGGER}
          build={build}
          drop={0.8}
          position={[
            FIRST_BAY_X + bay * BAY_WIDTH,
            0,
            row.z + row.facing * 0.1,
          ]}
        >
          <group rotation={[0, row.facing * (Math.PI / 2), 0]}>
            <GarageCar
              color={colors[(index + rowIndex) % colors.length]}
              palette={palette}
            />
          </group>
        </BuildIn>
      );
    }),
  );
}

export function BayLines({ palette }: { palette: GaragePalette }) {
  return BAY_ROWS.flatMap((row) =>
    Array.from({ length: BAYS_PER_ROW + 1 }, (_, index) => (
      <mesh
        key={`${row.z}-${index}`}
        position={[
          FIRST_BAY_X - BAY_WIDTH / 2 + index * BAY_WIDTH,
          0.006,
          row.z,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.05, BAY_DEPTH]} />
        <meshBasicMaterial color={palette.line} />
      </mesh>
    )),
  );
}

export function MovingCars({
  palette,
  count,
  positions,
  build,
  at,
}: BuildProps & {
  count: number;
  positions: RefObject<Vector3[]>;
}) {
  const curve = useMemo(
    () =>
      new CatmullRomCurve3(
        CAR_LOOP.map(([x, z]) => new Vector3(x, 0, z)),
        true,
        "centripetal",
      ),
    [],
  );
  const cars = useRef<(Group | null)[]>([]);
  const colors = carColors(palette);
  const tangent = useMemo(() => new Vector3(), []);

  useFrame(({ clock }) => {
    positions.current = cars.current.flatMap((car, index) => {
      if (!car) return [];
      car.visible = build.current >= at;
      const progress = (clock.elapsedTime / LOOP_SECONDS + index / count) % 1;
      curve.getPointAt(progress, car.position);
      curve.getTangentAt(progress, tangent);
      car.rotation.y = Math.atan2(-tangent.z, tangent.x);
      return [car.position];
    });
  });

  return Array.from({ length: count }, (_, index) => (
    <group
      key={index}
      ref={(node) => {
        cars.current[index] = node;
      }}
    >
      <GarageCar
        color={colors[(index + 1) % colors.length]}
        palette={palette}
      />
    </group>
  ));
}

export function DataPackets({ palette, build, at }: BuildProps) {
  const group = useRef<Group>(null);
  const curves = useMemo(() => {
    const end = new Vector3(...CORE_POSITION);
    return GARAGE_DEVICES.map(({ position }) => {
      const start = new Vector3(position[0], position[1] + 0.9, position[2]);
      const control = start.clone().lerp(end, 0.5);
      control.y += PACKET_LIFT;
      return new QuadraticBezierCurve3(start, control, end);
    });
  }, []);
  const packets = useRef<(Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    if (group.current) group.current.visible = build.current >= at;
    packets.current.forEach((packet, index) => {
      if (!packet) return;
      const progress = (clock.elapsedTime * PACKET_SPEED + index * 0.17) % 1;
      curves[index].getPoint(progress, packet.position);
      packet.scale.setScalar(0.6 + Math.sin(progress * Math.PI) * 0.6);
    });
  });

  return (
    <group ref={group} visible={false}>
      {curves.map((curve, index) => (
        <group key={index}>
          <mesh>
            <tubeGeometry args={[curve, 32, 0.008, 4, false]} />
            <meshBasicMaterial
              color={palette.accent}
              transparent
              opacity={0.25}
              toneMapped={false}
            />
          </mesh>
          <mesh
            ref={(node) => {
              packets.current[index] = node;
            }}
          >
            <sphereGeometry args={[0.09, 12, 10]} />
            <meshBasicMaterial color={palette.accent} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
