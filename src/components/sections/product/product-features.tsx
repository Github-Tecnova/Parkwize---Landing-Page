/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Media } from "@/lib/media";

type ProductFeaturesProps = {
  dict: {
    eyebrow: string;
    title: string;
    mediaAlt: string;
    mediaCaption: string;
    items: { title: string; body: string }[];
  };
  media: Media;
};

export function ProductFeatures({ dict, media }: ProductFeaturesProps) {
  return (
    <section className="bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeader eyebrow={dict.eyebrow} title={dict.title} />
        <div className="mt-10 grid items-start gap-9 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <figure className="lg:sticky lg:top-[calc(var(--top-bar-offset)+2rem)]">
            <Image
              src={media.src}
              width={media.width}
              height={media.height}
              alt={dict.mediaAlt}
              sizes="(min-width: 1024px) 460px, 92vw"
              className="aspect-[16/10] w-full rounded-2xl object-cover saturate-[0.85] lg:aspect-[4/5]"
            />
            <figcaption className="kicker mt-3.5 tracking-[0.14em] text-muted-foreground">
              {dict.mediaCaption}
            </figcaption>
          </figure>
          <ul className="border-t border-hairline">
            {dict.items.map((item) => (
              <li key={item.title}>
                <Reveal className="border-b border-hairline px-1.5 py-7 transition-transform duration-300 hover:translate-x-1.5 sm:py-[1.875rem]">
                  <h3 className="flex items-center gap-3.5 font-display text-[1.375rem] font-bold tracking-[-0.01em] text-ink">
                    <span aria-hidden className="size-[9px] shrink-0 bg-deck" />
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
