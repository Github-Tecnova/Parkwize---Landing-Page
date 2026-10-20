/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import {
  MouseEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { ParkwizeLogo } from "@/components/brand/parkwize-logo";
import { Link } from "@/components/navigation/link";
import { buttonVariants } from "@/components/ui/button";
import { NavigationDictionary, PagesDictionary } from "@/content/dictionary";
import { DismissReason, useDismiss } from "@/hooks/use-dismiss";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useHeroPresence } from "@/hooks/use-hero-presence";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useScrolled } from "@/hooks/use-scrolled";
import { Locale } from "@/lib/i18n";
import { FADE_FAST } from "@/lib/motion";
import { DEMO_HREF } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./language-toggle";
import { MenuToggle } from "./menu-toggle";
import { MobileMenu } from "./mobile-menu";
import { SignInLink } from "./sign-in-link";
import { SolutionsPanel } from "./solutions-panel";
import { TopBarNav } from "./top-bar-nav";

type OpenMenu = "none" | "solutions" | "mobile";

const HOVER_OPEN_DELAY = 120;
const HOVER_CLOSE_DELAY = 220;

const BAR_CONTROL = "text-bar-fg hover:bg-bar-hover";

type TopBarProps = {
  locale: Locale;
  dict: NavigationDictionary;
  pages: PagesDictionary;
};

export function TopBar({ locale, dict, pages }: TopBarProps) {
  const [menu, setMenu] = useState<OpenMenu>("none");
  const [focusPanel, setFocusPanel] = useState(false);
  const pathname = usePathname();
  const scrolled = useScrolled();
  const panelId = useId();
  const mobileId = useId();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const solutionsRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const overHero = useHeroPresence();

  const closeMenu = useCallback(() => setMenu("none"), []);

  const handleDismiss = useCallback(
    (reason: DismissReason) => {
      if (reason === "escape") {
        const trigger = menu === "mobile" ? toggleRef : solutionsRef;
        trigger.current?.focus();
      }
      setMenu("none");
    },
    [menu],
  );

  useDismiss(surfaceRef, menu !== "none", handleDismiss);
  useScrollLock(menu === "mobile");
  useFocusTrap(surfaceRef, menu === "mobile");

  useEffect(() => {
    setMenu("none");
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const scheduleMenu = (next: OpenMenu, delay: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMenu(next), delay);
  };

  const toggleSolutions = (event: MouseEvent<HTMLButtonElement>) => {
    window.clearTimeout(hoverTimer.current);
    setFocusPanel(event.detail === 0);
    setMenu((current) => (current === "solutions" ? "none" : "solutions"));
  };

  const openSolutionsOnHover = () => {
    setFocusPanel(false);
    scheduleMenu("solutions", HOVER_OPEN_DELAY);
  };

  return (
    <MotionConfig reducedMotion="user">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-[var(--top-bar-inset)] pt-[max(var(--top-bar-gap),env(safe-area-inset-top))]">
        <AnimatePresence>
          {menu !== "none" && (
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
          data-raised={scrolled || menu !== "none"}
          data-clear={overHero && !scrolled && menu === "none"}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse" && menu === "solutions") {
              scheduleMenu("none", HOVER_CLOSE_DELAY);
            }
          }}
          onPointerEnter={() => {
            if (menu === "solutions") window.clearTimeout(hoverTimer.current);
          }}
          className="glass pointer-events-auto relative mx-auto max-w-6xl overflow-hidden rounded-[calc(var(--top-bar-height)/2)]"
        >
          <div className="flex h-[var(--top-bar-height)] items-center gap-2 pl-4 pr-2 sm:pl-6 lg:gap-6">
            <Link
              href="/"
              lang={locale}
              aria-label={dict.homeLabel}
              onClick={closeMenu}
              className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <ParkwizeLogo
                title={dict.logoAlt}
                className="w-[6.75rem] text-bar-logo transition-colors min-[400px]:w-[7.5rem] sm:w-[8.5rem]"
              />
            </Link>
            <TopBarNav
              solutionsRef={solutionsRef}
              locale={locale}
              dict={dict}
              pages={pages}
              panelId={panelId}
              solutionsOpen={menu === "solutions"}
              onSolutionsClick={toggleSolutions}
              onSolutionsHover={openSolutionsOnHover}
              onNavigate={closeMenu}
            />
            <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
              <LanguageToggle
                locale={locale}
                label={dict.switchLanguage}
                className={BAR_CONTROL}
              />
              <SignInLink
                label={dict.signIn}
                variant="soft"
                className={cn(BAR_CONTROL, "hidden lg:inline-flex")}
              />
              <Link
                href={DEMO_HREF}
                lang={locale}
                onClick={closeMenu}
                className={cn(
                  buttonVariants({ variant: "brand", size: "pill" }),
                  "hidden min-[420px]:inline-flex",
                )}
              >
                {dict.bookDemo}
              </Link>
              <MenuToggle
                ref={toggleRef}
                open={menu === "mobile"}
                controls={mobileId}
                openLabel={dict.openMenu}
                closeLabel={dict.closeMenu}
                className={cn(BAR_CONTROL, "lg:hidden")}
                onToggle={() =>
                  setMenu((current) =>
                    current === "mobile" ? "none" : "mobile",
                  )
                }
              />
            </div>
          </div>
          <AnimatePresence initial={false}>
            {menu === "solutions" && (
              <SolutionsPanel
                key="solutions"
                id={panelId}
                locale={locale}
                dict={dict}
                pages={pages}
                focusOnOpen={focusPanel}
                onNavigate={closeMenu}
              />
            )}
            {menu === "mobile" && (
              <MobileMenu
                key="mobile"
                id={mobileId}
                locale={locale}
                dict={dict}
                pages={pages}
                onNavigate={closeMenu}
              />
            )}
          </AnimatePresence>
        </div>
      </header>
    </MotionConfig>
  );
}
