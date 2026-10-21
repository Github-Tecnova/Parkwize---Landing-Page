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
const JOURNEY_PACE = 1.35;

const LEGS: Leg[] = [
  { phase: "arrive", duration: 2.2, to: [-5.1, arrive] },
  {
    phase: "arrive",
    duration: 1,
    via: [entry, arrive],
    to: [entry, gate],
    ease: "out",
  },
  { phase: "read", duration: 1.8 },
  { phase: "open", duration: 0.9 },
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
  { phase: "parked", duration: 3.4 },
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
  { phase: "pay", duration: 1.8 },
  { phase: "exit", duration: 0.8 },
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
  { phase: "idle", duration: 1.2 },
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
    const duration = leg.duration * JOURNEY_PACE;
    plan.push({ ...leg, duration, start, from, end, heading });
    start += duration;
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

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

export function patrolAt(time: number) {
  const half = PATROL.seconds / 2;
  const walk = half - PATROL.pause;
  const local = ((time % PATROL.seconds) + PATROL.seconds) % PATROL.seconds;
  const back = local >= half;
  const elapsed = local - (back ? half : 0);
  const scanning = elapsed >= walk;
  const amount = scanning ? 1 : smooth(elapsed / walk);
  const [from, to] = back ? [PATROL.to, PATROL.from] : [PATROL.from, PATROL.to];

  return {
    x: from + (to - from) * amount,
    heading: scanning ? Math.PI / 2 : back ? Math.PI : 0,
    stride: scanning ? 0 : Math.sin((elapsed / walk) * Math.PI),
    scanning,
    scan: scanning ? (elapsed - walk) / PATROL.pause : 0,
  };
}

export const STORY_STEPS = [
  { key: "arrive", phases: ["arrive"] },
  { key: "identify", phases: ["read", "open"] },
  { key: "park", phases: ["enter", "park"] },
  { key: "monitor", phases: ["parked"] },
  { key: "pay", phases: ["leave", "pay"] },
  { key: "exit", phases: ["exit", "depart", "idle"] },
] as const satisfies readonly {
  key: string;
  phases: readonly JourneyPhase[];
}[];

export type StoryStepKey = (typeof STORY_STEPS)[number]["key"];

const STEP_SPANS = STORY_STEPS.map((step) => {
  const legs = PLAN.filter((leg) =>
    (step.phases as readonly JourneyPhase[]).includes(leg.phase),
  );
  const start = Math.min(...legs.map((leg) => leg.start));
  const end = Math.max(...legs.map((leg) => leg.start + leg.duration));
  return { start, end };
});

export function storyAt(time: number) {
  const local = ((time % JOURNEY_SECONDS) + JOURNEY_SECONDS) % JOURNEY_SECONDS;
  const found = STEP_SPANS.findIndex((span) => local < span.end);
  const index = found === -1 ? STEP_SPANS.length - 1 : found;
  const { start, end } = STEP_SPANS[index];
  return { index, progress: Math.min((local - start) / (end - start), 1) };
}

export const STORY_REST = storyAt(JOURNEY_REST).index;

const STREET_CAR = { start: 12, duration: 6, from: -8.6, to: 8.6 };

export function streetCarAt(time: number, out: JourneyFrame) {
  const local = ((time % JOURNEY_SECONDS) + JOURNEY_SECONDS) % JOURNEY_SECONDS;
  const progress = (local - STREET_CAR.start) / STREET_CAR.duration;
  const moving = progress > 0 && progress < 1;
  out.x = STREET_CAR.from + (STREET_CAR.to - STREET_CAR.from) * progress;
  out.z = depart;
  out.heading = 0;
  out.scale = moving ? Math.min(progress / 0.08, (1 - progress) / 0.08, 1) : 0;
  return out;
}

type Stop = { to: Point; duration: number; paying?: boolean };

const WALK_START: Point = [2.4, 1.3];
const WALK_GAP: Point = [2.4, 3.3];
const KIOSK_FRONT: Point = [1.05, 3.8];

const WALK: Stop[] = [
  { to: WALK_GAP, duration: 1.4 },
  { to: KIOSK_FRONT, duration: 1.4 },
  { to: KIOSK_FRONT, duration: 2.4, paying: true },
  { to: WALK_GAP, duration: 1.4 },
  { to: WALK_START, duration: 1.4 },
  { to: WALK_START, duration: 5.5 },
];

const WALK_SECONDS = WALK.reduce((total, stop) => total + stop.duration, 0);

export function pedestrianAt(time: number) {
  const local = ((time % WALK_SECONDS) + WALK_SECONDS) % WALK_SECONDS;
  let start = 0;
  let from = WALK_START;

  for (const [index, stop] of WALK.entries()) {
    if (local < start + stop.duration) {
      const amount = smooth((local - start) / stop.duration);
      const dx = stop.to[0] - from[0];
      const dz = stop.to[1] - from[1];
      const moving = dx !== 0 || dz !== 0;
      return {
        x: from[0] + dx * amount,
        z: from[1] + dz * amount,
        heading: moving ? directionHeading(dx, dz) : -Math.PI / 4,
        stride: moving ? Math.sin(amount * Math.PI) : 0,
        visible: index < WALK.length - 1,
        paying: stop.paying === true,
      };
    }
    start += stop.duration;
    from = stop.to;
  }

  return {
    x: from[0],
    z: from[1],
    heading: 0,
    stride: 0,
    visible: false,
    paying: false,
  };
}
