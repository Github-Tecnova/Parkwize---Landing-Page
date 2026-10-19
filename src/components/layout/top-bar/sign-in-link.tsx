/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { buttonVariants } from "@/components/ui/button";
import { SIGN_IN_URL } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SignInLinkProps = {
  label: string;
  variant?: "brand" | "soft" | "subtle";
  className?: string;
};

export function SignInLink({
  label,
  variant = "brand",
  className,
}: SignInLinkProps) {
  return (
    <a
      href={SIGN_IN_URL}
      className={cn(buttonVariants({ variant, size: "pill" }), className)}
    >
      {label}
    </a>
  );
}
