/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ArrowRight, ArrowUpRight, LucideIcon } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type TopBarLinkRowProps = {
  href: string;
  label: string;
  Icon: LucideIcon;
  locale: Locale;
  newTabLabel: string;
  active?: boolean;
  onNavigate: () => void;
};

const ROW =
  "group flex min-h-12 items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-glass-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function TopBarLinkRow({
  href,
  label,
  Icon,
  locale,
  newTabLabel,
  active = false,
  onNavigate,
}: TopBarLinkRowProps) {
  const external = href.startsWith("http");
  const content = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icon aria-hidden className="size-[1.125rem]" strokeWidth={1.75} />
      </span>
      <span className="flex-1">{label}</span>
      {external ? (
        <>
          <ArrowUpRight aria-hidden className="size-4 text-copy" />
          <span className="sr-only">({newTabLabel})</span>
        </>
      ) : (
        <ArrowRight
          aria-hidden
          className="size-4 text-copy transition-transform group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={ROW}>
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      lang={locale}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(ROW, active && "bg-glass-hover")}
    >
      {content}
    </Link>
  );
}
