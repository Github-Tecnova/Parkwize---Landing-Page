/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/smooth-scroll";

type BackToTopProps = {
  label: string;
};

export function BackToTop({ label }: BackToTopProps) {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="eyebrow group inline-flex items-center gap-2 rounded-full text-inverse-foreground transition-colors hover:text-inverse-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-inverse"
    >
      {label}
      <ArrowUp
        className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </button>
  );
}
