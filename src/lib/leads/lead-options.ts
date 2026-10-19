/*
 * Copyright (c) 2025-2026. Tecnova
 */

export const FACILITY_OPTIONS = ["1", "2-5", "6-20", "21-50", "50+"] as const;

export const SPACE_OPTIONS = [
  "under-100",
  "100-500",
  "500-2000",
  "2000+",
] as const;

export const BARRIER_OPTIONS = [
  "barriers",
  "gateless",
  "both",
  "unknown",
] as const;

export const TIMELINE_OPTIONS = [
  "now",
  "3-months",
  "6-months",
  "exploring",
] as const;

export const TOPIC_OPTIONS = [
  "demo",
  "pricing",
  "technical",
  "support",
  "partnership",
  "other",
] as const;
