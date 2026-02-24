/*
 * Copyright (c) 2025-2026. Tecnova
 */

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/hooks/theme-provider";
import TranslationProvider from "@/hooks/translation-hook";
import { getDictionary } from "@/content/dictionary";
import { Suspense } from "react";
import { FontsProvider } from "@/components/providers/fonts-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ] as const,
});

export const metadata: Metadata = {
  title: "Parkwize",
  description: "Parkwize developed by Tecnova",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dict = await getDictionary("en");

  return (
    <TooltipProvider>
      <FontsProvider inter={inter.className} poppins={poppins.className}>
        <html lang="en" className={"scroll-smooth"} suppressHydrationWarning>
          <body
            className={`${inter.className} max-h-screen min-h-screen antialiased`}
          >
            <TranslationProvider initialDict={dict}>
              <ThemeProvider
                storageKey={"parkwize-theme"}
                attribute={"class"}
                defaultTheme={"light"}
                enableSystem={false}
                disableTransitionOnChange
              >
                {/*
                    <Script
                      src={"https://unpkg.com/react-scan/dist/auto.global.js"}
                      strategy={"beforeInteractive"}
                    />
                  */}
                <Suspense>
                  {children}
                  <Toaster />
                </Suspense>
              </ThemeProvider>
            </TranslationProvider>
          </body>
        </html>
      </FontsProvider>
    </TooltipProvider>
  );
}
