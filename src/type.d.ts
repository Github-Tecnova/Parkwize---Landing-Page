/*
 * Copyright (c) 2025-2026. Tecnova
 */

import {
  ApiEvent,
  ApiKey,
  Business,
  ConnectionLog,
  CouponCode,
  Customer,
  DisplayAsset,
  GlobalDisplayAsset,
  Kiosk,
  OnlineTicket,
  Order,
  Parking,
  ParkingImage,
  Permission,
  PriceGroup,
  PrivateReservation,
  ReportJob,
  ReservationSupport,
  Role,
  SavedDisplay,
  SupportResponse,
  User,
  UserRole,
  Zone,
} from "@/app/generated/prisma/client";
import {
  EApiEventAction,
  EApiEventType,
  ERole,
  ESecretKeyType,
} from "@/app/generated/prisma/enums";
import { ChartData, ChartDataMulti } from "@/components/charts/multi-chart";
import { OrderDTO, ParkingDTO } from "@/lib/_data/dto";
import { z } from "zod";

export type UserDTOType = {
  id: string;
  name: string;
  email: string;
  role: ERole;
  businessId: string | null;
  Roles: UserRoleWithRoleAndPermissions[];
};

type SlimUser = {
  id: string;
  email: string;
  role: ERole;
  fullName: string;
  business_id: string | null;
  Roles: UserRoleWithRoleAndPermissions[];
};

type BusinessWithParkingsOnly = Business & {
  Parkings: Parking[];
  Users: SlimUser[];
  Roles: Role[];
};

type PrivateReservationWithGestionUser = PrivateReservation & {
  gestion_user: SlimUser;
};

type ParkingWithPrices = Parking & {
  PrivateReservations: PrivateReservationWithGestionUser[];
  ParkingImages: ParkingImage[];
};

type OrderWithCustomer = Order & {
  Customer: Customer;
};

type RoleWithPermissions = Role & {
  Permissions: Permission[];
};

type UserRoleWithRoleAndPermissions = UserRole & {
  Role: RoleWithPermissions;
};

type UserWithRoles = User & {
  Roles: UserRoleWithRoleAndPermissions[];
};

type FatBusiness = Business & {
  Users: UserWithRoles[];
  Parkings: ParkingWithPrices[];
  ApiKeys: ApiKey | null;
  ApiEvents: ApiEvent[];
  ReservationSupports: ReservationSupport[];
  Orders: OrderWithCustomer[];
  Roles: RoleWithPermissions[];
};

type GeneratedIncomeType = {
  xText: string;
  yValue: number;
};

type ApiEventWithBusinessName = ApiEvent & {
  Business: {
    name: string;
  } | null;
};

type CustomerType = {
  Nom: string;
  OrganizationId: number;
  AvgMonthlyRevenue: number;
};

type CustomerTypeType = {
  CustomerTicketCount: number;
  StandardTicketCount: number;
};

type Session = {
  id: string;
  business_id: string | null;
  email: string;
  fullName: string;
  role: ERole;
  verified: boolean;
  csrfToken: string;
};

type SessionN = {
  id: string;
  business_id: string;
  email: string;
  fullName: string;
  role: ERole;
  verified: boolean;
  csrfToken: string;
};

type TvDisplayWithBusiness = TvDisplay & {
  Business: Business;
};

type CustomerWithOrders = Customer & {
  Orders: Order[];
};

type OrderWithParking = Order & {
  parking: ParkingDTO | undefined;
  customer: Customer;
};

type ReservationSupportWithResponses = ReservationSupport & {
  Responses: SupportResponse[];
};

type SupportResponseBuilder = {
  subject: string;
  message: string;
  client_email: string;
};

type CouponCodeWithOrders = CouponCode & {
  orders: Order[];
};

type ConnectionLogWithUser = ConnectionLog & {
  User: {
    fullName: string;
    email: string;
    Business: Business | null;
  };
};

/**
 * Timescale Summaries
 */

type DailyTicketSummary = {
  regular_tickets: number;
  tickets_issued: number;
  org_tickets: number;
  customer_tickets: number;
  average_ticket_time_minutes: number;
  count: number;
};

type DailyPaymentSummary = {
  total_payments: number;
  total_revenue: number;
  avg_payment_amount: number;
  avg_revenue_per_kiosk: number;
  max_payment_amount: number;
  min_payment_amount: number;
  stddev_payment_amount: number;
};

type DailyAccessSummary = {
  total_accesses: number;
  total_entries: number;
  total_exits: number;
  avg_duration_minutes_organization: number;
  avg_duration_minutes: number;
  max_duration_minutes: number;
  min_duration_minutes: number;
};

type DailyAccessBalance = {
  date: string;
  accesses: number;
  entries: number;
  exits: number;
  avg_stay_minutes_global: number;
  max_stay_minutes_global: number;
  min_stay_minutes_global: number;
};

type AccessBalance = {
  accesses: number;
  entries: number;
  exits: number;
  avg_stay_minutes_global: number;
  max_stay_minutes_global: number;
  min_stay_minutes_global: number;
};

type AccessSummary = {
  dailyAccessBalances: Array<DailyAccessBalance>;
  accessBalance: AccessBalance;
};

type SiteMetricHourly = {
  bucket: Date;
  label: string;
  entries: number;
  exits: number;
  subscriber_entries: number;
  transient_entries: number;
  subscriber_pct: number;
  avg_duration_min: number;
  median_duration_min: number;
  max_duration_min: number;
  revenue_incl_tax: number;
  revenue_excl_tax: number;
  transactions: number;
  avg_transaction_amount: number;
  revenue_per_entry: number;
  active_kiosks: number;
  avg_transactions_per_kiosk: number;
  active_entry_kiosks: number;
  active_exit_kiosks: number;
  unique_tickets: number;
  issued_tickets: number;
  transient_tickets: number;
  subscriber_tickets: number;
};

type PeriodSiteMetricsHourly = {
  entries: number;
  exits: number;
  subscriber_entries: number;
  transient_entries: number;
  subscriber_pct: number;
  avg_duration_min: number;
  median_duration_min: number;
  max_duration_min: number;
  revenue_incl_tax: number;
  revenue_excl_tax: number;
  transactions: number;
  avg_transaction_amount: number;
  revenue_per_entry: number;
  active_kiosks: number;
  avg_transactions_per_kiosk: number;
  active_entry_kiosks: number;
  active_exit_kiosks: number;
  unique_tickets: number;
  issued_tickets: number;
  transient_tickets: number;
  subscriber_tickets: number;
};

type DailyIssuedTickets = {
  date: string;
  park_id: number;

  issued_tickets: number;
  sub_tickets: number;
  hor_tickets: number;
  multi_access_tickets: number;
  rebate_intime_tickets: number;
  one_exit_tickets: number;
  cash_rebate_tickets: number;
  paid_org_tickets: number;
  lost_tickets: number;
};

type PeriodIssuedTickets = {
  issued_tickets: number;
  sub_tickets: number;
  hor_tickets: number;
  multi_access_tickets: number;
  rebate_intime_tickets: number;
  one_exit_tickets: number;
  cash_rebate_tickets: number;
  paid_org_tickets: number;
  lost_tickets: number;
};

type DailyTicketsUsage = {
  date: string;
  park_id: number;

  total_tickets: number;
  sub_tickets: number;
  hor_tickets: number;
  multi_access_tickets: number;
  rebate_intime_tickets: number;
  one_exit_tickets: number;
  cash_rebate_tickets: number;
  paid_org_tickets: number;
};

type PeriodTicketsUsage = {
  total_tickets: number;
  sub_tickets: number;
  hor_tickets: number;
  multi_access_tickets: number;
  rebate_intime_tickets: number;
  one_exit_tickets: number;
  cash_rebate_tickets: number;
  paid_org_tickets: number;
};

type OverviewPageType = {
  siteMetrics: {
    seriesSiteMetrics: Array<SiteMetricHourly>;
    periodSiteMetrics: PeriodSiteMetricsHourly;
  };
  ordersChart: ChartData[];
  onlineTicketsChart: ChartData[];
};

type CustomersDataType = {
  orgSubChart: ChartDataMulti[];
  organizations: ParkingOrganizationType[];
  subscribers: ParkingSubscriberType[];
};

type BreakdownFrameType =
  | "Today"
  | "Yesterday"
  | "Last 7 days"
  | "Last 30 days"
  | "Last week"
  | "Last month"
  | "This week"
  | "This month";

type BreakdownSummary = {
  total_tickets: number;
  total_entries: number;
  total_revenue: number;
  reservations: number;
  payments: number;
};

type ParkingOrganizationType = {
  organizationId: string;
  name: string;
  total_amount: number;
  total_entries: number;
  total_exits: number;
};

type ParkingSubscriberType = {
  id: number;
  firstname: string;
  lastname: string;
  total_amount: number;
  total_entries: number;
  total_exits: number;
};

type ParkingWithKiosks = Parking & {
  Kiosks: Kiosk[];
};

type ReportJobWithData = ReportJob & {
  Business: Business & {
    Parkings: ParkingWithKiosks[];
  };
  Parking: ParkingWithKiosks | null;
};

type QrCodeType = {
  url: string;
};

type OnlineTicketWithOrder = OnlineTicket & {
  Order: OrderDTO | null;
};

type ParkingWithZones = Parking & {
  Zones: Zone[];
};

type CardType = "visa" | "mastercard" | "discover" | "amex" | "generic";

type AttachmentType = {
  filename: string;
  content: Buffer<ArrayBuffer>;
};

type CardTypeDataType = {
  [key: string]: number;
};

type CardTypeChartData = {
  type: string;
  amount: number;
};

type ApiAnalyticsData = {
  bucket: Date;
  total_events: number;
  distinct_keys_used: number;
  successful_responses: number;
  client_errors: number;
  server_errors: number;
  informational: number;
  redirects: number;
  success_rate: number;
  client_error_rate: number;
  server_error_rate: number;
  avg_performance: number;
  min_performance: number;
  max_performance: number;
  p95_performance: number;
  cache_hits: number;
  cache_misses: number;
  cache_hit_rate: number;
  most_common_event_action: EApiEventAction;
  most_common_event_type: EApiEventType;
};

type ForecastType = {
  ds: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
};

type DisplayAssets = {
  privateDisplayAssets: DisplayAsset[];
  globalDisplayAssets: GlobalDisplayAsset[];
};

type AiToolResultType = "forecast" | "export";

type AiTool = {
  description: string;
  parameters: z.ZodSchema<any>;
  execute: (...args: any[]) => Promise<any>;
};

type AiTools = {
  [toolName: string]: AiTool;
};

type TicketWithAccess = {
  ticketId: string;
  issueDate: Date;
  beginDate: Date;
  endDate: Date;
  paidBy: string;
  subscriberId: string;
  organizationId: string;
  customerId: string;
  access_count: number;
  last_access_date: string;
};

export interface TrafficTypeFilters {
  startDate: Date;
  endDate: Date;
  selectedParkingId: string;
  timeRange?: {
    startHour: number; // 0-23
    endHour: number; // 0-23
  };
  dayRange?: {
    startDay: number; // 0=Sunday, 1=Monday, etc.
    endDay: number;
  };
  useExits: boolean;
}

type PwErrorType = "NOT_FOUND" | "UNAUTHORIZED" | "FORBIDDEN" | "UNKNOWN";

export type ErrorPayloadType = {
  message: string;
  [key: string]: any;
};

export type ParkingCalendarEventDisplay = ParkingCalendarEvent & {
  Display: SavedDisplay & {
    PriceGroup: PriceGroup | null;
  };
};

export type SecretKeyType = {
  key: string;
  value: string;
  type: ESecretKeyType;
};

export type KioskConfigTaskType = {
  kioskId: string;
  displayId: string;
  priceId?: string;
  fromHour: string;
  toHour: string;
};

export type DBPermissions = {
  business: {
    dataType: Business;
    action: "update" | "delete";
  };
  overview: {
    dataType: Business;
    action: "view";
  };
  customers: {
    dataType: Business;
    action: "view";
  };
  parking_Lots: {
    dataType: Parking;
    action: "view" | "update";
  };
  display_Management: {
    dataType: Business;
    action: "view" | "update";
  };
  dynamic_Pricing: {
    dataType: Business;
    action: "view" | "update";
  };
  parking_prices: {
    dataType: Business;
    action: "view" | "update";
  };
  reports: {
    dataType: Business;
    action: "view" | "export" | "update";
  };
  accounting: {
    dataType: Business;
    action: "view";
  };
  team: {
    dataType: Business;
    action: "view" | "update";
  };
  zones: {
    dataType: Business;
    action: "view" | "update";
  };
  billing: {
    dataType: Business;
    action: "view" | "update";
  };
  onlineReservation: {
    dataType: Business;
    action: "view";
  };
  onlineOrders: {
    dataType: Order;
    action: "view" | "delete" | "update";
  };
  forecasting: {
    dataType: Business;
    action: "view";
  };
  promotions: {
    dataType: Business;
    action: "view" | "update";
  };
  ai: {
    dataType: Business;
    action: "view" | "use";
  };
  automations: {
    dataType: Business;
    action: "view" | "update";
  };
  ticketsView: {
    dataType: Business;
    action: "view";
  };
  trafficView: {
    dataType: Business;
    action: "view";
  };
  env: {
    dataType: Business;
    action: "view" | "update";
  };
  api: {
    dataType: Business;
    action: "view" | "genKey";
  };
  users: {
    dataType: User & { Business: Business | null };
    action: "create" | "editPassword" | "update" | "delete";
  };
  roles: {
    dataType: Role;
    action: "view" | "update";
  };
  kiosks_configs: {
    dataType: Business;
    action: "view" | "update";
  };
};

export type PermissionResources = keyof DBPermissions;

export type PermissionActions<R extends PermissionResources> =
  DBPermissions[R]["action"];

export type PermissionItem = {
  action: string;
  allowed: boolean;
};

type PermissionCheck<Key extends keyof DBPermissions> =
  | boolean
  | ((user: UserDTOType, data: DBPermissions[Key]["dataType"]) => boolean);

type KeysPermissions = {
  [Key in keyof DBPermissions]: Partial<{
    [Action in DBPermissions[Key]["action"]]: PermissionCheck<Key>;
  }>;
};

type HeaderPageType = {
  tag: string;
  url?: string;
  main?: boolean;
  resource?: PermissionResources;
};
