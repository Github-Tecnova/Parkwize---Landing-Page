/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ComponentPropsWithoutRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Container } from "./container";

const sectionVariants = cva("relative isolate", {
  variants: {
    surface: {
      default: "bg-surface text-foreground",
      muted: "bg-surface-muted text-foreground",
      inverse: "bg-inverse text-inverse-foreground",
      transparent: "",
    },
    spacing: {
      default: "py-20 sm:py-24 lg:py-32",
      compact: "py-12 sm:py-16",
      none: "",
    },
  },
  defaultVariants: {
    surface: "default",
    spacing: "default",
  },
});

type SectionProps = ComponentPropsWithoutRef<"section"> &
  VariantProps<typeof sectionVariants> & {
    containerClassName?: string;
  };

export function Section({
  surface,
  spacing,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ surface, spacing }), className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
