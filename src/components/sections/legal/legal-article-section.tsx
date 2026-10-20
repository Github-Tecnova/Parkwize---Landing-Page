/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { LegalSection } from "@/content/dictionary";

type LegalArticleSectionProps = {
  section: LegalSection;
  index: number;
};

export function LegalArticleSection({
  section,
  index,
}: LegalArticleSectionProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-t border-hairline py-8 first:border-t-0 first:pt-0 sm:py-10"
    >
      <h2
        id={`${section.id}-title`}
        className="flex items-baseline gap-3 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        <span className="eyebrow text-deck">
          {String(index).padStart(2, "0")}
        </span>
        {section.title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-pretty text-[0.9375rem] leading-relaxed text-copy sm:text-base">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.items.length > 0 && (
          <ul className="flex flex-col gap-2.5">
            {section.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[0.7em] h-px w-3 shrink-0 bg-deck"
                />
                {item}
              </li>
            ))}
          </ul>
        )}
        {section.note && <p>{section.note}</p>}
      </div>
    </section>
  );
}
