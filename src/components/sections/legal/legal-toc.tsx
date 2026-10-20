/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { LegalSection } from "@/content/dictionary";

type LegalTocProps = {
  sections: LegalSection[];
};

export function LegalToc({ sections }: LegalTocProps) {
  return (
    <ol className="flex flex-col">
      {sections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex min-h-11 items-baseline gap-3 rounded-md py-2 text-sm leading-snug text-copy transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:min-h-0 lg:py-1.5"
          >
            <span className="eyebrow shrink-0 text-deck">
              {String(index + 1).padStart(2, "0")}
            </span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
