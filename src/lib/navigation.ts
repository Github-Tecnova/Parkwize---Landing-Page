/*
 * Copyright (c) 2025-2026. Tecnova
 */

import {
  CalendarCheck,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  LucideIcon,
  MessageSquare,
  MonitorPlay,
  Presentation,
  ShieldCheck,
  Sparkles,
  Ticket,
  UserLock,
} from "lucide-react";

export const SIGN_IN_URL = "https://app.parkwize.ai/";

export const DEMO_URL = "https://demo.parkwize.ai/app/dashboard";

export const SYSTEM_STATUS_URL = "https://status.parkwizeinc.com";

export const DEMO_HREF = "/demo";

export const CONTACT_HREF = "/contact";

export type ProductKey =
  | "dashboardManager"
  | "parkwizeAi"
  | "digitalSignage"
  | "onlineReservation"
  | "enforcement"
  | "processKiosk"
  | "parkAid";

export type LegalKey = "privacyPolicy" | "termsOfUse";

export type CompanyKey = "demo" | "contact";

export type PageKey = ProductKey | LegalKey | CompanyKey;

export type PageLink<Key extends PageKey = PageKey> = {
  key: Key;
  slug: string;
  Icon: LucideIcon;
};

export const PRODUCT_LINKS: PageLink<ProductKey>[] = [
  { key: "dashboardManager", slug: "dashboard-manager", Icon: LayoutDashboard },
  { key: "parkwizeAi", slug: "parkwize-ai", Icon: Sparkles },
  { key: "digitalSignage", slug: "digital-signage", Icon: MonitorPlay },
  { key: "onlineReservation", slug: "online-reservation", Icon: CalendarCheck },
  { key: "enforcement", slug: "enforcement", Icon: ShieldCheck },
  { key: "processKiosk", slug: "process-kiosk", Icon: Ticket },
  { key: "parkAid", slug: "parkaid", Icon: LifeBuoy },
];

export const LEGAL_LINKS: PageLink<LegalKey>[] = [
  { key: "privacyPolicy", slug: "privacy-policy", Icon: UserLock },
  { key: "termsOfUse", slug: "terms-of-use", Icon: FileText },
];

export const COMPANY_LINKS: PageLink<CompanyKey>[] = [
  { key: "demo", slug: "demo", Icon: Presentation },
  { key: "contact", slug: "contact", Icon: MessageSquare },
];

export const COMING_SOON_LINKS: PageLink[] = [...LEGAL_LINKS];

export function findComingSoonPage(slug: string): PageLink | undefined {
  return COMING_SOON_LINKS.find((page) => page.slug === slug);
}
