/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ParkwizeLogo } from "@/components/brand/parkwize-logo";
import { buttonVariants } from "@/components/ui/button";
import { Locale } from "@/lib/i18n";

type NotFoundMessage = {
  locale: Locale;
  title: string;
  body: string;
  backHome: string;
};

type NotFoundPanelProps = {
  messages: NotFoundMessage[];
};

export function NotFoundPanel({ messages }: NotFoundPanelProps) {
  return (
    <main className="bg-dot-grid flex min-h-svh flex-col items-center justify-center gap-10 px-4 py-16 text-center">
      <ParkwizeLogo title="Parkwize" className="w-36" />
      <p className="font-display text-[clamp(4rem,12vw,7rem)] font-bold leading-none text-deck">
        404
      </p>
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
        {messages.map((message) => (
          <section key={message.locale} lang={message.locale}>
            <h1 className="font-display text-2xl font-semibold text-ink">
              {message.title}
            </h1>
            <p className="mx-auto mt-2 max-w-xs text-sm text-copy">
              {message.body}
            </p>
            <a
              href={`/${message.locale}`}
              className={buttonVariants({
                variant: "brand",
                size: "pill",
                className: "mt-5",
              })}
            >
              {message.backHome}
            </a>
          </section>
        ))}
      </div>
    </main>
  );
}
