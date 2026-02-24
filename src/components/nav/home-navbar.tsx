/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import { LucideChevronDown, LucideMenu, LucideX } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import React, { useState } from "react";
import { useTranslation } from "@/hooks/translation-hook";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const { setLang, lang } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const isHome =
    pathname.endsWith("/fr") || pathname.endsWith("/en") || pathname === "/";

  return (
    <nav className={"relative z-[9998] h-[5rem] w-full"}>
      <div
        className={
          "sticky mx-auto flex h-20 max-h-20 max-w-screen-2xl items-center justify-between gap-x-5 px-5 py-2"
        }
      >
        <div className={"flex items-center gap-x-4"}>
          <Link href={"/"} className={""}>
            <Image
              src={"/parkwize_logo_tr.png"}
              alt={"Parkwize Logo"}
              width={200}
              height={50}
            />
          </Link>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={cn(
              isHome
                ? "text-neutral-600 hover:bg-white hover:text-text"
                : "text-neutral-800 hover:bg-neutral-200 hover:text-black",
              "text-lg font-semibold uppercase",
            )}
            onClick={() => {
              setLang(lang === "fr" ? "en" : "fr");
              router.push(
                (lang === "fr" ? "/en" : "/fr") +
                  pathname.replace("/fr", "").replace("/en", ""),
              );
            }}
          >
            {lang === "fr" ? "en" : "fr"}
          </Button>
        </div>
        <Button
          variant={"ghost"}
          onClick={() => setMenuOpen(true)}
          className={"h-10 w-10 lg:hidden"}
        >
          <LucideMenu className={"!h-7 !w-7"} />
        </Button>
        <AnimatePresence mode={"sync"}>
          {menuOpen && (
            <motion.div
              className={
                "fixed inset-0 z-[9999] flex h-[100svh] w-full items-center justify-center bg-black/90"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.2 } }}
            >
              <div className={"flex h-[50%] w-[70%] flex-col gap-y-2"}>
                <div
                  className={"mb-10 flex w-full items-center justify-between"}
                >
                  <Image
                    src={"/parkwize_logo_tr.png"}
                    alt={"Parkwize Logo"}
                    width={200}
                    height={50}
                  />
                  <Button
                    variant={"ghost"}
                    className={
                      "h-9 w-9 text-white hover:bg-neutral-700 hover:text-white"
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <LucideX className={"!h-6 !w-6"} />
                  </Button>
                </div>

                <AnimatePresence mode={"sync"}>
                  {menuOpen && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                      exit={{ y: 20, opacity: 0 }}
                    >
                      <Link href={""} className={"text-2xl text-white"}>
                        Our Work
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence mode={"sync"}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
                    exit={{ y: 20, opacity: 0 }}
                  >
                    <Link href={""} className={"text-2xl text-white"}>
                      How it Works
                    </Link>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode={"sync"}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
                    exit={{ y: 20, opacity: 0 }}
                  >
                    <Link href={""} className={"text-2xl text-white"}>
                      FAQ
                    </Link>
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.4 }}
                  className={"mt-4 flex items-center gap-x-2"}
                >
                  <Link
                    href={"/sign-in"}
                    className={cn(buttonVariants({ variant: "primary" }))}
                  >
                    Sign in
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={"hidden items-center gap-x-12 lg:flex"}>
          <Link
            href={"/#work"}
            className={cn(
              isHome
                ? "text-neutral-600 hover:text-text"
                : "text-neutral-800 hover:text-black",
              "flex items-center gap-x-1 text-sm font-light",
            )}
          >
            {lang === "fr" ? "Produits" : "Products"}
            <LucideChevronDown className={"!size-4"} />
          </Link>
          <Link
            href={"/#work"}
            className={cn(
              isHome
                ? "text-neutral-600 hover:text-text"
                : "text-neutral-800 hover:text-black",
              "text-sm font-light",
            )}
          >
            {lang === "fr" ? "Notre travail" : "Docs"}
          </Link>
          {/*<Link*/}
          {/*  href={"/#how-it-works"}*/}
          {/*  className={cn(*/}
          {/*    isHome*/}
          {/*      ? "text-neutral-600 hover:text-text"*/}
          {/*      : "text-neutral-800 hover:text-black",*/}
          {/*    "text-base font-light",*/}
          {/*  )}*/}
          {/*>*/}
          {/*  {lang === "fr" ? "Comment ça fonctionne" : "How it works"}*/}
          {/*</Link>*/}
          {/*<Link*/}
          {/*  href={"/#case-study"}*/}
          {/*  className={cn(*/}
          {/*    isHome*/}
          {/*      ? "text-neutral-600 hover:text-text"*/}
          {/*      : "text-neutral-800 hover:text-black",*/}
          {/*    "text-base font-light",*/}
          {/*  )}*/}
          {/*>*/}
          {/*  {lang === "fr" ? "Étude de cas" : "Case Study"}*/}
          {/*</Link>*/}
          {/*<Link*/}
          {/*  href={"/#faq"}*/}
          {/*  className={cn(*/}
          {/*    isHome*/}
          {/*      ? "text-neutral-600 hover:text-text"*/}
          {/*      : "text-neutral-800 hover:text-black",*/}
          {/*    "text-base font-light",*/}
          {/*  )}*/}
          {/*>*/}
          {/*  {lang === "fr" ? "FAQ" : "FAQ"}*/}
          {/*</Link>*/}
          <div className={"flex items-center gap-x-4"}>
            <Link
              href={"/sign-in"}
              className={cn(
                buttonVariants({
                  variant: "primary",
                  className:
                    "h-10 rounded-none border-2 border-parkwize_blue bg-transparent px-8 text-parkwize_blue !shadow-none hover:bg-parkwize_blue hover:text-white",
                }),
              )}
            >
              {lang === "fr" ? "Se connecter" : "Sign-in"}
            </Link>
            <Link
              href={"https://demo.parkwizeinc.ai"}
              className={cn(
                buttonVariants({
                  variant: "primary",
                  className:
                    "h-10 rounded-none bg-parkwize_blue px-8 hover:bg-blue-700",
                }),
              )}
            >
              {lang === "fr" ? "Se connecter" : "Demo"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
