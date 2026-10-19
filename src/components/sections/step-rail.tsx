/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { cn } from "@/lib/utils";

type StepRailProps = {
  label: string;
  steps: { label: string }[];
  current: number;
  onSelect: (index: number) => void;
};

export function StepRail({ label, steps, current, onSelect }: StepRailProps) {
  return (
    <ol
      aria-label={label}
      className={cn(
        "grid border-b border-hairline",
        steps.length === 5 ? "grid-cols-5" : "grid-cols-4",
      )}
    >
      {steps.map((item, index) => (
        <li key={item.label} className="relative">
          <button
            type="button"
            aria-pressed={current === index}
            onClick={() => onSelect(index)}
            className={cn(
              "flex w-full flex-col items-center gap-2 px-1 py-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:flex-row sm:justify-center sm:gap-3 sm:py-5",
              current === index ? "text-ink" : "text-copy hover:text-ink",
            )}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                current >= index
                  ? "bg-deck text-white"
                  : "border border-hairline bg-surface text-copy",
              )}
            >
              {index + 1}
            </span>
            <span className="max-w-full break-words text-[0.625rem] font-bold uppercase tracking-wide min-[400px]:text-[0.6875rem] sm:text-xs">
              {item.label}
            </span>
          </button>
          <span
            aria-hidden
            className={cn(
              "absolute inset-x-0 bottom-[-1px] h-0.5 origin-left bg-deck transition-transform duration-500",
              current === index ? "scale-x-100" : "scale-x-0",
            )}
          />
        </li>
      ))}
    </ol>
  );
}
