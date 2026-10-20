/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { ComponentProps, MouseEvent } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, Locale, localizedPath } from "@/lib/i18n";
import { startRouteProgress } from "@/lib/route-progress";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
  lang?: Locale;
};

export function Link({ href, lang, onClick, ...props }: LinkProps) {
  const pathname = usePathname();
  const [, segment = ""] = pathname.split("/");
  const locale = lang ?? (isLocale(segment) ? segment : DEFAULT_LOCALE);
  const target = localizedPath(href, locale);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (isPlainNavigation(event) && target.split("#")[0] !== pathname) {
      startRouteProgress();
    }
  };

  return <NextLink href={target} onClick={handleClick} {...props} />;
}

export function isPlainNavigation(event: MouseEvent<HTMLAnchorElement>) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    event.currentTarget.target !== "_blank"
  );
}
