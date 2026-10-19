/*
 * Copyright (c) 2025-2026. Tecnova
 */

export const LOCALES = ["en", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

const LOCALE_PREFIX = new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`);

export function isLocale(value: string): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

export function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "fr" : "en";
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  const path = pathname.replace(LOCALE_PREFIX, "");
  return path === "" || path === "/" ? `/${locale}` : `/${locale}${path}`;
}
