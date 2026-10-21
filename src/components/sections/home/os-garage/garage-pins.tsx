/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject } from "react";
import { HomeDictionary } from "@/content/dictionary";
import { GARAGE_DEVICES, GarageDeviceKey } from "@/lib/os-garage";
import { cn } from "@/lib/utils";

type GaragePinsProps = {
  nodes: HomeDictionary["os"]["hub"]["nodes"];
  highlight: GarageDeviceKey | null;
  pins: RefObject<(HTMLElement | null)[]>;
};

const SHOWN =
  "group-data-[active=true]/pin:opacity-100 group-data-[live=true]/pin:opacity-100";

export function GaragePins({ nodes, highlight, pins }: GaragePinsProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {GARAGE_DEVICES.map((device, index) => (
        <div
          key={device.key}
          ref={(node) => {
            pins.current[index] = node;
          }}
          data-active={highlight === device.key}
          data-live="false"
          className="group/pin absolute left-0 top-0 [opacity:var(--appear,0)] data-[active=true]:z-10"
        >
          <span className="absolute left-0 top-0 h-[var(--leader,0px)] w-px -translate-x-1/2 bg-ink opacity-0 transition-opacity duration-300 group-data-[active=true]/pin:opacity-40 group-data-[live=true]/pin:opacity-40" />
          <span
            className={cn(
              "absolute left-0 top-[var(--leader,0px)] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-deck-bright opacity-0 transition-opacity duration-300",
              SHOWN,
            )}
          />
          <span
            className={cn(
              "absolute bottom-0 left-0 inline-flex -translate-x-1/2 translate-y-1 scale-90 items-center gap-1.5 whitespace-nowrap rounded-full bg-surface py-1 pl-1 pr-2.5 text-[0.6875rem] font-semibold text-ink opacity-0 shadow-media ring-1 ring-hairline transition-[opacity,transform,background-color,color] duration-300 group-data-[active=true]/pin:translate-y-0 group-data-[live=true]/pin:translate-y-0 group-data-[active=true]/pin:scale-100 group-data-[live=true]/pin:scale-100 group-data-[active=true]/pin:bg-deck group-data-[active=true]/pin:text-brand-foreground group-data-[live=true]/pin:ring-2 group-data-[active=true]/pin:ring-deck group-data-[live=true]/pin:ring-success",
              SHOWN,
            )}
          >
            <span className="grid size-4 place-items-center rounded-full bg-surface-muted text-[0.625rem] text-ink">
              {index + 1}
            </span>
            {nodes[device.key].name}
          </span>
        </div>
      ))}
    </div>
  );
}
