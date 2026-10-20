/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { isPlainNavigation } from "@/components/navigation/link";
import { buttonVariants } from "@/components/ui/button";
import { getAlternateLocale, Locale, switchLocalePath } from "@/lib/i18n";
import { startRouteProgress } from "@/lib/route-progress";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  locale: Locale;
  label: string;
  className?: string;
};

export function LanguageToggle({
  locale,
  label,
  className,
}: LanguageToggleProps) {
  const pathname = usePathname();
  const alternateLocale = getAlternateLocale(locale);

  return (
    <NextLink
      href={switchLocalePath(pathname, alternateLocale)}
      hrefLang={alternateLocale}
      aria-label={label}
      scroll={false}
      onClick={(event) => {
        if (isPlainNavigation(event)) startRouteProgress();
      }}
      className={cn(
        buttonVariants({ variant: "soft", size: "pill" }),
        "gap-1.5 px-3 text-sm font-semibold uppercase sm:px-3",
        className,
      )}
    >
      <Globe aria-hidden className="opacity-70" />
      {alternateLocale}
    </NextLink>
  );
}
