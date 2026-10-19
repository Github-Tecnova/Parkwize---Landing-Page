/*
 * Copyright (c) 2025-2026. Tecnova
 */

export type Media = {
  src: string;
  width: number;
  height: number;
};

export const MEDIA = {
  brand: {
    porsche911: {
      src: "/images/brand/porsche-911.webp",
      width: 970,
      height: 285,
    },
    pMark: { src: "/images/brand/p-mark.webp", width: 300, height: 391 },
    parkwizeAiBlack: {
      src: "/images/brand/parkwize-ai-black.webp",
      width: 960,
      height: 130,
    },
    parkwizeAiWhite: {
      src: "/images/brand/parkwize-ai-white.webp",
      width: 960,
      height: 130,
    },
    parkaidLogo: {
      src: "/images/brand/parkaid-logo.webp",
      width: 700,
      height: 261,
    },
  },
  product: {
    aiHeroLaptop: {
      src: "/images/product/ai-hero-laptop-keyed.webp",
      width: 1400,
      height: 886,
    },
    dashboardMockup: {
      src: "/images/product/dashboard-mockup.webp",
      width: 1716,
      height: 1846,
    },
    heroLaptop: {
      src: "/images/product/hero-laptop.webp",
      width: 1108,
      height: 612,
    },
    deckDashboard: {
      src: "/images/product/deck-dashboard.webp",
      width: 869,
      height: 1159,
    },
    deckAi: { src: "/images/product/deck-ai.webp", width: 1200, height: 759 },
    deckBooking: {
      src: "/images/product/deck-booking.webp",
      width: 1200,
      height: 866,
    },
    processHardware: {
      src: "/images/product/process-hardware.webp",
      width: 408,
      height: 510,
    },
    bookingPhones: {
      src: "/images/product/booking-phones-soft.webp",
      width: 1400,
      height: 923,
    },
    signageScreens: {
      src: "/images/product/signage-screens.webp",
      width: 891,
      height: 965,
    },
    signageScreensPortrait: {
      src: "/images/product/signage-screens-portrait.webp",
      width: 725,
      height: 1083,
    },
    processKiosk: {
      src: "/images/product/process-kiosk.webp",
      width: 391,
      height: 1135,
    },
    processCompactKiosk: {
      src: "/images/product/process-compact-kiosk.webp",
      width: 262,
      height: 784,
    },
    processFlagshipKiosk: {
      src: "/images/product/process-flagship-kiosk.webp",
      width: 650,
      height: 634,
    },
    processPhoneMenu: {
      src: "/images/product/process-phone-menu.webp",
      width: 900,
      height: 1887,
    },
  },
  os: {
    payment: { src: "/images/os/payment.webp", width: 156, height: 134 },
    display: { src: "/images/os/display.webp", width: 121, height: 241 },
    barriers: { src: "/images/os/barriers.webp", width: 287, height: 228 },
    cameras: { src: "/images/os/cameras.webp", width: 194, height: 118 },
    booking: { src: "/images/os/booking.webp", width: 91, height: 172 },
    intelligence: {
      src: "/images/os/intelligence.webp",
      width: 179,
      height: 170,
    },
    kiosks: { src: "/images/os/kiosks.webp", width: 114, height: 257 },
    enforcementOfficer: {
      src: "/images/os/enforcement-officer.webp",
      width: 600,
      height: 614,
    },
    enforcementScan: {
      src: "/images/os/enforcement-scan.webp",
      width: 806,
      height: 1082,
    },
    enforcementPatrolPortrait: {
      src: "/images/os/enforcement-patrol-portrait.webp",
      width: 350,
      height: 862,
    },
  },
  people: {
    dashboardOperatorPoster: {
      src: "/images/people/dashboard-operator-poster.webp",
      width: 1600,
      height: 900,
    },
    dashboardIpad: {
      src: "/images/people/dashboard-ipad.webp",
      width: 1536,
      height: 1024,
    },
    heroTeam: {
      src: "/images/people/hero-team.webp",
      width: 1536,
      height: 1024,
    },
    operationsTeam: {
      src: "/images/people/operations-team.webp",
      width: 1280,
      height: 960,
    },
    operationsTeamWide: {
      src: "/images/people/operations-team-wide.webp",
      width: 1536,
      height: 1024,
    },
    driverMobile: {
      src: "/images/people/driver-mobile.webp",
      width: 1280,
      height: 960,
    },
    callCenter: {
      src: "/images/people/call-center.webp",
      width: 1536,
      height: 1024,
    },
    displayUser: {
      src: "/images/people/display-user.webp",
      width: 1536,
      height: 1024,
    },
    enforcementUser: {
      src: "/images/people/enforcement-user.webp",
      width: 1024,
      height: 1280,
    },
    kioskUser: {
      src: "/images/people/kiosk-user.webp",
      width: 1536,
      height: 1024,
    },
  },
  sectors: {
    airports: {
      src: "/images/sectors/airports.webp",
      width: 1024,
      height: 656,
    },
    residential: {
      src: "/images/sectors/residential.webp",
      width: 1024,
      height: 656,
    },
    retail: { src: "/images/sectors/retail.webp", width: 1024, height: 656 },
    tenant: { src: "/images/sectors/tenant.webp", width: 1024, height: 656 },
  },
  ai: {
    forecasting: {
      src: "/images/ai/forecasting.webp",
      width: 1200,
      height: 896,
    },
    pricing: { src: "/images/ai/pricing.webp", width: 1200, height: 896 },
    conversational: {
      src: "/images/ai/conversational.webp",
      width: 1200,
      height: 896,
    },
    agent: { src: "/images/ai/agent.webp", width: 1200, height: 896 },
  },
  places: {
    parkingGarage: {
      src: "/images/places/parking-garage.webp",
      width: 1280,
      height: 800,
    },
    garageLed: {
      src: "/images/places/garage-led.webp",
      width: 1200,
      height: 1504,
    },
    gate: { src: "/images/places/gate.webp", width: 1200, height: 1504 },
  },
  parkaid: {
    agentCall: {
      src: "/images/parkaid/agent-call.webp",
      width: 1200,
      height: 912,
    },
    consoleCall: {
      src: "/images/parkaid/console-call.webp",
      width: 1054,
      height: 430,
    },
    agentReady: {
      src: "/images/parkaid/agent-ready.webp",
      width: 1440,
      height: 679,
    },
    portal: {
      src: "/images/parkaid/portal.webp",
      width: 1054,
      height: 671,
    },
  },
} as const satisfies Record<string, Record<string, Media>>;

export type VideoSource = {
  src: string;
  type: "video/webm" | "video/mp4";
};

export const VIDEOS = {
  heroBanner: [
    { src: "/videos/hero-banner.webm", type: "video/webm" },
    { src: "/videos/hero-banner.mp4", type: "video/mp4" },
  ],
  dashboardOperator: [
    { src: "/videos/dashboard-operator.webm", type: "video/webm" },
    { src: "/videos/dashboard-operator.mp4", type: "video/mp4" },
  ],
  bookingReady: [
    { src: "/videos/booking-ready.webm", type: "video/webm" },
    { src: "/videos/booking-ready.mp4", type: "video/mp4" },
  ],
} as const satisfies Record<string, VideoSource[]>;
