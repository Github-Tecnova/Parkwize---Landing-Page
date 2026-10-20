/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  AnimationPlaybackControls,
  MotionValue,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { LotScene } from "@/components/sections/home/lot-scene";
import { LotDictionary } from "@/content/dictionary";
import { LOT_PLAYBACK, SCROLL_SPRING } from "@/lib/motion";

const SCROLL_WINDOW = [0.05, 0.85];
const LOT_HOLD_MS = 2600;

type HomeLotProps = {
  dict: LotDictionary;
};

type LotLayoutProps = HomeLotProps & {
  fill: MotionValue<number>;
  animate: boolean;
};

function LotLayout({ dict, fill, animate }: LotLayoutProps) {
  return (
    <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
      <div>
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.title}
          lead={dict.lead}
        />
        <p className="mt-6 text-xs text-copy">{dict.note}</p>
      </div>
      <LotScene dict={dict} fill={fill} animate={animate} />
    </Container>
  );
}

function PinnedLot({ dict }: HomeLotProps) {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const fill = useSpring(
    useTransform(scrollYProgress, SCROLL_WINDOW, [0, 1]),
    SCROLL_SPRING,
  );

  return (
    <div ref={track} className="relative hidden h-[260svh] lg:block">
      <div className="sticky top-0 flex h-svh items-center pt-[var(--top-bar-offset)]">
        <LotLayout dict={dict} fill={fill} animate />
      </div>
    </div>
  );
}

function AutoplayLot({ dict }: HomeLotProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { margin: "-15% 0px" });
  const fill = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    let controls: AnimationPlaybackControls | undefined;

    const play = async () => {
      while (!cancelled) {
        controls = animate(fill, 1, LOT_PLAYBACK);
        await controls;
        if (cancelled) return;
        await new Promise((resolve) => window.setTimeout(resolve, LOT_HOLD_MS));
        if (cancelled) return;
        fill.set(0);
      }
    };

    play();

    return () => {
      cancelled = true;
      controls?.stop();
    };
  }, [inView, fill]);

  return (
    <div ref={frame} className="py-14 sm:py-20 lg:hidden">
      <LotLayout dict={dict} fill={fill} animate />
    </div>
  );
}

function StaticLot({ dict }: HomeLotProps) {
  const fill = useMotionValue(1);

  return (
    <div className="py-14 sm:py-20">
      <LotLayout dict={dict} fill={fill} animate={false} />
    </div>
  );
}

export function HomeLot({ dict }: HomeLotProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-dot-grid relative bg-surface">
      {reducedMotion ? (
        <StaticLot dict={dict} />
      ) : (
        <>
          <PinnedLot dict={dict} />
          <AutoplayLot dict={dict} />
        </>
      )}
    </section>
  );
}
