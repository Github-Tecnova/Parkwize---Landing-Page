"use client";

import {
  CalendarCheck,
  Smartphone,
  CreditCard,
  QrCode,
  Search,
  Palette,
} from "lucide-react";
import ProductPageLayout from "../../../../components/ProductPageLayout";

const ProductBooking = () => (
  <ProductPageLayout
    badge="Parkwize Booking"
    headline="A Modern, Conversion-Driven"
    headlineAccent="Parking Reservation Platform."
    heroVideo="/video.mov"
    subheadline="Built to capture demand and convert it efficiently — the Shopify + Stripe of parking reservations."
    problemTitle="Booking experiences stuck in 2005."
    problemDesc="Most parking booking systems are slow, clunky, and mobile-hostile. They lose customers at every step of the funnel — from search to payment."
    problems={[
      {
        title: "Terrible Mobile Experience",
        desc: "Outdated interfaces that aren't optimized for mobile, where 70%+ of parking searches happen.",
      },
      {
        title: "Slow Checkout Flows",
        desc: "Multi-step forms, account creation walls, and no modern payment options like Apple Pay or Google Pay.",
      },
      {
        title: "Poor SEO Performance",
        desc: "Most booking platforms are invisible on Google — operators lose demand they never even see.",
      },
      {
        title: "No Real-Time Sync",
        desc: "Booking data lives in a silo, disconnected from pricing engines, occupancy data, and operations tools.",
      },
    ]}
    coreTitle="Designed to Convert."
    coreDesc="Parkwize Booking is a modern reservation platform engineered for speed, conversion, and seamless integration with the entire Parkwize ecosystem."
    corePoints={[
      "Mobile-first, ultra-fast booking flow designed for maximum conversion at every step.",
      "Apple Pay and Google Pay integration for frictionless one-tap checkout.",
      "QR-based access codes — no tickets, no barriers, no friction for end users.",
      "Fully brandable — operators deploy their own branded booking experience.",
      "Real-time sync with Dashboard Manager for live availability and pricing accuracy.",
      "Built for SEO — optimized to outperform competitors on Google search results.",
    ]}
    features={[
      {
        icon: Smartphone,
        title: "Mobile-First UX",
        desc: "Designed mobile-first for the 70%+ of users who search and book parking from their phones.",
      },
      {
        icon: CreditCard,
        title: "Apple Pay & Google Pay",
        desc: "One-tap checkout with modern payment methods — reducing friction and boosting conversion rates.",
      },
      {
        icon: QrCode,
        title: "QR-Based Access",
        desc: "Digital QR codes replace physical tickets. Scan and go — seamless entry and exit.",
      },
      {
        icon: Palette,
        title: "Fully Brandable",
        desc: "White-label booking pages that match the operator's brand identity, domain, and design language.",
      },
      {
        icon: Search,
        title: "SEO Optimized",
        desc: "Built-in SEO architecture designed to rank on Google and capture organic parking demand.",
      },
      {
        icon: CalendarCheck,
        title: "Real-Time Sync",
        desc: "Availability and pricing always accurate — synced live with Dashboard Manager.",
      },
    ]}
    ecosystemTitle="The Digital Revenue Gateway."
    ecosystemDesc="Booking captures online demand and feeds it directly into the Parkwize operational ecosystem."
    ecosystemLinks={[
      {
        title: "Parkwize Dashboard",
        desc: "Booking data and revenue flow directly into the operational dashboard.",
        href: "/product/dashboard",
      },
      {
        title: "Parkwize Display",
        desc: "Booking availability reflected on physical signage in real time.",
        href: "/product/display",
      },
      {
        title: "Parkwize AI",
        desc: "AI optimizes booking pricing based on demand patterns and forecasts.",
        href: "/product/ai",
      },
    ]}
    impacts={[
      {
        stat: "+40%",
        label: "Conversion Rate",
        desc: "vs. legacy booking platforms",
      },
      {
        stat: "<30s",
        label: "Booking Time",
        desc: "From search to confirmed reservation",
      },
      {
        stat: "+60%",
        label: "Mobile Bookings",
        desc: "Mobile-first captures more demand",
      },
      {
        stat: "24/7",
        label: "Revenue Capture",
        desc: "Always-on digital booking gateway",
      },
    ]}
  />
);

export default ProductBooking;
