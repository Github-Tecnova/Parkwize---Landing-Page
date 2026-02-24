"use client";

import { Monitor, Wifi, MapPin, AlertCircle, Eye, Zap } from "lucide-react";
import ProductPageLayout from "../../../../components/ProductPageLayout";

const ProductDisplay = () => (
  <ProductPageLayout
    badge="Parkwize Display"
    headline="Data Connected to"
    headlineAccent="the Physical World."
    subheadline="Transforming static parking signage into intelligent, dynamic decision systems."
    problemTitle="Static signs in a dynamic world."
    problemDesc="Parking signage hasn't evolved in decades. Fixed prices, manual updates, and no connection to real-time data — leaving revenue and efficiency on the table."
    problems={[
      {
        title: "Outdated Information",
        desc: "Static signs show prices and availability that are hours or days old, misleading drivers and staff.",
      },
      {
        title: "Manual Updates Required",
        desc: "Changing a price or message means sending someone on-site or calling a vendor — every single time.",
      },
      {
        title: "No Demand Response",
        desc: "Signs can't react to real-time occupancy, events, or pricing changes. The physical world stays disconnected.",
      },
      {
        title: "Zero Intelligence",
        desc: "Traditional signage has no logic. It can't redirect traffic, trigger sold-out mode, or adapt messaging dynamically.",
      },
    ]}
    coreTitle="Intelligent Signage, Zero Effort."
    coreDesc="Parkwize Display bridges digital intelligence and real-world infrastructure — automatically updating pricing, availability, and messaging based on real-time data."
    corePoints={[
      "Live pricing and availability displayed on physical signs, updated automatically from the Dashboard Manager.",
      "Automatic sold-out mode triggered when occupancy thresholds are reached — no manual intervention.",
      "Directional messaging based on occupancy data — guide drivers to available spaces intelligently.",
      "Instant updates triggered by real-time data changes: pricing adjustments, closures, events, or demand shifts.",
      "Deploy dynamic pricing on physical infrastructure without any manual process or on-site presence.",
    ]}
    features={[
      {
        icon: Monitor,
        title: "Dynamic Pricing Display",
        desc: "Show real-time prices on physical signage, automatically synced with the Dashboard Manager pricing engine.",
      },
      {
        icon: AlertCircle,
        title: "Automatic Sold-Out Mode",
        desc: "When occupancy hits the threshold, signs switch to sold-out messaging automatically — zero delay.",
      },
      {
        icon: MapPin,
        title: "Directional Messaging",
        desc: "Guide drivers to available spaces or alternative lots based on live occupancy data across locations.",
      },
      {
        icon: Wifi,
        title: "Real-Time Data Sync",
        desc: "Every sign is connected to the Parkwize ecosystem. Changes propagate instantly across all displays.",
      },
      {
        icon: Eye,
        title: "Remote Management",
        desc: "Control every display from the Dashboard — update messages, override content, or schedule campaigns.",
      },
      {
        icon: Zap,
        title: "Event-Triggered Updates",
        desc: "Automatically adapt signage during concerts, sports events, or peak hours based on external data.",
      },
    ]}
    ecosystemTitle="The Bridge Between Digital and Physical."
    ecosystemDesc="Display transforms data from the Parkwize ecosystem into real-world visual infrastructure."
    ecosystemLinks={[
      {
        title: "Parkwize Dashboard",
        desc: "All display content is controlled and pushed from the central Dashboard Manager.",
        href: "/product/dashboard",
      },
      {
        title: "Parkwize Booking",
        desc: "Booking availability reflected on physical signs in real time.",
        href: "/product/booking",
      },
      {
        title: "Parkwize AI",
        desc: "AI-driven pricing decisions automatically appear on displays.",
        href: "/product/ai",
      },
    ]}
    impacts={[
      {
        stat: "+25%",
        label: "Revenue Uplift",
        desc: "Dynamic pricing on physical signs",
      },
      { stat: "0", label: "Manual Updates", desc: "Fully automated signage" },
      {
        stat: "<1s",
        label: "Update Speed",
        desc: "Real-time data propagation",
      },
      { stat: "∞", label: "Scalability", desc: "Unlimited connected displays" },
    ]}
  />
);

export default ProductDisplay;
