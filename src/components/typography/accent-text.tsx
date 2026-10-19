/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { cn } from "@/lib/utils";

type AccentTextProps = {
  text: string;
  accentClassName?: string;
};

const ACCENT_PATTERN = /(\*[^*]+\*)/g;

export function AccentText({ text, accentClassName }: AccentTextProps) {
  return text.split(ACCENT_PATTERN).map((part, index) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={index} className={cn("text-deck", accentClassName)}>
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}
