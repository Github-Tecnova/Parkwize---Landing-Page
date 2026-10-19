/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { HomeDictionary } from "@/content/dictionary";
import { Media, MEDIA } from "@/lib/media";

type SectorStripProps = {
  dict: HomeDictionary["sectors"];
};

type SectorKey = keyof HomeDictionary["sectors"]["items"];

const SECTORS: { key: SectorKey; media: Media }[] = [
  { key: "airports", media: MEDIA.sectors.airports },
  { key: "tenant", media: MEDIA.sectors.tenant },
  { key: "retail", media: MEDIA.sectors.retail },
  { key: "residential", media: MEDIA.sectors.residential },
];

export function SectorStrip({ dict }: SectorStripProps) {
  return (
    <div className="mt-[clamp(4rem,8vw,6.25rem)]">
      <p className="kicker flex items-center gap-3 text-deck">
        <span aria-hidden className="h-px w-8 bg-hairline" />
        {dict.eyebrow}
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-[1.125rem] lg:grid-cols-4">
        {SECTORS.map(({ key, media }, index) => {
          const sector = dict.items[key];

          return (
            <li key={key}>
              <Reveal delay={index * 0.07} className="h-full">
                <article className="glass-pill group flex h-full items-center gap-3.5 rounded-full py-1.5 pl-1.5 pr-5 transition-all duration-300 hover:-translate-y-[3px]">
                  <span className="relative size-[4.875rem] shrink-0 overflow-hidden rounded-full border-2 border-surface shadow-sm">
                    <Image
                      src={media.src}
                      alt={sector.imageAlt}
                      fill
                      sizes="78px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-sm font-bold leading-tight text-ink">
                      {sector.title}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                      {sector.body}
                    </span>
                  </span>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
