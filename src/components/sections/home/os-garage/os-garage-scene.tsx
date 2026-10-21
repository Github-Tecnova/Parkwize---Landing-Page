/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Group, Vector3 } from "three";
import {
  BuildIn,
  DeviceSlot,
} from "@/components/sections/home/os-garage/garage-models";
import {
  readPalette,
  readType,
} from "@/components/sections/home/os-garage/garage-palette";
import {
  CameraFit,
  CoreScreen,
  placeTag,
  renderDevice,
} from "@/components/sections/home/os-garage/garage-stage";
import {
  createScreenPainter,
  createSignPainter,
  initialChartSeries,
  nextChartSeries,
} from "@/components/sections/home/os-garage/garage-textures";
import {
  BayLines,
  DataPackets,
  MovingCars,
  ParkedCars,
} from "@/components/sections/home/os-garage/garage-traffic";
import {
  appearAmount,
  BUILD_TIMING,
  buildSchedule,
  CORE_POSITION,
  GARAGE_DEVICES,
  GarageDeviceKey,
  MOVING_CARS,
  SLAB,
} from "@/lib/os-garage";

const DRIFT = 0.08;
const SCREEN_TICK = 2.4;
const FREE_RANGE: [number, number] = [8, 42];

export type OsGarageSceneProps = {
  active: boolean;
  reducedMotion: boolean;
  compact: boolean;
  highlight: GarageDeviceKey[] | null;
  tags: RefObject<(HTMLElement | null)[]>;
  coreTag: RefObject<HTMLElement | null>;
  localeTag: string;
  onReady: () => void;
};

type GarageWorldProps = Omit<OsGarageSceneProps, "active" | "onReady">;

function GarageWorld({
  reducedMotion,
  compact,
  highlight,
  tags,
  coreTag,
  localeTag,
}: GarageWorldProps) {
  const schedule = useMemo(() => buildSchedule(), []);
  const palette = useMemo(() => readPalette(document.documentElement), []);
  const painters = useMemo(() => {
    const type = readType(document.documentElement, localeTag);
    return {
      screen: createScreenPainter(palette, type),
      sign: createSignPainter(palette, type),
    };
  }, [palette, localeTag]);
  const build = useRef(reducedMotion ? schedule.total : 0);
  const [built, setBuilt] = useState(reducedMotion);
  const series = useRef(initialChartSeries());
  const free = useRef(FREE_RANGE[1]);
  const tick = useRef(0);
  const world = useRef<Group>(null);
  const cars = useRef<Vector3[]>([]);
  const point = useMemo(() => new Vector3(), []);

  useEffect(() => {
    painters.screen.paint(series.current);
    painters.sign.paint(free.current);
    return () => {
      painters.screen.texture.dispose();
      painters.sign.texture.dispose();
    };
  }, [painters]);

  useFrame(({ camera, size, pointer }, delta) => {
    const node = world.current;
    if (!node) return;

    if (build.current < schedule.total) {
      build.current = Math.min(build.current + delta, schedule.total);
      if (build.current >= schedule.total) setBuilt(true);
    }

    if (!reducedMotion) {
      const target = Math.max(-1, Math.min(1, pointer.x)) * DRIFT;
      node.rotation.y += (target - node.rotation.y) * Math.min(delta * 2, 1);
      tick.current += delta;
      if (tick.current > SCREEN_TICK && build.current >= schedule.core) {
        tick.current = 0;
        series.current = nextChartSeries(series.current);
        painters.screen.paint(series.current);
        const step = Math.round((Math.random() - 0.55) * 6);
        free.current = Math.min(
          Math.max(free.current + step, FREE_RANGE[0]),
          FREE_RANGE[1],
        );
        painters.sign.paint(free.current);
      }
    }

    node.updateMatrixWorld();
    GARAGE_DEVICES.forEach((device, index) => {
      const [x, y, z] = device.position;
      point
        .set(x, y + device.tagHeight, z)
        .applyMatrix4(node.matrixWorld)
        .project(camera);
      const at = schedule.devices.get(device.key) ?? 0;
      placeTag(
        tags.current[index],
        point,
        size,
        appearAmount(build.current, at + 0.15),
      );
    });
    point
      .set(CORE_POSITION[0], CORE_POSITION[1] + 1.55, CORE_POSITION[2])
      .applyMatrix4(node.matrixWorld)
      .project(camera);
    placeTag(
      coreTag.current,
      point,
      size,
      appearAmount(build.current, schedule.core + 0.2),
    );
  });

  return (
    <group ref={world}>
      <hemisphereLight args={[palette.surface, palette.slab, 1.7]} />
      <directionalLight position={[6, 12, 5]} intensity={1.3} />
      <BuildIn at={0} build={build}>
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[SLAB.width, 0.3, SLAB.depth]} />
          <meshStandardMaterial color={palette.slab} roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.34, 0]}>
          <boxGeometry args={[SLAB.width + 0.3, 0.08, SLAB.depth + 0.3]} />
          <meshBasicMaterial color={palette.line} />
        </mesh>
      </BuildIn>
      <BuildIn at={BUILD_TIMING.slab} build={build}>
        <BayLines palette={palette} />
      </BuildIn>
      {GARAGE_DEVICES.map((device) => (
        <DeviceSlot
          key={device.key}
          device={device}
          at={schedule.devices.get(device.key) ?? 0}
          build={build}
          highlighted={highlight?.length === 1 && highlight[0] === device.key}
          dimmed={highlight !== null && !highlight.includes(device.key)}
        >
          {renderDevice(device.key, palette, cars, painters.sign.texture)}
        </DeviceSlot>
      ))}
      <CoreScreen
        palette={palette}
        texture={painters.screen.texture}
        build={build}
        at={schedule.core}
      />
      <ParkedCars palette={palette} build={build} at={schedule.traffic} />
      <MovingCars
        palette={palette}
        count={compact ? MOVING_CARS.compact : MOVING_CARS.desktop}
        positions={cars}
        build={build}
        at={schedule.traffic}
      />
      <DataPackets palette={palette} build={build} at={schedule.traffic} />
      {built && !compact && (
        <ContactShadows
          position={[0, 0.01, 0]}
          scale={[SLAB.width, SLAB.depth]}
          blur={2.4}
          opacity={0.3}
          far={3}
          resolution={512}
          frames={1}
        />
      )}
    </group>
  );
}

export function OsGarageScene({
  active,
  onReady,
  ...world
}: OsGarageSceneProps) {
  const frameloop = world.reducedMotion
    ? "demand"
    : active
      ? "always"
      : "never";

  return (
    <Canvas
      orthographic
      flat
      camera={{ position: [11, 17, 11], zoom: 40, near: 0.1, far: 140 }}
      frameloop={frameloop}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      onCreated={onReady}
      aria-hidden
      style={{ touchAction: "pan-y" }}
    >
      <CameraFit />
      <GarageWorld {...world} />
    </Canvas>
  );
}
