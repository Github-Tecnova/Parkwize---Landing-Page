/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useCallback, useId, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ParkwizeLogo } from "@/components/brand/parkwize-logo";
import Link from "@/components/custom-ui/link";
import { NavigationDictionary } from "@/content/dictionary";
import { DismissReason, useDismiss } from "@/hooks/use-dismiss";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { Locale } from "@/lib/i18n";
import { FADE_FAST } from "@/lib/motion";
import { LanguageToggle } from "./language-toggle";
import { MenuToggle } from "./menu-toggle";
import { SignInLink } from "./sign-in-link";
import { TopBarMenu } from "./top-bar-menu";

type TopBarProps = {
  locale: Locale;
  dict: NavigationDictionary;
};

export function TopBar({ locale, dict }: TopBarProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  const handleDismiss = useCallback((reason: DismissReason) => {
    setOpen(false);
    if (reason === "escape") toggleRef.current?.focus();
  }, []);

  useDismiss(surfaceRef, open, handleDismiss);
  useScrollLock(open);

  return (
    <MotionConfig reducedMotion="user">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[var(--top-bar-inset)] pt-[max(var(--top-bar-gap),env(safe-area-inset-top))]">
        <AnimatePresence>
          {open && (
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE_FAST}
              className="pointer-events-auto fixed inset-0 bg-scrim"
            />
          )}
        </AnimatePresence>
        <div
          ref={surfaceRef}
          className="glass pointer-events-auto relative mx-auto max-w-6xl overflow-hidden rounded-[calc(var(--top-bar-height)/2)]"
        >
          <div className="flex h-[var(--top-bar-height)] items-center justify-between gap-2 pl-4 pr-1.5 sm:pl-6 sm:pr-2.5">
            <Link
              href="/"
              lang={locale}
              aria-label={dict.homeLabel}
              onClick={closeMenu}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <ParkwizeLogo
                title={dict.logoAlt}
                className="w-[7.5rem] sm:w-[8.5rem]"
              />
            </Link>
            <div className="flex items-center gap-0.5 sm:gap-1.5">
              <LanguageToggle locale={locale} label={dict.switchLanguage} />
              <SignInLink label={dict.signIn} className="max-[359px]:hidden" />
              <MenuToggle
                ref={toggleRef}
                open={open}
                controls={menuId}
                openLabel={dict.openMenu}
                closeLabel={dict.closeMenu}
                onToggle={() => setOpen((previous) => !previous)}
              />
            </div>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <TopBarMenu
                id={menuId}
                locale={locale}
                dict={dict}
                onNavigate={closeMenu}
              />
            )}
          </AnimatePresence>
        </div>
      </header>
    </MotionConfig>
  );
}
