/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormSubmitProps = {
  message?: string;
  sending: boolean;
  label: string;
  sendingLabel: string;
};

export function FormSubmit({
  message,
  sending,
  label,
  sendingLabel,
}: FormSubmitProps) {
  return (
    <>
      <div aria-live="polite">
        {message && (
          <p className="mt-5 flex items-center gap-2 rounded-xl bg-surface-muted px-4 py-3 text-sm font-semibold text-destructive">
            <CircleAlert aria-hidden className="size-4 shrink-0" />
            {message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        variant="brand"
        size="pill-lg"
        disabled={sending}
        className="mt-6 w-full"
      >
        {sending && <LoaderCircle aria-hidden className="animate-spin" />}
        {sending ? sendingLabel : label}
      </Button>
    </>
  );
}
