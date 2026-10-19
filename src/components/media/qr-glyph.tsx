/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { cn } from "@/lib/utils";

const SIZE = 25;
const FINDERS = [
  [0, 0],
  [SIZE - 7, 0],
  [0, SIZE - 7],
];

const QR_PATH = buildQrPath();

export function QrGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`-1 -1 ${SIZE + 2} ${SIZE + 2}`}
      shapeRendering="crispEdges"
      className={cn("fill-current", className)}
    >
      <path d={QR_PATH} />
    </svg>
  );
}

function buildQrPath() {
  const cells: string[] = [];
  const add = (x: number, y: number) => cells.push(`M${x} ${y}h1v1h-1z`);

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const finder = FINDERS.find(
        ([left, top]) => x >= left && x < left + 7 && y >= top && y < top + 7,
      );

      if (finder) {
        if (isFinderCell(x - finder[0], y - finder[1])) add(x, y);
      } else if (!isFinderMargin(x, y) && isDataCell(x, y)) {
        add(x, y);
      }
    }
  }

  return cells.join("");
}

function isFinderCell(x: number, y: number) {
  const edge = x === 0 || y === 0 || x === 6 || y === 6;
  const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
  return edge || core;
}

function isFinderMargin(x: number, y: number) {
  return FINDERS.some(
    ([left, top]) =>
      x >= left - 1 && x <= left + 7 && y >= top - 1 && y <= top + 7,
  );
}

function isDataCell(x: number, y: number) {
  const hash = Math.imul(x + 1, 2654435761) ^ Math.imul(y + 1, 40503);
  return ((hash >>> 5) ^ (hash >>> 13)) % 9 < 4;
}
