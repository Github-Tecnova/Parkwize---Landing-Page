/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

export function PointerSpotlight() {
  return <div aria-hidden ref={mountSpotlight} className="pointer-spot" />;
}

function mountSpotlight(spot: HTMLDivElement | null) {
  const section = spot?.parentElement;
  if (!spot || !section) return;

  const finePointer = window.matchMedia(
    "(pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
  if (!finePointer.matches) return;

  const handleMove = (event: PointerEvent) => {
    const bounds = section.getBoundingClientRect();
    spot.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    spot.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    spot.style.opacity = "1";
  };

  const handleLeave = () => {
    spot.style.opacity = "0";
  };

  section.addEventListener("pointermove", handleMove);
  section.addEventListener("pointerleave", handleLeave);

  return () => {
    section.removeEventListener("pointermove", handleMove);
    section.removeEventListener("pointerleave", handleLeave);
  };
}
