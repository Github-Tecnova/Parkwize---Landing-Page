/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { NavigationDictionary, PagesDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";
import { EASE_OUT_EXPO, FADE_BASE, STAGGER_STEP } from "@/lib/motion";
import {
  CONTACT_HREF,
  DEMO_HREF,
  DEMO_URL,
  isActivePath,
  SOLUTION_LINKS,
  SYSTEM_STATUS_URL,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { TopBarMenuItem } from "./top-bar-menu-item";

const TEXT_LINK =
  "group inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-deck focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

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
  const { deckDashboard } = MEDIA.product;

  return (
    <motion.div
      id={id}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
      className="hidden overflow-hidden lg:block"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_18rem] gap-6 border-t border-hairline px-4 pb-4 pt-5">
        <div>
          <p className="eyebrow px-3 text-copy">{dict.menuTitle}</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-2">
            {SOLUTION_LINKS.map((product, index) => (
              <motion.li
                key={product.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...FADE_BASE, delay: index * STAGGER_STEP }}
              >
                <TopBarMenuItem
                  ref={
                    index === 0 && focusOnOpen
                      ? (node) => node?.focus()
                      : undefined
                  }
                  href={`/${product.slug}`}
                  locale={locale}
                  name={pages[product.key].name}
                  description={pages[product.key].description}
                  active={isActivePath(pathname, product.slug)}
                  onNavigate={onNavigate}
                />
              </motion.li>
            ))}
          </ul>
          <div className="mt-3 flex gap-6 border-t border-hairline px-3 pt-4">
            {[
              { href: DEMO_HREF, label: dict.bookDemo },
              { href: CONTACT_HREF, label: pages.contact.name },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                lang={locale}
                onClick={onNavigate}
                className={TEXT_LINK}
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

        <aside className="flex flex-col overflow-hidden rounded-2xl bg-surface-muted">
          <div className="flex h-36 items-end justify-center px-5 pt-5">
            <Image
              src={deckDashboard.src}
              width={deckDashboard.width}
              height={deckDashboard.height}
              alt=""
              sizes="240px"
              className="h-full w-auto object-contain drop-shadow-soft"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="font-display text-[0.9375rem] font-semibold text-ink">
              {dict.seeItLive}
            </p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-copy">
              {dict.seeItLiveBody}
            </p>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(TEXT_LINK, "mt-4")}
            >
              {dict.liveDemo}
              <ArrowUpRight aria-hidden className="size-4 text-deck" />
              <span className="sr-only">({dict.newTab})</span>
            </a>
            <a
              href={SYSTEM_STATUS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[0.8125rem] text-copy transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-success" />
              {dict.systemStatus}
              <span className="sr-only">({dict.newTab})</span>
            </a>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
