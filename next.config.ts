import type { NextConfig } from "next";

const LEGACY_PAGES = [
  { from: "dashboard", to: "dashboard-manager" },
  { from: "ai", to: "parkwize-ai" },
  { from: "display", to: "digital-signage" },
  { from: "booking", to: "online-reservation" },
  { from: "process", to: "process-kiosk" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      ...LEGACY_PAGES.flatMap(({ from, to }) => [
        {
          source: `/:lang(en|fr)/${from}`,
          destination: `/:lang/${to}`,
          permanent: true,
        },
        { source: `/${from}`, destination: `/en/${to}`, permanent: true },
      ]),
    ];
  },
};

export default nextConfig;
