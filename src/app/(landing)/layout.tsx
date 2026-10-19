/*
 * Copyright (c) 2025-2026. Tecnova
 */

import React from "react";
import WebsiteEntryAnimation from "@/components/custom-ui/website-entry-animation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"relative min-h-screen bg-[#ffffff]"}>
      {children}
      <WebsiteEntryAnimation />
    </div>
  );
}
