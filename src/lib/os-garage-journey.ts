/*
 * Copyright (c) 2025-2026. Tecnova
 */

import {
  BAY_ROWS,
  bayX,
  GarageDeviceKey,
  JOURNEY_BAY,
  LOT,
  PATROL,
} from "@/lib/os-garage";

export type JourneyPhase =
  | "arrive"
  | "read"
  | "open"
  | "enter"
  | "park"
  | "parked"
  | "leave"
  | "pay"
  | "exit"
  | "depart"
  | "idle";

export type JourneyFrame = {
  x: number;
  z: number;
  heading: number;
  scale: number;
  phase: JourneyPhase;
  progress: number;
  occupied: boolean;
};

type Point = [number, number];
type Ease = "linear" | "in" | "out" | "inOut";

type Leg = {
  phase: JourneyPhase;
  duration: number;
  to?: Point;
  via?: Point;
  reverse?: boolean;
  ease?: Ease;
};

type PlannedLeg = Leg & {
  start: number;
  from: Point;
  end: Point;
  heading: number;
};

const { entry, exit } = LOT.lanes;
const { arrive, depart } = LOT.street;
const aisle = LOT.aisle;
const park: Point = [bayX(JOURNEY_BAY), BAY_ROWS[1].z];
const gate = LOT.stop + 1.1;
const START: Point = [8.6, arrive];
const SCALE_SHARE = 0.3;

const LEGS: Leg[] = [
  { phase: "arrive", duration: 2.2, to: [-5.1, arrive] },
  {
    phase: "arrive",
    duration: 1,
    via: [entry, arrive],
    to: [entry, gate],
    ease: "out",
  },
  { phase: "read", duration: 0.9 },
  { phase: "open", duration: 0.5 },
  { phase: "enter", duration: 1.1, to: [entry, 0.3], ease: "in" },
  {
    phase: "enter",
    duration: 0.7,
    via: [entry, aisle],
    to: [entry + 1.2, aisle],
  },
  { phase: "enter", duration: 0.5, to: [park[0] - 0.9, aisle] },
  { phase: "park", duration: 0.8, via: [park[0], aisle], to: [park[0], 0.3] },
  { phase: "park", duration: 0.7, to: park, ease: "out" },
  { phase: "parked", duration: 2.2 },
  {
    phase: "leave",
    duration: 0.8,
    to: [park[0], 0.3],
    reverse: true,
    ease: "in",
  },
  {
    phase: "leave",
    duration: 0.8,
    via: [park[0], aisle],
    to: [park[0] - 1.1, aisle],
    reverse: true,
    ease: "out",
  },
  { phase: "leave", duration: 2.6, to: [exit - 1.2, aisle], ease: "inOut" },
  { phase: "leave", duration: 0.7, via: [exit, aisle], to: [exit, 0.1] },
  { phase: "leave", duration: 0.6, to: [exit, 1.3], ease: "out" },
  { phase: "pay", duration: 1 },
  { phase: "exit", duration: 0.5 },
  {
    phase: "exit",
    duration: 1.2,
    to: [exit, LOT.street.near - 0.05],
    ease: "in",
  },
  {
    phase: "depart",
    duration: 0.6,
    via: [exit, depart],
    to: [exit + 1.2, depart],
  },
  { phase: "depart", duration: 0.6, to: [8.6, depart] },
  { phase: "idle", duration: 0.8 },
];

const OCCUPIED: JourneyPhase[] = [
  "enter",
  "park",
  "parked",
  "leave",
  "pay",
  "exit",
];

export const LIVE_DEVICES: Record<JourneyPhase, GarageDeviceKey[]> = {
  arrive: ["display"],
  read: ["cameras", "booking", "intelligence"],
  open: ["barriers"],
  enter: ["barriers", "display"],
  park: ["booking"],
  parked: [],
  leave: [],
  pay: ["payment", "intelligence"],
  exit: ["barriers", "display"],
  depart: [],
  idle: [],
};

function directionHeading(dx: number, dz: number, reverse = false) {
  return Math.atan2(-dz, dx) + (reverse ? Math.PI : 0);
}

function planLegs() {
  const plan: PlannedLeg[] = [];
  let start = 0;
  let from = START;
  let heading = Math.PI;

  LEGS.forEach((leg) => {
    const end = leg.to ?? from;
    if (leg.to) {
      const [aimX, aimZ] = leg.via ?? from;
      heading = directionHeading(end[0] - aimX, end[1] - aimZ, leg.reverse);
    }
    plan.push({ ...leg, start, from, end, heading });
    start += leg.duration;
    from = end;
  });

  return { plan, seconds: start };
}

const { plan: PLAN, seconds: JOURNEY_LENGTH } = planLegs();

export const JOURNEY_SECONDS = JOURNEY_LENGTH;

const restLeg = PLAN.find((leg) => leg.phase === "parked");
export const JOURNEY_REST = restLeg ? restLeg.start + restLeg.duration / 2 : 0;

function ease(value: number, kind: Ease = "linear") {
  switch (kind) {
    case "in":
      return value * value;
    case "out":
      return 1 - (1 - value) * (1 - value);
    case "inOut":
      return value < 0.5 ? 2 * value * value : 1 - (-2 * value + 2) ** 2 / 2;
    default:
      return value;
  }
}

export function createJourneyFrame(): JourneyFrame {
  return {
    x: START[0],
    z: START[1],
    heading: Math.PI,
    scale: 0,
    phase: "idle",
    progress: 0,
    occupied: false,
  };
}

export function journeyAt(time: number, out: JourneyFrame) {
  const local = ((time % JOURNEY_SECONDS) + JOURNEY_SECONDS) % JOURNEY_SECONDS;
  const index = PLAN.findIndex((leg) => local < leg.start + leg.duration);
  const legIndex = index === -1 ? PLAN.length - 1 : index;
  const leg = PLAN[legIndex];
  const progress = Math.min((local - leg.start) / leg.duration, 1);
  const amount = ease(progress, leg.ease);
  const [fromX, fromZ] = leg.from;
  const [toX, toZ] = leg.end;

  out.phase = leg.phase;
  out.progress = progress;
  out.occupied = OCCUPIED.includes(leg.phase);
  out.heading = leg.heading;

  if (leg.via && leg.to) {
    const [viaX, viaZ] = leg.via;
    const rest = 1 - amount;
    out.x =
      rest * rest * fromX + 2 * rest * amount * viaX + amount * amount * toX;
    out.z =
      rest * rest * fromZ + 2 * rest * amount * viaZ + amount * amount * toZ;
    const dx = 2 * rest * (viaX - fromX) + 2 * amount * (toX - viaX);
    const dz = 2 * rest * (viaZ - fromZ) + 2 * amount * (toZ - viaZ);
    out.heading = directionHeading(dx, dz, leg.reverse);
  } else {
    out.x = fromX + (toX - fromX) * amount;
    out.z = fromZ + (toZ - fromZ) * amount;
  }

  const first = legIndex === 0;
  const finalMove = legIndex === PLAN.length - 2;
  out.scale =
    leg.phase === "idle"
      ? 0
      : first
        ? Math.min(progress / SCALE_SHARE, 1)
        : finalMove
          ? Math.min((1 - progress) / SCALE_SHARE, 1)
          : 1;
  return out;
}

export function patrolAt(time: number) {
  const cycle = (time / PATROL.seconds) * Math.PI * 2;
  const span = PATROL.to - PATROL.from;
  return {
    x: PATROL.from + span * (0.5 - 0.5 * Math.cos(cycle)),
    heading: Math.sin(cycle) >= 0 ? 0 : Math.PI,
    stride: Math.abs(Math.sin(cycle)),
  };
}
