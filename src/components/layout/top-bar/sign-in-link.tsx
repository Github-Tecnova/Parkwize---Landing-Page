/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { buttonVariants } from "@/components/ui/button";
import { SIGN_IN_URL } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SignInLinkProps = {
  label: string;
  className?: string;
};

export function SignInLink({ label, className }: SignInLinkProps) {
  return (
    <a
      href={SIGN_IN_URL}
      className={cn(
        buttonVariants({ variant: "brand", size: "pill" }),
        className,
      )}
    >
      {label}
    </a>
  );
}
