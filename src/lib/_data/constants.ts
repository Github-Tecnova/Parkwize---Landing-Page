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

import { ChartData, ChartDataMulti } from "@/components/charts/multi-chart";
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

/**
 * Generates mock tickets chart data for a given date range
 */
export function generateMockTicketsChart(
  fromDate: Date,
  toDate: Date,
): ChartDataMulti[] {
  const result: ChartDataMulti[] = [];
  const current = new Date(fromDate);

  while (current <= toDate) {
    const seed = getDateSeed(current);
    const dayOfWeek = current.getDay(); // 0 = Sunday, 6 = Saturday

    // Base values that change gradually over time
    const monthProgress = current.getMonth() / 12;
    const baseRegTickets = 12000 + monthProgress * 8000; // Gradual increase through year
    const baseOrgTickets = 6300 + monthProgress * 400; // Slight increase
    const baseCustomerTickets = 6300 + monthProgress * 400;

    // Weekend vs weekday patterns
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.6 : 1.0;
    const weekdayPeakMultiplier = dayOfWeek >= 2 && dayOfWeek <= 4 ? 1.5 : 1.0;

    // Random variations
    const randomVariation = seededRandom(seed) * 0.4 + 0.8; // 0.8 to 1.2
    const trendVariation = seededRandom(seed * 2) * 0.3 + 0.85; // 0.85 to 1.15

    const regTickets = Math.floor(
      baseRegTickets *
        weekendMultiplier *
        weekdayPeakMultiplier *
        randomVariation *
        trendVariation,
    );
    const orgTickets = Math.floor(baseOrgTickets * trendVariation);
    const customerTickets = Math.floor(baseCustomerTickets * trendVariation);

    result.push({
      xText: current.toISOString().split("T")[0],
      regTickets,
      orgTickets,
      customerTicket: customerTickets,
    });

    current.setDate(current.getDate() + 1);
  }

  return result;
}

/**
 * Generates mock orders/revenue chart data for a given date range
 */
export function generateMockOrdersChart(
  fromDate: Date,
  toDate: Date,
): ChartData[] {
  const result: ChartData[] = [];
  const current = new Date(fromDate);

  while (current <= toDate) {
    const seed = getDateSeed(current);
    const dayOfWeek = current.getDay();

    // Base revenue that grows over time
    const monthProgress = current.getMonth() / 12;
    const baseRevenue = 8000 + monthProgress * 12000;

    // Weekend vs weekday patterns
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.65 : 1.0;
    const weekdayPeakMultiplier = dayOfWeek >= 2 && dayOfWeek <= 4 ? 1.6 : 1.0;

    // Random variations with some decimal precision
    const randomVariation = seededRandom(seed) * 0.5 + 0.75; // 0.75 to 1.25
    const seasonalTrend = seededRandom(seed * 3) * 0.25 + 0.875; // 0.875 to 1.125

    const yValue =
      baseRevenue *
      weekendMultiplier *
      weekdayPeakMultiplier *
      randomVariation *
      seasonalTrend;

    result.push({
      xText: current.toISOString().split("T")[0],
      yValue: Math.round(yValue * 100) / 100, // Round to 2 decimal places
    });

    current.setDate(current.getDate() + 1);
  }

  return result;
}

/**
 * Generates mock traffic chart data for a given date range
 */
export function generateMockTrafficChart(
  fromDate: Date,
  toDate: Date,
): ChartData[] {
  const result: ChartData[] = [];
  const current = new Date(fromDate);

  while (current <= toDate) {
    const seed = getDateSeed(current);
    const dayOfWeek = current.getDay();

    // Base traffic that increases over time
    const monthProgress = current.getMonth() / 12;
    const baseTraffic = 10000 + monthProgress * 6000;

    // Traffic patterns
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1.0;
    const peakDayMultiplier = dayOfWeek >= 1 && dayOfWeek <= 5 ? 1.4 : 1.0;

    // Random variations
    const randomVariation = seededRandom(seed) * 0.4 + 0.8; // 0.8 to 1.2
    const dailyTrend = seededRandom(seed * 4) * 0.2 + 0.9; // 0.9 to 1.1

    const yValue = Math.floor(
      baseTraffic *
        weekendMultiplier *
        peakDayMultiplier *
        randomVariation *
        dailyTrend,
    );

    result.push({
      xText: current.toISOString().split("T")[0],
      yValue,
    });

    current.setDate(current.getDate() + 1);
  }

  return result;
}

/**
 * Generates mock revenue chart data for a given date range
 */
export function generateMockRevenueChart(
  fromDate: Date,
  toDate: Date,
): ChartData[] {
  const result: ChartData[] = [];
  const current = new Date(fromDate);

  while (current <= toDate) {
    const seed = getDateSeed(current);
    const dayOfWeek = current.getDay();

    // Base revenue with seasonal growth
    const monthProgress = current.getMonth() / 12;
    const seasonalMultiplier =
      1 + Math.sin(monthProgress * Math.PI * 2 + Math.PI) * 0.2; // Seasonal variation
    const baseRevenue = 7500 + monthProgress * 10000;

    // Business day patterns
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.6 : 1.0;
    const businessDayMultiplier = dayOfWeek >= 2 && dayOfWeek <= 4 ? 1.5 : 1.0;

    // Random variations
    const randomVariation = seededRandom(seed) * 0.45 + 0.775; // 0.775 to 1.225
    const marketTrend = seededRandom(seed * 5) * 0.3 + 0.85; // 0.85 to 1.15

    const yValue =
      baseRevenue *
      seasonalMultiplier *
      weekendMultiplier *
      businessDayMultiplier *
      randomVariation *
      marketTrend;

    result.push({
      xText: current.toISOString().split("T")[0],
      yValue: Math.round(yValue * 1000) / 1000, // Round to 3 decimal places for precision
    });

    current.setDate(current.getDate() + 1);
  }

  return result;
}

export const mockTicketsChart = (fromDate: Date, toDate: Date) => {
  return generateMockTicketsChart(fromDate, toDate);
};

export const mockTrafficChart = (fromDate: Date, toDate: Date) => {
  return generateMockTrafficChart(fromDate, toDate);
};

export const mockRevenueChart = (fromDate: Date, toDate: Date) => {
  return generateMockRevenueChart(fromDate, toDate);
};

export const mockOrdersChart = (fromDate: Date, toDate: Date) => {
  return generateMockOrdersChart(fromDate, toDate);
};

export const mockDailyTicketSummary = (
  fromDate: Date,
  toDate: Date,
): DailyTicketSummary => {
  const ticketsChart = mockTicketsChart(fromDate, toDate);

  return {
    regular_tickets: ticketsChart.reduce(
      (acc, curr) => acc + (curr.regTickets as number),
      0,
    ),
    average_ticket_time_minutes: 740,
    org_tickets: ticketsChart.reduce(
      (acc, curr) => acc + (curr.orgTickets as number),
      0,
    ),
    customer_tickets: ticketsChart.reduce(
      (acc, curr) => acc + (curr.customerTicket as number),
      0,
    ),
    tickets_issued: ticketsChart.reduce(
      (acc, curr) =>
        acc +
        ((curr.regTickets as number) +
          (curr.orgTickets as number) +
          (curr.customerTicket as number)),
      0,
    ),
    count: 12,
  };
};

export const mockOverviewPageData = (
  fromDate: Date,
  toDate: Date,
): OverviewPageType => {
  return {
    ordersChart: mockOrdersChart(fromDate, toDate),
    onlineTicketsChart: mockOnlineReservationData(fromDate, toDate)
      .ticketsChart,
    siteMetrics: {
      periodSiteMetrics: DEFAULT_PERIOD_SITE_METRICS,
      seriesSiteMetrics: [],
    },
  };
};

export const mockOnlineReservationData = (
  fromDate: Date,
  toDate: Date,
): {
  ordersChart: ChartData[];
  ticketsChart: ChartData[];
  onlineOrders: OrderWithParking[];
} => {
  const ordersChart = mockOrdersChart(fromDate, toDate);

  return {
    onlineOrders: mockOnlineOrders,
    ticketsChart: ordersChart,
    ordersChart: ordersChart,
  };
};

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
