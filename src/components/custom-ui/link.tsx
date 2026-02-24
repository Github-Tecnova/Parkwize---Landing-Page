"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NextLinkProps = React.ComponentProps<typeof NextLink>;

type LocalizedLinkProps = NextLinkProps & {
  disableLangPrefix?: boolean;
  lang?: "fr" | "en";
};

function extractLang(pathname: string | null): "fr" | "en" {
  if (!pathname) return "en";
  const match = pathname.match(/^\/(fr|en)(?:\/|$)/);
  return match?.[1] === "fr" ? "fr" : "en";
}

function isExternalOrSpecial(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#") ||
    href.startsWith("?") ||
    href.startsWith("//")
  );
}

function prefixHref(
  href: NextLinkProps["href"],
  lang: "fr" | "en",
  disableLangPrefix?: boolean,
): NextLinkProps["href"] {
  if (disableLangPrefix) return href;

  if (typeof href === "string") {
    if (isExternalOrSpecial(href)) return href;
    if (/^\/(fr|en)(?:\/|$)/.test(href)) return href;
    if (href === "/") return `/${lang}`;
    if (href.startsWith("/")) return `/${lang}${href}`;
    return `/${lang}/${href}`;
  }

  if (!href?.pathname || typeof href.pathname !== "string") return href;
  if (isExternalOrSpecial(href.pathname)) return href;
  if (/^\/(fr|en)(?:\/|$)/.test(href.pathname)) return href;

  const pathname =
    href.pathname === "/"
      ? `/${lang}`
      : href.pathname.startsWith("/")
        ? `/${lang}${href.pathname}`
        : `/${lang}/${href.pathname}`;

  return { ...href, pathname };
}

export default function Link({
  href,
  lang,
  disableLangPrefix,
  ...props
}: LocalizedLinkProps) {
  const pathname = usePathname();
  const currentLang = lang ?? extractLang(pathname);
  const localizedHref = prefixHref(href, currentLang, disableLangPrefix);

  return <NextLink href={localizedHref} {...props} />;
}
