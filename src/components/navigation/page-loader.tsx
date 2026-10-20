/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { MEDIA } from "@/lib/media";

export function PageLoader() {
  const { pMark } = MEDIA.brand;

  return (
    <div aria-hidden className="flex min-h-[70svh] items-center justify-center">
      <span className="relative flex size-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-deck-tint motion-safe:animate-ping" />
        <Image
          src={pMark.src}
          width={pMark.width}
          height={pMark.height}
          alt=""
          priority
          sizes="32px"
          className="relative h-8 w-auto motion-safe:animate-pulse"
        />
      </span>
    </div>
  );
}
