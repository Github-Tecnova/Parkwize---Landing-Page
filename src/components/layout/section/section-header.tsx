/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ReactNode } from "react";
import { AccentText } from "@/components/typography/accent-text";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2";
  tone?: "default" | "inverse";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  actions,
  align = "start",
  as: Heading = "h2",
  tone = "default",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  const inverse = tone === "inverse";

  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        centered && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn("kicker", inverse ? "text-inverse-muted" : "text-deck")}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "text-balance font-display font-semibold",
          Heading === "h1" ? "text-h1" : "text-h2",
          inverse ? "text-inverse-foreground" : "text-ink",
        )}
      >
        <AccentText
          text={title}
          accentClassName={inverse ? "text-deck-bright" : undefined}
        />
      </Heading>
      {lead && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-lead",
            inverse ? "text-inverse-muted" : "text-copy",
          )}
        >
          {lead}
        </p>
      )}
      {actions && (
        <div
          className={cn(
            "mt-2 flex flex-wrap gap-3",
            centered && "justify-center",
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
