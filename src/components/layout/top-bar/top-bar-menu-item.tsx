/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { Ref } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { Locale } from "@/lib/i18n";
import { PageLink } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type TopBarMenuItemProps = {
  ref?: Ref<HTMLAnchorElement>;
  page: PageLink;
  locale: Locale;
  name: string;
  description: string;
  active: boolean;
  onNavigate: () => void;
};

export function TopBarMenuItem({
  ref,
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
      ref={ref}
      href={`/${page.slug}`}
      lang={locale}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-glass-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-3",
        active &&
          "bg-glass-hover before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:rounded-full before:bg-deck",
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
          active
            ? "bg-deck text-brand-foreground"
            : "bg-brand-soft text-brand group-hover:bg-deck group-hover:text-brand-foreground",
        )}
      >
        <Icon aria-hidden className="size-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block font-display text-sm text-ink sm:text-[0.9375rem]",
            active ? "font-semibold" : "font-medium",
          )}
        >
          {name}
        </span>
        <span className="block text-pretty text-xs leading-snug text-copy sm:text-[0.8125rem]">
          {description}
        </span>
      </span>
      <ArrowRight
        aria-hidden
        className="size-4 shrink-0 text-copy transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-deck lg:-translate-x-1 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-x-0 lg:group-focus-visible:opacity-100"
      />
    </Link>
  );
}
