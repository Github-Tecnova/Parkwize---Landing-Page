/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { MouseEvent, Ref, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@/components/navigation/link";
import { NavigationDictionary, PagesDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { FADE_FAST, SPRING_SMOOTH } from "@/lib/motion";
import {
  CONTACT_HREF,
  isActivePath,
  PRODUCT_LINKS,
  SOLUTION_LINKS,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

const PARKAID = PRODUCT_LINKS.find((link) => link.key === "parkAid");

const NAV_ITEM =
  "relative isolate inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-sm font-medium text-bar-muted transition-colors hover:text-bar-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:text-bar-fg";

type NavItemId = "solutions" | "parkAid" | "contact";

type NavHighlightProps = {
  active: boolean;
  hovered: boolean;
};

function NavHighlight({ active, hovered }: NavHighlightProps) {
  return (
    <>
      <AnimatePresence>
        {hovered && (
          <motion.span
            aria-hidden
            layoutId="top-bar-hover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: FADE_FAST }}
            transition={SPRING_SMOOTH}
            className="absolute inset-0 -z-10 rounded-full bg-bar-hover"
          />
        )}
      </AnimatePresence>
      {active && (
        <motion.span
          aria-hidden
          layoutId="top-bar-active"
          transition={SPRING_SMOOTH}
          className="absolute inset-x-3.5 bottom-1 h-0.5 rounded-full bg-deck"
        />
      )}
    </>
  );
}

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
  const [hovered, setHovered] = useState<NavItemId | null>(null);
  const inSolutions = SOLUTION_LINKS.some((link) =>
    isActivePath(pathname, link.slug),
  );
  const parkAidActive = PARKAID ? isActivePath(pathname, PARKAID.slug) : false;
  const contactActive = isActivePath(pathname, "contact");
  const hover = (id: NavItemId) => ({
    onPointerEnter: () => setHovered(id),
    onFocus: () => setHovered(id),
    onBlur: () => setHovered(null),
  });

  return (
    <nav aria-label={dict.mainLabel} className="hidden lg:block">
      <ul
        className="flex items-center gap-0.5"
        onPointerLeave={() => setHovered(null)}
      >
        <li>
          <button
            ref={solutionsRef}
            type="button"
            aria-expanded={solutionsOpen}
            aria-controls={panelId}
            aria-current={inSolutions ? "page" : undefined}
            onClick={onSolutionsClick}
            onPointerEnter={(event) => {
              setHovered("solutions");
              if (event.pointerType === "mouse") onSolutionsHover();
            }}
            onFocus={() => setHovered("solutions")}
            onBlur={() => setHovered(null)}
            className={cn(NAV_ITEM, solutionsOpen && "text-bar-fg")}
          >
            <NavHighlight
              active={inSolutions}
              hovered={hovered ? hovered === "solutions" : solutionsOpen}
            />
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
              aria-current={parkAidActive ? "page" : undefined}
              onClick={onNavigate}
              className={NAV_ITEM}
              {...hover("parkAid")}
            >
              <NavHighlight
                active={parkAidActive}
                hovered={hovered === "parkAid"}
              />
              {pages.parkAid.name}
            </Link>
          </li>
        )}
        <li>
          <Link
            href={CONTACT_HREF}
            lang={locale}
            aria-current={contactActive ? "page" : undefined}
            onClick={onNavigate}
            className={NAV_ITEM}
            {...hover("contact")}
          >
            <NavHighlight
              active={contactActive}
              hovered={hovered === "contact"}
            />
            {pages.contact.name}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
