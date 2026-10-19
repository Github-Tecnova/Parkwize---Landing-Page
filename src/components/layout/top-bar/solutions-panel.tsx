/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
  SOLUTION_LINKS,
  SYSTEM_STATUS_URL,
} from "@/lib/navigation";
import { TopBarMenuItem } from "./top-bar-menu-item";

type SolutionsPanelProps = {
  id: string;
  locale: Locale;
  dict: NavigationDictionary;
  pages: PagesDictionary;
  focusOnOpen: boolean;
  onNavigate: () => void;
};

export function SolutionsPanel({
  id,
  locale,
  dict,
  pages,
  focusOnOpen,
  onNavigate,
}: SolutionsPanelProps) {
  const pathname = usePathname();

  return (
    <motion.div
      id={id}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={SPRING_SMOOTH}
      className="hidden overflow-hidden lg:block"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_17rem] gap-3 border-t border-glass-divider p-3">
        <ul className="grid grid-cols-2 content-start gap-1">
          {SOLUTION_LINKS.map((product, index) => (
            <motion.li
              key={product.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...FADE_BASE, delay: index * STAGGER_STEP }}
            >
              <TopBarMenuItem
                ref={
                  index === 0 && focusOnOpen
                    ? (node) => node?.focus()
                    : undefined
                }
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

        <aside className="flex flex-col rounded-2xl bg-deck-tint p-5">
          <p className="kicker tracking-[0.14em] text-deck">{dict.seeItLive}</p>
          <p className="mt-2 text-sm leading-relaxed text-copy">
            {dict.seeItLiveBody}
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "brand",
              size: "pill",
              className: "mt-4 self-start",
            })}
          >
            {dict.liveDemo}
            <ArrowUpRight aria-hidden />
            <span className="sr-only">({dict.newTab})</span>
          </a>
          <a
            href={SYSTEM_STATUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-ink hover:text-deck focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span aria-hidden className="size-2 rounded-full bg-success" />
            {dict.systemStatus}
            <span className="sr-only">({dict.newTab})</span>
          </a>
        </aside>

        <div className="col-span-2 flex items-center gap-1 border-t border-glass-divider px-1 pt-3">
          {[
            { href: DEMO_HREF, label: dict.bookDemo },
            { href: CONTACT_HREF, label: pages.contact.name },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              lang={locale}
              onClick={onNavigate}
              className="group inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink transition-colors hover:bg-glass-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
              <ArrowRight
                aria-hidden
                className="size-4 text-deck transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
