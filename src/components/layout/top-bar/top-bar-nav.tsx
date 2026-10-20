/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { MouseEvent, Ref } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { NavigationDictionary, PagesDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import {
  CONTACT_HREF,
  isActivePath,
  PRODUCT_LINKS,
  SOLUTION_LINKS,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

const PARKAID = PRODUCT_LINKS.find((link) => link.key === "parkAid");

const NAV_ITEM =
  "relative inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-sm font-medium text-bar-muted transition-colors hover:bg-bar-hover hover:text-bar-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-deck after:transition-transform aria-[current=page]:text-bar-fg aria-[current=page]:after:scale-x-100";

type TopBarNavProps = {
  solutionsRef: Ref<HTMLButtonElement>;
  locale: Locale;
  dict: NavigationDictionary;
  pages: PagesDictionary;
  panelId: string;
  solutionsOpen: boolean;
  onSolutionsClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onSolutionsHover: () => void;
  onNavigate: () => void;
};

export function TopBarNav({
  solutionsRef,
  locale,
  dict,
  pages,
  panelId,
  solutionsOpen,
  onSolutionsClick,
  onSolutionsHover,
  onNavigate,
}: TopBarNavProps) {
  const pathname = usePathname();
  const inSolutions = SOLUTION_LINKS.some((link) =>
    isActivePath(pathname, link.slug),
  );

  return (
    <nav aria-label={dict.mainLabel} className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        <li>
          <button
            ref={solutionsRef}
            type="button"
            aria-expanded={solutionsOpen}
            aria-controls={panelId}
            aria-current={inSolutions ? "page" : undefined}
            onClick={onSolutionsClick}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") onSolutionsHover();
            }}
            className={cn(
              NAV_ITEM,
              solutionsOpen && "bg-bar-hover text-bar-fg",
            )}
          >
            {dict.menuTitle}
            <ChevronDown
              aria-hidden
              className={cn(
                "size-4 transition-transform duration-200",
                solutionsOpen && "rotate-180",
              )}
            />
          </button>
        </li>
        {PARKAID && (
          <li>
            <Link
              href={`/${PARKAID.slug}`}
              lang={locale}
              aria-current={
                isActivePath(pathname, PARKAID.slug) ? "page" : undefined
              }
              onClick={onNavigate}
              className={NAV_ITEM}
            >
              {pages.parkAid.name}
            </Link>
          </li>
        )}
        <li>
          <Link
            href={CONTACT_HREF}
            lang={locale}
            aria-current={
              isActivePath(pathname, "contact") ? "page" : undefined
            }
            onClick={onNavigate}
            className={NAV_ITEM}
          >
            {pages.contact.name}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
