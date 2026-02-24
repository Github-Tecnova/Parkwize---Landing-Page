"use client";

import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image, { type StaticImageData } from "next/image";

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

const ProductPageLayout = (props: ProductPageProps) => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-parkwize_blue/5 blur-[120px]" />
      <div className="absolute top-[40%] -right-60 w-[500px] h-[500px] rounded-full bg-parkwize_blue/4 blur-[140px]" />
      <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full bg-parkwize_blue/3 blur-[100px]" />
    </div>
    <div className="relative z-10">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            {...anim}
            className="text-sm font-semibold uppercase tracking-widest text-parkwize_blue mb-4"
          >
            {props.badge}
          </motion.p>
          <motion.h1
            {...anim}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
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
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {props.subheadline}
          </motion.p>
          <motion.div
            {...anim}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="text-base px-8 bg-parkwize_blue text-white hover:bg-parkwize_blue/90 rounded-none"
            >
              Request Private Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 rounded-none"
            >
              Book Meeting in Amsterdam
            </Button>
          </motion.div>
          {(props.heroVideo || props.heroImage) && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="max-w-5xl mx-auto mt-16"
            >
              <div className=" overflow-hidden shadow-2xl shadow-parkwize_blue/10 border border-border">
                {props.heroVideo ? (
                  <video
                    src={props.heroVideo}
                    className="w-full h-auto max-h-[65vh] object-contain"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={props.heroImage as string | StaticImageData}
                    alt={props.badge}
                    className="w-full h-auto"
                  />
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-6 bg-secondary/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...anim}>
            <p className="text-sm font-semibold uppercase tracking-widest text-parkwize_blue mb-3">
              The Problem
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              {props.problemTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {props.problemDesc}
            </p>
          </motion.div>
          <motion.div
            {...anim}
            transition={{ delay: 0.2 }}
            className="mt-12 max-w-2xl mx-auto space-y-6 text-left"
          >
            {props.problems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <span className="w-2 h-2 rounded-full bg-parkwize_blue mt-2 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Core */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...anim} className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-parkwize_blue mb-3">
              The Solution
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              {props.coreTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {props.coreDesc}
            </p>
          </motion.div>
          <motion.div
            {...anim}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            {props.corePoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 items-start"
              >
                <span className="w-2 h-2 rounded-full bg-parkwize_blue mt-2 shrink-0" />
                <p className="text-muted-foreground leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...anim} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-parkwize_blue mb-3">
              Features
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              What&apos;s Inside
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {props.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className=" border border-border bg-card p-8 hover:shadow-lg hover:shadow-parkwize_blue/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-parkwize_blue/10 flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-parkwize_blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Integration */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...anim}>
            <p className="text-sm font-semibold uppercase tracking-widest text-parkwize_blue mb-3">
              Connected Ecosystem
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {props.ecosystemTitle}
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              {props.ecosystemDesc}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {props.ecosystemLinks.map((link, i) => (
              <motion.a
                key={link.title}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className=" border border-border bg-card p-6 text-left hover:border-parkwize_blue/40 hover:shadow-lg hover:shadow-parkwize_blue/5 transition-all duration-300 group"
              >
                <h3 className="font-bold mb-2 group-hover:text-parkwize_blue transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-muted-foreground">{link.desc}</p>
                <span className="text-sm font-medium text-parkwize_blue inline-flex items-center gap-1 mt-3 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...anim} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-parkwize_blue mb-3">
              Results
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Measurable Impact
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {props.impacts.map((imp, i) => (
              <motion.div
                key={imp.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border bg-card p-6 text-center"
              >
                <p className="text-4xl font-bold text-parkwize_blue mb-2">
                  {imp.stat}
                </p>
                <h3 className="font-semibold text-foreground mb-1">
                  {imp.label}
                </h3>
                <p className="text-sm text-muted-foreground">{imp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-6 bg-parkwize_blue">
        <motion.div
          {...anim}
          className="max-w-4xl mx-auto text-center  p-12 md:p-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Reengineering the Parking Industry from Scratch — Powered by AI.
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join the next generation of parking operators. We&apos;re launching
            in Amsterdam and inviting strategic partners to grow with us early.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base px-8">
              Request Private Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 border-white/30 text-parkwize_blue hover:bg-white/10"
            >
              Join the Private Launch in Amsterdam
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  </div>
);

export default ProductPageLayout;
