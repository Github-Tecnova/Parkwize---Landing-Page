/*
 * Copyright (c) 2025-2026. Tecnova
 */

import {
  ApiAnalyticsData,
  BreakdownSummary,
  CardTypeDataType,
  DailyTicketSummary,
  HeaderPageType,
  KeysPermissions,
  OrderWithParking,
  OverviewPageType,
  PeriodSiteMetricsHourly,
  PermissionResources,
} from "@/type";
import {
  LucideBarChart4,
  LucideBot,
  LucideCalendar,
  LucideCar,
  LucideGlobe,
  LucideHome,
  LucideIcon,
  LucideParkingMeter,
  LucideRepeat,
  LucideTicket,
  LucideTrendingUpDown,
  LucideTv,
  LucideUsers2,
} from "lucide-react";
import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";

const version = "1";
const subVersion = "25";
const branchVersion = "2";
export const VERSION = `v${version}.${subVersion}.${branchVersion}`;

type DashboardPageType = {
  route: string;
  name: string;
  resource: PermissionResources;
  Icon: LucideIcon;
  disabled?: boolean;
};

export const mobileDashboardPages: DashboardPageType[] = [
  {
    name: "Overview",
    route: "dashboard",
    resource: "overview",
    Icon: LucideHome,
  },
  {
    name: "Parkwize AI",
    route: "parkwize-ai",
    resource: "ai",
    Icon: LucideBot,
  },
  {
    name: "Calendar",
    route: "calendar",
    resource: "parking_Lots",
    Icon: LucideCalendar,
    disabled: true,
  },
  {
    name: "Customers",
    route: "customers",
    resource: "customers",
    Icon: LucideUsers2,
  },
];

export const dashboardPages: DashboardPageType[] = [
  {
    name: "Overview",
    route: "dashboard",
    resource: "overview",
    Icon: LucideHome,
  },
  {
    name: "Parkwize AI",
    route: "parkwize-ai",
    resource: "ai",
    Icon: LucideBot,
  },
  {
    name: "Calendar",
    route: "calendar",
    resource: "parking_Lots",
    Icon: LucideCalendar,
  },
  {
    name: "Parking Lots",
    route: "parking-lots",
    resource: "parking_Lots",
    Icon: LucideParkingMeter,
  },
  {
    name: "Tickets",
    route: "tickets",
    resource: "ticketsView",
    Icon: LucideTicket,
  },
  {
    name: "Online Reservation",
    route: "online-reservation",
    resource: "onlineReservation",
    Icon: LucideGlobe,
  },
  {
    name: "Tickets View",
    route: "tickets",
    resource: "ticketsView",
    Icon: LucideTicket,
    disabled: true,
  },
  {
    name: "Traffic View",
    route: "traffic",
    resource: "trafficView",
    Icon: LucideCar,
  },
  {
    name: "Customers",
    route: "customers",
    resource: "customers",
    Icon: LucideUsers2,
  },
  {
    name: "Reports",
    route: "reports",
    resource: "reports",
    Icon: LucideBarChart4,
    disabled: true,
  },
  {
    name: "Display Management",
    route: "display-management",
    resource: "display_Management",
    Icon: LucideTv,
    disabled: true,
  },
  {
    name: "Automations",
    route: "automations",
    resource: "automations",
    Icon: LucideRepeat,
    disabled: true,
  },
  {
    name: "Dynamic Pricing",
    route: "dynamic-pricing",
    resource: "dynamic_Pricing",
    Icon: LucideTrendingUpDown,
    disabled: true,
  },
];

export const PERMISSIONS = {
  business: {
    update: true,
    delete: true,
  },
  overview: {
    view: true,
  },
  customers: {
    view: true,
  },
  display_Management: {
    view: true,
    update: true,
  },
  dynamic_Pricing: {
    view: true,
    update: true,
  },
  parking_prices: {
    view: true,
    update: true,
  },
  parking_Lots: {
    view: true,
    update: true,
  },
  reports: {
    view: true,
    update: true,
    export: true,
  },
  accounting: {
    view: true,
  },
  team: {
    view: true,
    update: true,
  },
  zones: {
    view: true,
    update: true,
  },
  billing: {
    view: true,
    update: true,
  },
  onlineReservation: {
    view: true,
  },
  forecasting: {
    view: true,
  },
  promotions: {
    update: true,
    view: true,
  },
  ai: {
    view: true,
    use: true,
  },
  automations: {
    view: true,
    update: true,
  },
  ticketsView: {
    view: true,
  },
  trafficView: {
    view: true,
  },
  env: {
    view: true,
    update: true,
  },
  api: {
    view: true,
    genKey: true,
  },
  users: {
    create: true,
    editPassword: true,
    update: true,
    delete: true,
  },
  roles: {
    view: true,
    update: true,
  },
  onlineOrders: {
    view: true,
    update: true,
    delete: true,
  },
  kiosks_configs: {
    view: true,
    update: true,
  },
} as const satisfies KeysPermissions;

export type Preset = {
  label: string;
};

export const presets = (): Preset[] => {
  const today = new Date();
  return [
    {
      label: "Today",
    },
    {
      label: "Last 7 days",
    },
    {
      label: "Last 30 days",
    },
    {
      label: "Last 90 days",
    },
    {
      label: "Last month",
    },
    {
      label: "Year to date",
    },
    {
      label: "Last year",
    },
    {
      label: "All time",
    },
  ];
};

/**
 * DEMO MOCK DATA
 */

export const mockOnlineOrders: OrderWithParking[] = [
  {
    id: "cu100",
    trId: "cu100",
    parkingId: 1,
    status: "PAID",
    created_at: new Date(),
    business_id: "cu100",
    serviceId: 1,
    paid_at: new Date(),
    cardType: "M",
    endDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
    monerisTicket: "",
    customer_id: "cu100",
    quantity: 1,
    parking_price: 21,
    ticket_number: "123456",
    total_price: "$21.00",
    couponId: null,
  },
];

/**
 * Generates a pseudo-random number based on a seed (deterministic)
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Gets a date seed for consistent random generation
 */
function getDateSeed(date: Date): number {
  return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
}

export const mockCardTypes: CardTypeDataType = {
  mastercard: 602,
  visa: 1590,
  american_express: 230,
  interac: 210,
};

export const mockBreakdownData: BreakdownSummary = {
  total_tickets: 1000,
  payments: 1000,
  reservations: 1000,
  total_entries: 20000,
  total_revenue: 45205,
} as const;

export const DEFAULT_PERIOD_SITE_METRICS: PeriodSiteMetricsHourly = {
  entries: 0,
  exits: 0,
  revenue_per_entry: 0,
  active_entry_kiosks: 0,
  active_exit_kiosks: 0,
  active_kiosks: 0,
  avg_duration_min: 0,
  issued_tickets: 0,
  avg_transaction_amount: 0,
  max_duration_min: 0,
  median_duration_min: 0,
  revenue_excl_tax: 0,
  revenue_incl_tax: 0,
  subscriber_entries: 0,
  subscriber_pct: 0,
  subscriber_tickets: 0,
  transactions: 0,
  transient_entries: 0,
  transient_tickets: 0,
  unique_tickets: 0,
  avg_transactions_per_kiosk: 0,
} as const;
