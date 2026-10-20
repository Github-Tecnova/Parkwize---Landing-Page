/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { Ref } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type TopBarMenuItemProps = {
  ref?: Ref<HTMLAnchorElement>;
  href: string;
  locale: Locale;
  name: string;
  description?: string;
  active: boolean;
  size?: "panel" | "sheet";
  onNavigate: () => void;
};

export function TopBarMenuItem({
  ref,
  href,
  locale,
  name,
  description,
  active,
  size = "panel",
  onNavigate,
}: TopBarMenuItemProps) {
  return (
    <Link
      ref={ref}
      href={href}
      lang={locale}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group flex items-start gap-3 rounded-xl px-3 transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        size === "panel" ? "py-3" : "py-3.5",
      )}
    >
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "flex items-center gap-2 font-display font-semibold text-ink",
            size === "panel" ? "text-[0.9375rem]" : "text-[1.0625rem]",
          )}
        >
          {name}
          {active && (
            <span aria-hidden className="size-1.5 rounded-full bg-deck" />
          )}
        </span>
        {description && (
          <span className="mt-0.5 block text-pretty text-[0.8125rem] leading-snug text-copy">
            {description}
          </span>
        )}
      </span>
      <ArrowRight
        aria-hidden
        className="mt-1 size-4 shrink-0 -translate-x-1 text-deck opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      />
    </Link>
  );
}
