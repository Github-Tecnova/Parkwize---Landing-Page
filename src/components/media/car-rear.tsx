/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { cn } from "@/lib/utils";

export const CAR_REAR_PLATE = {
  left: "34.2%",
  top: "60%",
  width: "31.6%",
  height: "16%",
};

type CarRearProps = {
  className?: string;
};

export function CarRear({ className }: CarRearProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 150"
      className={cn("block h-auto w-full", className)}
    >
      <ellipse
        cx="120"
        cy="142"
        rx="112"
        ry="7"
        className="fill-ink opacity-10"
      />
      <rect
        x="28"
        y="112"
        width="34"
        height="32"
        rx="7"
        className="fill-bezel"
      />
      <rect
        x="178"
        y="112"
        width="34"
        height="32"
        rx="7"
        className="fill-bezel"
      />
      <path
        d="M52 70 L72 26 Q76 18 86 18 L154 18 Q164 18 168 26 L188 70 Z"
        className="fill-navy-raised"
      />
      <path
        d="M66 66 L81 32 Q83 28 88 28 L152 28 Q157 28 159 32 L174 66 Z"
        className="fill-deck-bright opacity-30"
      />
      <rect
        x="12"
        y="64"
        width="216"
        height="62"
        rx="16"
        className="fill-navy"
      />
      <rect
        x="22"
        y="78"
        width="44"
        height="12"
        rx="5"
        className="fill-destructive"
      />
      <rect
        x="174"
        y="78"
        width="44"
        height="12"
        rx="5"
        className="fill-destructive"
      />
      <rect
        x="78"
        y="86"
        width="84"
        height="32"
        rx="6"
        className="fill-navy-raised"
      />
      <rect
        x="18"
        y="116"
        width="204"
        height="10"
        rx="5"
        className="fill-bezel"
      />
    </svg>
  );
}
