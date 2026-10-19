/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { Media } from "@/lib/media";
import { cn } from "@/lib/utils";

export type OrbitTile = {
  key: string;
  media: Media;
  caption: string;
};

type OrbitRowProps = ComponentPropsWithoutRef<"div"> & {
  tiles: OrbitTile[];
  children?: ReactNode;
  speed?: number;
  tileHeight?: number;
  aspectRatio?: number;
  gap?: number;
  axis?: number;
  curve?: number;
  fade?: number;
};

type OrbitLayout = {
  columns: number;
  sweep: number;
  unit: number;
  limit: number;
  radius: number;
};

const SLICES = 16;
const CAMERA = 1.6;
const MAX_WIDTH = 40;
const MIN_ARC = 1.5;
const FALLBACK_SIZE = { width: 1200, height: 560 };

export function OrbitRow({
  tiles,
  children,
  speed = 2.2,
  tileHeight = 34,
  aspectRatio = 16 / 9,
  gap = 6,
  axis = 64,
  curve = 70,
  fade = 12,
  className,
  style,
  ...props
}: OrbitRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px" });
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const orbitName = `orbit-${id}`;
  const tileClass = `orbit-tile-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;
  const [layout, setLayout] = useState<OrbitLayout | null>(null);
  const [shown, setShown] = useState<Record<number, number>>({});

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const next = measureOrbit(
        width,
        height,
        tileHeight,
        aspectRatio,
        gap,
        bend,
      );
      setLayout((previous) =>
        previous &&
        previous.columns === next.columns &&
        previous.sweep === next.sweep &&
        previous.unit === next.unit &&
        previous.radius === next.radius
          ? previous
          : next,
      );
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [tileHeight, aspectRatio, gap, bend]);

  const { columns, sweep, unit, limit, radius } =
    layout ??
    measureOrbit(
      FALLBACK_SIZE.width,
      FALLBACK_SIZE.height,
      tileHeight,
      aspectRatio,
      gap,
      bend,
    );

  const length = (multiple: number) =>
    `calc(${round(multiple)} * min(${tileHeight}cqh, ${round(MAX_WIDTH / aspectRatio)}cqw))`;
  const radiusPx = `${round(radius)}px`;
  const turn = (degrees: number) =>
    `translateZ(${radiusPx}) rotateY(${round(degrees)}deg) translateZ(-${radiusPx})`;
  const hide = round(((sweep - limit) / (2 * sweep || 1)) * 100);
  const keyframes =
    `@keyframes ${orbitName}{` +
    `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
    `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}` +
    `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}` +
    `@media(prefers-reduced-motion:reduce){.${tileClass}{animation-play-state:paused!important}}`;
  const share = aspectRatio / SLICES;
  const duration = columns * speed;
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ containerType: "size", ...style }}
      {...props}
    >
      <style>{keyframes}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: layout ? 1 : 0,
          perspective: `${round(radius * CAMERA)}px`,
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {Array.from({ length: columns }, (_, column) => {
          const first = columns - 1 - column;
          const tile =
            tiles[(shown[column] ?? first) % Math.max(tiles.length, 1)];

          return (
            <div
              key={column}
              className={cn(tileClass, "absolute")}
              style={{
                left: `calc(50% - ${length(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${length(0.5)})`,
                width: length(aspectRatio),
                height: length(1),
                transformStyle: "preserve-3d",
                animation: `${orbitName} ${duration}s linear ${-column * speed}s infinite`,
                animationPlayState: inView ? "running" : "paused",
              }}
              onAnimationIteration={(event) => {
                const lap = Math.round(event.elapsedTime / duration);
                setShown((previous) => {
                  const next = lap * columns + first;
                  return previous[column] === next
                    ? previous
                    : { ...previous, [column]: next };
                });
              }}
            >
              {tile &&
                Array.from({ length: SLICES }, (_, slice) => (
                  <div
                    key={slice}
                    className="absolute top-0 overflow-hidden"
                    style={{
                      left: length((aspectRatio - share) / 2),
                      width:
                        slice === SLICES - 1
                          ? length(share)
                          : `calc(${length(share)} + 1px)`,
                      height: length(1),
                      transform: turn(
                        (aspectRatio / 2 - (slice + 0.5) * share) * unit,
                      ),
                    }}
                  >
                    <Image
                      src={tile.media.src}
                      width={tile.media.width}
                      height={tile.media.height}
                      alt=""
                      draggable={false}
                      sizes="(min-width: 1024px) 440px, 60vw"
                      className="absolute top-0 max-w-none object-contain"
                      style={sliceImageStyle(length, aspectRatio, share, slice)}
                    />
                  </div>
                ))}
              {tile && (
                <span className="absolute left-0 top-[calc(100%+0.55em)] w-full whitespace-nowrap text-center text-[clamp(9px,1.05cqw,13px)] font-bold uppercase leading-tight tracking-[0.06em] text-ink">
                  {tile.caption}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
}

function sliceImageStyle(
  length: (multiple: number) => string,
  aspectRatio: number,
  share: number,
  slice: number,
): CSSProperties {
  return {
    left: length(-slice * share),
    width: length(aspectRatio),
    height: length(1),
  };
}

function round(value: number) {
  return +value.toFixed(4);
}

function measureOrbit(
  width: number,
  height: number,
  tileHeight: number,
  aspectRatio: number,
  gap: number,
  bend: number,
): OrbitLayout {
  const arcShare =
    (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
  const tilePx = Math.min(
    (tileHeight / 100) * height,
    ((MAX_WIDTH / 100) * width) / aspectRatio,
  );
  const radius = Math.max(width * arcShare, MIN_ARC * aspectRatio * tilePx);

  if (!(tilePx > 0) || !(radius > 0)) {
    return { columns: 2, sweep: 0, unit: 0, limit: 0, radius: 0 };
  }

  const toDegrees = (radians: number) => (radians * 180) / Math.PI;
  const unit = toDegrees(tilePx / radius);
  const pitch = (aspectRatio + gap / 100) * unit;
  const limit = toDegrees(bend) + (aspectRatio * unit) / 2;
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
  const sweep = round((columns * pitch) / 2);

  return {
    columns,
    sweep,
    unit: round(unit),
    limit: round(Math.min(sweep, limit)),
    radius: round(radius),
  };
}
