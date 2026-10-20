/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ParkwizeLogo } from "@/components/brand/parkwize-logo";
import { Link } from "@/components/navigation/link";
import { FooterDictionary, PagesDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import {
  DEMO_HREF,
  DEMO_URL,
  LEGAL_LINKS,
  PageLink,
  PRODUCT_LINKS,
  SIGN_IN_URL,
} from "@/lib/navigation";
import { BackToTop } from "./back-to-top";
import { DotWordmark } from "./dot-wordmark";
import { FooterColumn, FooterLinkItem } from "./footer-column";
import { SystemStatus } from "./system-status";

type FooterProps = {
  locale: Locale;
  dict: FooterDictionary;
  pages: PagesDictionary;
};

export function Footer({ locale, dict, pages }: FooterProps) {
  const toPageLinks = (links: PageLink[]): FooterLinkItem[] =>
    links.map(({ key, slug }) => ({
      label: pages[key].name,
      href: `/${slug}`,
    }));

  const getStartedLinks: FooterLinkItem[] = [
    { label: dict.links.bookDemo, href: DEMO_HREF },
    { label: dict.links.exploreDemo, href: DEMO_URL, newTab: true },
    { label: dict.links.signIn, href: SIGN_IN_URL },
  ];

  return (
    <footer
      data-top-bar="dark"
      className="overflow-hidden bg-inverse text-inverse-foreground"
    >
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex max-w-sm flex-col items-start gap-6 lg:col-span-4">
            <Link
              href="/"
              lang={locale}
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-inverse"
            >
              <ParkwizeLogo
                title={dict.logoAlt}
                className="w-36 text-inverse-foreground"
              />
            </Link>
            <p className="text-pretty text-sm leading-relaxed text-inverse-muted">
              {dict.tagline}
            </p>
            <SystemStatus label={dict.status} />
          </div>

          <nav
            aria-label={dict.navLabel}
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:pl-10"
          >
            <FooterColumn
              title={dict.columns.products}
              links={toPageLinks(PRODUCT_LINKS)}
              locale={locale}
              className="col-span-2 sm:col-span-1"
              listClassName="min-[420px]:grid-cols-2 min-[420px]:gap-x-6 sm:grid-cols-1"
            />
            <FooterColumn
              title={dict.columns.getStarted}
              links={getStartedLinks}
              locale={locale}
            />
            <FooterColumn
              title={dict.columns.legal}
              links={toPageLinks(LEGAL_LINKS)}
              locale={locale}
            />
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-inverse-border pt-6 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-inverse-muted">
            © {new Date().getFullYear()} {dict.company} {dict.rights}
          </p>
          <div className="flex items-center justify-between gap-8">
            <p className="eyebrow flex items-center gap-2 text-inverse-muted">
              <span aria-hidden>🍁</span>
              {dict.madeIn}
            </p>
            <BackToTop label={dict.backToTop} />
          </div>
        </div>
      </div>

      <DotWordmark className="mt-10 sm:mt-14" />
    </footer>
  );
}
