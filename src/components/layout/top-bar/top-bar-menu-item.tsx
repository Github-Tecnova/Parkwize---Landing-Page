/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ArrowRight } from "lucide-react";
import Link from "@/components/custom-ui/link";
import { Locale } from "@/lib/i18n";
import { PageLink } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type TopBarMenuItemProps = {
  page: PageLink;
  locale: Locale;
  name: string;
  description: string;
  active: boolean;
  onNavigate: () => void;
};

export function TopBarMenuItem({
  page,
  locale,
  name,
  description,
  active,
  onNavigate,
}: TopBarMenuItemProps) {
  const { Icon } = page;

  return (
    <Link
      href={`/${page.slug}`}
      lang={locale}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-glass-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-3",
        active && "bg-glass-hover",
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-sm font-medium text-foreground sm:text-base">
          {name}
        </span>
        <span className="block text-pretty text-xs text-muted-foreground sm:text-sm">
          {description}
        </span>
      </span>
      <ArrowRight
        className="size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground md:-translate-x-1 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:translate-x-0 md:group-focus-visible:opacity-100"
        aria-hidden
      />
    </Link>
  );
}
