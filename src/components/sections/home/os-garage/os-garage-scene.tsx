/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { DeviceSlot } from "@/components/sections/home/os-garage/garage-build";
import {
  JourneyCar,
  ParkedCars,
} from "@/components/sections/home/os-garage/garage-cars";
import {
  createGroundTexture,
  createShadowTexture,
} from "@/components/sections/home/os-garage/garage-ground-texture";
import {
  ControlOffice,
  GarageLot,
} from "@/components/sections/home/os-garage/garage-lot";
import {
  readPalette,
  readType,
} from "@/components/sections/home/os-garage/garage-palette";
import { GaragePulses } from "@/components/sections/home/os-garage/garage-pulses";
import {
  CameraFit,
  placeMarker,
  renderDevice,
} from "@/components/sections/home/os-garage/garage-stage";
import {
  createScreenPainter,
  createSignPainter,
  initialChartSeries,
  nextChartSeries,
} from "@/components/sections/home/os-garage/garage-textures";
import {
  appearAmount,
  BUILD_TIMING,
  buildSchedule,
  GARAGE_DEVICES,
  GarageDeviceKey,
} from "@/lib/os-garage";
import {
  createJourneyFrame,
  JOURNEY_REST,
  journeyAt,
  JourneyPhase,
  LIVE_DEVICES,
  patrolAt,
} from "@/lib/os-garage-journey";

const DRIFT = 0.05;
const SCREEN_TICK = 2.4;
const FREE_RANGE: [number, number] = [12, 38];
const DRIVER_PRIORITY = -1;

export type OsGarageSceneProps = {
  active: boolean;
  reducedMotion: boolean;
  compact: boolean;
  highlight: GarageDeviceKey | null;
  markers: RefObject<(HTMLElement | null)[]>;
  rows: RefObject<(HTMLElement | null)[]>;
  localeTag: string;
  onReady: () => void;
};

type GarageWorldProps = Omit<OsGarageSceneProps, "active" | "onReady">;

function markLive(elements: (HTMLElement | null)[], live: GarageDeviceKey[]) {
  GARAGE_DEVICES.forEach((device, index) =>
    elements[index]?.setAttribute(
      "data-live",
      String(live.includes(device.key)),
    ),
  );
}

function GarageWorld({
  reducedMotion,
  compact,
  highlight,
  markers,
  rows,
  localeTag,
}: GarageWorldProps) {
  const schedule = useMemo(() => buildSchedule(), []);
  const palette = useMemo(() => readPalette(document.documentElement), []);
  const textures = useMemo(() => {
    const type = readType(document.documentElement, localeTag);
    return {
      screen: createScreenPainter(palette, type),
      sign: createSignPainter(palette, type),
      ground: createGroundTexture(palette),
      shadow: createShadowTexture(palette),
    };
  }, [palette, localeTag]);
  const build = useRef(reducedMotion ? schedule.total : 0);
  const journey = useRef(createJourneyFrame());
  const journeyTime = useRef(0);
  const phase = useRef<JourneyPhase | null>(null);
  const series = useRef(initialChartSeries());
  const free = useRef(FREE_RANGE[1] - 9);
  const shown = useRef(-1);
  const tick = useRef(0);
  const world = useRef<Group>(null);
  const point = useMemo(() => new Vector3(), []);

  useEffect(() => {
    textures.screen.paint(series.current);
    return () =>
      Object.values(textures).forEach((item) =>
        "texture" in item ? item.texture.dispose() : item.dispose(),
      );
  }, [textures]);

  useFrame(({ camera, size, pointer, clock }, delta) => {
    const node = world.current;
    if (!node) return;

    if (build.current < schedule.total) {
      build.current = Math.min(build.current + delta, schedule.total);
    }
    const built = build.current >= schedule.total;

    if (reducedMotion) {
      journeyAt(JOURNEY_REST, journey.current);
    } else if (built) {
      journeyTime.current += delta;
      journeyAt(journeyTime.current, journey.current);
      const target = Math.max(-1, Math.min(1, pointer.x)) * DRIFT;
      node.rotation.y += (target - node.rotation.y) * Math.min(delta * 2, 1);
      tick.current += delta;
      if (tick.current > SCREEN_TICK) {
        tick.current = 0;
        series.current = nextChartSeries(series.current);
        textures.screen.paint(series.current);
        const step = Math.round((Math.random() - 0.5) * 4);
        free.current = Math.min(
          Math.max(free.current + step, FREE_RANGE[0]),
          FREE_RANGE[1],
        );
      }
    }

    const available = free.current - (journey.current.occupied ? 1 : 0);
    if (available !== shown.current) {
      shown.current = available;
      textures.sign.paint(available);
    }

    if (journey.current.phase !== phase.current) {
      phase.current = journey.current.phase;
      const live = reducedMotion ? [] : LIVE_DEVICES[phase.current];
      markLive(rows.current, live);
      markLive(markers.current, live);
    }

    const time = reducedMotion ? 0 : clock.elapsedTime;
    node.updateMatrixWorld();
    GARAGE_DEVICES.forEach((device, index) => {
      const [x, y, z] = device.parts[0].position;
      const markerX = device.key === "enforcement" ? patrolAt(time).x : x;
      point
        .set(markerX, y + device.marker, z)
        .applyMatrix4(node.matrixWorld)
        .project(camera);
      const at = schedule.devices.get(device.key) ?? 0;
      placeMarker(
        markers.current[index],
        point,
        size,
        appearAmount(build.current, at + BUILD_TIMING.marker),
      );
    });
  }, DRIVER_PRIORITY);

  const context = {
    palette,
    journey,
    sign: textures.sign.texture,
    still: reducedMotion,
  };

  return (
    <group ref={world}>
      <hemisphereLight args={[palette.surface, palette.slab, 1.6]} />
      <directionalLight position={[6, 12, 5]} intensity={1.4} />
      <GarageLot palette={palette} ground={textures.ground} build={build} />
      <ControlOffice
        palette={palette}
        screen={textures.screen.texture}
        build={build}
      />
      {GARAGE_DEVICES.map((device) => (
        <DeviceSlot
          key={device.key}
          device={device}
          at={schedule.devices.get(device.key) ?? 0}
          build={build}
          highlighted={highlight === device.key}
          dimmed={highlight !== null && highlight !== device.key}
          instant={reducedMotion}
          render={(part) => renderDevice(device.key, part, context)}
        />
      ))}
      <ParkedCars
        palette={palette}
        shadow={textures.shadow}
        build={build}
        at={schedule.cars}
      />
      <JourneyCar
        palette={palette}
        shadow={textures.shadow}
        journey={journey}
        color={palette.accent}
      />
      {!compact && (
        <GaragePulses
          palette={palette}
          journey={journey}
          highlight={highlight}
          still={reducedMotion}
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
