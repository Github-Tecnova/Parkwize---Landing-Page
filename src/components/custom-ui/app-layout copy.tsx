/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ParkingSelector from "@/components/custom-ui/parking-selector";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LucideIcon, LucideInfo, LucideSearch } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import OrgNavButton from "@/components/super-admin/nav/org-nav-button";
import Link from "next/link";
import DashboardSelector from "@/components/custom-ui/dashboard-selector";
import CustomRangePicker from "@/components/custom-ui/custom-range-picker";
import { subMonths } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/translation-hook";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDashboard } from "@/components/providers/dashboard-provider";

type AppLayoutProps = {
  children?: React.ReactNode;
  className?: string;
};

export function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <div className={cn("flex w-full flex-grow flex-col gap-y-5", className)}>
      {children}
    </div>
  );
}

type PageType = {
  tag: string;
  main?: boolean;
};

type AppLayoutHeaderProps = AppLayoutProps & {
  rangePicker?: boolean;
  dashboardSelector?: boolean;
  parkingSelector?: boolean;
  selectors?: boolean;
  pageTitle?: string;
  mainUrl?: string;
  currentPageName?: string;
  Icon?: LucideIcon;
  pages?: PageType[];
  rootUrl?: string;
  translation?: boolean;
  custom?: React.ReactNode;
};

export function AppLayoutHeader({
  children,
  rangePicker,
  selectors = true,
  dashboardSelector,
  parkingSelector = true,
  pageTitle,
  currentPageName,
  pages,
  Icon,
  mainUrl,
  rootUrl,
  className,
  translation = false,
  custom,
}: AppLayoutHeaderProps) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const { lang, setLang } = useTranslation();
  const { updateDates } = useDashboard();

  const travel = (page: string) => {
    router.push(
      (pathname.startsWith("/demo") ? "/demo" : "/app") +
        `/${rootUrl}?page=${page}`,
    );
  };

  return (
    <motion.div
      className={cn(
        "mx-auto flex w-full max-w-screen-2xl flex-col justify-between space-y-2 transition-all duration-200 lg:flex-row lg:items-center lg:space-y-0",
        className,
      )}
    >
      <div className={cn("w-full space-y-5")}>
        <div
          className={
            "flex flex-col justify-between gap-5 lg:flex-row lg:items-center"
          }
        >
          <Breadcrumb>
            <BreadcrumbList className={"items-center"}>
              <BreadcrumbPage className={"flex items-center gap-x-2"}>
                <div className={"rounded-full bg-[#5486fd] p-2"}>
                  {Icon && <Icon className={"min-h-7 min-w-7 text-white"} />}
                </div>
                {mainUrl ? (
                  <Link
                    className={"text-2xl text-primary_action hover:underline"}
                    href={mainUrl}
                  >
                    {pageTitle}
                  </Link>
                ) : (
                  <h1 className={"text-2xl text-primary_action"}>
                    {pageTitle}
                  </h1>
                )}
              </BreadcrumbPage>
              <BreadcrumbSeparator />
              <BreadcrumbPage className={"capitalize text-title-2"}>
                {currentPageName
                  ? currentPageName
                  : params.get("page")
                    ? params.get("page")
                    : "Overview"}
              </BreadcrumbPage>
              {children}
            </BreadcrumbList>
          </Breadcrumb>
          {selectors && (
            <div className={"flex flex-col gap-2 md:flex-row"}>
              {translation && (
                <Button
                  variant={"outline"}
                  className={"h-12 w-12 text-lg uppercase"}
                  onClick={() => {
                    setLang(lang === "en" ? "fr" : "en");
                  }}
                >
                  {lang === "en" ? "fr" : "en"}
                </Button>
              )}
              {dashboardSelector && <DashboardSelector />}
              {parkingSelector && <ParkingSelector />}
              {rangePicker && (
                <CustomRangePicker
                  onChange={(e) =>
                    updateDates(
                      e.from || subMonths(new Date(), 1),
                      e.to || new Date(),
                    )
                  }
                />
              )}
            </div>
          )}
          {custom && <>{custom}</>}
        </div>
        {pages && (
          <div className={"flex flex-wrap gap-1 pb-1"}>
            {pages.map((page) => (
              <OrgNavButton
                key={page.tag}
                selected={
                  page.main
                    ? !params.has("page") ||
                      params.get("page") ===
                        page.tag.replaceAll(" ", "-").toLowerCase()
                    : params.get("page") ===
                      page.tag.replaceAll(" ", "-").toLowerCase()
                }
                travelAction={travel}
                text={page.tag}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

type AppLayoutPageProps = AppLayoutProps & {
  page: string;
  isMain?: boolean;
};

export function AppLayoutPage({
  children,
  page,
  isMain,
  className,
}: AppLayoutPageProps) {
  const params = useSearchParams();

  return params.get("page") === page || (isMain && !params.has("page")) ? (
    <div className={cn("w-full", className)}>{children}</div>
  ) : null;
}

export function AppLayoutTitle({ children, className }: AppLayoutProps) {
  return (
    <h1
      className={cn(
        "text-4xl font-bold uppercase text-primary_action",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function AppLayoutSubTitle({ children, className }: AppLayoutProps) {
  return (
    <p className={cn("text-xl font-bold text-blue-800", className)}>
      {children}
    </p>
  );
}

export function AppLayoutContent({ children, className }: AppLayoutProps) {
  return (
    <div className={cn("mx-auto w-full max-w-screen-2xl flex-grow", className)}>
      {children}
    </div>
  );
}

interface AppStatCardProps extends AppLayoutProps {
  title?: string;
  id?: string;
}

export function AppCard({ children, className, id }: AppStatCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col gap-y-2 rounded-md bg-card shadow shadow-stone-500/15 dark:border dark:shadow-none",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function AppCardHeader({ children, className }: AppStatCardProps) {
  return <div className={cn("px-5 pt-5", className)}>{children}</div>;
}

export function AppCardTitle({ children, className }: AppStatCardProps) {
  return (
    <motion.h3
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      className={cn("text-base font-medium text-title-2", className)}
    >
      {children}
    </motion.h3>
  );
}

export function AppCardDescription({ children, className }: AppStatCardProps) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      className={cn("text-base text-muted-foreground", className)}
    >
      {children}
    </motion.p>
  );
}

export function AppCardContent({ children, className }: AppLayoutProps) {
  return <div className={cn("px-5 pb-5", className)}>{children}</div>;
}

export function AppCardValue({ children, className }: AppStatCardProps) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("text-xl font-semibold text-title-2", className)}
    >
      {children}
    </motion.p>
  );
}

export function AppCardFooter({ children, className }: AppLayoutProps) {
  return (
    <div className={cn("flex flex-row gap-x-2", className)}>{children}</div>
  );
}

type ValuesType = {
  title: string;
  value: number;
};

export function AppCardDashboard({
  title,
  tooltip,
  value,
  valueType,
  loading = false,
  values,
}: {
  title: string;
  tooltip?: string;
  value?: number | string;
  valueType?: "currency" | "number";
  loading?: boolean;
  values?: ValuesType[];
}) {
  const [selectedValues, setSelectedValues] = useState<string[]>(["Kiosks"]);
  const [formattedVal, setFormattedVal] = useState<string>();

  useEffect(() => {
    setFormattedVal(
      typeof value === "number"
        ? valueType === "currency"
          ? new Intl.NumberFormat("fr-CA", {
              style: "currency",
              currency: "CAD",
            }).format(value)
          : value.toLocaleString("fr-CA")
        : value || "0",
    );
  }, [value, valueType]);

  useEffect(() => {
    if (values) {
      const total = selectedValues.reduce(
        (acc, curr) => acc + (values.find((v) => v.title === curr)?.value || 0),
        0,
      );
      setFormattedVal(
        valueType === "currency"
          ? new Intl.NumberFormat("fr-CA", {
              style: "currency",
              currency: "CAD",
            }).format(total)
          : total.toLocaleString("fr-CA"),
      );
    }
  }, [selectedValues, valueType, values]);

  return (
    <AppCard
      className={
        "backdrop-blur-xs justify-between rounded-xl border border-white/40 bg-transparent bg-gradient-to-br from-white/50 to-white/10 shadow-lg backdrop-saturate-150"
      }
    >
      <AppCardHeader>
        <div className={"flex items-center justify-between"}>
          <div className={"flex items-center gap-x-2"}>
            <AppCardTitle>{title}</AppCardTitle>
            {values && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={"!h-7 !w-7"}>
                    <LucideSearch />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side={"right"} className={"w-fit"}>
                  <ToggleGroup
                    type={"multiple"}
                    className={"w-fit"}
                    value={selectedValues}
                    onValueChange={(e) => setSelectedValues(e)}
                  >
                    {values.map((e) => (
                      <ToggleGroupItem
                        key={e.title}
                        value={e.title}
                        className={"h-7 text-xs"}
                      >
                        {e.title}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </PopoverContent>
              </Popover>
            )}
          </div>
          {tooltip && (
            <Tooltip delayDuration={0.1}>
              <TooltipTrigger>
                <LucideInfo className={"h-4 w-4 text-title"} />
              </TooltipTrigger>
              <TooltipContent>
                <p className={"text-sm"}>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </AppCardHeader>
      <AppCardContent className={"flex w-full flex-1 items-end"}>
        {loading ? (
          <Skeleton className={"min-h-8 w-full"} />
        ) : (
          <AppCardValue>{formattedVal}</AppCardValue>
        )}
      </AppCardContent>
    </AppCard>
  );
}
