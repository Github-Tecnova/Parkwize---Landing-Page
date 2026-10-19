/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/navigation/link";
import { Locale } from "@/lib/i18n";
import { PRODUCT_LINKS, ProductKey } from "@/lib/navigation";
import { PRODUCT_VISUALS } from "@/lib/product-media";
import { cn } from "@/lib/utils";

type ProductIndexItems = Record<ProductKey, { name: string; blurb: string }>;

type ProductIndexProps = {
  locale: Locale;
  label: string;
  items: ProductIndexItems;
  exclude?: ProductKey;
};

export function ProductIndex({
  locale,
  label,
  items,
  exclude,
}: ProductIndexProps) {
  const products = PRODUCT_LINKS.filter(({ key }) => key !== exclude);

  return (
    <nav aria-label={label}>
      <ul className="grid border-t border-hairline md:grid-cols-2">
        {products.map(({ key, slug }, index) => {
          const visual = PRODUCT_VISUALS[key];
          const lastAlone =
            products.length % 2 === 1 && index === products.length - 1;

          return (
            <li
              key={key}
              className={cn(
                "border-b border-hairline",
                index % 2 === 0 && !lastAlone && "md:border-r",
                lastAlone && "md:col-span-2",
              )}
            >
              <Link
                href={`/${slug}`}
                lang={locale}
                className="group grid h-full grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-3 px-1 py-4 transition-colors hover:bg-deck-tint focus-visible:bg-deck-tint focus-visible:outline-none sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:gap-[1.125rem] sm:px-3.5 sm:py-5"
              >
                <span className="relative h-[2.875rem] w-16 sm:h-[3.625rem] sm:w-[5.5rem]">
                  <Image
                    src={visual.src}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.08]"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1.0625rem] font-bold text-ink">
                    {items[key].name}
                  </span>
                  <span className="mt-0.5 block text-pretty text-[0.8125rem] leading-normal text-muted-foreground">
                    {items[key].blurb}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-5 text-deck-bright transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
