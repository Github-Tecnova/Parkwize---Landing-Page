/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Link } from "@/components/navigation/link";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type FooterLinkItem = {
  label: string;
  href: string;
  newTab?: boolean;
};

type FooterColumnProps = {
  title: string;
  links: FooterLinkItem[];
  locale: Locale;
  className?: string;
  listClassName?: string;
};

const LINK_CLASS_NAME =
  "rounded-sm text-sm text-inverse-foreground transition-colors hover:text-inverse-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-inverse";

export function FooterColumn({
  title,
  links,
  locale,
  className,
  listClassName,
}: FooterColumnProps) {
  return (
    <div className={className}>
      <h2 className="eyebrow text-inverse-muted">{title}</h2>
      <ul className={cn("mt-5 grid gap-3", listClassName)}>
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink link={link} locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({
  link,
  locale,
}: {
  link: FooterLinkItem;
  locale: Locale;
}) {
  if (link.href.startsWith("http")) {
    return (
      <a
        href={link.href}
        className={LINK_CLASS_NAME}
        {...(link.newTab && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} lang={locale} className={LINK_CLASS_NAME}>
      {link.label}
    </Link>
  );
}
