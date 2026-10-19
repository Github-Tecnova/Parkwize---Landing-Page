/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { SPRING_SMOOTH } from "@/lib/motion";

type MenuToggleProps = {
  open: boolean;
  controls: string;
  openLabel: string;
  closeLabel: string;
  onToggle: () => void;
  className?: string;
};

const LINE_OFFSET = 4;

export const MenuToggle = forwardRef<HTMLButtonElement, MenuToggleProps>(
  ({ open, controls, openLabel, closeLabel, onToggle, className }, ref) => (
    <Button
      ref={ref}
      type="button"
      variant="soft"
      size="icon-lg"
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? closeLabel : openLabel}
      onClick={onToggle}
      className={className}
    >
      <span className="relative block h-2.5 w-5">
        <motion.span
          className="absolute inset-x-0 top-0 h-0.5 rounded-full bg-current"
          animate={open ? { y: LINE_OFFSET, rotate: 45 } : { y: 0, rotate: 0 }}
          transition={SPRING_SMOOTH}
        />
        <motion.span
          className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-current"
          animate={
            open ? { y: -LINE_OFFSET, rotate: -45 } : { y: 0, rotate: 0 }
          }
          transition={SPRING_SMOOTH}
        />
      </span>
    </Button>
  ),
);

MenuToggle.displayName = "MenuToggle";
