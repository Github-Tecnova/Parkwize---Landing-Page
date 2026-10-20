/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SPRING_SMOOTH } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type LegalTocEntry = {
  id: string;
  title: string;
};

type LegalTocProps = {
  entries: LegalTocEntry[];
  withRail?: boolean;
};

const ACTIVE_BAND = "-25% 0px -65% 0px";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (records) => {
        records.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) visible.add(target.id);
          else visible.delete(target.id);
        });
        const current = ids.find((id) => visible.has(id));
        if (current) setActive(current);
      },
      { rootMargin: ACTIVE_BAND },
    );

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function LegalToc({ entries, withRail = false }: LegalTocProps) {
  const [ids] = useState(() => entries.map((entry) => entry.id));
  const active = useActiveSection(ids);
  const progress = (ids.indexOf(active) + 1) / ids.length;

  return (
    <div className="relative">
      {withRail && (
        <span
          aria-hidden
          className="absolute inset-y-1 left-0 w-px bg-hairline"
        >
          <motion.span
            className="absolute inset-0 origin-top bg-deck"
            initial={false}
            animate={{ scaleY: progress }}
            transition={SPRING_SMOOTH}
          />
        </span>
      )}
      <ol className={cn("flex flex-col", withRail && "pl-4")}>
        {entries.map((entry, index) => {
          const current = entry.id === active;

          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={current ? "location" : undefined}
                className="group flex min-h-11 items-baseline gap-3 rounded-md py-2 text-sm leading-snug text-copy transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand aria-[current=location]:text-ink lg:min-h-0 lg:py-1.5"
              >
                <span
                  className={cn(
                    "eyebrow shrink-0 transition-colors",
                    current ? "text-deck" : "text-copy",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={cn(current && "font-medium")}>
                  {entry.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
