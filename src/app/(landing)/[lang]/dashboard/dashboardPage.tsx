"use client";

import {
  BarChart3,
  Activity,
  Settings,
  Layers,
  Monitor,
  Zap,
} from "lucide-react";
import ProductPageLayout from "../../../../components/ProductPageLayout";
import dashboardProductImg from "@/assets/dashboard-hero.jpg";

export default function DashboardClient() {
  return (
    <ProductPageLayout
      badge="Parkwize Dashboard Manager"
      headline="The Operational Brain"
      headlineAccent="of Modern Parking."
      heroImage={dashboardProductImg}
      subheadline="A centralized, real-time command center connecting every parking asset into one intelligent ecosystem."
      problemTitle="Operations without visibility."
      problemDesc="Most parking operators manage their assets blindly — juggling fragmented tools, spreadsheets, and outdated hardware with no unified view of performance."
      problems={[
        {
          title: "No Centralized View",
          desc: "KPIs, occupancy, revenue, and traffic data scattered across disconnected systems and manual reports.",
        },
        {
          title: "Reactive, Not Proactive",
          desc: "Without real-time data, operators can only react to problems — never anticipate or prevent them.",
        },
        {
          title: "Manual Pricing Changes",
          desc: "Adjusting rates requires logging into hardware, visiting sites, or calling staff — wasting hours every week.",
        },
        {
          title: "Hardware Lock-In",
          desc: "Each vendor has its own interface and format. Nothing talks to anything else.",
        },
      ]}
      coreTitle="One Dashboard. Total Control."
      coreDesc="Dashboard Manager is the single source of truth for every parking operation — fully remote, fully real-time, and deeply integrated with the entire Parkwize ecosystem."
      corePoints={[
        "90+ live KPIs covering occupancy, revenue, traffic flow, heatmaps, and conversion — updated in real time.",
        "Dynamic pricing engine with calendar-based automation, event triggers, and demand-responsive adjustments.",
        "Remote control of pricing, closures, events, and operational rules — from anywhere, on any device.",
        "Deep integrations with major parking hardware: Process, TIBA, Global, Scheidt & Bachmann, and more.",
        "All Parkwize products — Display, Booking, AI — feed into and are controlled from the Dashboard.",
      ]}
      features={[
        {
          icon: BarChart3,
          title: "90+ Live KPIs",
          desc: "Occupancy, revenue, traffic, heatmaps — every metric you need, updated in real time across all locations.",
        },
        {
          icon: Activity,
          title: "Dynamic Pricing Engine",
          desc: "Calendar-based automation, event triggers, and demand-responsive pricing — all configurable from one interface.",
        },
        {
          icon: Settings,
          title: "Remote Operations Control",
          desc: "Open/close lots, adjust rates, trigger events, and manage closures remotely without touching hardware.",
        },
        {
          icon: Layers,
          title: "Hardware Integrations",
          desc: "Connect with Process, TIBA, Global, Scheidt & Bachmann, and other major parking hardware systems.",
        },
        {
          icon: Monitor,
          title: "Multi-Site Management",
          desc: "Unified view across unlimited parking locations. Compare, benchmark, and optimize at portfolio level.",
        },
        {
          icon: Zap,
          title: "Automation Flows",
          desc: "Create automated workflows triggered by occupancy thresholds, time rules, or external events.",
        },
      ]}
      ecosystemTitle="Connected to Everything."
      ecosystemDesc="Dashboard Manager is the central hub where every Parkwize product communicates and coordinates."
      ecosystemLinks={[
        {
          title: "Parkwize Display",
          desc: "Dashboard pricing and availability pushed instantly to physical signage.",
          href: "/product/display",
        },
        {
          title: "Parkwize Booking",
          desc: "Reservation data synced in real time with operational dashboards.",
          href: "/product/booking",
        },
        {
          title: "Parkwize AI",
          desc: "AI-generated pricing recommendations applied directly through the dashboard.",
          href: "/product/ai",
        },
      ]}
      impacts={[
        {
          stat: "+35%",
          label: "Revenue Growth",
          desc: "Average uplift with dynamic pricing",
        },
        {
          stat: "10×",
          label: "Faster Decisions",
          desc: "Real-time data replaces guesswork",
        },
        {
          stat: "90+",
          label: "Live KPIs",
          desc: "Complete operational visibility",
        },
        {
          stat: "0",
          label: "Site Visits Needed",
          desc: "Fully remote operations control",
        },
      ]}
    />
  );
}
