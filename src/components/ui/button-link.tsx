/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import Link from "@/components/custom-ui/link";
import { buttonVariants } from "@/components/ui/button";
import { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ButtonLinkProps = VariantProps<typeof buttonVariants> & {
  href: string;
  locale: Locale;
  children: ReactNode;
  withArrow?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  locale,
  children,
  variant = "brand",
  size = "pill-lg",
  withArrow = false,
  className,
}: ButtonLinkProps) {
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );
  const classes = cn("group", buttonVariants({ variant, size }), className);

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} lang={locale} className={classes}>
      {content}
    </Link>
  );
}
