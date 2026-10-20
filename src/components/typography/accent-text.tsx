/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { cn } from "@/lib/utils";

type AccentTextProps = {
  text: string;
  accentClassName?: string;
};

export type AccentSegment = {
  text: string;
  accent: boolean;
};

const ACCENT_PATTERN = /(\*[^*]+\*)/g;

export function splitAccent(text: string): AccentSegment[] {
  return text
    .split(ACCENT_PATTERN)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), accent: true }
        : { text: part, accent: false },
    );
}

export function AccentText({ text, accentClassName }: AccentTextProps) {
  return splitAccent(text).map((segment, index) =>
    segment.accent ? (
      <span key={index} className={cn("text-deck", accentClassName)}>
        {segment.text}
      </span>
    ) : (
      segment.text
    ),
  );
}
