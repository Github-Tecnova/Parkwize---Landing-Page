/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { CSSProperties, useRef } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { Link } from "@/components/navigation/link";
import { HomeDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { Media, MEDIA } from "@/lib/media";
import { cn } from "@/lib/utils";

type HubNodeKey = keyof HomeDictionary["os"]["hub"]["nodes"];

type HubNode = {
  key: HubNodeKey;
  media: Media;
  x: number;
  y: number;
  slug: string;
};

const CORE = { x: 50, y: 42 };
const STAGE_RATIO = 0.625;

const HUB_NODES: HubNode[] = [
  {
    key: "payment",
    media: MEDIA.os.payment,
    x: 11,
    y: 13,
    slug: "process-kiosk",
  },
  {
    key: "display",
    media: MEDIA.os.display,
    x: 11,
    y: 37,
    slug: "digital-signage",
  },
  {
    key: "barriers",
    media: MEDIA.os.barriers,
    x: 11,
    y: 61,
    slug: "process-kiosk",
  },
  {
    key: "cameras",
    media: MEDIA.os.cameras,
    x: 11,
    y: 85,
    slug: "enforcement",
  },
  {
    key: "booking",
    media: MEDIA.os.booking,
    x: 89,
    y: 13,
    slug: "online-reservation",
  },
  {
    key: "enforcement",
    media: MEDIA.os.enforcementOfficer,
    x: 89,
    y: 37,
    slug: "enforcement",
  },
  {
    key: "intelligence",
    media: MEDIA.os.intelligence,
    x: 50,
    y: 86,
    slug: "parkwize-ai",
  },
  {
    key: "callCenter",
    media: MEDIA.brand.parkaidLogo,
    x: 89,
    y: 61,
    slug: "parkaid",
  },
  {
    key: "kiosks",
    media: MEDIA.os.kiosks,
    x: 89,
    y: 85,
    slug: "process-kiosk",
  },
];

type OsHubProps = {
  locale: Locale;
  dict: HomeDictionary["os"]["hub"];
};

export function OsHub({ locale, dict }: OsHubProps) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "-10% 0px" });
  const playState = active ? "running" : "paused";

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-3 gap-x-1.5 gap-y-[1.125rem] pt-2 lg:block lg:aspect-[16/10] lg:pt-0"
    >
      <svg
        aria-hidden
        viewBox={`0 0 100 ${100 * STAGE_RATIO}`}
        preserveAspectRatio="none"
        className="absolute inset-0 hidden size-full overflow-visible lg:block"
      >
        {HUB_NODES.map((node, index) => {
          const path = `M ${node.x} ${node.y * STAGE_RATIO} L ${CORE.x} ${CORE.y * STAGE_RATIO}`;

          return (
            <g key={node.key}>
              <path
                d={path}
                vectorEffect="non-scaling-stroke"
                className="hub-line"
              />
              <path
                d={path}
                pathLength={50}
                vectorEffect="non-scaling-stroke"
                style={{
                  animationDelay: `${index * -0.37}s`,
                  animationPlayState: playState,
                }}
                className="hub-flow animate-hub-flow motion-reduce:hidden"
              />
            </g>
          );
        })}
      </svg>

      <div className="relative z-[2] col-span-3 mx-auto mb-9 mt-2.5 w-full max-w-md lg:absolute lg:left-1/2 lg:top-[42%] lg:m-0 lg:w-[42%] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2">
        <span
          aria-hidden
          style={{ animationPlayState: playState }}
          className="hub-ring w-[80%] animate-hub-pulse motion-reduce:animate-none lg:w-[112%]"
        />
        <span
          aria-hidden
          style={{ animationPlayState: playState, animationDelay: "1.8s" }}
          className="hub-ring w-[80%] animate-hub-pulse !bg-none motion-reduce:hidden lg:w-[112%]"
        />
        <Image
          src={MEDIA.product.heroLaptop.src}
          width={MEDIA.product.heroLaptop.width}
          height={MEDIA.product.heroLaptop.height}
          alt={dict.coreAlt}
          sizes="(min-width: 1024px) 480px, 90vw"
          className="relative z-[1] w-full drop-shadow-media"
        />
        <span className="absolute bottom-[-6%] left-1/2 z-[2] inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-deck px-4 py-2 text-[0.6875rem] font-extrabold uppercase leading-none tracking-[0.12em] text-brand-foreground shadow-deck">
          <span
            aria-hidden
            style={{ animationPlayState: playState }}
            className="hub-dot size-[7px] animate-blink rounded-full bg-success motion-reduce:animate-none"
          />
          {dict.core}
        </span>
      </div>

      {HUB_NODES.map((node) => (
        <HubNodeItem
          key={node.key}
          node={node}
          label={dict.nodes[node.key]}
          locale={locale}
        />
      ))}
    </div>
  );
}

function HubNodeItem({
  node,
  label,
  locale,
}: {
  node: HubNode;
  label: string;
  locale: Locale;
}) {
  const highlighted = node.key === "intelligence";
  const className =
    "group/node relative z-[3] flex flex-col items-center gap-1.5 rounded-2xl transition-transform duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:w-[17%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:hover:scale-[1.07]";
  const style: CSSProperties & Record<"--x" | "--y", string> = {
    "--x": `${node.x}%`,
    "--y": `${node.y}%`,
  };
  const content = (
    <>
      <span
        aria-hidden
        className="hub-tick absolute -top-3.5 left-1/2 h-3 w-[1.5px] lg:hidden"
      />
      <span className="relative block h-[4.375rem] w-full lg:h-[clamp(3.375rem,7.5vw,6.5rem)]">
        <Image
          src={node.media.src}
          alt=""
          fill
          sizes="160px"
          className="object-contain drop-shadow-soft"
        />
      </span>
      <span
        className={cn(
          "hub-label relative inline-flex max-w-full items-center justify-center gap-[7px] rounded-full px-2 py-[5px] text-center text-[0.5625rem] font-extrabold uppercase leading-tight lg:px-3 lg:py-1.5 lg:text-[0.65625rem] lg:tracking-[0.04em]",
          highlighted ? "bg-deck text-brand-foreground" : "bg-surface text-ink",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "hidden size-1.5 shrink-0 rounded-full lg:block",
            highlighted ? "bg-surface" : "bg-deck",
          )}
        />
        {label}
      </span>
    </>
  );

  return (
    <Link
      href={`/${node.slug}`}
      lang={locale}
      style={style}
      className={className}
    >
      {content}
    </Link>
  );
}
