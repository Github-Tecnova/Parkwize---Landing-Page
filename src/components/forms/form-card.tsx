/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ReactNode } from "react";

export function FormCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-3xl border border-hairline bg-surface p-5 shadow-card-deep sm:p-8">
      {children}
    </div>
  );
}
