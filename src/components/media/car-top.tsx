/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { cn } from "@/lib/utils";

type CarTopProps = {
  bodyClassName: string;
};

export function CarTop({ bodyClassName }: CarTopProps) {
  return (
    <>
      <rect
        x="-21"
        y="-11"
        width="42"
        height="22"
        rx="7"
        className={bodyClassName}
      />
      <rect
        x="4"
        y="-8.5"
        width="9"
        height="17"
        rx="3"
        className="fill-navy opacity-70"
      />
      <rect
        x="-15"
        y="-8"
        width="6"
        height="16"
        rx="2.5"
        className="fill-navy opacity-50"
      />
      <rect
        x="-6"
        y="-9"
        width="9"
        height="18"
        rx="2"
        className={cn(bodyClassName, "opacity-80")}
      />
    </>
  );
}
