/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { CarTop } from "@/components/media/car-top";
import { ROAD_SPRING } from "@/lib/motion";
import {
  buildRoad,
  lengthAtY,
  RoadLayout,
  sampleLengths,
  SectionGap,
} from "@/lib/road-path";

const WIDE_QUERY = "(min-width: 1280px)";
const HEAD_AT = 0.62;
const CAR_SCALE = 0.55;
const MASK_ID = "home-road-reveal";
const PADDING_DEPTH = 3;

type Sample = { length: number; y: number };

function useWide() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(WIDE_QUERY);
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return wide;
}

function freeSpace(element: Element, side: "paddingTop" | "paddingBottom") {
  let total = 0;
  let current: Element | null = element;
  for (let depth = 0; current && depth < PADDING_DEPTH; depth++) {
    total += parseFloat(getComputedStyle(current)[side]) || 0;
    current = current.children.length === 1 ? current.children[0] : null;
  }
  return total;
}

function measureGaps(element: HTMLElement): SectionGap[] {
  const origin = element.getBoundingClientRect().top;
  const sections = Array.from(element.children).filter(
    (child) => child.tagName !== "svg",
  );
  return sections.slice(1).map((section, index) => ({
    boundary: section.getBoundingClientRect().top - origin,
    before: freeSpace(sections[index], "paddingBottom"),
    after: freeSpace(section, "paddingTop"),
  }));
}

export function HomeRoad({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const road = useRef<SVGPathElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const car = useRef<SVGGElement>(null);
  const samples = useRef<Sample[]>([]);
  const markers = useRef<(SVGGElement | null)[]>([]);
  const wide = useWide();
  const reducedMotion = useReducedMotion();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [layout, setLayout] = useState<RoadLayout | null>(null);
  const target = useMotionValue(0);
  const length = useSpring(target, ROAD_SPRING);

  useEffect(() => {
    const element = track.current;
    if (!element || !wide) return;

    const measure = () => {
      const width = element.clientWidth;
      const height = element.scrollHeight;
      setSize({ width, height });
      setLayout(buildRoad(width, height, measureGaps(element)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [wide]);

  useEffect(() => {
    const path = road.current;
    if (!path || !layout) return;
    samples.current = sampleLengths(path);
    const total = path.getTotalLength();
    if (reveal.current) {
      reveal.current.style.strokeDasharray = `${total} ${total}`;
    }

    const update = () => {
      const element = track.current;
      if (!element) return;
      const y = reducedMotion
        ? size.height
        : window.innerHeight * HEAD_AT - element.getBoundingClientRect().top;
      target.set(lengthAtY(samples.current, y));
      if (reducedMotion) length.jump(target.get());
    };
    update();
    length.jump(target.get());
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [layout, reducedMotion, size.height, target, length]);

  useMotionValueEvent(length, "change", (value) => {
    const path = road.current;
    if (!path) return;
    const total = path.getTotalLength();
    const current = Math.min(Math.max(value, 0), total);

    if (reveal.current) {
      reveal.current.style.strokeDashoffset = String(total - current);
    }
    if (car.current) {
      const point = path.getPointAtLength(current);
      const ahead = path.getPointAtLength(Math.min(current + 4, total));
      const behind = path.getPointAtLength(Math.max(current - 4, 0));
      const angle =
        (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
      car.current.setAttribute(
        "transform",
        `translate(${point.x} ${point.y}) rotate(${angle}) scale(${CAR_SCALE})`,
      );
      layout?.markers.forEach((marker, index) => {
        markers.current[index]?.setAttribute(
          "data-reached",
          String(point.y >= marker.y),
        );
      });
    }
  });

  return (
    <div ref={track} className="relative">
      {children}
      {wide && layout && (
        <svg
          aria-hidden
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
          className="pointer-events-none absolute inset-0 z-[5]"
        >
          <defs>
            <mask id={MASK_ID} maskUnits="userSpaceOnUse">
              <path
                ref={reveal}
                d={layout.path}
                fill="none"
                stroke="white"
                strokeWidth="24"
                strokeLinecap="round"
              />
            </mask>
          </defs>
          <g mask={`url(#${MASK_ID})`}>
            <path
              ref={road}
              d={layout.path}
              fill="none"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-hairline"
            />
            <path
              d={layout.path}
              fill="none"
              strokeWidth="1.5"
              strokeDasharray="8 10"
              className="stroke-deck-bright"
            />
          </g>
          {layout.markers.map((marker, index) => (
            <g
              key={`${marker.x}-${marker.y}`}
              ref={(node) => {
                markers.current[index] = node;
              }}
              transform={`translate(${marker.x} ${marker.y})`}
              className="group/marker"
              data-reached="false"
            >
              <rect
                x="-11"
                y="-11"
                width="22"
                height="22"
                rx="6"
                className="fill-surface stroke-hairline transition-colors duration-500 group-data-[reached=true]/marker:fill-deck group-data-[reached=true]/marker:stroke-deck"
              />
              <text
                y="4.5"
                textAnchor="middle"
                className="fill-copy font-display text-[12px] font-bold transition-colors duration-500 group-data-[reached=true]/marker:fill-brand-foreground"
              >
                P
              </text>
            </g>
          ))}
          <g ref={car}>
            <CarTop bodyClassName="fill-deck-bright" />
          </g>
        </svg>
      )}
    </div>
  );
}
