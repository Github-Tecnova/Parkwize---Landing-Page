/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { CURSOR_SPRING, FADE_BASE, FADE_FAST } from "@/lib/motion";
import { PRODUCT_LINKS, ProductKey } from "@/lib/navigation";
import { PRODUCT_PREVIEWS } from "@/lib/product-media";
import { cn } from "@/lib/utils";

const FINE_POINTER =
  "(pointer: fine) and (prefers-reduced-motion: no-preference)";

const MAX_TILT = 4;

function readProduct(target: EventTarget | null): ProductKey | null {
  if (!(target instanceof Element)) return null;
  const key = target.closest("[data-product]")?.getAttribute("data-product");
  return PRODUCT_LINKS.find((link) => link.key === key)?.key ?? null;
}

export function ProductIndexPreview() {
  const anchor = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<ProductKey | null>(null);
  const [flipped, setFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, CURSOR_SPRING);
  const springY = useSpring(y, CURSOR_SPRING);
  const rotate = useTransform(
    useVelocity(springX),
    [-1600, 1600],
    [-MAX_TILT, MAX_TILT],
    { clamp: true },
  );

  useEffect(() => {
    const index = anchor.current?.parentElement;
    if (!index || !window.matchMedia(FINE_POINTER).matches) return;

    let visible = false;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = index.getBoundingClientRect();
      const left = event.clientX - bounds.left;
      const top = event.clientY - bounds.top;
      x.set(left);
      y.set(top);
      if (!visible) {
        springX.jump(left);
        springY.jump(top);
      }
      visible = true;
      setFlipped(left > bounds.width / 2);
      setActive(readProduct(event.target));
    };

    const handleLeave = () => {
      visible = false;
      setActive(null);
    };

    index.addEventListener("pointermove", handleMove);
    index.addEventListener("pointerleave", handleLeave);

    return () => {
      index.removeEventListener("pointermove", handleMove);
      index.removeEventListener("pointerleave", handleLeave);
    };
  }, [x, y, springX, springY]);

  return (
    <span
      ref={anchor}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
    >
      <AnimatePresence>
        {active && (
          <motion.span
            className="absolute left-0 top-0 block"
            style={{ x: springX, y: springY, rotate }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: FADE_FAST }}
            transition={FADE_BASE}
          >
            <span
              className={cn(
                "absolute top-0 block w-[17.5rem] -translate-y-1/2 overflow-hidden rounded-2xl border border-hairline bg-surface p-4 shadow-media transition-transform duration-300",
                flipped ? "right-8" : "left-8",
              )}
            >
              <span className="relative block aspect-[4/3]">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={active}
                    className="absolute inset-0 block"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={FADE_BASE}
                  >
                    <Image
                      src={PRODUCT_PREVIEWS[active].src}
                      alt=""
                      fill
                      sizes="280px"
                      className="object-contain"
                    />
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
