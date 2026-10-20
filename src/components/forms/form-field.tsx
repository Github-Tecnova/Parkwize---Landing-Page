/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const fieldControl = cva(
  "w-full rounded-xl border border-hairline bg-surface px-4 text-[0.9375rem] text-ink transition-colors placeholder:text-muted-foreground focus-visible:border-deck focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-deck-tint aria-[invalid=true]:border-destructive disabled:opacity-60",
  {
    variants: {
      kind: {
        input: "h-12",
        select: "h-12",
        textarea: "min-h-28 resize-y py-3",
      },
    },
    defaultVariants: { kind: "input" },
  },
);

type ControlProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
};

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
};

export function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  className,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="flex flex-1 flex-wrap items-end gap-x-2 gap-y-0.5 text-sm font-semibold text-ink"
      >
        <span>
          {label}
          {required && (
            <span aria-hidden className="text-deck">
              {" "}
              *
            </span>
          )}
        </span>
        {hint && (
          <span id={hintId} className="text-xs font-medium text-copy">
            {hint}
          </span>
        )}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}
      {error && (
        <p id={errorId} className="text-xs font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
