/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormSuccessProps = {
  title: string;
  body: string;
  again: string;
  onAgain: () => void;
};

export function FormSuccess({ title, body, again, onAgain }: FormSuccessProps) {
  return (
    <div
      ref={revealMessage}
      role="status"
      tabIndex={-1}
      className="flex flex-col items-start gap-4 py-6 focus:outline-none"
    >
      <span className="badge-positive flex size-12 items-center justify-center rounded-full">
        <CircleCheck aria-hidden className="size-6" />
      </span>
      <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
      <p className="text-[0.9375rem] leading-relaxed text-copy">{body}</p>
      <Button type="button" variant="subtle" size="pill" onClick={onAgain}>
        {again}
      </Button>
    </div>
  );
}

function revealMessage(node: HTMLDivElement | null) {
  if (!node) return;
  node.focus({ preventScroll: true });
  node.scrollIntoView({ block: "center" });
}
