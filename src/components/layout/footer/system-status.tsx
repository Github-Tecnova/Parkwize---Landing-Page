/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { SYSTEM_STATUS_URL } from "@/lib/navigation";

type SystemStatusProps = {
  label: string;
};

export function SystemStatus({ label }: SystemStatusProps) {
  return (
    <a
      href={SYSTEM_STATUS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-inverse-border px-3.5 py-1.5 text-inverse-foreground transition-colors hover:border-inverse-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground"
    >
      <span className="relative flex size-2" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-success" />
      </span>
      {label}
    </a>
  );
}
