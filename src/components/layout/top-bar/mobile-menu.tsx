/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { buttonVariants } from "@/components/ui/button";
import { NavigationDictionary, PagesDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { EASE_OUT_EXPO, FADE_BASE, STAGGER_STEP } from "@/lib/motion";
import {
  CONTACT_HREF,
  DEMO_HREF,
  DEMO_URL,
  isActivePath,
  PRODUCT_LINKS,
  SYSTEM_STATUS_URL,
} from "@/lib/navigation";
import { SignInLink } from "./sign-in-link";
import { TopBarMenuItem } from "./top-bar-menu-item";

const ROW =
  "flex min-h-12 items-center justify-between gap-3 rounded-xl px-3 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type MobileMenuProps = {
  id: string;
  locale: Locale;
  dict: NavigationDictionary;
  pages: PagesDictionary;
  onNavigate: () => void;
};

export function MobileMenu({
  id,
  locale,
  dict,
  pages,
  onNavigate,
}: MobileMenuProps) {
  const pathname = usePathname();
  const externalLinks = [
    { href: DEMO_URL, label: dict.liveDemo },
    { href: SYSTEM_STATUS_URL, label: dict.systemStatus },
  ];

  return (
    <motion.div
      id={id}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.36, ease: EASE_OUT_EXPO }}
      className="overflow-hidden lg:hidden"
    >
      <div className="flex max-h-[calc(100dvh-var(--top-bar-offset)-var(--top-bar-gap)-env(safe-area-inset-bottom))] flex-col border-t border-hairline">
        <nav
          aria-label={dict.menuTitle}
          data-lenis-prevent
          className="overflow-y-auto overscroll-contain px-2 pb-2 pt-4 sm:px-3"
        >
          <p className="eyebrow px-3 text-copy">{dict.menuTitle}</p>
          <ul className="mt-1 grid divide-y divide-hairline md:grid-cols-2 md:gap-x-2 md:divide-y-0">
            {PRODUCT_LINKS.map((product, index) => (
              <motion.li
                key={product.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...FADE_BASE, delay: index * STAGGER_STEP }}
              >
                <TopBarMenuItem
                  href={`/${product.slug}`}
                  locale={locale}
                  name={pages[product.key].name}
                  description={pages[product.key].description}
                  active={isActivePath(pathname, product.slug)}
                  size="sheet"
                  onNavigate={onNavigate}
                />
              </motion.li>
            ))}
          </ul>

          <p className="eyebrow mt-5 border-t border-hairline px-3 pt-5 text-copy">
            {dict.company}
          </p>
          <ul className="mt-1">
            <li>
              <Link
                href={CONTACT_HREF}
                lang={locale}
                aria-current={
                  isActivePath(pathname, "contact") ? "page" : undefined
                }
                onClick={onNavigate}
                className={ROW}
              >
                {pages.contact.name}
              </Link>
            </li>
            {externalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ROW}
                >
                  {link.label}
                  <ArrowUpRight aria-hidden className="size-4 text-copy" />
                  <span className="sr-only">({dict.newTab})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid grid-cols-2 gap-2 border-t border-hairline p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <SignInLink label={dict.signIn} variant="subtle" />
          <Link
            href={DEMO_HREF}
            lang={locale}
            onClick={onNavigate}
            className={buttonVariants({ variant: "brand", size: "pill" })}
          >
            {dict.bookDemo}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
