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
import dashboardProductImg from "@/assets/dashboard-hero.png";
import { usePathname } from "next/navigation";

export default function DashboardClient() {
  const pathname = usePathname();
  const isFr = pathname.startsWith("/fr");

  const content = isFr
    ? {
        badge: "Parkwize Gestionnaire de Tableau de Bord",
        headline: "Le cerveau opérationnel",
        headlineAccent: "du stationnement moderne.",
        subheadline:
          "Un centre de commandement centralisé et en temps réel qui connecte chaque actif de stationnement dans un seul écosystème intelligent.",
        problemTitle: "Des opérations sans visibilité.",
        problemDesc:
          "La plupart des opérateurs gèrent leurs actifs à l'aveugle — en jonglant entre des outils fragmentés, des feuilles de calcul et du matériel obsolète, sans vue unifiée des performances.",
        problems: [
          {
            title: "Aucune vue centralisée",
            desc: "KPIs, occupation, revenus et trafic sont éparpillés entre des systèmes déconnectés et des rapports manuels.",
          },
          {
            title: "Réactif, pas proactif",
            desc: "Sans données en temps réel, les opérateurs ne font que réagir aux problèmes — sans pouvoir les anticiper.",
          },
          {
            title: "Changements de prix manuels",
            desc: "Modifier les tarifs demande de se connecter au matériel, se déplacer sur site ou appeler une équipe — des heures perdues chaque semaine.",
          },
          {
            title: "Dépendance aux fournisseurs",
            desc: "Chaque fournisseur a sa propre interface et son propre format. Rien ne communique ensemble.",
          },
        ],
        coreTitle: "Un tableau de bord. Contrôle total.",
        coreDesc:
          "Dashboard Manager est la source de vérité unique pour toutes les opérations de stationnement — entièrement à distance, en temps réel, et profondément intégré à l’écosystème Parkwize.",
        corePoints: [
          "90+ KPIs en direct couvrant occupation, revenus, trafic, cartes thermiques et conversion — mis à jour en temps réel.",
          "Moteur de tarification dynamique avec automatisation calendrier, déclencheurs d’événements et ajustements selon la demande.",
          "Contrôle à distance des prix, fermetures, événements et règles opérationnelles — depuis n’importe où, sur tout appareil.",
          "Intégrations profondes avec les principaux matériels parking : Process, TIBA, Global, Scheidt & Bachmann, et plus.",
          "Tous les produits Parkwize — Display, Booking, AI — sont pilotés depuis le Dashboard.",
        ],
        features: [
          {
            icon: BarChart3,
            title: "90+ KPIs en direct",
            desc: "Occupation, revenus, trafic, cartes thermiques — toutes les métriques dont vous avez besoin, en temps réel sur tous les sites.",
          },
          {
            icon: Activity,
            title: "Moteur de tarification dynamique",
            desc: "Automatisation par calendrier, déclencheurs d’événements et prix adaptatifs — configurables depuis une seule interface.",
          },
          {
            icon: Settings,
            title: "Contrôle opérationnel à distance",
            desc: "Ouvrir/fermer des lots, ajuster les tarifs, lancer des événements et gérer les fermetures à distance.",
          },
          {
            icon: Layers,
            title: "Intégrations matérielles",
            desc: "Connectez Process, TIBA, Global, Scheidt & Bachmann et d’autres systèmes matériels majeurs.",
          },
          {
            icon: Monitor,
            title: "Gestion multi-sites",
            desc: "Vue unifiée sur un nombre illimité de stationnements. Comparez, benchmarkez et optimisez à l’échelle portefeuille.",
          },
          {
            icon: Zap,
            title: "Flux d’automatisation",
            desc: "Créez des workflows automatiques déclenchés par seuils d’occupation, règles temporelles ou événements externes.",
          },
        ],
        ecosystemTitle: "Connecté à tout.",
        ecosystemDesc:
          "Dashboard Manager est le hub central où chaque produit Parkwize communique et se coordonne.",
        ecosystemLinks: [
          {
            title: "Parkwize Display",
            desc: "Tarifs et disponibilités du dashboard poussés instantanément vers les affichages physiques.",
            href: "/product/display",
          },
          {
            title: "Parkwize Booking",
            desc: "Les données de réservation sont synchronisées en temps réel avec les tableaux opérationnels.",
            href: "/product/booking",
          },
          {
            title: "Parkwize AI",
            desc: "Les recommandations IA de tarification sont appliquées directement via le dashboard.",
            href: "/product/ai",
          },
        ],
        impacts: [
          {
            stat: "+35%",
            label: "Croissance des revenus",
            desc: "Hausse moyenne avec la tarification dynamique",
          },
          {
            stat: "10×",
            label: "Décisions plus rapides",
            desc: "Les données temps réel remplacent l’intuition",
          },
          {
            stat: "90+",
            label: "KPIs en direct",
            desc: "Visibilité opérationnelle complète",
          },
          {
            stat: "0",
            label: "Visite site requise",
            desc: "Contrôle opérationnel 100% à distance",
          },
        ],
      }
    : {
        badge: "Parkwize Dashboard Manager",
        headline: "The Operational Brain",
        headlineAccent: "of Modern Parking.",
        subheadline:
          "A centralized, real-time command center connecting every parking asset into one intelligent ecosystem.",
        problemTitle: "Operations without visibility.",
        problemDesc:
          "Most parking operators manage their assets blindly — juggling fragmented tools, spreadsheets, and outdated hardware with no unified view of performance.",
        problems: [
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
        ],
        coreTitle: "One Dashboard. Total Control.",
        coreDesc:
          "Dashboard Manager is the single source of truth for every parking operation — fully remote, fully real-time, and deeply integrated with the entire Parkwize ecosystem.",
        corePoints: [
          "90+ live KPIs covering occupancy, revenue, traffic flow, heatmaps, and conversion — updated in real time.",
          "Dynamic pricing engine with calendar-based automation, event triggers, and demand-responsive adjustments.",
          "Remote control of pricing, closures, events, and operational rules — from anywhere, on any device.",
          "Deep integrations with major parking hardware: Process, TIBA, Global, Scheidt & Bachmann, and more.",
          "All Parkwize products — Display, Booking, AI — feed into and are controlled from the Dashboard.",
        ],
        features: [
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
        ],
        ecosystemTitle: "Connected to Everything.",
        ecosystemDesc:
          "Dashboard Manager is the central hub where every Parkwize product communicates and coordinates.",
        ecosystemLinks: [
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
        ],
        impacts: [
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
        ],
      };

  return (
    <ProductPageLayout
      badge={content.badge}
      headline={content.headline}
      headlineAccent={content.headlineAccent}
      heroImage={dashboardProductImg}
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
}
