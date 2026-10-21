/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject } from "react";
import { Link } from "@/components/navigation/link";
import { HomeDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { PRODUCT_LINKS } from "@/lib/navigation";
import { GARAGE_DEVICES, GarageDeviceKey } from "@/lib/os-garage";
import { cn } from "@/lib/utils";

type OsGarageSystemsProps = {
  locale: Locale;
  dict: HomeDictionary["os"]["hub"];
  highlight: GarageDeviceKey | null;
  pinned: GarageDeviceKey | null;
  rows: RefObject<(HTMLElement | null)[]>;
  onHover: (key: GarageDeviceKey | null) => void;
  onPin: (key: GarageDeviceKey) => void;
  className?: string;
};

const ROW =
  "group relative flex items-center gap-2 rounded-2xl pr-3 transition-colors hover:bg-surface-muted data-[active=true]:bg-surface-muted";
const BADGE =
  "grid size-7 place-items-center rounded-full bg-surface text-xs font-semibold text-ink ring-1 ring-hairline transition-colors group-data-[active=true]:bg-deck group-data-[active=true]:text-brand-foreground group-data-[active=true]:ring-deck";
const LINK =
  "min-w-0 flex-1 rounded-lg py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const CORE_LINK = PRODUCT_LINKS.find((link) => link.key === "dashboardManager");

function slugFor(key: GarageDeviceKey) {
  const device = GARAGE_DEVICES.find((item) => item.key === key);
  return PRODUCT_LINKS.find((link) => link.key === device?.product)?.slug;
}

export function OsGarageSystems({
  locale,
  dict,
  highlight,
  pinned,
  rows,
  onHover,
  onPin,
  className,
}: OsGarageSystemsProps) {
  return (
    <ol
      aria-label={dict.listLabel}
      className={cn("grid gap-0.5 sm:grid-cols-2 lg:grid-cols-1", className)}
    >
      {GARAGE_DEVICES.map((device, index) => {
        const node = dict.nodes[device.key];
        return (
          <li
            key={device.key}
            ref={(element) => {
              rows.current[index] = element;
            }}
            data-active={highlight === device.key}
            data-live="false"
            onPointerEnter={() => onHover(device.key)}
            onPointerLeave={() => onHover(null)}
            onFocus={() => onHover(device.key)}
            onBlur={() => onHover(null)}
            className={ROW}
          >
            <button
              type="button"
              aria-pressed={pinned === device.key}
              aria-label={dict.showInScene.replace("{name}", node.name)}
              onClick={() => onPin(device.key)}
              className="relative grid size-11 shrink-0 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className={BADGE}>{index + 1}</span>
              <span
                aria-hidden
                className="absolute right-1.5 top-1.5 size-2 rounded-full bg-success opacity-0 ring-2 ring-surface transition-opacity duration-300 group-data-[live=true]:opacity-100"
              />
            </button>
            <Link
              href={`/${slugFor(device.key)}`}
              lang={locale}
              className={LINK}
            >
              <span className="block text-sm font-semibold text-ink">
                {node.name}
              </span>
              <span className="block text-[0.8125rem] leading-snug text-copy">
                {node.description}
              </span>
            </Link>
          </li>
        );
      })}
      {CORE_LINK && (
        <li className={ROW}>
          <span className="grid size-11 shrink-0 place-items-center">
            <span
              className={cn(BADGE, "bg-deck text-brand-foreground ring-deck")}
            >
              <CORE_LINK.Icon aria-hidden className="size-3.5" />
            </span>
          </span>
          <Link href={`/${CORE_LINK.slug}`} lang={locale} className={LINK}>
            <span className="block text-sm font-semibold text-ink">
              {dict.core}
            </span>
            <span className="block text-[0.8125rem] leading-snug text-copy">
              {dict.coreDescription}
            </span>
          </Link>
        </li>
      )}
    </ol>
  );
}
