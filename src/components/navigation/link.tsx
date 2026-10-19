/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ComponentProps } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, Locale, localizedPath } from "@/lib/i18n";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
  lang?: Locale;
};

export function Link({ href, lang, ...props }: LinkProps) {
  const pathname = usePathname();
  const [, segment = ""] = pathname.split("/");
  const locale = lang ?? (isLocale(segment) ? segment : DEFAULT_LOCALE);

  return <NextLink href={localizedPath(href, locale)} {...props} />;
}
