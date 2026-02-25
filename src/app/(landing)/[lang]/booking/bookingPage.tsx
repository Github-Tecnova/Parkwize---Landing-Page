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
import { usePathname } from "next/navigation";

const ProductBooking = () => {
  const pathname = usePathname();
  const isFr = pathname.startsWith("/fr");

  const content = isFr
    ? {
        badge: "Parkwize Réservation",
        headline: "Une plateforme de réservation",
        headlineAccent: "moderne orientée conversion.",
        subheadline:
          "Conçue pour capter la demande et la convertir efficacement — le Shopify + Stripe de la réservation parking.",
        problemTitle: "Des expériences de réservation bloquées en 2005.",
        problemDesc:
          "La plupart des systèmes sont lents, peu ergonomiques et mal adaptés au mobile. Ils perdent des clients à chaque étape du tunnel.",
        problems: [
          {
            title: "Expérience mobile médiocre",
            desc: "Des interfaces obsolètes non optimisées pour le mobile, alors que 70%+ des recherches parking s’y font.",
          },
          {
            title: "Parcours de paiement trop longs",
            desc: "Formulaires multi-étapes, création de compte obligatoire et absence de paiements modernes comme Apple Pay/Google Pay.",
          },
          {
            title: "Mauvaise performance SEO",
            desc: "La plupart des plateformes de réservation sont invisibles sur Google — la demande est perdue avant même d’arriver.",
          },
          {
            title: "Aucune synchro temps réel",
            desc: "Les données de réservation restent en silo, déconnectées de la tarification, de l’occupation et des opérations.",
          },
        ],
        coreTitle: "Pensé pour convertir.",
        coreDesc:
          "Parkwize Booking est une plateforme moderne conçue pour la vitesse, la conversion et une intégration complète à l’écosystème Parkwize.",
        corePoints: [
          "Parcours mobile-first ultra-rapide conçu pour maximiser la conversion à chaque étape.",
          "Intégration Apple Pay et Google Pay pour un paiement en un geste.",
          "Accès par QR code — sans ticket, sans barrière, sans friction.",
          "Entièrement brandable — expérience de réservation à votre image.",
          "Synchronisation en temps réel avec Dashboard Manager pour disponibilité et prix exacts.",
          "Architecture SEO optimisée pour surperformer les concurrents sur Google.",
        ],
        features: [
          {
            icon: Smartphone,
            title: "UX mobile-first",
            desc: "Conçu pour le mobile, là où 70%+ des utilisateurs recherchent et réservent.",
          },
          {
            icon: CreditCard,
            title: "Apple Pay & Google Pay",
            desc: "Paiement en un clic avec des méthodes modernes — moins de friction, plus de conversion.",
          },
          {
            icon: QrCode,
            title: "Accès par QR",
            desc: "Le QR code remplace le ticket physique. Scannez et entrez instantanément.",
          },
          {
            icon: Palette,
            title: "Entièrement personnalisable",
            desc: "Pages en marque blanche alignées avec l’identité, le domaine et le style de l’opérateur.",
          },
          {
            icon: Search,
            title: "SEO optimisé",
            desc: "Architecture SEO intégrée pour capter la demande organique sur Google.",
          },
          {
            icon: CalendarCheck,
            title: "Synchro temps réel",
            desc: "Disponibilité et tarifs toujours à jour, synchronisés en direct avec Dashboard Manager.",
          },
        ],
        ecosystemTitle: "La porte d’entrée des revenus digitaux.",
        ecosystemDesc:
          "Booking capte la demande en ligne et l’injecte directement dans l’écosystème opérationnel Parkwize.",
        ecosystemLinks: [
          {
            title: "Parkwize Dashboard",
            desc: "Les données de réservation et les revenus remontent directement dans le dashboard opérationnel.",
            href: "/product/dashboard",
          },
          {
            title: "Parkwize Display",
            desc: "La disponibilité de réservation est reflétée en temps réel sur les affichages physiques.",
            href: "/product/display",
          },
          {
            title: "Parkwize AI",
            desc: "L’IA optimise les prix de réservation selon la demande et les prévisions.",
            href: "/product/ai",
          },
        ],
        impacts: [
          {
            stat: "+40%",
            label: "Taux de conversion",
            desc: "vs plateformes legacy",
          },
          {
            stat: "<30s",
            label: "Temps de réservation",
            desc: "De la recherche à la confirmation",
          },
          {
            stat: "+60%",
            label: "Réservations mobiles",
            desc: "Le mobile-first capte plus de demande",
          },
          {
            stat: "24/7",
            label: "Capture de revenus",
            desc: "Passerelle de réservation toujours active",
          },
        ],
      }
    : {
        badge: "Parkwize Booking",
        headline: "A Modern, Conversion-Driven",
        headlineAccent: "Parking Reservation Platform.",
        subheadline:
          "Built to capture demand and convert it efficiently — the Shopify + Stripe of parking reservations.",
        problemTitle: "Booking experiences stuck in 2005.",
        problemDesc:
          "Most parking booking systems are slow, clunky, and mobile-hostile. They lose customers at every step of the funnel — from search to payment.",
        problems: [
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
        ],
        coreTitle: "Designed to Convert.",
        coreDesc:
          "Parkwize Booking is a modern reservation platform engineered for speed, conversion, and seamless integration with the entire Parkwize ecosystem.",
        corePoints: [
          "Mobile-first, ultra-fast booking flow designed for maximum conversion at every step.",
          "Apple Pay and Google Pay integration for frictionless one-tap checkout.",
          "QR-based access codes — no tickets, no barriers, no friction for end users.",
          "Fully brandable — operators deploy their own branded booking experience.",
          "Real-time sync with Dashboard Manager for live availability and pricing accuracy.",
          "Built for SEO — optimized to outperform competitors on Google search results.",
        ],
        features: [
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
        ],
        ecosystemTitle: "The Digital Revenue Gateway.",
        ecosystemDesc:
          "Booking captures online demand and feeds it directly into the Parkwize operational ecosystem.",
        ecosystemLinks: [
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
        ],
        impacts: [
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
        ],
      };

  return (
    <ProductPageLayout
      badge={content.badge}
      headline={content.headline}
      headlineAccent={content.headlineAccent}
      heroVideo="/parkwize-booking-video.mp4"
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

export default ProductBooking;
