/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { RefObject, useEffect } from "react";

export type DismissReason = "escape" | "outside";

export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onDismiss: (reason: DismissReason) => void,
) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss("escape");
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        onDismiss("outside");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [active, onDismiss, ref]);
}
