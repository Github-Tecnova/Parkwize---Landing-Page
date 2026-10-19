/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { LucideIcon } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { SignInLink } from "@/components/layout/top-bar/sign-in-link";
import { buttonVariants } from "@/components/ui/button";
import { ComingSoonDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";

type ComingSoonProps = {
  locale: Locale;
  title: string;
  Icon: LucideIcon;
  dict: ComingSoonDictionary;
  signInLabel: string;
};

export function ComingSoon({
  locale,
  title,
  Icon,
  dict,
  signInLabel,
}: ComingSoonProps) {
  return (
    <section className="flex min-h-[calc(100svh-var(--top-bar-offset))] items-center px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand sm:size-16">
          <Icon className="size-7 sm:size-8" strokeWidth={1.75} />
        </span>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-brand sm:text-sm">
          {dict.eyebrow}
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-prose text-pretty text-base text-muted-foreground sm:text-lg">
          {dict.description}
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            lang={locale}
            className={buttonVariants({
              variant: "subtle",
              size: "pill",
            })}
          >
            {dict.backHome}
          </Link>
          <SignInLink label={signInLabel} />
        </div>
      </div>
    </section>
  );
}
