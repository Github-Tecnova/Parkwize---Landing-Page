/*
 * Copyright (c) 2025-2026. Tecnova
 */

import Image from "next/image";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ProcessDictionary } from "@/content/dictionary";
import { MEDIA } from "@/lib/media";
import { cn } from "@/lib/utils";

type ProcessCloudProps = {
  dict: ProcessDictionary["cloud"];
};

export function ProcessCloud({ dict }: ProcessCloudProps) {
  const { processPhoneMenu } = MEDIA.product;

  return (
    <section className="bg-surface py-14 sm:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <Reveal className="order-last flex justify-center rounded-3xl bg-deck-tint px-6 pt-10 lg:order-first">
          <Image
            src={processPhoneMenu.src}
            width={processPhoneMenu.width}
            height={processPhoneMenu.height}
            alt={dict.imageAlt}
            sizes="(min-width: 1024px) 240px, 52vw"
            className="h-[26rem] w-auto object-contain object-top drop-shadow-media sm:h-[30rem]"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeader
            eyebrow={dict.eyebrow}
            title={dict.title}
            lead={dict.lead}
          />
          <ul className="mt-6 grid border-t border-hairline sm:grid-cols-2">
            {dict.modules.map((module, index) => (
              <li
                key={module}
                className={cn(
                  "border-b border-hairline py-4 font-bold text-ink",
                  index % 2 === 0 ? "sm:border-r sm:pr-5" : "sm:pl-5",
                )}
              >
                {module}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-2xl bg-surface-muted p-5 text-sm leading-relaxed text-copy">
            <strong className="font-bold text-ink">
              {dict.highlightTitle}
            </strong>{" "}
            {dict.highlightBody}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
