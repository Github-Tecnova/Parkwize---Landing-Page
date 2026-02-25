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
import { usePathname } from "next/navigation";

const ProductAI = () => {
  const pathname = usePathname();
  const isFr = pathname.startsWith("/fr");

  const content = isFr
    ? {
        badge: "Parkwize IA",
        headline: "La première IA conçue",
        headlineAccent: "spécifiquement pour le stationnement.",
        subheadline:
          "Une intelligence prédictive qui apprend le comportement unique de votre stationnement et optimise automatiquement les revenus.",
        problemTitle: "Tarifer à l’intuition, pas à l’intelligence.",
        problemDesc:
          "Les opérateurs fixent souvent les prix selon l’intuition, les concurrents ou des contrats annuels — en ignorant les signaux de demande qui évoluent chaque heure.",
        problems: [
          {
            title: "Modèles de prix statiques",
            desc: "Des tarifs fixes qui ne réagissent pas à la demande, à la météo, aux événements ou au moment de la journée — avec des revenus perdus.",
          },
          {
            title: "Aucune capacité prédictive",
            desc: "Les opérateurs ne peuvent pas prévoir l’occupation ou la demande. Chaque décision est réactive.",
          },
          {
            title: "Signaux externes ignorés",
            desc: "Météo, événements locaux, trafic et activités des lieux voisins influencent la demande — mais aucun système ne les exploite.",
          },
          {
            title: "Optimisation manuelle",
            desc: "Les rares opérateurs qui optimisent le prix le font manuellement, avec beaucoup d’efforts pour des gains limités.",
          },
        ],
        coreTitle: "Une intelligence qui apprend et optimise.",
        coreDesc:
          "Parkwize IA est entraînée sur plus de 2 ans de données réelles. Elle apprend le comportement unique de chaque site et optimise automatiquement.",
        corePoints: [
          "Analyse des cycles de demande selon l’heure, le jour, la saison et les événements externes.",
          "Reconnaissance des patterns de revenus pour identifier les stratégies tarifaires optimales.",
          "Modélisation des dynamiques d’occupation pour prévoir remplissage et rotation.",
          "Intégration de données externes : météo, événements locaux, trafic Google Maps, billetterie, activité des bâtiments voisins.",
          "Ajustement automatique des prix en temps réel — zéro saisie manuelle.",
          "Apprentissage continu — le modèle s’améliore à chaque nouvelle donnée.",
        ],
        features: [
          {
            icon: Brain,
            title: "Prévision de la demande",
            desc: "Prévoyez occupation et demande des heures ou jours à l’avance avec des modèles entraînés sur des données réelles.",
          },
          {
            icon: TrendingUp,
            title: "Optimisation des revenus",
            desc: "Identifiez et appliquez les stratégies tarifaires qui maximisent les revenus sur chaque plage horaire.",
          },
          {
            icon: Zap,
            title: "Ajustement automatique",
            desc: "Les prix s’ajustent en temps réel selon la demande, les événements et les conditions — sans intervention humaine.",
          },
          {
            icon: CloudSun,
            title: "Intégration météo",
            desc: "Température, précipitations et prévisions sont intégrées aux décisions de prix et de prévision.",
          },
          {
            icon: Calendar,
            title: "Prise en compte des événements",
            desc: "Concerts, sports, conférences — l’IA détecte les événements locaux et ajuste les prix proactivement.",
          },
          {
            icon: BarChart3,
            title: "Apprentissage continu",
            desc: "Le modèle s’améliore à chaque transaction, devenant plus précis et plus performant.",
          },
        ],
        ecosystemTitle: "La couche d’intelligence.",
        ecosystemDesc:
          "Parkwize IA alimente chaque produit de l’écosystème avec une intelligence prédictive et une optimisation automatisée.",
        ecosystemLinks: [
          {
            title: "Parkwize Dashboard",
            desc: "Les recommandations IA et l’auto-pricing sont appliqués directement via le Dashboard Manager.",
            href: "/product/dashboard",
          },
          {
            title: "Parkwize Display",
            desc: "Les décisions tarifaires de l’IA sont automatiquement reflétées sur les affichages physiques.",
            href: "/product/display",
          },
          {
            title: "Parkwize Booking",
            desc: "Les prix de réservation sont optimisés en temps réel selon les prévisions IA.",
            href: "/product/booking",
          },
        ],
        impacts: [
          {
            stat: "+35%",
            label: "Croissance des revenus",
            desc: "Tarification dynamique optimisée par l’IA",
          },
          {
            stat: "95%",
            label: "Précision de prévision",
            desc: "Précision de la prédiction de la demande",
          },
          {
            stat: "0",
            label: "Saisie manuelle",
            desc: "Optimisation entièrement autonome",
          },
          {
            stat: "2 ans+",
            label: "Données d’entraînement",
            desc: "Intelligence parking issue du réel",
          },
        ],
      }
    : {
        badge: "Parkwize AI",
        headline: "The First AI Built",
        headlineAccent: "Specifically for Parking.",
        subheadline:
          "Predictive intelligence that learns your parking's unique behavior and optimizes revenue automatically.",
        problemTitle: "Pricing by intuition, not intelligence.",
        problemDesc:
          "Parking operators set prices based on gut feeling, competitor rates, or yearly contracts — ignoring the rich demand signals that change every hour.",
        problems: [
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
        ],
        coreTitle: "Intelligence That Learns and Optimizes.",
        coreDesc:
          "Parkwize AI is trained on over 2 years of real-world parking data. It learns the unique behavior of each facility — demand cycles, revenue patterns, occupancy dynamics — and optimizes automatically.",
        corePoints: [
          "Demand cycle analysis — understanding how each parking reacts to time, day, season, and external events.",
          "Revenue pattern recognition — identifying optimal pricing strategies for maximum yield.",
          "Occupancy dynamics modeling — predicting fill rates and turnover with high accuracy.",
          "External data integration — weather, local events, Google Maps traffic, ticketing platforms, nearby building activity.",
          "Real-time automatic price adjustment — zero manual input, immediate results.",
          "Continuous learning — the AI improves with every data point, getting smarter over time.",
        ],
        features: [
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
        ],
        ecosystemTitle: "The Intelligence Layer.",
        ecosystemDesc:
          "Parkwize AI powers every product in the ecosystem with predictive intelligence and automated optimization.",
        ecosystemLinks: [
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
        ],
        impacts: [
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
        ],
      };

  return (
    <ProductPageLayout
      badge={content.badge}
      headline={content.headline}
      headlineAccent={content.headlineAccent}
      subheadline={content.subheadline}
      problemTitle={content.problemTitle}
      problemDesc={content.problemDesc}
      problems={content.problems}
      coreTitle={content.coreTitle}
      coreDesc={content.coreDesc}
      corePoints={content.corePoints}
      features={content.features}
      ecosystemTitle={content.ecosystemTitle}
      ecosystemDesc={content.ecosystemDesc}
      ecosystemLinks={content.ecosystemLinks}
      impacts={content.impacts}
    />
  );
};

export default ProductAI;
