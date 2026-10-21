/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Inbox } from "lucide-react";
import { Container } from "@/components/layout/section/container";
import { SectionHeader } from "@/components/layout/section/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ModeSplit } from "@/components/sections/mode-split";
import { ParkAidDictionary } from "@/content/dictionary";

type ParkAidTeamsProps = {
  dict: ParkAidDictionary["teams"];
};

export function ParkAidTeams({ dict }: ParkAidTeamsProps) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow={dict.eyebrow}
          title={dict.title}
          lead={dict.lead}
          className="max-w-[54rem]"
        />
        <Reveal className="mt-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-deck-tint px-4 py-2 text-sm font-bold text-deck">
            <Inbox aria-hidden className="size-4" />
            {dict.queue}
          </p>
        </Reveal>
        <ModeSplit modes={dict.modes} className="mt-8" />
      </Container>
    </section>
  );
}
