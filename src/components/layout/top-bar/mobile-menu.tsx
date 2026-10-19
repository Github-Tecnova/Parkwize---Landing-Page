/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { Activity, MessageSquare, MonitorPlay } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { buttonVariants } from "@/components/ui/button";
import { NavigationDictionary, PagesDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { FADE_BASE, SPRING_SMOOTH, STAGGER_STEP } from "@/lib/motion";
import {
  CONTACT_HREF,
  DEMO_HREF,
  DEMO_URL,
  isActivePath,
  PRODUCT_LINKS,
  SYSTEM_STATUS_URL,
} from "@/lib/navigation";
import { SignInLink } from "./sign-in-link";
import { TopBarLinkRow } from "./top-bar-link-row";
import { TopBarMenuItem } from "./top-bar-menu-item";

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
  const companyLinks = [
    { href: CONTACT_HREF, label: pages.contact.name, Icon: MessageSquare },
    { href: DEMO_URL, label: dict.liveDemo, Icon: MonitorPlay },
    { href: SYSTEM_STATUS_URL, label: dict.systemStatus, Icon: Activity },
  ];

  return (
    <motion.div
      id={id}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={SPRING_SMOOTH}
      className="overflow-hidden lg:hidden"
    >
      <div className="flex max-h-[calc(100dvh-var(--top-bar-offset)-var(--top-bar-gap)-env(safe-area-inset-bottom))] flex-col border-t border-glass-divider">
        <nav
          aria-label={dict.menuTitle}
          className="overflow-y-auto overscroll-contain p-2 sm:p-3"
        >
          <p className="eyebrow px-3 pb-1.5 pt-2 text-copy">{dict.menuTitle}</p>
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
                  active={isActivePath(pathname, product.slug)}
                  onNavigate={onNavigate}
                />
              </motion.li>
            ))}
          </ul>
          <p className="eyebrow mt-3 border-t border-glass-divider px-3 pb-1.5 pt-4 text-copy">
            {dict.company}
          </p>
          <ul className="grid gap-0.5 md:grid-cols-3">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <TopBarLinkRow
                  {...link}
                  locale={locale}
                  newTabLabel={dict.newTab}
                  active={
                    isActivePath(pathname, "contact") &&
                    link.href === CONTACT_HREF
                  }
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid grid-cols-2 gap-2 border-t border-glass-divider p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
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
