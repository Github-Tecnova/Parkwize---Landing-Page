/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ReactNode } from "react";

export function FormGroup({
  legend,
  children,
}: {
  legend: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="mt-7 border-t border-hairline pt-5">
      <legend className="kicker float-left mb-4 w-full tracking-[0.14em] text-deck">
        {legend}
      </legend>
      <div className="clear-left">{children}</div>
    </fieldset>
  );
}
