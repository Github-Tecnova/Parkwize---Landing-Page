"use client";

import {
  Brain,
  CloudSun,
  Calendar,
  TrendingUp,
  Zap,
  BarChart3,
} from "lucide-react";
import ProductPageLayout from "../../../../components/ProductPageLayout";

const ProductAI = () => (
  <ProductPageLayout
    badge="Parkwize AI"
    headline="The First AI Built"
    headlineAccent="Specifically for Parking."
    subheadline="Predictive intelligence that learns your parking's unique behavior and optimizes revenue automatically."
    problemTitle="Pricing by intuition, not intelligence."
    problemDesc="Parking operators set prices based on gut feeling, competitor rates, or yearly contracts — ignoring the rich demand signals that change every hour."
    problems={[
      {
        title: "Static Pricing Models",
        desc: "Fixed rates that don't respond to demand, weather, events, or time-of-day — leaving significant revenue on the table.",
      },
      {
        title: "No Predictive Capability",
        desc: "Operators can't forecast occupancy or demand. Every decision is reactive, never anticipatory.",
      },
      {
        title: "Ignored External Signals",
        desc: "Weather, local events, traffic, and nearby venue activity all affect parking demand — but no system captures this.",
      },
      {
        title: "Manual Optimization",
        desc: "The few operators who try to optimize pricing do it manually, spending hours on analysis that yields marginal results.",
      },
    ]}
    coreTitle="Intelligence That Learns and Optimizes."
    coreDesc="Parkwize AI is trained on over 2 years of real-world parking data. It learns the unique behavior of each facility — demand cycles, revenue patterns, occupancy dynamics — and optimizes automatically."
    corePoints={[
      "Demand cycle analysis — understanding how each parking reacts to time, day, season, and external events.",
      "Revenue pattern recognition — identifying optimal pricing strategies for maximum yield.",
      "Occupancy dynamics modeling — predicting fill rates and turnover with high accuracy.",
      "External data integration — weather, local events, Google Maps traffic, ticketing platforms, nearby building activity.",
      "Real-time automatic price adjustment — zero manual input, immediate results.",
      "Continuous learning — the AI improves with every data point, getting smarter over time.",
    ]}
    features={[
      {
        icon: Brain,
        title: "Demand Forecasting",
        desc: "Predict occupancy and demand hours or days in advance with models trained on real parking behavior.",
      },
      {
        icon: TrendingUp,
        title: "Revenue Optimization",
        desc: "Identify and apply optimal pricing strategies that maximize revenue across every time slot.",
      },
      {
        icon: Zap,
        title: "Auto Price Adjustment",
        desc: "Prices adjust in real time based on live demand, events, and conditions — with zero human intervention.",
      },
      {
        icon: CloudSun,
        title: "Weather Integration",
        desc: "Temperature, precipitation, and forecasts factored into demand predictions and pricing decisions.",
      },
      {
        icon: Calendar,
        title: "Event Awareness",
        desc: "Concerts, sports, conferences — the AI detects local events and adjusts pricing proactively.",
      },
      {
        icon: BarChart3,
        title: "Continuous Learning",
        desc: "The model improves with every transaction, becoming more accurate and effective over time.",
      },
    ]}
    ecosystemTitle="The Intelligence Layer."
    ecosystemDesc="Parkwize AI powers every product in the ecosystem with predictive intelligence and automated optimization."
    ecosystemLinks={[
      {
        title: "Parkwize Dashboard",
        desc: "AI recommendations and auto-pricing applied directly through the Dashboard Manager.",
        href: "/product/dashboard",
      },
      {
        title: "Parkwize Display",
        desc: "AI-driven pricing decisions automatically reflected on physical signage.",
        href: "/product/display",
      },
      {
        title: "Parkwize Booking",
        desc: "Booking prices optimized in real time based on AI demand forecasts.",
        href: "/product/booking",
      },
    ]}
    impacts={[
      {
        stat: "+35%",
        label: "Revenue Growth",
        desc: "AI-optimized dynamic pricing",
      },
      {
        stat: "95%",
        label: "Forecast Accuracy",
        desc: "Demand prediction precision",
      },
      {
        stat: "0",
        label: "Manual Input",
        desc: "Fully autonomous optimization",
      },
      {
        stat: "2yr+",
        label: "Training Data",
        desc: "Real-world parking intelligence",
      },
    ]}
  />
);

export default ProductAI;
