/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getAlternateLocale, Locale, switchLocalePath } from "@/lib/i18n";

type LanguageToggleProps = {
  locale: Locale;
  label: string;
};

export function LanguageToggle({ locale, label }: LanguageToggleProps) {
  const pathname = usePathname();
  const alternateLocale = getAlternateLocale(locale);

  return (
    <NextLink
      href={switchLocalePath(pathname, alternateLocale)}
      hrefLang={alternateLocale}
      aria-label={label}
      scroll={false}
      className={buttonVariants({
        variant: "soft",
        size: "pill",
        className: "gap-1.5 px-3 text-sm font-semibold uppercase sm:px-3",
      })}
    >
      <Globe aria-hidden className="text-copy" />
      {alternateLocale}
    </NextLink>
  );
}
