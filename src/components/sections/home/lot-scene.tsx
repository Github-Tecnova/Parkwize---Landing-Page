/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ReactNode, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { CarTop } from "@/components/media/car-top";
import { SwapValue } from "@/components/motion/swap-value";
import { LotDictionary } from "@/content/dictionary";
import {
  AISLE_Y,
  Bay,
  BAY_COUNT,
  BAY_LINES,
  BAYS,
  carPose,
  carProgress,
  LOT_VIEWBOX,
  parkedCount,
  priceTier,
} from "@/lib/lot-scene";
import { FADE_BASE, SPRING_SMOOTH } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CAR_FILLS = ["fill-surface", "fill-deck-bright", "fill-inverse-muted"];

const ROW_EDGES = { top: [40, 128], bottom: [232, 320] };

type LotSceneProps = {
  dict: LotDictionary;
  fill: MotionValue<number>;
  animate: boolean;
};

function LotCar({
  bay,
  fill,
  index,
}: {
  bay: Bay;
  fill: MotionValue<number>;
  index: number;
}) {
  const progress = useTransform(fill, (value) => carProgress(bay.order, value));
  const x = useTransform(progress, (value) => carPose(bay, value).x);
  const y = useTransform(progress, (value) => carPose(bay, value).y);
  const rotate = useTransform(progress, (value) => carPose(bay, value).rotate);
  const opacity = useTransform(progress, (value) => Math.min(value * 8, 1));
  const occupied = useTransform(progress, (value) => (value >= 1 ? 1 : 0));
  const free = useTransform(occupied, (value) => 1 - value);
  const sensorY = bay.top ? 34 : 326;

  return (
    <>
      <motion.circle
        cx={bay.x}
        cy={sensorY}
        r="3"
        className="fill-success"
        style={{ opacity: free }}
      />
      <motion.circle
        cx={bay.x}
        cy={sensorY}
        r="3"
        className="fill-destructive"
        style={{ opacity: occupied }}
      />
      <motion.g style={{ x, y, rotate, opacity }}>
        <CarTop bodyClassName={CAR_FILLS[index % CAR_FILLS.length]} />
      </motion.g>
    </>
  );
}

function LotTile({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl bg-navy-raised p-4", className)}>
      <p className="eyebrow text-inverse-muted">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function LotScene({ dict, fill, animate }: LotSceneProps) {
  const [parked, setParked] = useState(() => parkedCount(fill.get()));

  useMotionValueEvent(fill, "change", (value) => {
    setParked(parkedCount(value));
  });

  const share = parked / BAY_COUNT;
  const tier = priceTier(parked);
  const full = parked === BAY_COUNT;

  return (
    <div className="rounded-3xl bg-navy p-3 text-inverse-foreground shadow-card-deep sm:p-4">
      <svg
        role="img"
        aria-label={dict.sceneLabel}
        viewBox={`0 0 ${LOT_VIEWBOX.width} ${LOT_VIEWBOX.height}`}
        className="block h-auto w-full"
      >
        <rect
          x="8"
          y="8"
          width={LOT_VIEWBOX.width - 16}
          height={LOT_VIEWBOX.height - 16}
          rx="20"
          className="fill-navy-raised"
        />
        <line
          x1="40"
          x2={LOT_VIEWBOX.width - 24}
          y1={AISLE_Y}
          y2={AISLE_Y}
          strokeDasharray="10 12"
          className="stroke-inverse-border"
          strokeWidth="2"
        />
        <path
          d={`M14 ${AISLE_Y - 8} l12 8 l-12 8 z`}
          className="fill-deck-bright"
        />
        {(["top", "bottom"] as const).map((row) => {
          const [from, to] = ROW_EDGES[row];
          const back = row === "top" ? from : to;
          return (
            <g key={row} className="stroke-inverse-border" strokeWidth="2">
              <line
                x1={BAY_LINES[0]}
                x2={BAY_LINES[BAY_LINES.length - 1]}
                y1={back}
                y2={back}
              />
              {BAY_LINES.map((lineX) => (
                <line key={lineX} x1={lineX} x2={lineX} y1={from} y2={to} />
              ))}
            </g>
          );
        })}
        {BAYS.map((bay, index) => (
          <LotCar key={index} bay={bay} fill={fill} index={index} />
        ))}
      </svg>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <LotTile label={dict.occupancy}>
          <p className="font-display text-3xl font-semibold tabular-nums">
            {Math.round(share * 100)}%
          </p>
          <span
            aria-hidden
            className="mt-3 block h-1 overflow-hidden rounded-full bg-inverse-border"
          >
            <motion.span
              className="block h-full origin-left bg-deck-bright"
              initial={false}
              animate={{ scaleX: share }}
              transition={animate ? SPRING_SMOOTH : { duration: 0 }}
            />
          </span>
        </LotTile>
        <LotTile label={dict.price}>
          <SwapValue
            value={dict.prices[tier]}
            animate={animate}
            className="font-display text-3xl font-semibold tabular-nums"
          />
          <div className="mt-2 h-5">
            <AnimatePresence initial={false}>
              {tier > 0 && (
                <motion.p
                  className="text-xs font-semibold text-deck-bright"
                  initial={animate ? { opacity: 0, y: 4 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={FADE_BASE}
                >
                  {dict.aiChip}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </LotTile>
        <LotTile label={dict.sign}>
          <p
            className={cn(
              "flex min-h-12 items-center rounded-lg bg-bezel px-3 font-mono text-sm font-bold tracking-wider",
              full ? "text-destructive" : "text-deck-bright",
            )}
          >
            {full ? dict.signFull : `${BAY_COUNT - parked} ${dict.signFree}`}
          </p>
        </LotTile>
      </div>
    </div>
  );
}
