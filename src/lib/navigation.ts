/*
 * Copyright (c) 2025-2026. Tecnova
 */

import {
  CalendarCheck,
  LayoutDashboard,
  LifeBuoy,
  LucideIcon,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
  Ticket,
} from "lucide-react";

export const SIGN_IN_URL = "https://app.parkwize.ai/";

export type ProductKey =
  | "dashboardManager"
  | "parkwizeAi"
  | "digitalSignage"
  | "onlineReservation"
  | "enforcement"
  | "processKiosk"
  | "parkAid";

export type ProductLink = {
  key: ProductKey;
  slug: string;
  Icon: LucideIcon;
};

export const PRODUCT_LINKS: ProductLink[] = [
  { key: "dashboardManager", slug: "dashboard-manager", Icon: LayoutDashboard },
  { key: "parkwizeAi", slug: "parkwize-ai", Icon: Sparkles },
  { key: "digitalSignage", slug: "digital-signage", Icon: MonitorPlay },
  { key: "onlineReservation", slug: "online-reservation", Icon: CalendarCheck },
  { key: "enforcement", slug: "enforcement", Icon: ShieldCheck },
  { key: "processKiosk", slug: "process-kiosk", Icon: Ticket },
  { key: "parkAid", slug: "parkaid", Icon: LifeBuoy },
];

export function findProductBySlug(slug: string): ProductLink | undefined {
  return PRODUCT_LINKS.find((product) => product.slug === slug);
}
