/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { ReactNode } from "react";

type DeviceFrameProps = {
  label: string;
  children: ReactNode;
};

export function DeviceFrame({ label, children }: DeviceFrameProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="mx-auto w-full max-w-[18.5rem] rounded-[2.75rem] bg-black p-2.5 shadow-card-deep"
    >
      <div className="relative flex h-[34rem] flex-col overflow-hidden rounded-[2.25rem] bg-surface">
        <span
          aria-hidden
          className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black"
        />
        {children}
      </div>
    </div>
  );
}
