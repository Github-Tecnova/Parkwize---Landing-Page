/*
 * Copyright (c) 2025-2026. Tecnova
 */

export type RoadLayout = {
  path: string;
  markers: { x: number; y: number }[];
};

export type SectionGap = {
  boundary: number;
  before: number;
  after: number;
};

const CONTENT_WIDTH = 1152;
const MIN_LANE = 22;
const MARKER_OFFSET = 96;
const CROSSING_SHARE = 0.9;
const SAMPLES = 480;

export function laneX(width: number) {
  const gutter = Math.max((width - CONTENT_WIDTH) / 2, 0);
  return Math.max(gutter * 0.5, MIN_LANE);
}

export function buildRoad(width: number, height: number, gaps: SectionGap[]) {
  const left = laneX(width);
  const lanes = [left, width - left];
  let lane = 0;
  let path = `M${left} 0`;
  const markers = [{ x: left, y: MARKER_OFFSET }];

  gaps.forEach(({ boundary, before, after }) => {
    const from = lanes[lane];
    const to = lanes[1 - lane];
    const start = boundary - before * CROSSING_SHARE;
    const end = boundary + after * CROSSING_SHARE;
    const span = end - start;
    path += ` L${from} ${start}`;
    path += ` C${from} ${start + span * 0.5} ${to} ${end - span * 0.5} ${to} ${end}`;
    lane = 1 - lane;
    markers.push({ x: to, y: end + MARKER_OFFSET * 0.5 });
  });

  path += ` L${lanes[lane]} ${height}`;
  return { path, markers };
}

export function sampleLengths(element: SVGPathElement) {
  const total = element.getTotalLength();
  return Array.from({ length: SAMPLES + 1 }, (_, index) => {
    const length = (index / SAMPLES) * total;
    return { length, y: element.getPointAtLength(length).y };
  });
}

export function lengthAtY(samples: { length: number; y: number }[], y: number) {
  if (samples.length === 0) return 0;
  if (y <= samples[0].y) return 0;
  const last = samples[samples.length - 1];
  if (y >= last.y) return last.length;

  let low = 0;
  let high = samples.length - 1;
  while (high - low > 1) {
    const middle = (low + high) >> 1;
    if (samples[middle].y < y) low = middle;
    else high = middle;
  }
  const start = samples[low];
  const end = samples[high];
  const span = end.y - start.y || 1;
  return start.length + ((y - start.y) / span) * (end.length - start.length);
}
