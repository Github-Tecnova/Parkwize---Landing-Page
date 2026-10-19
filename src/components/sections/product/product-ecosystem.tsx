/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ProductIndex } from "@/components/sections/product-index";
import { ProductCardsDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { ProductKey } from "@/lib/navigation";

type ProductEcosystemProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  label: string;
  cards: ProductCardsDictionary;
  exclude?: ProductKey;
};

export function ProductEcosystem({
  locale,
  eyebrow,
  title,
  label,
  cards,
  exclude,
}: ProductEcosystemProps) {
  return (
    <section className="bg-bay-grid bg-surface py-14 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>
        <Reveal className="mt-10">
          <ProductIndex
            locale={locale}
            label={label}
            items={cards}
            exclude={exclude}
          />
        </Reveal>
      </Container>
    </section>
  );
}
