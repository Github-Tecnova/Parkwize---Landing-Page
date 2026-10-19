/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { PointerSpotlight } from "@/components/motion/pointer-spotlight";
import { Reveal } from "@/components/motion/reveal";
import { ProductIndex } from "@/components/sections/product-index";
import { ButtonLink } from "@/components/ui/button-link";
import { HomeDictionary, ProductCardsDictionary } from "@/content/dictionary";
import { Locale } from "@/lib/i18n";
import { DEMO_HREF, PRODUCT_LINKS } from "@/lib/navigation";
import { PRODUCT_VISUALS } from "@/lib/product-media";
import { OrbitRow } from "./orbit-row";

type HomeEcosystemProps = {
  locale: Locale;
  dict: HomeDictionary["ecosystem"];
  cards: ProductCardsDictionary;
};

export function HomeEcosystem({ locale, dict, cards }: HomeEcosystemProps) {
  const tiles = PRODUCT_LINKS.map(({ key }) => ({
    key,
    media: PRODUCT_VISUALS[key],
    caption: cards[key].name,
  }));

  return (
    <section
      id="ecosystem"
      className="bg-bay-grid bg-surface pb-16 pt-14 sm:pb-20 sm:pt-20"
    >
      <PointerSpotlight />
      <OrbitRow
        tiles={tiles}
        className="h-[22rem] sm:h-[clamp(32.5rem,62vw,45rem)]"
      >
        <Container className="relative z-[2]">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow={dict.eyebrow}
              title={dict.title}
              lead={dict.lead}
            />
          </Reveal>
        </Container>
      </OrbitRow>

      <Container className="relative z-[1] mt-6 sm:mt-10">
        <Reveal>
          <ProductIndex locale={locale} label={dict.indexLabel} items={cards} />
        </Reveal>
        <div className="mt-11 flex justify-center">
          <ButtonLink href={DEMO_HREF} locale={locale} withArrow>
            {dict.cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
