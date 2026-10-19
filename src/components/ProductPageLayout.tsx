"use client";

import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image, { type StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface EcosystemLink {
  title: string;
  desc: string;
  href: string;
}

interface Impact {
  stat: string;
  label: string;
  desc: string;
}

export interface ProductPageProps {
  badge: string;
  headline: string;
  headlineAccent?: string;
  subheadline: string;
  heroImage?: string | StaticImageData;
  heroVideo?: string;
  problemTitle: string;
  problemDesc: string;
  problems: { title: string; desc: string }[];
  coreTitle: string;
  coreDesc: string;
  corePoints: string[];
  features: Feature[];
  ecosystemTitle: string;
  ecosystemDesc: string;
  ecosystemLinks: EcosystemLink[];
  impacts: Impact[];
}

const anim = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

const getEcosystemProductImage = (href: string, title: string) => {
  const key = `${href} ${title}`.toLowerCase();

  if (key.includes("dashboard")) {
    return "/landing-dashboard.png";
  }

  if (
    key.includes("display") ||
    key.includes("signage") ||
    key.includes("tv")
  ) {
    return "/landing-tvs.png";
  }

  if (key.includes("booking") || key.includes("reservation")) {
    return "/landing-phones.png";
  }

  if (key.includes("ai")) {
    return "/landing/parkwize-ai.png";
  }

  if (key.includes("process") || key.includes("hardware")) {
    return "/landing-borne.png";
  }

  return "/landing-dashboard.png";
};

const ProductPageLayout = (props: ProductPageProps) => {
  const pathname = usePathname();
  const isFr = pathname.startsWith("/fr");
  const landingFormHref = isFr
    ? "/fr#early-access-form"
    : "/en#early-access-form";

  const labels = isFr
    ? {
        getInTouch: "Contactez-nous",
        requestDemo: "Demander une démo privée",
        bookMeeting: "Planifier une rencontre à Amsterdam",
        problem: "Le Problème",
        solution: "La Solution",
        features: "Fonctionnalités",
        whatsInside: "Ce que ça inclut",
        connectedEcosystem: "Écosystème connecté",
        learnMore: "En savoir plus",
        results: "Résultats",
        measurableImpact: "Impact mesurable",
        finalTitle:
          "Réinventer l'industrie du stationnement de zéro — propulsé par l’IA.",
        finalDescription:
          "Rejoignez la nouvelle génération d'opérateurs de stationnement. Nous lançons à Amsterdam et invitons des partenaires stratégiques à grandir avec nous dès maintenant.",
        joinLaunch: "Rejoindre le lancement privé à Amsterdam",
      }
    : {
        getInTouch: "Get in touch",
        requestDemo: "Request Private Demo",
        bookMeeting: "Book Meeting in Amsterdam",
        problem: "The Problem",
        solution: "The Solution",
        features: "Features",
        whatsInside: "What's Inside",
        connectedEcosystem: "Connected Ecosystem",
        learnMore: "Learn more",
        results: "Results",
        measurableImpact: "Measurable Impact",
        finalTitle:
          "Reengineering the Parking Industry from Scratch — Powered by AI.",
        finalDescription:
          "Join the next generation of parking operators. We're launching in Amsterdam and inviting strategic partners to grow with us early.",
        joinLaunch: "Join the Private Launch in Amsterdam",
      };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-parkwize_blue/5 blur-[120px]" />
        <div className="bg-parkwize_blue/4 absolute -right-60 top-[40%] h-[500px] w-[500px] rounded-full blur-[140px]" />
        <div className="bg-parkwize_blue/3 absolute bottom-0 left-[10%] h-[400px] w-[400px] rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10">
        {/* Hero */}
        <section className="px-6 pb-20 pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p
              {...anim}
              className="mb-4 text-sm font-semibold uppercase tracking-widest text-parkwize_blue"
            >
              {props.badge}
            </motion.p>
            <motion.h1
              {...anim}
              transition={{ delay: 0.1 }}
              className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            >
              {props.headline}
              {props.headlineAccent && (
                <>
                  <br />
                  <span className="text-parkwize_blue">
                    {props.headlineAccent}
                  </span>
                </>
              )}
            </motion.h1>
            <motion.p
              {...anim}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
            >
              {props.subheadline}
            </motion.p>
            <motion.div
              {...anim}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="rounded-none bg-parkwize_blue px-8 text-base text-white hover:bg-parkwize_blue/90"
              >
                {labels.getInTouch} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            {(props.heroVideo || props.heroImage) && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mx-auto mt-16 max-w-5xl"
              >
                <div className="overflow-hidden">
                  {props.heroVideo ? (
                    <video
                      src={props.heroVideo}
                      className="h-auto max-h-[65vh] w-full object-contain"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={props.heroImage as string | StaticImageData}
                      alt={props.badge}
                      className="h-auto w-full"
                    />
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Problem */}
        <section className="bg-secondary/50 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div {...anim}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-parkwize_blue">
                {labels.problem}
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
                {props.problemTitle}
              </h2>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {props.problemDesc}
              </p>
            </motion.div>
            <motion.div
              {...anim}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-12 max-w-2xl space-y-6 text-left"
            >
              {props.problems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-parkwize_blue" />
                  <div>
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Product Core */}
        <section className="bg-[#14181f] px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <motion.div {...anim} className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-parkwize_blue">
                {labels.solution}
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
                {props.coreTitle}
              </h2>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#a1a2a5]">
                {props.coreDesc}
              </p>
            </motion.div>
            <motion.div
              {...anim}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl space-y-4"
            >
              {props.corePoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-parkwize_blue" />
                  <p className="leading-relaxed text-[#a1a2a5]">{point}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="bg-[#14181f] px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <motion.div {...anim} className="mb-16 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-parkwize_blue">
                {labels.features}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                {labels.whatsInside}
              </h2>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {props.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-[#ffffff1a] bg-[#ffffff0d] p-8 transition-all duration-300 hover:shadow-lg hover:shadow-parkwize_blue/5"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="mb-2 text-lg font-bold text-white">
                      {f.title}
                    </h3>
                    <div className="flex h-6 w-6 items-center justify-center">
                      <f.icon className="h-6 w-6 text-parkwize_blue" />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#a1a2a5]">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Integration */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div {...anim}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-parkwize_blue">
                {labels.connectedEcosystem}
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                {props.ecosystemTitle}
              </h2>
              <p className="mb-12 text-lg text-muted-foreground">
                {props.ecosystemDesc}
              </p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3">
              {props.ecosystemLinks.map((link, i) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden border border-border bg-card p-6 text-left transition-all duration-300 hover:border-parkwize_blue/40 hover:shadow-lg hover:shadow-parkwize_blue/5"
                >
                  <h3 className="mb-2 font-bold transition-colors group-hover:text-parkwize_blue">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-parkwize_blue transition-all group-hover:gap-2">
                    {labels.learnMore} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <div className="border-border/80 bg-background/70 pointer-events-none absolute bottom-4 right-4 h-10 w-10 overflow-hidden rounded-sm border">
                    <Image
                      src={getEcosystemProductImage(link.href, link.title)}
                      alt={link.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="bg-secondary/50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <motion.div {...anim} className="mb-16 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-parkwize_blue">
                {labels.results}
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                {labels.measurableImpact}
              </h2>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {props.impacts.map((imp, i) => (
                <motion.div
                  key={imp.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-border bg-card p-6 text-center"
                >
                  <p className="mb-2 text-4xl font-bold text-parkwize_blue">
                    {imp.stat}
                  </p>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {imp.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{imp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-parkwize_blue px-6 py-12">
          <motion.div
            {...anim}
            className="mx-auto max-w-4xl p-12 text-center md:p-16"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {labels.finalTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-white/80">
              {labels.finalDescription}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 text-base hover:border hover:border-white hover:bg-parkwize_blue hover:text-white"
                asChild
              >
                <Link href={landingFormHref}>
                  {labels.requestDemo} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default ProductPageLayout;
