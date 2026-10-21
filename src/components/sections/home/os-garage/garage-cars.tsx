/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  CanvasTexture,
  Color,
  Euler,
  Group,
  InstancedMesh,
  Matrix4,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from "three";
import { GaragePalette } from "@/components/sections/home/os-garage/garage-palette";
import {
  appearAmount,
  BAY_ROWS,
  BUILD_TIMING,
  bayX,
  easeOutBack,
  PARKED_BAYS,
} from "@/lib/os-garage";
import { JourneyFrame } from "@/lib/os-garage-journey";

const CAR_DROP = 0.7;
const SHADOW_OPACITY = 0.32;

const BODY = { size: [1.9, 0.42, 0.92], at: [0, 0.31, 0] } as const;
const CABIN = { size: [1, 0.3, 0.8], at: [-0.12, 0.67, 0] } as const;
const WHEEL_OFFSETS: [number, number][] = [
  [0.6, 0.42],
  [0.6, -0.42],
  [-0.6, 0.42],
  [-0.6, -0.42],
];

const SHADOW_GEOMETRY = new PlaneGeometry(2.3, 1.3)
  .rotateX(-Math.PI / 2)
  .translate(0, 0.012, 0);

const PARKED = BAY_ROWS.flatMap((row, rowIndex) =>
  PARKED_BAYS[rowIndex].map((bay) => ({
    x: bayX(bay),
    z: row.z,
    heading: row.heading > 0 ? -Math.PI / 2 : Math.PI / 2,
  })),
);

function parkedColors(palette: GaragePalette) {
  return [palette.surface, palette.muted, palette.line, palette.deck];
}

function offsetMatrix(x: number, y: number, z: number) {
  return new Matrix4().makeTranslation(x, y, z);
}

const WHEEL_MATRICES = WHEEL_OFFSETS.map(([x, z]) =>
  offsetMatrix(x, 0.15, z).multiply(new Matrix4().makeRotationX(Math.PI / 2)),
);

type ParkedCarsProps = {
  palette: GaragePalette;
  shadow: CanvasTexture;
  build: RefObject<number>;
  at: number;
};

export function ParkedCars({ palette, shadow, build, at }: ParkedCarsProps) {
  const bodies = useRef<InstancedMesh>(null);
  const cabins = useRef<InstancedMesh>(null);
  const wheels = useRef<InstancedMesh>(null);
  const shadows = useRef<InstancedMesh>(null);
  const settled = useRef(false);
  const scratch = useMemo(
    () => ({
      car: new Matrix4(),
      part: new Matrix4(),
      position: new Vector3(),
      rotation: new Quaternion(),
      scale: new Vector3(),
      euler: new Euler(),
    }),
    [],
  );

  useLayoutEffect(() => {
    const colors = parkedColors(palette);
    PARKED.forEach((_, index) =>
      bodies.current?.setColorAt(index, colors[index % colors.length]),
    );
    if (bodies.current?.instanceColor) {
      bodies.current.instanceColor.needsUpdate = true;
    }
  }, [palette]);

  useFrame(() => {
    if (settled.current) return;
    const { car, part, position, rotation, scale, euler } = scratch;
    let complete = true;

    PARKED.forEach((spot, index) => {
      const amount = appearAmount(
        build.current,
        at + index * BUILD_TIMING.carStep,
      );
      if (amount < 1) complete = false;
      const eased = amount === 1 ? 1 : easeOutBack(amount);
      position.set(spot.x, (1 - Math.min(eased, 1)) * CAR_DROP, spot.z);
      rotation.setFromEuler(euler.set(0, spot.heading, 0));
      scale.setScalar(Math.max(eased, 0.0001));
      car.compose(position, rotation, scale);

      bodies.current?.setMatrixAt(
        index,
        part.copy(car).multiply(offsetMatrix(...BODY.at)),
      );
      cabins.current?.setMatrixAt(
        index,
        part.copy(car).multiply(offsetMatrix(...CABIN.at)),
      );
      shadows.current?.setMatrixAt(index, part.copy(car));
      WHEEL_MATRICES.forEach((wheel, wheelIndex) =>
        wheels.current?.setMatrixAt(
          index * 4 + wheelIndex,
          part.copy(car).multiply(wheel),
        ),
      );
    });

    [bodies, cabins, wheels, shadows].forEach((mesh) => {
      if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
    });
    settled.current = complete;
  });

  return (
    <group>
      <instancedMesh
        ref={shadows}
        args={[SHADOW_GEOMETRY, undefined, PARKED.length]}
        frustumCulled={false}
      >
        <meshBasicMaterial
          map={shadow}
          transparent
          opacity={SHADOW_OPACITY}
          depthWrite={false}
        />
      </instancedMesh>
      <instancedMesh
        ref={bodies}
        args={[undefined, undefined, PARKED.length]}
        frustumCulled={false}
      >
        <boxGeometry args={[...BODY.size]} />
        <meshStandardMaterial roughness={0.45} />
      </instancedMesh>
      <instancedMesh
        ref={cabins}
        args={[undefined, undefined, PARKED.length]}
        frustumCulled={false}
      >
        <boxGeometry args={[...CABIN.size]} />
        <meshStandardMaterial color={palette.raised} roughness={0.3} />
      </instancedMesh>
      <instancedMesh
        ref={wheels}
        args={[undefined, undefined, PARKED.length * 4]}
        frustumCulled={false}
      >
        <cylinderGeometry args={[0.15, 0.15, 0.1, 10]} />
        <meshStandardMaterial color={palette.bezel} />
      </instancedMesh>
    </group>
  );
}

type JourneyCarProps = {
  palette: GaragePalette;
  shadow: CanvasTexture;
  journey: RefObject<JourneyFrame>;
  color: Color;
};

export function JourneyCar({
  palette,
  shadow,
  journey,
  color,
}: JourneyCarProps) {
  const car = useRef<Group>(null);

  useFrame(() => {
    const node = car.current;
    if (!node) return;
    const frame = journey.current;
    node.visible = frame.scale > 0;
    node.position.set(frame.x, 0, frame.z);
    node.rotation.y = frame.heading;
    node.scale.setScalar(Math.max(frame.scale, 0.0001));
  });

  return (
    <group ref={car} visible={false}>
      <mesh geometry={SHADOW_GEOMETRY}>
        <meshBasicMaterial
          map={shadow}
          transparent
          opacity={SHADOW_OPACITY}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[...BODY.at]}>
        <boxGeometry args={[...BODY.size]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh position={[...CABIN.at]}>
        <boxGeometry args={[...CABIN.size]} />
        <meshStandardMaterial color={palette.raised} roughness={0.3} />
      </mesh>
      {WHEEL_OFFSETS.map(([x, z]) => (
        <mesh
          key={`${x}${z}`}
          position={[x, 0.15, z]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.15, 0.15, 0.1, 10]} />
          <meshStandardMaterial color={palette.bezel} />
        </mesh>
      ))}
    </group>
  );
}
