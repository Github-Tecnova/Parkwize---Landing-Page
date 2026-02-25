/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

/*
 * Copyright (c) 2025. Tecnova
 */

import React, { useEffect, useMemo, useState } from "react";
import { DictionaryType } from "@/content/dictionary";
import Image from "next/image";
import { cn, formatCAD, formatNumber } from "@/lib/utils";
import {
  GlobeIcon,
  LucideActivity,
  LucideAirplay,
  LucideAlertTriangle,
  LucideArrowRight,
  LucideArrowUpRight,
  LucideBarChart,
  LucideBarChart3,
  LucideBrain,
  LucideCalendar,
  LucideCalendarDays,
  LucideChartColumn,
  LucideCloudSun,
  LucideClock,
  LucideCpu,
  LucideDollarSign,
  LucideGlobe,
  LucideHardDrive,
  LucideInfo,
  LucideInstagram,
  LucideLineChart,
  LucideMail,
  LucideMapPin,
  LucideMessageCircle,
  LucideMonitor,
  LucideMonitorSmartphone,
  LucidePieChart,
  LucideRepeat,
  LucideSettings2,
  LucideShield,
  LucideSparkle,
  LucideTrendingUp,
  LucideUpload,
  LucideUsers,
} from "lucide-react";
import Link from "@/components/custom-ui/link";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useFonts } from "@/components/providers/fonts-provider";
import { useTranslation } from "@/hooks/translation-hook";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import LogoParkwize from "@/assets/parkwize_logo_tr.png";
import IconLogoParkwize from "@/assets/Iconlogo_Parkwize.png";
import MacBookProM4 from "@/assets/MacBook_Pro_M4.png";
/* import MultiChart from "@/components/charts/multi-chart"; */
import { subDays } from "date-fns";

const stats = [
  {
    id: 0,
    Icon: LucideActivity,
    val: "90+",
    text: "Live KPIs",
  },
  {
    id: 1,
    Icon: LucideBarChart3,
    val: "20+",
    text: "Parking Lots Managed",
  },
  {
    id: 2,
    Icon: LucideUsers,
    val: "50k+",
    text: "Daily Data Events",
  },
  {
    id: 3,
    Icon: LucideDollarSign,
    val: "$15M+",
    text: "Revenue Processed",
  },
];

const visions = [
  {
    id: 0,
    title: "+35%|Revenue Growth",
    description: "Average revenue uplift with AI-driven dynamic pricing",
  },
  {
    id: 1,
    title: "10x|Operational Speed",
    description: "Faster decision-making through real-time automation",
  },
  {
    id: 2,
    title: "∞|Multi-Site Scale",
    description: "Unified control across unlimited parking locations",
  },
  {
    id: 3,
    title: "1|Full Stack",
    description: "Single platform replacing 5+ fragmented tools",
  },
];

const problems = [
  {
    id: 0,
    title: "No Real-Time Visibility",
    description:
      "Operators can't see what's happening across their parking assets in real time.",
  },
  {
    id: 1,
    title: "Static Pricing",
    description:
      "Revenue is left on the table with fixed pricing that ignores demand signals.",
  },
  {
    id: 2,
    title: "Fragmented Systems",
    description:
      "Hardware, software, and data live in disconnected silos with no integration.",
  },
];

const services = [
  {
    id: "analytics",
    Icon: LucidePieChart,
    name: "Real-Time Analytics",
    description:
      "Parkwize dashboard deliver real-time analytics to keep an eye on every aspect of your parking lot. Use it to make better decision or ask our AI to forecast these charts. 21ms respond time.",
    url: "#",
  },
  {
    id: "parkwize-ai",
    Icon: LucideBrain,
    name: "Artificial Intelligence Tools",
    description:
      "Using custom Machine Learning models, Parkwize AI can automatically forecast your parking lot's performance. It can also help you navigate Parkwize and suggest you the best pricing plan for your business.",
    url: "#",
  },
  {
    id: "bookings",
    Icon: LucideMonitorSmartphone,
    name: "Tailored Booking Platform",
    description:
      "Parkwize AI can automatically manage your online reservation. It will also suggest you the best pricing plan for your business.",
    url: "#",
  },
  {
    id: "display-management",
    Icon: LucideAirplay,
    name: "Dynamic TV Signage",
    description:
      "Parkwize AI can automatically manage your display. It will also suggest you the best pricing plan for your business.",
    url: "#",
  },
  {
    id: "scheduler",
    Icon: LucideCalendarDays,
    name: "Task scheduling",
    description:
      "Setup your lots with high-performance hardware provided by Process. Whether you need payment kiosks, gates, sensors... you name it, we have it.",
    url: "#",
  },
  {
    id: "automation",
    Icon: LucideRepeat,
    name: "Custom Automated Operations",
    description:
      "Parkwize AI can automatically manage your parking lot. It will also suggest you the best pricing plan for your business.",
    url: "#",
  },
];

const EARLY_ACCESS_FEATURES = [
  "Dynamic Pricing",
  "Display Management",
  "IoT Integration",
  "Online Reservation",
  "Real-time Analytics",
  "Forecasting & Automation",
];

const EARLY_ACCESS_FEATURE_POSITIONS = [
  { top: "18%", left: "8%" },
  { top: "25%", right: "10%" },
  { top: "45%", left: "5%" },
  { top: "55%", right: "6%" },
  { top: "72%", left: "12%" },
  { top: "68%", right: "12%" },
];

const EARLY_ACCESS_ROLES = [
  "Parking Owner",
  "Parking Operator",
  "Parking Management Company",
  "Real Estate Owner",
  "Investor",
  "Asset Manager (Real Estate / Infrastructure)",
  "Public & Institutional Organization",
  "Other",
];

const generateEarlyAccessStars = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${(index * 17.3 + 5) % 100}%`,
    top: `${(index * 23.7 + 3) % 100}%`,
    size: 1 + (index % 3),
    delay: `${(index * 0.7) % 5}s`,
  }));

// TODO: Split homepage in section components to easily manage and maintain

export default function LandingPage({ dict }: { dict: DictionaryType }) {
  const [selectedPreview, setSelectedPreview] = useState("analytics");
  const { poppins, inter } = useFonts();

  return (
    <div className={cn("whitespace-pre-line text-text", poppins)}>
      <Header />

      <QuickStatsSection />

      <ProblemsSection />

      <SolutionSection />

      <ParkwizeAISection />

      <TheVisionSection />

      <ProcessHardwareSection />

      {/* <ServicesSection /> */}

      {/*<HowItWorksSection />*/}

      {/*<DetailedStatsSection />*/}

      <ModernizeParkingSection />

      <EarlyAccessMainSection />
    </div>
  );
}

type EarlyAccessFormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  roleOther: string;
  phone: string;
  consent: boolean;
};

const defaultEarlyAccessForm: EarlyAccessFormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  role: "",
  roleOther: "",
  phone: "",
  consent: false,
};

function EarlyAccessMainSection() {
  const [open, setOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [form, setForm] = useState<EarlyAccessFormState>(
    defaultEarlyAccessForm,
  );
  const stars = useMemo(() => generateEarlyAccessStars(60), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(
        (previous) => (previous + 1) % EARLY_ACCESS_FEATURES.length,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.firstName || !form.email) {
      return;
    }

    setOpen(false);
    setForm(defaultEarlyAccessForm);
  };

  return (
    <section className="relative h-[85svh] overflow-hidden border border-parkwize_blue/40 bg-white text-foreground">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute right-[-10%] top-[-20%] h-[350px] w-[350px] rounded-full md:h-[500px] md:w-[500px] lg:h-[700px] lg:w-[700px]"
          style={{
            background:
              "radial-gradient(circle, rgba(7,88,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-10%] h-[300px] w-[300px] rounded-full md:h-[450px] md:w-[450px] lg:h-[600px] lg:w-[600px]"
          style={{
            background:
              "radial-gradient(circle, rgba(7,88,246,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-[30%] top-[40%] h-[250px] w-[250px] rounded-full md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
          style={{
            background:
              "radial-gradient(circle, rgba(7,88,246,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-parkwize_blue/45 animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center px-4 md:px-6">
        <header className="flex flex-1 items-center justify-center py-0">
          <Image
            src={LogoParkwize}
            alt="Parkwize"
            width={180}
            height={48}
            className="h-7 w-auto md:h-10 lg:h-12"
          />
        </header>

        <main className="relative flex w-full max-w-6xl flex-[4] flex-col items-center justify-evenly md:flex-[2] md:justify-center">
          <div className="mb-4 flex justify-center px-4 md:hidden">
            <span className="min-w-[250px] rounded-full border border-parkwize_blue/30 bg-white/90 px-6 py-2.5 text-center text-[11px] font-light uppercase tracking-[0.2em] text-foreground/80">
              {EARLY_ACCESS_FEATURES[activeFeature]}
            </span>
          </div>

          <div className="pointer-events-none hidden absolute inset-0 items-center justify-center md:flex">
            <Image
              src={MacBookProM4}
              alt=""
              width={1400}
              height={900}
              className="w-[70vw] max-w-[900px] opacity-15 lg:w-[55vw] lg:opacity-20"
              style={{
                maskImage:
                  "radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 80%)",
              }}
            />
          </div>

          <div className="my-3 flex items-center justify-center pointer-events-none md:hidden">
            <Image
              src={MacBookProM4}
              alt=""
              width={900}
              height={600}
              className="w-[95vw] max-w-[450px] opacity-20"
              style={{
                maskImage:
                  "radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 80%)",
              }}
            />
          </div>

          <div className="pointer-events-none hidden absolute inset-0 md:block">
            {EARLY_ACCESS_FEATURES.map((feature, index) => (
              <motion.span
                key={feature}
                className="absolute cursor-default text-xs font-light uppercase tracking-widest text-parkwize_blue/75 transition-colors duration-300 hover:text-parkwize_blue lg:text-sm"
                style={EARLY_ACCESS_FEATURE_POSITIONS[index]}
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

          <div className="flex flex-col items-center">
            <button
              onClick={() => setOpen(true)}
              className="group relative rounded-full border border-foreground/20 bg-foreground/5 px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:border-parkwize_blue hover:bg-parkwize_blue/10 hover:shadow-[0_0_40px_rgba(7,88,246,0.15)] md:px-10 md:text-sm md:tracking-[0.2em] lg:px-12 lg:py-5 lg:text-base lg:tracking-[0.25em]"
            >
              Reserve Your Spot
            </button>
            <p className="mt-2 text-center text-[9px] tracking-wide text-foreground/70 md:mt-3 md:text-sm">
              AI-Powered Parking Management — Sign Up for Early Access
            </p>
          </div>
        </main>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-2xl border-2 border-parkwize_blue/30 bg-white p-8 shadow-[0_0_60px_rgba(7,88,246,0.25)]">
          <DialogTitle className="sr-only">
            Sign Up for Early Access
          </DialogTitle>
          <div className="mb-6 flex justify-center">
            <Image
              src={LogoParkwize}
              alt="Parkwize"
              width={160}
              height={48}
              className="h-10 w-auto"
            />
          </div>

          <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(event) =>
                  setForm({ ...form, firstName: event.target.value })
                }
                className="border-b-2 border-parkwize_blue/20 bg-transparent pb-3 text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-parkwize_blue focus:outline-none md:pb-2 md:text-sm"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(event) =>
                  setForm({ ...form, lastName: event.target.value })
                }
                className="border-b-2 border-parkwize_blue/20 bg-transparent pb-3 text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-parkwize_blue focus:outline-none md:pb-2 md:text-sm"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              className="w-full border-b-2 border-parkwize_blue/20 bg-transparent pb-3 text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-parkwize_blue focus:outline-none md:pb-2 md:text-sm"
              required
            />

            <input
              type="text"
              placeholder="Company Name"
              value={form.company}
              onChange={(event) =>
                setForm({ ...form, company: event.target.value })
              }
              className="w-full border-b-2 border-parkwize_blue/20 bg-transparent pb-3 text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-parkwize_blue focus:outline-none md:pb-2 md:text-sm"
            />

            <select
              value={form.role}
              onChange={(event) =>
                setForm({
                  ...form,
                  role: event.target.value,
                  roleOther:
                    event.target.value !== "Other" ? "" : form.roleOther,
                })
              }
              className={cn(
                "w-full border-b-2 border-parkwize_blue/20 bg-transparent pb-3 text-base transition-colors focus:border-parkwize_blue focus:outline-none md:pb-2 md:text-sm",
                form.role ? "text-foreground" : "text-muted-foreground/50",
              )}
            >
              <option
                value=""
                disabled
                className="bg-background text-foreground"
              >
                Your Role
              </option>
              {EARLY_ACCESS_ROLES.map((role) => (
                <option
                  key={role}
                  value={role}
                  className="bg-background text-foreground"
                >
                  {role}
                </option>
              ))}
            </select>

            {form.role === "Other" && (
              <input
                type="text"
                placeholder="Please specify your role"
                value={form.roleOther}
                onChange={(event) =>
                  setForm({ ...form, roleOther: event.target.value })
                }
                className="w-full border-b-2 border-parkwize_blue/20 bg-transparent pb-3 text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-parkwize_blue focus:outline-none md:pb-2 md:text-sm"
              />
            )}

            <input
              type="tel"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
              className="w-full border-b-2 border-parkwize_blue/20 bg-transparent pb-3 text-base text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-parkwize_blue focus:outline-none md:pb-2 md:text-sm"
            />

            <button
              type="submit"
              className="mt-2 w-full rounded-full border-2 border-parkwize_blue bg-parkwize_blue py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-parkwize_blue/90 md:py-3"
            >
              Sign Up
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
              <span className="text-[11px] leading-relaxed text-muted-foreground/60">
                I agree to receive marketing communications from Parkwize. You
                can unsubscribe at any time.
              </span>
            </label>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Header() {
  const { dict } = useTranslation();
  return (
    <div className={"relative pt-8"}>
      <div
        className={
          "relative z-10 mx-auto flex h-fit w-full max-w-screen-2xl flex-col items-center justify-between gap-y-10 px-5"
        }
      >
        <div className={"space-y-4"}>
          <TagP className={"text-center"}>{dict.homepage.header.tag}</TagP>
          <div>
            <h1
              className={
                "max-w-5xl text-center text-4xl font-semibold uppercase sm:text-3xl md:text-4xl lg:text-5xl "
              }
            >
              {dict.homepage.header.title.split("|")[0]}
            </h1>
            <h1
              className={
                "max-w-5xl text-center text-4xl font-semibold uppercase text-parkwize_blue sm:text-3xl md:text-4xl lg:text-5xl mb-6"
              }
            >
              {dict.homepage.header.title.split("|")[1]}
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-center"
              style={{ opacity: 1, transform: "none" }}
            >
              The first fully AI-powered parking intelligence ecosystem.
              Modernize operations, pricing, displays, booking, and more — from
              one platform.
            </p>
          </div>
          {/*<p*/}
          {/*  className={*/}
          {/*    "mx-auto max-w-screen-md text-center text-lg text-text-muted"*/}
          {/*  }*/}
          {/*>*/}
          {/*  The first fully AI-powered parking intelligence ecosystem. Modernize*/}
          {/*  operations, pricing, displays, booking, and more — from one*/}
          {/*  platform.*/}
          {/*</p>*/}
          <div className={"flex items-center justify-center gap-x-4 pt-4"}>
            <Link
              href={"/dashboard"}
              className={cn(
                buttonVariants({ variant: "primary" }),
                "h-11 w-40 rounded-none bg-parkwize_blue font-light hover:bg-blue-700",
              )}
            >
              {dict.homepage.ctu}
            </Link>
            <Link
              href={"https://demo.parkwize.ai"}
              className={buttonVariants({
                variant: "outline",
                className:
                  "!h-11 w-40 rounded-none border-2 border-parkwize_blue bg-white !text-parkwize_blue hover:!border-blue-700 hover:!bg-blue-700 hover:!text-white",
              })}
            >
              Explore Demo
            </Link>
          </div>
        </div>
        <div className={"aspect-[3/2] h-full w-full max-w-screen-lg px-5"}>
          <Image
            src={"/landing/MacBook.png"}
            alt={"Mac"}
            width={1280}
            height={1280}
          />
        </div>
      </div>
    </div>
  );
}

function QuickStatsSection() {
  return (
    <div className={"mb-16 border-y border-border-light py-12 bg-[#F9F9FA]"}>
      <div
        className={
          "mx-auto grid max-w-screen-xl grid-cols-2 gap-y-10 lg:grid-cols-4 items-center justify-center gap-x-8"
        }
      >
        {stats.map((stat) => (
          <div key={stat.id} className={`mx-auto w-fit space-y-2 text-center`}>
            <stat.Icon className={"mx-auto text-parkwize_blue w-6 h-6"} />
            <div>
              <p className={"text-3xl font-medium"}>{stat.val}</p>
              <p className={"text-sm text-muted-foreground"}>{stat.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TheVisionSection() {
  return (
    <div className={"py-16"}>
      <div className={"mx-auto max-w-screen-xl space-y-6 px-5 text-center"}>
        <TagP>The Vision</TagP>
        <p
          className={
            "mx-auto max-w-screen-md text-3xl lg:text-5xl font-semibold text-text"
          }
        >
          Reengineering the Parking Industry{" "}
          <span className={"text-parkwize_blue"}>from Scratch.</span>
        </p>
        <p className={"mx-auto max-w-screen-md text-lg text-text-muted"}>
          A new generation has built the intelligent infrastructure that unifies
          data, operations, pricing, displays, booking, automation, and AI —
          into one cohesive ecosystem.
        </p>
      </div>
      <div
        className={
          "mx-auto flex w-fit gap-x-8 py-8 flex-col lg:flex-row gap-y-4 lg:gap-y-0"
        }
      >
        {visions.map((problem) => (
          <Tooltip delayDuration={300} key={`vision-${problem.id}`}>
            <TooltipTrigger asChild>
              <div
                className={
                  "mx-auto flex w-fit select-none justify-center gap-x-4 border-b border-b-transparent hover:border-b-text"
                }
              >
                <p className={"space-x-2 font-medium text-text-muted"}>
                  <span className={"font-semibold text-parkwize_blue"}>
                    {problem.title.split("|")[0]}
                  </span>
                  <span>{problem.title.split("|")[1]}</span>
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className={"text-sm text-text-muted"}>{problem.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className={"mx-auto w-fit"}>
        <Link
          href={"#"}
          className={buttonVariants({
            variant: "primary",
            size: "lg",
            className: " !bg-parkwize_blue rounded-none",
          })}
        >
          Try Demo <LucideArrowRight />
        </Link>
      </div>
    </div>
  );
}

function ProblemsSection() {
  return (
    <div className={"py-16"}>
      <div className={"mx-auto max-w-screen-xl space-y-6 px-5 text-center"}>
        <p className={"font-semibold uppercase text-parkwize_blue"}>
          The Problem
        </p>
        <p className={"lg:text-5xl text-3xl font-semibold text-text"}>
          Parking has been frozen for 20 years.
        </p>
        <p className={"mx-auto max-w-screen-md text-lg text-text-muted"}>
          Most operators still rely on outdated systems, fragmented data, manual
          processes, and static pricing. Nothing communicates together. The
          industry stayed profitable despite inefficiency — which is exactly why
          innovation stalled.
        </p>
      </div>
      <div className={"mx-auto w-fit space-y-6 py-12 px-5"}>
        {problems.map((problem) => (
          <div key={problem.id} className={"flex items-start gap-x-4"}>
            <div
              className={
                "w-3 h-2 lg:w-2 translate-y-2 rounded-full bg-parkwize_blue"
              }
            />
            <div className={""}>
              <p className={"font-medium text-text"}>{problem.title}</p>
              <p className={"text-sm text-text-muted"}>{problem.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={"mx-auto w-fit"}>
        <Link
          href={"#"}
          className={buttonVariants({
            variant: "primary",
            size: "lg",
            className: "rounded-none !bg-parkwize_blue",
          })}
        >
          Get in Touch <LucideArrowRight />
        </Link>
      </div>
    </div>
  );
}

function SolutionSection() {
  const { dict, lang } = useTranslation();

  return (
    <div className={"py-16 bg-[#F9F9FA]"}>
      <div className={"mx-auto w-full max-w-screen-2xl px-5"}>
        {/* Desktop Layout */}
        <motion.div
          className={"relative mx-auto hidden w-full gap-x-4 lg:flex flex-col"}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div
            className={cn(
              "w-full flex flex-col justify-center items-center mb-10",
              dict.homepage.section01.title.length > 60 ? "h-44" : "h-32",
            )}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
              Our Solution
            </p>
            <TagP>{dict.homepage.section01.tag}</TagP>
            <p
              className={
                "text-3xl md:text-5xl font-bold tracking-tight text-center"
              }
            >
              {dict.homepage.section01.title}
            </p>
          </div>

          <div className="flex grow gap-x-4">
            <div className={"sticky top-10 h-fit w-1/2"}>
              <Link
                href={"/dashboard"}
                className={
                  "relative flex aspect-square flex-1 scale-100 flex-col overflow-hidden border p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                }
              >
                <div className={"flex-1"}>
                  <Image
                    src={"/landing-dashboard.png"}
                    alt={"Landing Dashboard Manager"}
                    className={"object-cover"}
                    fill
                  />
                </div>
                <div className={"flex items-end justify-between"}>
                  <p className={"text-lg font-medium uppercase leading-tight"}>
                    {dict.homepage.section01.cards.dashboard}
                  </p>
                  <p
                    className={
                      "flex items-center gap-1 uppercase text-primary_action"
                    }
                  >
                    {dict.homepage.section01.cards.more}
                    <LucideArrowUpRight />
                  </p>
                </div>
              </Link>
            </div>

            <div className={"flex w-1/2 flex-col gap-y-4"}>
              {/* PARKWIZE AI */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href={`/ai`}
                  className={
                    "relative flex aspect-video w-full flex-col overflow-hidden border transition-all duration-300 hover:shadow-lg"
                  }
                >
                  <div className={"flex-1"}>
                    <Image
                      src={"/landing/parkwize-ai.png"}
                      alt={"Parkwize AI"}
                      className={"translate-x-20 object-cover"}
                      fill
                    />
                  </div>
                  <div className={"z-20 flex items-end justify-between p-5"}>
                    <p
                      className={"text-lg font-medium uppercase leading-tight"}
                    >
                      {dict.homepage.section01.cards.ai}
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* DISPLAY MANAGEMENT */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href={`/display`}
                  className={
                    "relative flex aspect-video w-full flex-col overflow-hidden border p-5 transition-all duration-300 hover:shadow-lg"
                  }
                >
                  <div className={"flex-1"}>
                    <Image
                      src={"/landing-tvs.png"}
                      alt={"Landing TVS"}
                      className={"translate-x-28 object-contain"}
                      fill
                      sizes={"500,1000"}
                    />
                  </div>
                  <div className={"flex items-end justify-between"}>
                    <p
                      className={"text-lg font-medium uppercase leading-tight"}
                    >
                      {dict.homepage.section01.cards.signage}
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* RESERVATION SYSTEM */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href={`/booking`}
                  className={
                    "relative flex aspect-video w-full flex-col overflow-hidden border transition-all duration-300 hover:shadow-lg"
                  }
                >
                  <div className={"flex-1"}>
                    <Image
                      src={"/landing-phones.png"}
                      alt={"Landing Phones"}
                      className={"translate-x-20 object-cover"}
                      fill
                    />
                  </div>
                  <div className={"z-20 flex items-end justify-between p-5"}>
                    <p
                      className={"text-lg font-medium uppercase leading-tight"}
                    >
                      {dict.homepage.section01.cards.reservation}
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* PROCESS HARDWARE */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href={`/process`}
                  className={
                    "relative flex aspect-video w-full flex-col border p-5 transition-all duration-300 hover:shadow-lg"
                  }
                >
                  <div className={"flex-1"}>
                    <Image
                      src={"/landing-borne.png"}
                      alt={"Landing Borne"}
                      className={"translate-x-28 object-contain"}
                      fill
                    />
                  </div>
                  <div className={"flex items-end justify-between"}>
                    <p
                      className={"text-lg font-medium uppercase leading-tight"}
                    >
                      {dict.homepage.section01.cards.process}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Layout */}
        <div className={"block px-5 pt-16 lg:hidden"}>
          <div className={"mb-8"}>
            <Label
              className={
                "text-base font-semibold uppercase text-primary_action"
              }
            >
              {dict.homepage.section01.tag}
            </Label>
            <p className={"text-3xl font-medium"}>
              {dict.homepage.section01.title}
            </p>
          </div>

          {/* Main Dashboard Card */}
          <Link
            href={"/dashboard"}
            className={
              "relative mb-6 flex aspect-square w-full flex-col overflow-hidden border p-5"
            }
          >
            <div className={"flex-1"}>
              <Image
                src={"/landing-dashboard.png"}
                alt={"Landing Dashboard Manager"}
                className={"object-cover"}
                fill
              />
            </div>
            <div className={"flex items-end justify-between"}>
              <p className={"text-lg font-medium uppercase leading-tight"}>
                {dict.homepage.section01.cards.dashboard}
              </p>
              <p className={"flex items-center gap-1 text-primary_action"}>
                {dict.homepage.section01.cards.more}
                <LucideArrowUpRight />
              </p>
            </div>
          </Link>

          {/* Horizontal Scrolling Cards */}
          <div className={"flex flex-col gap-4"}>
            {/* Parkwize AI */}
            <Link
              href={"/ai"}
              className={
                "relative flex aspect-video min-w-[280px] flex-col overflow-hidden border p-5"
              }
            >
              <div className={"flex-1"}>
                <Image
                  src={"/landing/parkwize-ai.png"}
                  alt={"Parkwize AI"}
                  className={"translate-x-28 object-contain"}
                  fill
                />
              </div>
              <div className={"flex items-end justify-between"}>
                <p className={"text-lg font-medium uppercase leading-tight"}>
                  {dict.homepage.section01.cards.ai}
                </p>
              </div>
            </Link>

            {/* Parkwize Digital Signage Solution */}
            <Link
              href={"/display"}
              className={
                "relative flex aspect-video min-w-[280px] flex-col overflow-hidden border p-5"
              }
            >
              <div className={"flex-1"}>
                <Image
                  src={"/landing-tvs.png"}
                  alt={"Landing TVS"}
                  className={"translate-x-32 object-contain"}
                  fill
                />
              </div>
              <div className={"flex items-end justify-between"}>
                <p
                  className={
                    "relative z-10 text-lg font-medium uppercase leading-tight"
                  }
                >
                  {dict.homepage.section01.cards.signage}
                </p>
              </div>
            </Link>

            {/* Reservation */}
            <Link
              href={"/booking"}
              className={
                "relative flex aspect-video min-w-[280px] flex-col overflow-hidden border"
              }
            >
              <div className={"flex-1"}>
                <Image
                  src={"/landing-phones.png"}
                  alt={"Landing Phones"}
                  className={"translate-x-32 object-cover"}
                  fill
                />
              </div>
              <div className={"z-20 flex items-end justify-between p-5"}>
                <p className={"text-lg font-medium uppercase leading-tight"}>
                  {dict.homepage.section01.cards.reservation}
                </p>
              </div>
            </Link>

            {/* Process Hardware */}
            <Link
              href={"/process"}
              className={
                "relative flex aspect-video min-w-[280px] flex-col overflow-hidden border p-5"
              }
            >
              <div className={"flex-1"}>
                <Image
                  src={"/landing-borne.png"}
                  alt={"Landing Borne"}
                  className={"translate-x-28 object-contain"}
                  fill
                />
              </div>
              <div className={"flex items-end justify-between"}>
                <p className={"text-lg font-medium uppercase leading-tight"}>
                  {dict.homepage.section01.cards.process}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const [selectedPreview, setSelectedPreview] = useState("analytics");

  return (
    <div className={"overflow-hidden py-16"}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className={"mx-auto w-full max-w-screen-2xl space-y-16 px-5"}
      >
        <div className={"relative mx-auto flex w-full gap-x-4"}></div>
        <div className={"divide-y"}>
          <div
            className={
              "flex h-[calc(100svh-10rem)] flex-col-reverse gap-x-[7.5rem] lg:grid lg:grid-cols-[450px_1fr]"
            }
          >
            <div
              className={
                "my-auto flex h-[calc(100svh-10rem)] flex-col divide-y divide-border-light"
              }
            >
              <div className={"h-fit pb-4"}>
                <div className={"space-y-4"}>
                  <p
                    className={
                      "text-sm font-medium uppercase tracking-wider text-parkwize_blue"
                    }
                  >
                    The Parkwize EcoSystem
                  </p>
                  <p
                    className={
                      "whitespace-nowrap text-2xl font-medium text-text md:text-4xl"
                    }
                  >
                    Discover the Power
                  </p>
                  <p className={"text-text-muted"}>
                    Learn more about Parkwize&apos;s extensive toolset.
                  </p>
                </div>
              </div>
              <div className={"pt-5"}>
                {services.map((page, index) => (
                  <motion.div
                    layout
                    onClick={() => setSelectedPreview(page.id)}
                    key={index}
                    transition={{
                      layout: { duration: 0.3, ease: "easeInOut" },
                    }}
                    className={cn(
                      selectedPreview === page.id
                        ? "bg-white drop-shadow-2xl"
                        : "",
                      "flex cursor-pointer gap-x-6 overflow-hidden px-8 py-6 text-text transition-all duration-300",
                    )}
                  >
                    <page.Icon
                      className={cn(
                        "aspect-square h-fit min-w-4 max-w-4 translate-y-0.5 stroke-[2.5px] transition-colors duration-300",
                        selectedPreview === page.id
                          ? "text-parkwize_blue"
                          : "text-black",
                      )}
                    />
                    <div className={"w-full space-y-2"}>
                      <p className={"font-medium"}>{page.name}</p>
                      <AnimatePresence mode={"wait"}>
                        {selectedPreview === page.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                              transition: {
                                height: { duration: 0.3, ease: "easeOut" },
                                opacity: { duration: 0.2, delay: 0.1 },
                              },
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              transition: {
                                height: { duration: 0.2, ease: "easeIn" },
                                opacity: { duration: 0.15 },
                              },
                            }}
                            className={"space-y-2 overflow-hidden"}
                          >
                            <p className={"text-sm text-text-muted"}>
                              {page.description}
                            </p>
                            <a
                              href={page.url}
                              className={buttonVariants({
                                variant: "link",
                                className:
                                  "!h-fit w-fit !px-0 !py-0 text-sm !text-parkwize_blue",
                              })}
                            >
                              Read more
                              <LucideArrowRight className={"size-4"} />
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className={"relative"}>
              <div
                className={
                  "absolute left-0 z-20 aspect-[4/3] h-full w-max overflow-hidden rounded-lg"
                }
              >
                <Image
                  src={"/landing/card_background.png"}
                  alt={"CB"}
                  width={1280}
                  height={1280}
                  className={"absolute z-10 h-full w-full blur-lg"}
                />
                <div
                  className={
                    "absolute z-20 h-full w-full shadow-shadow-inner-l"
                  }
                />
                <div
                  className={
                    "absolute left-10 top-1/2 z-30 aspect-square h-[90%] w-[90%] -translate-y-1/2 overflow-hidden border bg-white"
                  }
                >
                  <div className={"relative h-full w-full overflow-hidden p-4"}>
                    {selectedPreview === "parkwize-ai" && <AIChatApp />}
                    {/* {selectedPreview === "analytics" && <Analytics />} */}
                    {/* {selectedPreview === "bookings" && <BookingApp />}
                    {selectedPreview === "scheduler" && <CalendarApp />} */}
                    <div
                      className={
                        "absolute left-0 top-0 h-full w-full bg-black/10 blur-lg"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function HowItWorksSection() {
  const { dict } = useTranslation();
  const { inter } = useFonts();
  return (
    <div className={"mx-auto max-w-screen-2xl space-y-8 px-5 pb-16 pt-32"}>
      <div className={"flex grid-cols-[1fr_450px] flex-col space-y-2 md:grid"}>
        <p className={"max-w-[200px] text-5xl font-medium"}>How it works</p>
        <div className={"space-y-4"}>
          <p className={"text-lg text-text-muted"}>
            Manage your experience from start to finish, from integrations to
            registration and from interactive stage elements to post-event data,
            it’s all here.
          </p>
          <Link
            href={"#"}
            className={buttonVariants({
              variant: "primary",
              size: "lg",
              className: "rounded-none bg-[#0758F6]",
            })}
          >
            Learn more
          </Link>
        </div>
      </div>

      <div>
        {dict.homepage.howitworks.steps.map((step, index) => (
          <div
            key={index}
            className={
              "flex grid-cols-[350px_1fr] flex-col gap-10 border-t border-border-light py-12 lg:grid"
            }
          >
            <div>
              <p>Step {index + 1}</p>
              <p
                className={cn(
                  "pb-6 pt-3 text-5xl tracking-tighter text-text",
                  inter,
                )}
              >
                {step.title}
              </p>
              <p className={"text-text-muted"}>{step.description}</p>
            </div>
            <div>
              <div
                className={
                  "aspect-[16/5] h-full w-full overflow-hidden rounded-full border-2"
                }
              >
                <Image
                  src={"/landing/card_background.png"}
                  alt="CB2"
                  width={1280}
                  height={1280}
                  className={"blur-lg"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailedStatsSection() {
  const { dict } = useTranslation();
  return (
    <div className={"h-fit"}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className={
          "mx-auto flex h-fit flex-col justify-center space-y-16 bg-[#0758F6] px-5 pb-16 pt-16 md:h-[90svh] md:pb-0 md:pt-8"
        }
      >
        <div>
          <h3
            className={
              "to-50% bg-clip-text text-center text-5xl font-medium text-transparent text-white"
            }
          >
            {dict.homepage.section04.title}
          </h3>
        </div>
        <div className={"mx-auto max-w-screen-xl bg-white"}>
          <div className={"grid grid-cols-2 gap-px lg:grid-cols-4"}>
            {dict.homepage.section04.stats.map((stat, index) => (
              <motion.div
                key={`sec-4-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={
                  "flex flex-col items-center justify-center space-y-4 bg-[#0758F6] p-6"
                }
              >
                <p className={"text-center text-4xl text-white"}>
                  {stat.title.substring(0, 8)}
                </p>
                <p
                  className={
                    "max-w-sm text-center text-base font-light text-white/90"
                  }
                >
                  {stat.description.substring(0, 50)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const aiCards = [
  {
    Icon: LucideBrain,
    name: "Forecasting AI",
    description:
      "The first artificial intelligence model designed to predict all parking data — occupancy, revenue, traffic, demand — with unmatched accuracy.",
  },
  {
    Icon: LucideTrendingUp,
    name: "Dynamic Pricing AI",
    description:
      "Real-time price calculation and adjustment based on the simultaneous analysis of dozens of variables. Zero manual intervention, immediate results.",
  },
  {
    Icon: LucideMessageCircle,
    name: "Conversational AI Agent",
    description:
      "Talk to your parking. Ask questions, get recommendations, and receive actionable insights — all through a natural language interface powered by AI.",
  },
];

const integratedDataSources = [
  {
    title: "Real-Time Weather",
    description: "Temperature, precipitation, 7-day forecasts",
    Icon: LucideCloudSun,
  },
  {
    title: "Local Events",
    description: "Concerts, sports, conferences, festivals",
    Icon: LucideCalendar,
  },
  {
    title: "Traffic Data",
    description: "Google Maps data, congestion, route patterns",
    Icon: LucideMapPin,
  },
  {
    title: "Parking History",
    description: "Demand cycles, seasonal patterns",
    Icon: LucideChartColumn,
  },
  {
    title: "Ticketing & Buildings",
    description: "Traffic from nearby platforms and venues",
    Icon: LucideClock,
  },
  {
    title: "Revenue Patterns",
    description: "Revenue trends, peaks and troughs",
    Icon: LucideTrendingUp,
  },
];

function ParkwizeAISection() {
  return (
    <div className={"py-24 bg-[#14181f]"}>
      <div className={"mx-auto max-w-screen-2xl space-y-16 px-5"}>
        <div className={"mx-auto max-w-screen-sm space-y-6 text-center"}>
          <TagP>Parkwize AI</TagP>
          <div>
            <p className={"lg:text-5xl text-3xl font-semibold text-white"}>
              The first AI model
            </p>
            <p
              className={
                "lg:text-5xl text-3xl font-semibold text-parkwize_blue"
              }
            >
              built for parking.
            </p>
          </div>

          <p className={"text-[#a1a2a5] max-w-2xl mx-auto text-lg"}>
            We are pioneers in artificial intelligence applied to parking. Our
            models — trained on over 2 years of real-world parking data — learn
            the unique behavior of each facility to predict and optimize in real
            time.
          </p>
        </div>

        <div className={"grid lg:grid-cols-3 gap-8 "}>
          {aiCards.map((card, index) => (
            <div
              key={`ai-card-${index}`}
              className={
                " border border-[#ffffff1a] p-8 md:p-10 bg-[#ffffff0d]"
              }
            >
              <div
                className={
                  "w-14 h-14  bg-[#2463eb33] flex items-center justify-center mb-6"
                }
              >
                <card.Icon className={"size-7 text-parkwize_blue"} />
              </div>
              <p className={"text-xl font-semibold text-white"}>{card.name}</p>
              <p className={"flex-grow text-[#a1a2a5]"}>{card.description}</p>
              {/* <Link
                href={""}
                className={buttonVariants({
                  variant: "link",
                  className: "!h-fit !px-0 !py-0",
                })}
              >
                Learn more <LucideArrowRight />
              </Link> */}
            </div>
          ))}
        </div>

        <div
          className={"text-center mb-10"}
          style={{ opacity: 1, transform: "none" }}
        >
          <h3 className={"text-2xl md:text-3xl font-bold mb-3 text-white"}>
            Integrated Data Sources
          </h3>
          <p className={"text-background/60 max-w-xl mx-auto text-[#a1a2a5]"}>
            Our AI continuously ingests and cross-references dozens of data
            sources to generate optimal forecasts and pricing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integratedDataSources.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 border border-[#ffffff1a] bg-[#ffffff0d] p-5"
            >
              <div className="w-10 h-10 bg-[#2463eb33] flex items-center justify-center shrink-0">
                <item.Icon className="w-5 h-5 text-parkwize_blue" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">{item.title}</p>
                <p className="text-xs text-[#a1a2a5] mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-16 rounded-2xl bg-primary p-8 md:p-10 text-center"
          style={{ opacity: 1, transform: "none" }}
        >
          <p className=" text-sm uppercase tracking-widest font-semibold mb-3 text-parkwize_blue">
            The Result
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
            Higher Revenue. Higher Occupancy. Higher Efficiency.
          </h3>
          <p className="text-[#a1a2a5] max-w-xl mx-auto mb-6">
            Automatic and continuous optimization — with zero human
            intervention.
          </p>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-secondary-foreground bg-parkwize_blue h-11 text-white border-none px-8">
            Get in Touch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right ml-2 w-4 h-4"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>

        {/* <div className={"flex items-center justify-between text-left"}>
          <div className={"space-y-2"}>
            <p className={"text-3xl font-medium"}>
              Higher Efficiency. Higher Occupancy. Higher Revenue.
            </p>
          </div>
          <Link
            href={"#"}
            className={buttonVariants({
              variant: "primary",
              size: "lg",
              className: "rounded-none !bg-parkwize_blue",
            })}
          >
            Get in Touch
          </Link>
        </div> */}
      </div>
    </div>
  );
}

const processCards = [
  {
    Icon: LucideShield,
    name: "Industrial Grade",
    description: "Built for 24/7 outdoor operation in any climate",
  },
  {
    Icon: LucideCpu,
    name: "Smart Integration",
    description: "Natively connected to the Parkwize software ecosystem",
  },
  {
    Icon: LucideSettings2,
    name: "Zero Friction",
    description: "Seamless installation and remote maintenance",
  },
  {
    Icon: LucideSparkle,
    name: "Real-Time Sync",
    description: "Hardware state synced live with our Analytics Dashboard",
  },
];

function ProcessHardwareSection() {
  return (
    <div className={"py-16"}>
      <div className={"mx-auto max-w-screen-2xl space-y-8 px-5"}>
        <div className={"mx-auto max-w-screen-md space-y-6 text-center "}>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-[-10px]">
            Hardware Partner
          </p>
          <TagP className={"text-xl"}>Process Technology</TagP>
          <div>
            <p className={"lg:text-5xl text-3xl font-semibold"}>
              The Best Hardware to Fit with
            </p>
            <p
              className={
                "lg:text-5xl text-3xl font-semibold text-parkwize_blue"
              }
            >
              the Best Software.
            </p>
          </div>
          <p className={"mx-auto max-w-screen-sm text-text-muted"}>
            Parkwize partners with Process Technology to deliver a fully
            integrated hardware-software stack — barriers, terminals, sensors,
            and access systems designed for the intelligent parking era.
          </p>
        </div>
        <div className={"grid lg:grid-cols-4 grid-cols-1 gap-8"}>
          {processCards.map((card, index) => (
            <div
              key={`process-card-${index}`}
              className={"flex flex-col items-start gap-y-4 border p-6"}
            >
              <div className={"flex items-center gap-x-2"}>
                <card.Icon className={"size-7 text-parkwize_blue"} />
                <p className={"text-xl font-semibold"}>{card.name}</p>
              </div>

              <p className={"flex-grow text-text-muted"}>{card.description}</p>
              {/* <Link
                href={""}
                className={buttonVariants({
                  variant: "link",
                  className: "!h-fit !px-0 !py-0",
                })}
              >
                Learn more <LucideArrowRight />
              </Link> */}
            </div>
          ))}
        </div>
        <div className={"flex items-center justify-center w-full"}>
          <Link
            href={""}
            className={buttonVariants({
              variant: "link",
              className: "!h-fit !px-0 !py-0",
            })}
          >
            Learn more <LucideArrowRight />
          </Link>
        </div>

        {/* BOUTON DISCOVER PROCESS TECHNOLOGY */}
        {/* <div className="text-center" style={{ opacity: 1, transform: "none" }}>
          <a href="/hardware">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-secondary-foreground bg-parkwize_blue h-11 rounded-md text-white border-none px-8 hover:shadow-shadow-s">
              Discover Process Technology
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right ml-2 w-4 h-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </a>
        </div> */}
      </div>
    </div>
  );
}

function OptimizeParkingSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1 }}
      className={
        "relative flex min-h-[100svh] max-w-[100vw] items-center justify-center"
      }
      style={{
        boxShadow: `
            inset 0 20px 20px -20px rgba(0, 0, 0, 0.1),
            inset 0 -20px 20px -20px rgba(0, 0, 0, 0.1)
          `,
      }}
    >
      <div
        className={
          "absolute left-1/2 top-16 flex w-1/4 -translate-x-1/2 gap-x-2 md:left-1/4 md:top-24 md:translate-x-0"
        }
      >
        <div className={"relative w-full"}>
          <div
            className={
              "h-px w-full bg-gradient-to-r from-transparent via-primary_action to-transparent"
            }
          />
          <motion.div
            animate={{ x: [-50, 50, -50] }}
            transition={{
              duration: 16,
              delay: 0,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className={
                "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200 bg-[#F3F5F9]"
              }
            >
              <LucideHardDrive className={"m-auto h-5 w-5"} />
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className={
          "absolute right-10 top-1/4 flex w-1/4 gap-x-2 md:right-20 md:top-1/3"
        }
      >
        <div className={"relative w-full"}>
          <div
            className={
              "h-[1px] w-full bg-gradient-to-r from-transparent via-primary_action to-transparent"
            }
          />
          <motion.div
            animate={{ x: [-50, 50, -50] }}
            transition={{
              duration: 16,
              delay: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className={
                "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200 bg-[#F3F5F9]"
              }
            >
              <LucideDollarSign className={"m-auto h-5 w-5"} />
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className={
          "absolute left-10 top-1/4 flex w-1/4 gap-x-2 md:left-20 md:top-1/3"
        }
      >
        <div className={"relative w-full"}>
          <div
            className={
              "h-[1px] w-full bg-gradient-to-r from-transparent via-primary_action to-transparent"
            }
          />
          <motion.div
            animate={{ x: [-50, 50, -50] }}
            transition={{
              duration: 16,
              delay: 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className={
                "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200 bg-[#F3F5F9]"
              }
            >
              <LucideLineChart className={"m-auto h-5 w-5"} />
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className={
          "absolute bottom-12 left-16 flex w-1/4 gap-x-2 md:bottom-1/4 md:left-32"
        }
      >
        <div className={"relative w-full"}>
          <div
            className={
              "h-[1px] w-full bg-gradient-to-r from-transparent via-primary_action to-transparent"
            }
          />
          <motion.div
            animate={{ x: [-50, 50, -50] }}
            transition={{
              duration: 16,
              delay: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className={
                "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200 bg-[#F3F5F9]"
              }
            >
              <LucideGlobe className={"m-auto h-5 w-5"} />
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className={
          "absolute bottom-12 right-16 flex w-1/4 gap-x-2 md:bottom-1/4 md:right-32"
        }
      >
        <div className={"relative w-full"}>
          <div
            className={
              "h-[1px] w-full bg-gradient-to-r from-transparent via-primary_action to-transparent"
            }
          />
          <motion.div
            animate={{ x: [-50, 50, -50] }}
            transition={{
              duration: 16,
              delay: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className={
                "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200 bg-[#F3F5F9]"
              }
            >
              <LucideMonitor className={"m-auto h-5 w-5"} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative blue blurred shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          zIndex: 0,
          clipPath: "inset(0 0 0 0)",
        }}
      >
        {/* Top-right blob - more angular, flowing from corner */}
        <div className="absolute -right-0 -top-0 h-[32rem] w-[32rem] md:-right-24 md:-top-24 md:h-[38rem] md:w-[38rem]">
          <div
            className="h-full w-full rotate-6"
            style={{
              borderRadius: "20% 20% 45% 55% / 50% 35% 25% 0%",
              filter: "blur(48px)",
              background:
                "radial-gradient(ellipse 120% 100% at 80% 20%, rgba(7, 88, 255, 0.9) 15%, rgba(7, 88, 246, 0.22) 40%, rgba(7, 88, 246, 0.40) 100%)",
            }}
          />
        </div>

        {/* Bottom-left blob - more angular, flowing from corner */}
        <div className="absolute -bottom-16 -left-20 h-[36rem] w-[38rem] md:-bottom-32 md:-left-40 md:h-[42rem] md:w-[44rem]">
          <div
            className="h-full w-full -rotate-12"
            style={{
              borderRadius: "35% 65% 60% 40% / 45% 55% 65% 35%",
              filter: "blur(48px)",
              background:
                "radial-gradient(ellipse 110% 120% at 20% 80%, rgba(7, 88, 246, 0.28) 0%, rgba(7, 88, 246, 0.22) 40%, rgba(7, 88, 246, 0.18) 100%)",
            }}
          />
          {/* Subtle inner glow - positioned toward corner */}
          <div
            className="absolute bottom-8 left-10 h-64 w-64 md:bottom-16 md:left-20 md:h-72 md:w-72"
            style={{
              filter: "blur(32px)",
              background: "rgba(7, 88, 246, 0.28)",
              borderRadius: "40% 60% 50% 50% / 55% 45% 60% 40%",
            }}
          />
        </div>

        {/* Additional center accent - subtle */}
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2">
          <div
            className="h-full w-full"
            style={{
              filter: "blur(72px)",
              background:
                "radial-gradient(circle, rgba(7, 88, 246, 0.12) 0%, rgba(7, 88, 246, 0.08) 50%, rgba(7, 88, 246, 0.04) 100%)",
              borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%",
            }}
          />
        </div>
      </div>

      <div className={"flex flex-col gap-y-10 px-5 text-center"}>
        <Label
          className={
            "whitespace-nowrap text-base font-semibold text-primary_action"
          }
        >
          THE SOLUTION YOU NEED
        </Label>
        <div className={"space-y-4"}>
          <p
            className={
              "whitespace-nowrap bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 bg-clip-text text-3xl font-medium text-transparent sm:text-4xl md:text-5xl lg:text-7xl"
            }
          >
            Optimize Your Parking.
          </p>
          <p className={"mx-auto max-w-lg uppercase text-neutral-600"}>
            Don’t let another day of missed revenue go unnoticed. Schedule your
            Parking Optimization Call today.
          </p>
        </div>
        <div className={"flex items-center justify-center gap-x-2"}>
          <Link
            href={"/dashboard"}
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-none bg-blue-700 font-medium text-white hover:bg-blue-600",
            )}
          >
            Demo
          </Link>
          <Button
            variant={"default"}
            className={
              "rounded-none border-2 border-blue-700 bg-transparent font-medium text-blue-800 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            }
          >
            Book a call
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function ModernizeParkingSection() {
  return (
    <div className={"px-5 pb-16 pt-16 bg-parkwize_blue "}>
      <div className={"mx-auto space-y-6  p-16 text-white"}>
        <p className={"text-center lg:text-4xl text-3xl font-medium"}>
          Ready to modernize your parking?
        </p>
        <p className={"mx-auto max-w-screen-sm text-center"}>
          Join the next generation of parking operators. We&apos;re launching
          publicly at RAIL Amsterdam and inviting strategic partners to grow
          with us early.
        </p>
        <div className={"mx-auto w-fit"}>
          <Link
            href={"#"}
            className={buttonVariants({
              variant: "ghost",
              className:
                "!h-fit rounded-none border-2 !text-base font-medium !text-white hover:bg-white hover:!text-parkwize_blue",
            })}
          >
            Request a demo <LucideArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

function TagP({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-sm font-medium uppercase tracking-wider text-parkwize_blue mb-3",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* function Analytics() {
  const revenue = mockRevenueChart(subDays(new Date(), 30), new Date());
  const traffic = mockTrafficChart(subDays(new Date(), 30), new Date());

  return (
    <div className={"flex flex-col gap-y-0.5"}>
      <MultiChart
        data={revenue}
        type={"CURRENCY"}
        title={"Total Revenue"}
        total={formatCAD(revenue.reduce((acc, curr) => acc + curr.yValue, 0))}
        xType={"DATE"}
      />
      <MultiChart
        data={traffic}
        type={"NUMBER"}
        title={"Total Traffic"}
        total={formatNumber(
          traffic.reduce((acc, curr) => acc + curr.yValue, 0),
        )}
        xType={"DATE"}
      />
    </div>
  );
} */

function AIChatApp() {
  const messages: any[] = [];

  const models = [
    {
      name: "GPT 4.1 Nano",
      value: "openai/gpt-4.1-nano-2025-04-14",
    },
    {
      name: "Claude 3 Haiku",
      value: "anthropic/claude-3-haiku",
    },
  ];

  return (
    <div className={"h-full"}>
      <div className={"flex h-full gap-4"}>
        <div className={"relative flex h-full w-full flex-col"}>
          {/* Messages Container with calculated max height */}
          <div className={"relative mx-auto w-full max-w-4xl flex-1"}>
            <div
              className={"relative mx-auto size-full"}
              style={{ maxHeight: "calc(100vh - 160px)" }}
            >
              <div className={"flex h-full flex-col"}>
                <AnimatePresence mode={"popLayout"}>
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      className={"space-y-4 pt-10"}
                    >
                      <p className="text-2xl font-semibold text-text">
                        How can I help you, John?
                      </p>
                      <div className={"flex gap-x-2"}>
                        <Button variant={"outline"} className={"rounded-full"}>
                          <LucideBarChart className={"text-emerald-500"} />
                          Forecasting
                        </Button>
                        <Button variant={"outline"} className={"rounded-full"}>
                          <LucideUpload className={"text-blue-500"} />
                          Exportation
                        </Button>
                        <Button variant={"outline"} className={"rounded-full"}>
                          <LucideInfo className={"text-amber-500"} />
                          Insights
                        </Button>
                        <Button variant={"outline"} className={"rounded-full"}>
                          <LucideRepeat className={"text-red-500"} />
                          Automations
                        </Button>
                      </div>
                      <div className={"flex flex-col gap-y-1 text-text-muted"}>
                        <div
                          className={"cursor-pointer rounded-lg hover:bg-bg"}
                        >
                          <p className={"p-3"}>
                            What can you help me with regarding parking
                            analytics?
                          </p>
                        </div>
                        <Separator />
                        <div
                          className={"cursor-pointer rounded-lg hover:bg-bg"}
                        >
                          <p className={"p-3"}>
                            Show me the overall performance summary for all
                            parking locations
                          </p>
                        </div>
                        <Separator />
                        <div
                          className={"cursor-pointer rounded-lg hover:bg-bg"}
                        >
                          <p className={"p-3"}>
                            Analyze traffic patterns and suggest optimization
                            strategies
                          </p>
                        </div>
                        <Separator />
                        <div
                          className={"cursor-pointer rounded-lg hover:bg-bg"}
                        >
                          <p className={"p-3"}>
                            Which parking location has the highest revenue this
                            month?
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Conversation className={"h-full"}>
                  <ConversationContent>
                    {status === "submitted" && <Loader />}
                  </ConversationContent>
                  <ConversationScrollButton />
                </Conversation>
                <PromptInput
                  onSubmit={() => {}}
                  className="mt-4 !rounded-b-none"
                  globalDrop
                  multiple
                >
                  <PromptInputHeader>
                    <PromptInputAttachments>
                      {(attachment) => (
                        <PromptInputAttachment data={attachment} />
                      )}
                    </PromptInputAttachments>
                  </PromptInputHeader>
                  <PromptInputBody className={"!rounded-b-none"}>
                    <PromptInputTextarea
                      className={"!rounded-b-none"}
                      onChange={(e) => {}}
                      value={""}
                    />
                  </PromptInputBody>
                  <PromptInputFooter>
                    <PromptInputTools>
                      <PromptInputActionMenu>
                        <PromptInputActionMenuTrigger />
                        <PromptInputActionMenuContent>
                          <PromptInputActionAddAttachments />
                        </PromptInputActionMenuContent>
                      </PromptInputActionMenu>
                      <PromptInputButton
                        variant={false ? "default" : "ghost"}
                        onClick={() => {}}
                      >
                        <GlobeIcon size={16} />
                        <span>Search</span>
                      </PromptInputButton>
                      {/* <PromptInputSelect
                        onValueChange={(value) => {}}
                        value={""}
                      >
                        <PromptInputSelectTrigger>
                          <PromptInputSelectValue />
                        </PromptInputSelectTrigger>
                        <PromptInputSelectContent>
                          {models.map((model) => (
                            <PromptInputSelectItem
                              key={model.value}
                              value={model.value}
                            >
                              {model.name}
                            </PromptInputSelectItem>
                          ))}
                        </PromptInputSelectContent>
                      </PromptInputSelect> */}
                      <PromptInputTools>
                        <Button variant={"outline"} className={"rounded-full"}>
                          <LucideBarChart className={"text-emerald-500"} />
                          Forecasting
                        </Button>
                        <Button variant={"outline"} className={"rounded-full"}>
                          <LucideUpload className={"text-blue-500"} />
                          Exportation
                        </Button>
                      </PromptInputTools>
                    </PromptInputTools>
                    <PromptInputSubmit disabled={false} />
                  </PromptInputFooter>
                </PromptInput>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const parkings = [];

/* function BookingApp() {
  return (
    <div className={"grid h-full w-full grid-cols-2 items-center gap-4"}>
      {mockParkings.map((parking) => (
        <div key={parking.id} className={"space-y-2 border p-4"}>
          <div>
            <Image
              src={"/landing-petra.png"}
              alt={"Test Parking"}
              width={250}
              height={250}
              className={"w-full"}
            />
          </div>
          <div className={"flex items-center justify-between"}>
            <div>
              <p className={"text-lg font-medium"}>{parking.name}</p>
              <p>{parking.address}</p>
            </div>
            <p className={"text-2xl font-semibold"}>21$</p>
          </div>
          <Button className={"w-full"} variant={"primary"}>
            Book Now
          </Button>
        </div>
      ))}
    </div>
  );
} */

/* function CalendarApp() {
  return (
    <div>
      <SchedulerCalendar
        existingSchedules={[]}
        savedDisplays={{ displays: [], sequences: [] }}
        pricePackages={[]}
        task={undefined}
      />
    </div>
  );
} */
