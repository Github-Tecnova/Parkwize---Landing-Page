/*
 * Copyright (c) 2025-2026. Tecnova
 */

import React from "react";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/nav/home-navbar";
import WebsiteEntryAnimation from "@/components/custom-ui/website-entry-animation";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const cookStore = await cookies();

  if (process.env.NODE_ENV === "development") {
    return (
      <div className={"relative min-h-screen bg-[#ffffff]"}>
        <Navbar />
        {children}
        {/*!cookStore.has("website-entry-animation-done") && (
          <WebsiteEntryAnimation />
        )*/}
      </div>
    );
  } else {
    return (
      <div className={"relative min-h-screen bg-[#ffffff]"}>
        <Navbar />
        {process.env.ENVIRONMENT === "staging" ? (
          children
        ) : (
          <div>
            <Link href={"/sign-in"}>Sign In</Link>
          </div>
        )}
        <WebsiteEntryAnimation />
      </div>
    );
  }
}
