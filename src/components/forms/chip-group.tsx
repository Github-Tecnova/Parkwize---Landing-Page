/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ChipGroupProps = {
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
};

export function ChipGroup({
  label,
  hint,
  options,
  selected,
  onToggle,
}: ChipGroupProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-2">
      <p className="flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        {label}
        {hint && <span className="text-xs font-medium text-copy">{hint}</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option.value)}
              className={cn(
                "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-deck-tint",
                active
                  ? "border-deck bg-deck text-brand-foreground"
                  : "border-hairline bg-surface text-ink hover:border-deck",
              )}
            >
              {active && <Check aria-hidden className="size-3.5" />}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
