/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { NavigationDictionary, PagesDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { FADE_BASE, SPRING_SMOOTH, STAGGER_STEP } from "@/lib/motion";
import { PRODUCT_LINKS } from "@/lib/navigation";
import { SignInLink } from "./sign-in-link";
import { TopBarMenuItem } from "./top-bar-menu-item";

type TopBarMenuProps = {
  id: string;
  locale: Locale;
  dict: NavigationDictionary;
  pages: PagesDictionary;
  onNavigate: () => void;
};

export function TopBarMenu({
  id,
  locale,
  dict,
  pages,
  onNavigate,
}: TopBarMenuProps) {
  const pathname = usePathname();

  return (
    <motion.div
      id={id}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={SPRING_SMOOTH}
      className="overflow-hidden"
    >
      <nav
        aria-label={dict.menuTitle}
        className="max-h-[calc(100dvh-var(--top-bar-offset)-2*var(--top-bar-gap))] overflow-y-auto overscroll-contain border-t border-glass-divider p-2 sm:p-3"
      >
        <p className="px-2.5 pb-1 pt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground sm:px-3">
          {dict.menuTitle}
        </p>
        <ul className="grid gap-0.5 md:grid-cols-2 md:gap-1">
          {PRODUCT_LINKS.map((product, index) => (
            <motion.li
              key={product.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...FADE_BASE, delay: index * STAGGER_STEP }}
            >
              <TopBarMenuItem
                page={product}
                locale={locale}
                name={pages[product.key].name}
                description={pages[product.key].description}
                active={pathname === `/${locale}/${product.slug}`}
                onNavigate={onNavigate}
              />
            </motion.li>
          ))}
        </ul>
        <SignInLink
          label={dict.signIn}
          className="mt-2 w-full min-[360px]:hidden"
        />
      </nav>
    </motion.div>
  );
}
