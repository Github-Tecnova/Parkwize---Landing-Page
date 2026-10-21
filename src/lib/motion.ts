/*
 * Copyright (c) 2025-2026. Tecnova
 */

import type { SpringOptions, Transition } from "motion/react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const SPRING_SMOOTH: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 38,
  mass: 0.9,
};

export const FADE_FAST: Transition = {
  duration: 0.18,
  ease: EASE_OUT_EXPO,
};

export const FADE_BASE: Transition = {
  duration: 0.32,
  ease: EASE_OUT_EXPO,
};

export const STAGGER_STEP = 0.035;

export const REVEAL_BASE: Transition = {
  duration: 0.7,
  ease: EASE_OUT_EXPO,
};

export const WORD_STAGGER = 0.045;

export const DRAW_BASE: Transition = {
  duration: 0.6,
  ease: EASE_OUT_EXPO,
};

export const SCROLL_SPRING: SpringOptions = {
  stiffness: 160,
  damping: 32,
  mass: 0.4,
};

export const CURSOR_SPRING: SpringOptions = {
  stiffness: 320,
  damping: 30,
  mass: 0.6,
};

export const CAMERA_MOVE: Transition = {
  duration: 0.9,
  ease: EASE_OUT_EXPO,
};

export const LOT_PLAYBACK: Transition = {
  duration: 7,
  ease: "linear",
};

export const CHART_MORPH: Transition = {
  duration: 1.2,
  ease: EASE_OUT_EXPO,
};

export const ROAD_SPRING: SpringOptions = {
  stiffness: 55,
  damping: 18,
  mass: 1,
};
