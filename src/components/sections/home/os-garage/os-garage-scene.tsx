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
import { Pedestrian } from "@/components/sections/home/os-garage/garage-figures";
import { GaragePulses } from "@/components/sections/home/os-garage/garage-pulses";
import {
  CameraFit,
  placePin,
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
  PIN_LIFT,
} from "@/lib/os-garage";
import {
  createJourneyFrame,
  JOURNEY_REST,
  journeyAt,
  LIVE_DEVICES,
  patrolAt,
  pedestrianAt,
  storyAt,
  streetCarAt,
} from "@/lib/os-garage-journey";

const DRIFT = 0.05;
const SCREEN_TICK = 2.4;
const FREE_RANGE: [number, number] = [12, 38];
const DRIVER_PRIORITY = -1;
const PIN_FOOT = 0.25;

export type OsGarageSceneProps = {
  active: boolean;
  reducedMotion: boolean;
  compact: boolean;
  highlight: GarageDeviceKey | null;
  playing: boolean;
  pins: RefObject<(HTMLElement | null)[]>;
  rows: RefObject<(HTMLElement | null)[]>;
  progress: RefObject<HTMLDivElement | null>;
  localeTag: string;
  onStep: (step: number) => void;
  onReady: () => void;
};

type GarageWorldProps = Omit<OsGarageSceneProps, "active" | "onReady">;

function liveDevices(
  phase: keyof typeof LIVE_DEVICES,
  time: number,
): GarageDeviceKey[] {
  return [
    ...LIVE_DEVICES[phase],
    ...(patrolAt(time).scanning ? (["enforcement"] as const) : []),
    ...(pedestrianAt(time).paying ? (["kiosks"] as const) : []),
  ];
}

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
  playing,
  pins,
  rows,
  progress,
  localeTag,
  onStep,
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
  const street = useRef(createJourneyFrame());
  const live = useRef("");
  const step = useRef(-1);
  const series = useRef(initialChartSeries());
  const free = useRef(FREE_RANGE[1] - 9);
  const shown = useRef(-1);
  const tick = useRef(0);
  const world = useRef<Group>(null);
  const head = useMemo(() => new Vector3(), []);
  const foot = useMemo(() => new Vector3(), []);

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
      if (playing) journeyTime.current += delta;
      journeyAt(journeyTime.current, journey.current);
      streetCarAt(journeyTime.current, street.current);
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

    const time = reducedMotion ? 0 : clock.elapsedTime;
    const story = storyAt(reducedMotion ? JOURNEY_REST : journeyTime.current);
    if (story.index !== step.current) {
      step.current = story.index;
      onStep(story.index);
    }
    if (progress.current) {
      const amount = built && !reducedMotion ? story.progress : 0;
      progress.current.style.transform = `scaleX(${amount.toFixed(3)})`;
    }

    const active =
      reducedMotion || !built ? [] : liveDevices(journey.current.phase, time);
    const activeKey = active.join();
    if (activeKey !== live.current) {
      live.current = activeKey;
      markLive(rows.current, active);
      markLive(pins.current, active);
    }

    node.updateMatrixWorld();
    GARAGE_DEVICES.forEach((device, index) => {
      const [x, y, z] = device.parts[0].position;
      const markerX = device.key === "enforcement" ? patrolAt(time).x : x;
      head
        .set(markerX, y + device.marker + PIN_LIFT, z)
        .applyMatrix4(node.matrixWorld)
        .project(camera);
      foot
        .set(markerX, y + device.marker - PIN_FOOT, z)
        .applyMatrix4(node.matrixWorld)
        .project(camera);
      const at = schedule.devices.get(device.key) ?? 0;
      placePin(
        pins.current[index],
        head,
        foot,
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
      <JourneyCar
        palette={palette}
        shadow={textures.shadow}
        journey={street}
        color={palette.deck}
      />
      <Pedestrian palette={palette} still={reducedMotion} />
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
