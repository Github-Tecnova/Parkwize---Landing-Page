"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Cpu,
  Camera,
  Monitor,
  Settings,
  BellRing,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import hardwareImg from "@/assets/Borne_process.png";
import ProcessLogo from "@/assets/Logo_Process.png";
import ProcessKiosk from "@/assets/Borne_process.png";
import ProcessMiniKiosk from "@/assets/mini_borne_process.png";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import Link from "next/link";

const anim = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

/* --- Data --- */

const milestones = [
  {
    year: "2005",
    text: "Process Technology founded — industrial parking hardware",
  },
  { year: "2015", text: "Expansion into smart access & IoT-enabled terminals" },
  {
    year: "2023",
    text: "Strategic partnership with Parkwize for full-stack integration",
  },
  { year: "2025", text: "Next-gen hardware line co-designed with Parkwize AI" },
];

const whyPoints = [
  "20+ years of industrial parking hardware expertise",
  "IP65 certified — built for extreme weather & high traffic",
  "Native API integration with Parkwize ecosystem",
  "Modular design — scale from 1 lot to 100+ sites",
];

const solutionFeatures = [
  {
    icon: Camera,
    title: "ANPR Cameras",
    desc: "License plate recognition with 99.5% accuracy in all lighting conditions.",
  },
  {
    icon: Shield,
    title: "Access Control",
    desc: "Barriers, bollards, and gates with millisecond response times.",
  },
  {
    icon: Monitor,
    title: "Smart Terminals",
    desc: "Touchscreen payment terminals with contactless & QR support.",
  },
  {
    icon: Cpu,
    title: "IoT Sensors",
    desc: "Real-time occupancy detection per bay with LoRaWAN connectivity.",
  },
  {
    icon: Settings,
    title: "Remote Management",
    desc: "Firmware updates, diagnostics, and resets — all from the Dashboard.",
  },
  {
    icon: BellRing,
    title: "Instant Alerts",
    desc: "Predictive maintenance notifications before failures occur.",
  },
];

const products = [
  {
    name: "PT-Barrier X1",
    type: "3d" as const,
    image: null,
    description:
      "High-speed barrier with integrated ANPR and LED signage. Opens in under 1 second.",
    specs: ["Speed: <1s", "IP65 rated", "24/7 operation", "ANPR ready"],
  },
  {
    name: "PT-Terminal T3",
    type: "image" as const,
    image: null,
    description:
      "Touchscreen payment terminal with contactless, QR, and NFC support. Outdoor-rated.",
    specs: ['10" display', "NFC / QR", "Contactless pay", "Anti-vandal"],
  },
  {
    name: "PT-Sensor S2",
    type: "3d" as const,
    image: null,
    description:
      "Ultrasonic bay sensor with LoRaWAN connectivity. Detects occupancy in real time.",
    specs: ["LoRaWAN", "99.8% accuracy", "5yr battery", "Wireless"],
  },
  {
    name: "PT-Gate G4",
    type: "image" as const,
    image: null,
    description:
      "Pedestrian access gate with biometric and mobile credential support.",
    specs: ["Biometric", "Mobile access", "ADA compliant", "Anti-tailgate"],
  },
];

const PROCESS_BRANDING_FEATURES = [
  "Entry & Exit Terminals",
  "Payment Kiosks",
  "License Plate Recognition",
  "Access Control",
  "Real-time Reporting",
  "Revenue Optimization",
];

const PROCESS_BRANDING_FEATURE_POSITIONS = [
  { top: "18%", left: "8%" },
  { top: "25%", right: "10%" },
  { top: "45%", left: "5%" },
  { top: "55%", right: "6%" },
  { top: "72%", left: "12%" },
  { top: "68%", right: "12%" },
];

const PROCESS_BRANDING_ROLES = [
  "Parking Facility Manager",
  "Property Developer",
  "Municipal Authority",
  "Airport / Transit Operator",
  "Hospital / University",
  "Consultant",
  "Other",
];

type ProcessBrandingFormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  roleOther: string;
  phone: string;
  consent: boolean;
};

const processBrandingFormDefault: ProcessBrandingFormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  role: "",
  roleOther: "",
  phone: "",
  consent: false,
};

function ProcessBrandingSection() {
  const pathname = usePathname();
  const isFr = pathname.startsWith("/fr");
  const brandingFeatures = isFr
    ? [
        "Terminaux d’entrée et sortie",
        "Bornes de paiement",
        "Reconnaissance de plaques",
        "Contrôle d’accès",
        "Rapports en temps réel",
        "Optimisation des revenus",
      ]
    : PROCESS_BRANDING_FEATURES;

  const brandingRoles = isFr
    ? [
        "Gestionnaire de stationnement",
        "Promoteur immobilier",
        "Autorité municipale",
        "Opérateur aéroport / transport",
        "Hôpital / Université",
        "Consultant",
        "Autre",
      ]
    : PROCESS_BRANDING_ROLES;

  const ui = isFr
    ? {
        discover: "Découvrir nos systèmes",
        subtitle:
          "Systèmes avancés de contrôle des revenus parking — demander une consultation",
        dialogTitle: "Demander une démo",
        firstName: "Prénom",
        lastName: "Nom",
        email: "Adresse e-mail",
        company: "Nom de l'entreprise",
        role: "Votre rôle",
        otherRole: "Veuillez préciser votre rôle",
        phone: "Téléphone (optionnel)",
        submit: "Envoyer mes informations",
        consent:
          "J’accepte de recevoir des communications marketing de Process Systèmes & Technologies. Vous pouvez vous désabonner à tout moment.",
      }
    : {
        discover: "Discover Our Systems",
        subtitle:
          "Advanced Parking Revenue Control Systems — Request a Consultation",
        dialogTitle: "Request a Demo",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        company: "Company Name",
        role: "Your Role",
        otherRole: "Please specify your role",
        phone: "Phone (optional)",
        submit: "Submit My Infos",
        consent:
          "I agree to receive marketing communications from Process Systèmes & Technologies. You can unsubscribe at any time.",
      };

  const [open, setOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [form, setForm] = useState<ProcessBrandingFormState>(
    processBrandingFormDefault,
  );
  const isOtherRole = form.role === "Other" || form.role === "Autre";

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((previous) => (previous + 1) % brandingFeatures.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [brandingFeatures.length]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.firstName || !form.email) {
      return;
    }

    setOpen(false);
    setForm(processBrandingFormDefault);
  };

  return (
    <section
      id="process-contact-form"
      className="relative flex h-[88svh] flex-col overflow-hidden bg-background text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute right-[-10%] top-[-20%] h-[350px] w-[350px] rounded-full md:h-[500px] md:w-[500px] lg:h-[700px] lg:w-[700px]"
          style={{
            background:
              "radial-gradient(circle, rgba(7,88,246,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-10%] h-[300px] w-[300px] rounded-full md:h-[450px] md:w-[450px] lg:h-[600px] lg:w-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(7,88,246,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-[30%] top-[40%] h-[250px] w-[250px] rounded-full md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
          style={{
            background:
              "radial-gradient(circle, rgba(7,88,246,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="relative z-20 flex flex-col items-center justify-center pt-6 md:pt-8 lg:pt-10">
          <Image
            src={ProcessLogo}
            alt="Process Systèmes & Technologies"
            width={280}
            height={96}
            className="h-14 w-auto md:h-20 lg:h-24"
          />
        </div>

        <div className="relative -mt-6 flex min-h-0 flex-1 flex-col items-center justify-evenly px-4 md:-mt-14 md:justify-center md:px-6">
          <div className="relative z-20 mb-6 hidden translate-y-4 flex-col items-center md:flex lg:translate-y-6">
            <button
              onClick={() => setOpen(true)}
              className="border-foreground/20 bg-foreground/5 group relative rounded-full border px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-300 hover:border-parkwize_blue hover:bg-parkwize_blue/10 hover:shadow-[0_0_40px_rgba(7,88,246,0.15)] lg:px-12 lg:py-5 lg:text-base lg:tracking-[0.25em]"
            >
              {ui.discover}
            </button>
            <p className="mt-3 text-center text-sm tracking-wide text-muted-foreground">
              {ui.subtitle}
            </p>
          </div>

          <div className="mb-3 flex justify-center px-4 md:hidden">
            <span className="border-foreground/20 bg-foreground/5 text-muted-foreground/60 min-w-[250px] rounded-full border px-6 py-2.5 text-center text-[11px] font-light uppercase tracking-[0.2em]">
              {brandingFeatures[activeFeature]}
            </span>
          </div>

          <div className="-gap-4 pointer-events-none absolute inset-x-0 -top-10 bottom-0 hidden items-end justify-center md:flex lg:-space-x-4">
            <Image
              src={ProcessKiosk}
              alt=""
              width={640}
              height={1100}
              className="h-[90%] max-h-[650px] w-auto object-contain opacity-15 lg:opacity-20"
              style={{
                maskImage:
                  "radial-gradient(ellipse 90% 90% at 50% 60%, black 40%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 90% at 50% 60%, black 40%, transparent 80%)",
              }}
            />
            <Image
              src={ProcessMiniKiosk}
              alt=""
              width={560}
              height={1000}
              className="h-[90%] max-h-[650px] w-auto object-contain opacity-15 lg:opacity-20"
              style={{
                maskImage:
                  "radial-gradient(ellipse 90% 90% at 50% 60%, black 40%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 90% at 50% 60%, black 40%, transparent 80%)",
              }}
            />
          </div>

          <div className="pointer-events-none my-3 flex items-end justify-center gap-2 md:hidden">
            <Image
              src={ProcessKiosk}
              alt=""
              width={300}
              height={560}
              className="h-[35vh] max-h-[300px] w-auto object-contain opacity-20"
              style={{
                maskImage:
                  "radial-gradient(ellipse 85% 85% at 50% 50%, black 45%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 85% 85% at 50% 50%, black 45%, transparent 75%)",
              }}
            />
            <Image
              src={ProcessMiniKiosk}
              alt=""
              width={240}
              height={460}
              className="h-[28vh] max-h-[240px] w-auto object-contain opacity-20"
              style={{
                maskImage:
                  "radial-gradient(ellipse 85% 85% at 50% 50%, black 45%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 85% 85% at 50% 50%, black 45%, transparent 75%)",
              }}
            />
          </div>

          <div className="absolute inset-0 hidden md:block">
            {brandingFeatures.map((feature, index) => (
              <motion.span
                key={feature}
                className="text-muted-foreground/70 hover:text-foreground/90 absolute cursor-default text-xs font-light uppercase tracking-widest transition-colors duration-300 lg:text-sm"
                style={PROCESS_BRANDING_FEATURE_POSITIONS[index]}
                animate={{ y: [0, -10, 0, 10, 0], x: [0, 3, 0, -3, 0] }}
                transition={{
                  duration: 6 + index,
                  delay: index * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {feature}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-col items-center md:hidden">
            <button
              onClick={() => setOpen(true)}
              className="border-foreground/20 bg-foreground/5 group relative rounded-full border px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] backdrop-blur-sm transition-all duration-300 hover:border-parkwize_blue hover:bg-parkwize_blue/10 hover:shadow-[0_0_40px_rgba(7,88,246,0.15)]"
            >
              {ui.discover}
            </button>
            <p className="mt-2 whitespace-nowrap text-center text-[9px] tracking-wide text-muted-foreground">
              {ui.subtitle}
            </p>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-foreground/10 max-w-md rounded-2xl border bg-white p-8 shadow-[0_0_60px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
          <DialogTitle className="sr-only">{ui.dialogTitle}</DialogTitle>
          <div className="mb-6 flex justify-center">
            <Image
              src={ProcessLogo}
              alt="Process Systèmes & Technologies"
              width={180}
              height={48}
              className="h-12 w-auto"
            />
          </div>

          <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={ui.firstName}
                value={form.firstName}
                onChange={(event) =>
                  setForm({ ...form, firstName: event.target.value })
                }
                className="border-foreground/20 placeholder:text-muted-foreground/50 focus:border-foreground/50 border-b bg-transparent pb-3 text-base text-foreground transition-colors focus:outline-none md:pb-2 md:text-sm"
                required
              />
              <input
                type="text"
                placeholder={ui.lastName}
                value={form.lastName}
                onChange={(event) =>
                  setForm({ ...form, lastName: event.target.value })
                }
                className="border-foreground/20 placeholder:text-muted-foreground/50 focus:border-foreground/50 border-b bg-transparent pb-3 text-base text-foreground transition-colors focus:outline-none md:pb-2 md:text-sm"
              />
            </div>

            <input
              type="email"
              placeholder={ui.email}
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              className="border-foreground/20 placeholder:text-muted-foreground/50 focus:border-foreground/50 w-full border-b bg-transparent pb-3 text-base text-foreground transition-colors focus:outline-none md:pb-2 md:text-sm"
              required
            />

            <input
              type="text"
              placeholder={ui.company}
              value={form.company}
              onChange={(event) =>
                setForm({ ...form, company: event.target.value })
              }
              className="border-foreground/20 placeholder:text-muted-foreground/50 focus:border-foreground/50 w-full border-b bg-transparent pb-3 text-base text-foreground transition-colors focus:outline-none md:pb-2 md:text-sm"
            />

            <select
              value={form.role}
              onChange={(event) =>
                setForm({
                  ...form,
                  role: event.target.value,
                  roleOther:
                    event.target.value !== "Other" &&
                    event.target.value !== "Autre"
                      ? ""
                      : form.roleOther,
                })
              }
              className={`border-foreground/20 focus:border-foreground/50 w-full border-b bg-transparent pb-3 text-base transition-colors focus:outline-none md:pb-2 md:text-sm ${form.role ? "text-foreground" : "text-muted-foreground/50"}`}
            >
              <option
                value=""
                disabled
                className="bg-background text-foreground"
              >
                {ui.role}
              </option>
              {brandingRoles.map((role) => (
                <option
                  key={role}
                  value={role}
                  className="bg-background text-foreground"
                >
                  {role}
                </option>
              ))}
            </select>

            {isOtherRole && (
              <input
                type="text"
                placeholder={ui.otherRole}
                value={form.roleOther}
                onChange={(event) =>
                  setForm({ ...form, roleOther: event.target.value })
                }
                className="border-foreground/20 placeholder:text-muted-foreground/50 focus:border-foreground/50 w-full border-b bg-transparent pb-3 text-base text-foreground transition-colors focus:outline-none md:pb-2 md:text-sm"
              />
            )}

            <input
              type="tel"
              placeholder={ui.phone}
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
              className="border-foreground/20 placeholder:text-muted-foreground/50 focus:border-foreground/50 w-full border-b bg-transparent pb-3 text-base text-foreground transition-colors focus:outline-none md:pb-2 md:text-sm"
            />

            <button
              type="submit"
              className="border-foreground/20 bg-foreground/5 hover:bg-foreground/10 mt-2 w-full rounded-full border py-4 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors md:py-3"
            >
              {ui.submit}
            </button>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) =>
                  setForm({ ...form, consent: event.target.checked })
                }
                className="mt-1 accent-parkwize_blue"
              />
              <span className="text-muted-foreground/60 text-[11px] leading-relaxed">
                {ui.consent}
              </span>
            </label>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* --- Page --- */

const Hardware = () => {
  const pathname = usePathname();
  const isFr = pathname.startsWith("/fr");

  const localizedMilestones = isFr
    ? [
        {
          year: "2005",
          text: "Fondation de Process Technology — matériel de stationnement industriel",
        },
        {
          year: "2015",
          text: "Expansion vers l’accès intelligent et les terminaux IoT",
        },
        {
          year: "2023",
          text: "Partenariat stratégique avec Parkwize pour une intégration full-stack",
        },
        {
          year: "2025",
          text: "Nouvelle gamme matérielle co-conçue avec Parkwize IA",
        },
      ]
    : milestones;

  const localizedWhyPoints = isFr
    ? [
        "20+ ans d’expertise en matériel de stationnement industriel",
        "Certifié IP65 — conçu pour conditions extrêmes et fort trafic",
        "Intégration API native avec l’écosystème Parkwize",
        "Design modulaire — de 1 lot à 100+ sites",
      ]
    : whyPoints;

  const localizedSolutionFeatures = isFr
    ? [
        {
          icon: Camera,
          title: "Caméras LAPI",
          desc: "Reconnaissance de plaques avec 99,5% de précision, quelles que soient les conditions lumineuses.",
        },
        {
          icon: Shield,
          title: "Contrôle d’accès",
          desc: "Barrières, bornes et portails avec temps de réponse en millisecondes.",
        },
        {
          icon: Monitor,
          title: "Terminaux intelligents",
          desc: "Terminaux de paiement tactiles avec support sans contact et QR.",
        },
        {
          icon: Cpu,
          title: "Capteurs IoT",
          desc: "Détection d’occupation en temps réel par place avec connectivité LoRaWAN.",
        },
        {
          icon: Settings,
          title: "Gestion à distance",
          desc: "Mises à jour firmware, diagnostics et redémarrages — depuis le Dashboard.",
        },
        {
          icon: BellRing,
          title: "Alertes instantanées",
          desc: "Notifications de maintenance prédictive avant les pannes.",
        },
      ]
    : solutionFeatures;

  const localizedProducts = isFr
    ? [
        {
          name: "PT-Barrier X1",
          type: "3d" as const,
          image: null,
          description:
            "Barrière haute vitesse avec LAPI intégrée et signalisation LED. Ouverture en moins d’une seconde.",
          specs: ["Vitesse : <1s", "IP65", "Opération 24/7", "Prêt pour LAPI"],
        },
        {
          name: "PT-Terminal T3",
          type: "image" as const,
          image: null,
          description:
            "Terminal de paiement tactile avec support sans contact, QR et NFC. Conçu pour l’extérieur.",
          specs: [
            'Écran 10"',
            "NFC / QR",
            "Paiement sans contact",
            "Anti-vandale",
          ],
        },
        {
          name: "PT-Sensor S2",
          type: "3d" as const,
          image: null,
          description:
            "Capteur ultrasonique avec connectivité LoRaWAN. Détection d’occupation en temps réel.",
          specs: ["LoRaWAN", "99,8% précision", "Batterie 5 ans", "Sans fil"],
        },
        {
          name: "PT-Gate G4",
          type: "image" as const,
          image: null,
          description:
            "Portillon piéton avec biométrie et gestion d’identifiants mobiles.",
          specs: ["Biométrie", "Accès mobile", "Conforme ADA", "Anti-tailgate"],
        },
      ]
    : products;

  const ui = isFr
    ? {
        partnerBadge: "Partenaire matériel — Process Technology",
        heroTitle: "Matériel de grade industriel,",
        heroTitleAccent: "intelligent par conception.",
        heroDescription:
          "Parkwize s’intègre nativement avec Process Technology — barrières, terminaux, capteurs et contrôle d’accès conçus pour la nouvelle génération du stationnement.",
        requestDemo: "Demander une démo privée",
        downloadSpecs: "Télécharger les spécifications",
        aboutTag: "À propos de Process Technology",
        aboutTitle: "20+ ans d’infrastructure parking",
        aboutDescription:
          "Process Technology conçoit des équipements de stationnement industriels depuis 2005. Aujourd’hui, l’entreprise équipe des milliers de sites en Europe avec un matériel fiable, scalable et connecté.",
        milestonesTitle: "Étapes clés",
        whyTitle: "Pourquoi Process Technology",
        solutionsTag: "Nos solutions",
        integratedPlatform: "Plateforme intégrée",
        solutionsDescription:
          "Un écosystème matériel complet qui se connecte parfaitement à chaque module logiciel Parkwize — du contrôle d’accès à l’analytique pilotée par IA.",
        compatibility:
          "✦ Compatible à 100% avec Parkwize Dashboard, Booking, Display et IA",
        equipmentTag: "Nos équipements",
        equipmentTitle: "Gamme de produits",
        equipmentTitleAccent: "matériels",
        equipmentDescription:
          "Des équipements de grade industriel conçus pour la fiabilité. Certains produits proposent des modèles 3D interactifs, d’autres des visuels haute résolution.",
        model3d: "Modèle 3D",
        gallery: "Galerie",
        finalTag: "Construisons ensemble",
        finalTitle:
          "Le meilleur matériel pour s’intégrer au meilleur logiciel.",
        finalDescription:
          "Découvrez comment Process Technology × Parkwize livrent une stack parking intelligente et intégrée — de la barrière au dashboard.",
      }
    : {
        partnerBadge: "Hardware Partner — Process Technology",
        heroTitle: "Industrial-Grade Hardware,",
        heroTitleAccent: "Intelligent by Design.",
        heroDescription:
          "Parkwize integrates natively with Process Technology — barriers, terminals, sensors, and access control built for the next generation of parking.",
        requestDemo: "Request Private Demo",
        downloadSpecs: "Download Specs",
        aboutTag: "About Process Technology",
        aboutTitle: "20+ Years of Parking Infrastructure",
        aboutDescription:
          "Process Technology has been engineering industrial-grade parking equipment since 2005. Today, they power thousands of facilities across Europe with hardware designed for reliability, scalability, and smart connectivity.",
        milestonesTitle: "Key Milestones",
        whyTitle: "Why Process Technology",
        solutionsTag: "Our Solutions",
        integratedPlatform: "Integrated Platform",
        solutionsDescription:
          "A complete hardware ecosystem that connects seamlessly with every Parkwize software module — from access control to AI-powered analytics.",
        compatibility:
          "✦ Fully compatible with Parkwize Dashboard, Booking, Display & AI",
        equipmentTag: "Our Equipment",
        equipmentTitle: "Hardware",
        equipmentTitleAccent: "Product Line",
        equipmentDescription:
          "Industrial-grade equipment engineered for reliability. Some products feature interactive 3D models — others showcase high-resolution imagery.",
        model3d: "3D Model",
        gallery: "Gallery",
        finalTag: "Let's Build Together",
        finalTitle: "The Best Hardware to Fit with the Best Software.",
        finalDescription:
          "Discover how Process Technology × Parkwize delivers a fully integrated, intelligent parking stack — from barrier to dashboard.",
      };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background blurs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-parkwize_blue/5 blur-[120px]" />
        <div className="bg-parkwize_blue/4 absolute -right-60 top-[40%] h-[500px] w-[500px] rounded-full blur-[140px]" />
        <div className="bg-parkwize_blue/3 absolute bottom-0 left-[10%] h-[400px] w-[400px] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="relative px-6 pb-20 pt-10 lg:pt-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div {...anim}>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="inline-block bg-parkwize_blue/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-parkwize_blue">
                    {ui.partnerBadge}
                  </span>
                  <Image
                    src="/processlogo.svg"
                    alt="Process Technology logo"
                    width={140}
                    height={32}
                    className="mb-5 h-10 w-auto"
                  />
                </div>
                <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                  {ui.heroTitle}{" "}
                  <span className="text-parkwize_blue">
                    {ui.heroTitleAccent}
                  </span>
                </h1>
                <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
                  {ui.heroDescription}
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-none bg-parkwize_blue px-8 text-base text-white hover:bg-parkwize_blue/90"
                  >
                    <Link href="#process-contact-form">
                      {ui.requestDemo} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="overflow-hidden rounded-2xl shadow-parkwize_blue/10">
                  <Image
                    src={ProcessMiniKiosk} //hardwareImg
                    alt="Process Technology hardware"
                    className="h-auto w-full"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT / MILESTONES ===== */}
        <section className="bg-secondary/50 px-6 py-14 md:py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div {...anim} className="mb-16 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-parkwize_blue">
                {ui.aboutTag}
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
                {ui.aboutTitle}
              </h2>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {ui.aboutDescription}
              </p>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Milestones */}
              <motion.div {...anim} transition={{ delay: 0.1 }}>
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <span className="h-6 w-1.5 rounded-full bg-parkwize_blue" />
                  {ui.milestonesTitle}
                </h3>
                <div className="space-y-4">
                  {localizedMilestones.map((m, i) => (
                    <motion.div
                      key={m.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <span className="mt-0.5 shrink-0 bg-parkwize_blue/10 px-2.5 py-1 text-sm font-bold text-parkwize_blue">
                        {m.year}
                      </span>
                      <p className="text-muted-foreground">{m.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Why Process Technology */}
              <motion.div {...anim} transition={{ delay: 0.2 }}>
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <span className="h-6 w-1.5 rounded-full bg-parkwize_blue" />
                  {ui.whyTitle}
                </h3>
                <div className="space-y-3">
                  {localizedWhyPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-parkwize_blue/10">
                        <Check className="h-3 w-3 text-parkwize_blue" />
                      </div>
                      <p className="text-muted-foreground">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== SOLUTIONS / FEATURES ===== */}
        <section className="bg-[#14181f] px-6 py-14 md:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div {...anim} className="mb-4 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-parkwize_blue">
                {ui.solutionsTag}
              </p>
              <div className="mb-6 flex items-center justify-center gap-3">
                <Cpu className="h-6 w-6 text-parkwize_blue" />
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                  {ui.integratedPlatform}
                </h2>
              </div>
              <p className="mx-auto mb-16 max-w-3xl text-lg leading-relaxed text-[#a1a2a5]">
                {ui.solutionsDescription}
              </p>
            </motion.div>

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {localizedSolutionFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group border border-[#ffffff1a] bg-[#ffffff0d] p-8 transition-all duration-300 hover:border-parkwize_blue/40 hover:shadow-lg hover:shadow-parkwize_blue/5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                    <f.icon className="h-6 w-6 text-parkwize_blue" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#a1a2a5]">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div {...anim} className="text-center">
              <span className="inline-block bg-parkwize_blue/10 px-4 py-2 text-sm font-medium text-parkwize_blue">
                {ui.compatibility}
              </span>
            </motion.div>
          </div>
        </section>

        {/* ===== IoT SECTION ===== */}
        {/* <section className="py-24 px-6 bg-secondary/50">
          <div className="max-w-7xl mx-auto">
            <motion.div {...anim} className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-parkwize_blue mb-3">
                IoT & Connectivity
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Every Device,{" "}
                <span className="text-parkwize_blue">Always Connected</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Process Technology hardware is IoT-native — streaming telemetry,
                receiving commands, and self-diagnosing 24/7.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {iotFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center p-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-parkwize_blue/10 flex items-center justify-center mx-auto mb-4">
                    <f.icon className="w-7 h-7 text-parkwize_blue" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ===== PRODUCT SHOWCASE ===== */}
        <section className="px-6 py-14 md:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div {...anim} className="mb-16 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-parkwize_blue">
                {ui.equipmentTag}
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                {ui.equipmentTitle}{" "}
                <span className="text-parkwize_blue">
                  {ui.equipmentTitleAccent}
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {ui.equipmentDescription}
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {localizedProducts.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-parkwize_blue/40 hover:shadow-xl hover:shadow-parkwize_blue/5"
                >
                  {/* Product visual */}
                  <div className="bg-secondary/50 relative aspect-[4/3] overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-secondary" />
                    )}
                    {product.type === "3d" && (
                      <div className="absolute right-4 top-4 rounded-full bg-parkwize_blue/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                        {ui.model3d}
                      </div>
                    )}
                    {product.type === "image" && (
                      <div className="bg-card/90 absolute right-4 top-4 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm">
                        {ui.gallery}
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="p-6 lg:p-8">
                    <h3 className="mb-2 text-xl font-bold">{product.name}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.specs.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SUPPORT 24/7 ===== */}
        {/* <section className="py-24 px-6 bg-secondary/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...anim}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <Headphones className="w-6 h-6 text-parkwize_blue" />
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Support 24/7
                </h2>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 mt-12 mb-10">
              {supportCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6 text-left"
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div {...anim}>
              <p className="text-sm font-semibold text-parkwize_blue uppercase tracking-widest mb-2">
                Peace of Mind
              </p>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Every Process Technology deployment includes comprehensive
                support — so your parking infrastructure runs flawlessly,
                always.
              </p>
            </motion.div>
          </div>
        </section> */}

        {/* ===== FINAL CTA ===== */}
        <section className="bg-parkwize_blue px-6 py-10 md:py-12">
          <motion.div
            {...anim}
            className="mx-auto rounded-3xl p-12 px-0 text-center md:p-16 lg:px-12"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-white/70">
              {ui.finalTag}
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {ui.finalTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/80">
              {ui.finalDescription}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="px-8 text-base"
              >
                <Link href="#process-contact-form">
                  {ui.requestDemo} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

        <ProcessBrandingSection />
      </div>
    </div>
  );
};

export default Hardware;
