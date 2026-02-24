/*
 * Copyright (c) 2025. Tecnova
 */

import {
  LucideBarChart3,
  LucideBellRing,
  LucideCamera,
  LucideCheck,
  LucideCpu,
  LucideHeadphones,
  LucideKeyRound,
  LucideMonitor,
  LucideWrench,
  LucideSettings,
  LucideShield,
  LucideUsers,
  LucideZap,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { InfiniteMovingCardsCard } from "@/components/ui/infinite-moving-cards-card";
import { getDictionary, LangType } from "@/content/dictionary";

interface EquipmentCardProps {
  title: string;
  models: string[];
  benefits: string[];
  benefitsLabel: string;
}

interface SolutionFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(
    lang === "en" || lang === "fr" ? (lang as LangType) : "en",
  );
  const processDict = dict.processPage;

  const solutionFeatures: SolutionFeatureProps[] = [
    {
      icon: <LucideBarChart3 className="h-6 w-6" />,
      title: processDict.solutions.features[0].title,
      description: processDict.solutions.features[0].description,
    },
    {
      icon: <LucideZap className="h-6 w-6" />,
      title: processDict.solutions.features[1].title,
      description: processDict.solutions.features[1].description,
    },
    {
      icon: <LucideSettings className="h-6 w-6" />,
      title: processDict.solutions.features[2].title,
      description: processDict.solutions.features[2].description,
    },
    {
      icon: <LucideUsers className="h-6 w-6" />,
      title: processDict.solutions.features[3].title,
      description: processDict.solutions.features[3].description,
    },
    {
      icon: <LucideShield className="h-6 w-6" />,
      title: processDict.solutions.features[4].title,
      description: processDict.solutions.features[4].description,
    },
    {
      icon: <LucideZap className="h-6 w-6" />,
      title: processDict.solutions.features[5].title,
      description: processDict.solutions.features[5].description,
    },
  ];

  const partners = processDict.trust.partners;
  const testimonials = processDict.trust.testimonials;
  const iotIcons: React.ReactNode[] = [
    <LucideBellRing className="h-7 w-7 text-parkwize_blue" key={"ring"} />,
    <LucideWrench className="h-7 w-7 text-parkwize_blue" key={"wrench"} />,
    <LucideCpu className="h-7 w-7 text-parkwize_blue" key={"cpu"} />,
    <LucideCamera className="h-7 w-7 text-parkwize_blue" key={"camera"} />,
    <LucideKeyRound className="h-7 w-7 text-parkwize_blue" key={"key"} />,
  ];

  return (
    <div className="text-black">
      {/* Section 1: Accueil */}
      <div className="border-b border-b-neutral-200 text-center">
        <div className="relative mx-auto max-w-screen-xl border-x border-x-neutral-200 pb-20 pt-10">
          {/* <BackgroundGrid /> */}
          <div className="relative z-10 space-y-6">
            <div className="mb-8 flex items-center justify-center">
              <Image
                src="/processlogo.svg"
                alt="logo"
                width={300}
                height={60}
                className="h-20 w-auto"
              />
            </div>
            <p className="mx-auto max-w-4xl text-4xl font-semibold text-neutral-800">
              {processDict.hero.title}
            </p>
            <CTOButton label={processDict.cta.bookDemo} />
          </div>
        </div>
      </div>

      {/* Section 2: À propos de nous */}
      <div className="relative mx-auto max-w-screen-xl border-x border-x-neutral-200 py-20">
        {/* <BackgroundGrid /> */}
        <div className="relative z-10 space-y-8 text-center">
          <h2 className="text-4xl font-bold">{processDict.about.title}</h2>
          <h3 className="text-2xl font-semibold text-parkwize_blue">
            {processDict.about.subtitle}
          </h3>
          <p className="mx-auto max-w-3xl text-lg">
            {processDict.about.description}
          </p>

          <div className="mt-12 space-y-4">
            <h4 className="text-xl font-semibold">
              {processDict.about.milestonesTitle}
            </h4>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {processDict.about.milestones.map((milestone) => (
                <div
                  key={milestone.year}
                  className="rounded-lg bg-neutral-50 p-6"
                >
                  <h4 className="mb-2 text-xl font-semibold text-parkwize_blue">
                    {milestone.year}
                  </h4>
                  <p>{milestone.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h4 className="mb-6 text-xl font-semibold">
              {processDict.about.whyTitle}
            </h4>
            <div className="flex flex-wrap justify-center gap-6">
              {processDict.about.whyPoints.map((point) => (
                <div key={point} className="flex items-center gap-x-2">
                  <LucideCheck className="h-4 w-4 text-parkwize_blue" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Nos solutions */}
      <div className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              {processDict.solutions.title}
            </h2>
            <div className="mb-8 flex items-center justify-center gap-2">
              <LucideMonitor className="h-7 w-7 text-parkwize_blue" />
              <h3 className="text-2xl font-semibold">
                {processDict.solutions.platformTitle}
              </h3>
            </div>
            <p className="mx-auto max-w-3xl text-lg text-neutral-600">
              {processDict.solutions.description}
            </p>
          </div>

          <div className="mb-16">
            <h4 className="mb-8 text-center text-xl font-semibold">
              {processDict.solutions.featuresTitle}
            </h4>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {solutionFeatures.map((feature, index) => (
                <SolutionFeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2">
              <span className="text-sm font-medium">
                {processDict.solutions.badge}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section IoT */}
      <div className="py-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">{processDict.iot.title}</h2>
            <p className="mx-auto max-w-3xl text-lg text-neutral-600">
              {processDict.iot.description}
            </p>
          </div>

          <div className="mb-8 text-center">
            <h4 className="mb-6 text-xl font-semibold">
              {processDict.iot.benefitsTitle}
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {processDict.iot.features.map((feature, index) => (
              <IoTFeature
                key={feature.title}
                icon={iotIcons[index]}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Nos équipements */}
      <div className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-screen-xl">
          <h2 className="mb-16 text-center text-4xl font-bold">
            {processDict.equipment.title}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {processDict.equipment.cards.map((card) => (
              <EquipmentCard
                key={card.title}
                title={card.title}
                models={card.models}
                benefits={card.benefits}
                benefitsLabel={processDict.equipment.benefitsLabel}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: Démonstration en ligne */}
      {/*
      <div className="py-20">
        <div className="mx-auto max-w-screen-xl text-center">
          <h2 className="mb-8 text-4xl font-bold">Démonstration en ligne</h2>
          <p className="mb-12 text-lg">Testez notre solution en direct :</p>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <DemoLink
              icon="🧪"
              label="Développement"
              url="kioskmobile.azurewebsites.net"
              color="bg-yellow-100"
            />
            <DemoLink
              icon="🔍"
              label="Pré-production"
              url="processsystech-s1.azurewebsites.net"
              color="bg-blue-100"
            />
            <DemoLink
              icon="✅"
              label="Production"
              url="processsystech.azurewebsites.net"
              color="bg-green-100"
            />
          </div>
        </div>
      </div>
      */}

      {/* Section 6: Ils nous font confiance */}
      <div className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              {processDict.trust.title}
            </h2>
            <p className="mb-8 text-lg text-neutral-600">
              {processDict.trust.description}
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-xl font-semibold">
              <span className="text-parkwize_blue">
                {processDict.trust.stats[0]}
              </span>
              <span>|</span>
              <span className="text-parkwize_blue">
                {processDict.trust.stats[1]}
              </span>
            </div>
          </div>

          <div className="mb-8 text-center">
            <h3 className="mb-6 text-xl font-semibold">
              {processDict.trust.partnersTitle}
            </h3>
          </div>

          <div className="mb-12 gap-8">
            <InfiniteMovingCardsCard
              items={partners.map((partner) => ({
                id: partner,
                name: partner,
              }))}
              pauseOnHover={false}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                <p className="mb-2 text-sm text-neutral-600">
                  {testimonial.text}
                </p>
                <p className="font-semibold text-parkwize_blue">
                  — {testimonial.company}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 7: Support 24/7 */}
      <div className="py-20">
        <div className="mx-auto max-w-screen-xl text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <LucideHeadphones className="h-12 w-12 text-parkwize_blue" />
            <h2 className="text-4xl font-bold">{processDict.support.title}</h2>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            {processDict.support.cards.map((card) => (
              <div key={card} className="rounded-lg bg-neutral-50 p-6">
                <h4 className="mb-2 font-semibold">{card}</h4>
              </div>
            ))}
          </div>

          <div className="mt-8 text-lg font-semibold text-parkwize_blue">
            {processDict.support.benefitsTitle}
          </div>
          <p className="mt-2">{processDict.support.benefitsDescription}</p>
        </div>
      </div>

      {/* Section 8: Contact */}
      <div
        className={"relative mx-auto max-w-screen-xl pb-16 pt-16 text-center"}
      >
        <div className={"relative space-y-4"}>
          <p className={"text-primary_action"}>{processDict.contact.tag}</p>
          <h3 className={"mx-auto max-w-5xl text-6xl font-semibold"}>
            {processDict.contact.title}
          </h3>
          <p className={"mx-auto max-w-2xl"}>
            {processDict.contact.description1}
          </p>
          <p className={"mx-auto max-w-2xl"}>
            {processDict.contact.description2}
          </p>
          <CTOButton label={processDict.cta.bookDemo} />
        </div>
      </div>
    </div>
  );
}

// Helper Components
interface CTOButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
  label: string;
}

function CTOButton({ variant = "primary", className, label }: CTOButtonProps) {
  const baseClasses =
    "inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200";
  const variantClasses =
    variant === "primary"
      ? "bg-parkwize_blue text-white hover:bg-parkwize_blue/80"
      : "bg-white text-parkwize_blue hover:bg-neutral-100";

  return (
    <Link
      href="/contact"
      className={cn(baseClasses, variantClasses, className)}
    >
      {label}
    </Link>
  );
}

function SolutionFeatureCard({
  icon,
  title,
  description,
}: SolutionFeatureProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="text-parkwize_blue">{icon}</div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
}

function EquipmentCard({
  title,
  models,
  benefits,
  benefitsLabel,
}: EquipmentCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        {/*
        <div className={cn("rounded-lg p-2 text-white", color)}>{icon}</div>
        */}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <div className="space-y-4">
        <div>
          {models.map((model, index) => (
            <p key={index} className="text-sm text-neutral-600">
              {model}
            </p>
          ))}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">{benefitsLabel}</p>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-neutral-600">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function IoTFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 text-center">
      <div className="mb-3 flex justify-center">{icon}</div>
      <h4 className="mb-2 font-semibold">{title}</h4>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  );
}
