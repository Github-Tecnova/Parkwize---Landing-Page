/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        brand:
          "bg-brand text-brand-foreground shadow-sm hover:bg-brand-hover active:scale-[0.97]",
        soft: "text-foreground hover:bg-glass-hover active:scale-95",
        subtle:
          "border border-surface-border bg-surface text-foreground shadow-sm hover:bg-surface-muted active:scale-[0.97]",
      },
      size: {
        "icon-lg": "size-11",
        pill: "h-11 px-4 text-sm sm:px-5",
        "pill-lg": "h-12 px-6 text-[0.9375rem]",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "pill",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
