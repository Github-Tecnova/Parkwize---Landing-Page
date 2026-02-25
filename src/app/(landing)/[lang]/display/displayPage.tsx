"use client";

import { Monitor, Wifi, MapPin, AlertCircle, Eye, Zap } from "lucide-react";
import ProductPageLayout from "../../../../components/ProductPageLayout";
import displayImage from "@/assets/landing-tvs.png";
import { usePathname } from "next/navigation";

const ProductDisplay = () => {
  const pathname = usePathname();
  const isFr = pathname.startsWith("/fr");

  const content = isFr
    ? {
        badge: "Parkwize Display",
        headline: "Des données connectées",
        headlineAccent: "au monde physique.",
        subheadline:
          "Transformer la signalisation parking statique en un système intelligent et dynamique d’aide à la décision.",
        problemTitle: "Des panneaux statiques dans un monde dynamique.",
        problemDesc:
          "La signalisation parking n’a presque pas évolué depuis des décennies : prix fixes, mises à jour manuelles, aucun lien avec la donnée temps réel.",
        problems: [
          {
            title: "Informations obsolètes",
            desc: "Les panneaux statiques affichent des prix et disponibilités vieux de plusieurs heures ou jours.",
          },
          {
            title: "Mises à jour manuelles",
            desc: "Changer un prix ou un message implique une intervention sur site ou un appel fournisseur, à chaque fois.",
          },
          {
            title: "Aucune réponse à la demande",
            desc: "Les panneaux ne réagissent pas à l’occupation, aux événements ou aux changements de prix en temps réel.",
          },
          {
            title: "Zéro intelligence",
            desc: "La signalisation traditionnelle ne peut ni rediriger le trafic, ni basculer en mode complet, ni adapter les messages.",
          },
        ],
        coreTitle: "Signalisation intelligente, zéro effort.",
        coreDesc:
          "Parkwize Display relie l’intelligence numérique à l’infrastructure physique — en mettant à jour automatiquement prix, disponibilité et messages selon les données temps réel.",
        corePoints: [
          "Prix et disponibilité en direct sur les panneaux physiques, synchronisés automatiquement depuis Dashboard Manager.",
          "Mode complet automatique lorsque le seuil d’occupation est atteint — sans intervention manuelle.",
          "Messages directionnels basés sur l’occupation pour guider les conducteurs vers les places disponibles.",
          "Mises à jour instantanées déclenchées par les changements de données : tarifs, fermetures, événements, pics de demande.",
          "Déploiement de la tarification dynamique sur l’infrastructure physique sans processus manuel ni présence sur site.",
        ],
        features: [
          {
            icon: Monitor,
            title: "Affichage des prix dynamiques",
            desc: "Affichez les prix en temps réel sur les panneaux physiques, synchronisés automatiquement avec le moteur de pricing.",
          },
          {
            icon: AlertCircle,
            title: "Mode complet automatique",
            desc: "Quand l’occupation atteint le seuil, le message bascule automatiquement en mode complet.",
          },
          {
            icon: MapPin,
            title: "Messages directionnels",
            desc: "Guide les conducteurs vers les places disponibles ou des lots alternatifs selon l’occupation en direct.",
          },
          {
            icon: Wifi,
            title: "Synchronisation temps réel",
            desc: "Chaque écran est connecté à l’écosystème Parkwize. Les changements se propagent instantanément.",
          },
          {
            icon: Eye,
            title: "Gestion à distance",
            desc: "Contrôlez tous les écrans depuis le Dashboard : messages, overrides, campagnes planifiées.",
          },
          {
            icon: Zap,
            title: "Mises à jour déclenchées par événements",
            desc: "Adaptation automatique pendant concerts, événements sportifs ou heures de pointe selon les données externes.",
          },
        ],
        ecosystemTitle: "Le pont entre digital et physique.",
        ecosystemDesc:
          "Display transforme les données de l’écosystème Parkwize en infrastructure visuelle du monde réel.",
        ecosystemLinks: [
          {
            title: "Parkwize Dashboard",
            desc: "Tout le contenu affiché est piloté et poussé depuis Dashboard Manager.",
            href: "/product/dashboard",
          },
          {
            title: "Parkwize Booking",
            desc: "La disponibilité de réservation est reflétée sur les panneaux physiques en temps réel.",
            href: "/product/booking",
          },
          {
            title: "Parkwize AI",
            desc: "Les décisions de prix pilotées par l’IA apparaissent automatiquement sur les écrans.",
            href: "/product/ai",
          },
        ],
        impacts: [
          {
            stat: "+25%",
            label: "Hausse des revenus",
            desc: "Tarification dynamique sur signalisation physique",
          },
          {
            stat: "0",
            label: "Mise à jour manuelle",
            desc: "Signalisation entièrement automatisée",
          },
          {
            stat: "<1s",
            label: "Vitesse de mise à jour",
            desc: "Propagation des données en temps réel",
          },
          {
            stat: "∞",
            label: "Scalabilité",
            desc: "Nombre illimité d’écrans connectés",
          },
        ],
      }
    : {
        badge: "Parkwize Display",
        headline: "Data Connected to",
        headlineAccent: "the Physical World.",
        subheadline:
          "Transforming static parking signage into intelligent, dynamic decision systems.",
        problemTitle: "Static signs in a dynamic world.",
        problemDesc:
          "Parking signage hasn't evolved in decades. Fixed prices, manual updates, and no connection to real-time data — leaving revenue and efficiency on the table.",
        problems: [
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
        ],
        coreTitle: "Intelligent Signage, Zero Effort.",
        coreDesc:
          "Parkwize Display bridges digital intelligence and real-world infrastructure — automatically updating pricing, availability, and messaging based on real-time data.",
        corePoints: [
          "Live pricing and availability displayed on physical signs, updated automatically from the Dashboard Manager.",
          "Automatic sold-out mode triggered when occupancy thresholds are reached — no manual intervention.",
          "Directional messaging based on occupancy data — guide drivers to available spaces intelligently.",
          "Instant updates triggered by real-time data changes: pricing adjustments, closures, events, or demand shifts.",
          "Deploy dynamic pricing on physical infrastructure without any manual process or on-site presence.",
        ],
        features: [
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
        ],
        ecosystemTitle: "The Bridge Between Digital and Physical.",
        ecosystemDesc:
          "Display transforms data from the Parkwize ecosystem into real-world visual infrastructure.",
        ecosystemLinks: [
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
        ],
        impacts: [
          {
            stat: "+25%",
            label: "Revenue Uplift",
            desc: "Dynamic pricing on physical signs",
          },
          {
            stat: "0",
            label: "Manual Updates",
            desc: "Fully automated signage",
          },
          {
            stat: "<1s",
            label: "Update Speed",
            desc: "Real-time data propagation",
          },
          {
            stat: "∞",
            label: "Scalability",
            desc: "Unlimited connected displays",
          },
        ],
      };

  return (
    <ProductPageLayout
      badge={content.badge}
      headline={content.headline}
      headlineAccent={content.headlineAccent}
      heroImage={displayImage}
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

export default ProductDisplay;
