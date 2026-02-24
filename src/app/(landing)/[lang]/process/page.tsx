"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Cpu,
  Zap,
  Camera,
  Monitor,
  Wrench,
  Settings,
  BellRing,
  Headphones,
  Check,
  KeyRound,
  BarChart3,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import hardwareImg from "@/assets/hardware-process.jpg";
import Image from "next/image";

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
    image: hardwareImg,
    description:
      "High-speed barrier with integrated ANPR and LED signage. Opens in under 1 second.",
    specs: ["Speed: <1s", "IP65 rated", "24/7 operation", "ANPR ready"],
  },
  {
    name: "PT-Terminal T3",
    type: "image" as const,
    image: hardwareImg,
    description:
      "Touchscreen payment terminal with contactless, QR, and NFC support. Outdoor-rated.",
    specs: ['10" display', "NFC / QR", "Contactless pay", "Anti-vandal"],
  },
  {
    name: "PT-Sensor S2",
    type: "3d" as const,
    image: hardwareImg,
    description:
      "Ultrasonic bay sensor with LoRaWAN connectivity. Detects occupancy in real time.",
    specs: ["LoRaWAN", "99.8% accuracy", "5yr battery", "Wireless"],
  },
  {
    name: "PT-Gate G4",
    type: "image" as const,
    image: hardwareImg,
    description:
      "Pedestrian access gate with biometric and mobile credential support.",
    specs: ["Biometric", "Mobile access", "ADA compliant", "Anti-tailgate"],
  },
];

const supportCards = [
  "Dedicated technical account manager for every deployment",
  "24/7 remote monitoring and incident response",
  "On-site intervention within 4 hours across the Netherlands",
  "Quarterly hardware health reports and optimization reviews",
];

const iotFeatures = [
  {
    icon: BarChart3,
    title: "Live Telemetry",
    desc: "Every device streams operational data to the Parkwize Dashboard in real time.",
  },
  {
    icon: KeyRound,
    title: "Encrypted Comms",
    desc: "End-to-end TLS encryption with role-based access control on all endpoints.",
  },
  {
    icon: Users,
    title: "Multi-Site Control",
    desc: "Manage hundreds of devices across locations from a single pane of glass.",
  },
  {
    icon: Zap,
    title: "Edge Computing",
    desc: "Local processing for instant decisions — no cloud latency for critical operations.",
  },
  {
    icon: Wrench,
    title: "OTA Updates",
    desc: "Push firmware and configuration changes remotely without site visits.",
  },
];

/* --- Page --- */

const Hardware = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background blurs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-parkwize_blue/5 blur-[120px]" />
        <div className="absolute top-[40%] -right-60 w-[500px] h-[500px] rounded-full bg-parkwize_blue/4 blur-[140px]" />
        <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full bg-parkwize_blue/3 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="lg:pt-32 pb-20 px-6 relative pt-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...anim}>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest text-parkwize_blue bg-parkwize_blue/10 px-3 py-1.5">
                    Hardware Partner — Process Technology
                  </span>
                  <Image
                    src="/processlogo.svg"
                    alt="Process Technology logo"
                    width={140}
                    height={32}
                    className="h-10 w-auto mb-5"
                  />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                  Industrial-Grade Hardware,{" "}
                  <span className="text-parkwize_blue">
                    Intelligent by Design.
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  Parkwize integrates natively with Process Technology —
                  barriers, terminals, sensors, and access control built for the
                  next generation of parking.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
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
                    Download Specs
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="rounded-2xl overflow-hidden border border-border shadow-2xl shadow-parkwize_blue/10">
                  <Image
                    src={hardwareImg}
                    alt="Process Technology hardware"
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT / MILESTONES ===== */}
        <section className="py-14 md:py-24 px-6 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <motion.div {...anim} className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-parkwize_blue mb-3">
                About Process Technology
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                20+ Years of Parking Infrastructure
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Process Technology has been engineering industrial-grade parking
                equipment since 2005. Today, they power thousands of facilities
                across Europe with hardware designed for reliability,
                scalability, and smart connectivity.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Milestones */}
              <motion.div {...anim} transition={{ delay: 0.1 }}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-parkwize_blue rounded-full" />
                  Key Milestones
                </h3>
                <div className="space-y-4">
                  {milestones.map((m, i) => (
                    <motion.div
                      key={m.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <span className="text-sm font-bold text-parkwize_blue bg-parkwize_blue/10 px-2.5 py-1 shrink-0 mt-0.5">
                        {m.year}
                      </span>
                      <p className="text-muted-foreground">{m.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Why Process Technology */}
              <motion.div {...anim} transition={{ delay: 0.2 }}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-parkwize_blue rounded-full" />
                  Why Process Technology
                </h3>
                <div className="space-y-3">
                  {whyPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-parkwize_blue/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-parkwize_blue" />
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
        <section className="py-14 md:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div {...anim} className="text-center mb-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-parkwize_blue mb-3">
                Our Solutions
              </p>
              <div className="flex items-center justify-center gap-3 mb-6">
                <Cpu className="w-6 h-6 text-parkwize_blue" />
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Integrated Platform
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-16">
                A complete hardware ecosystem that connects seamlessly with
                every Parkwize software module — from access control to
                AI-powered analytics.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {solutionFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className=" border border-border bg-card p-8 hover:border-parkwize_blue/40 hover:shadow-lg hover:shadow-parkwize_blue/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-parkwize_blue/10 flex items-center justify-center mb-5 group-hover:bg-parkwize_blue/20 transition-colors">
                    <f.icon className="w-6 h-6 text-parkwize_blue" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div {...anim} className="text-center">
              <span className="inline-block text-sm font-medium text-parkwize_blue bg-parkwize_blue/10 px-4 py-2">
                ✦ Fully compatible with Parkwize Dashboard, Booking, Display &
                AI
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
        <section className="py-14 md:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div {...anim} className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-parkwize_blue mb-3">
                Our Equipment
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Hardware{" "}
                <span className="text-parkwize_blue">Product Line</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Industrial-grade equipment engineered for reliability. Some
                products feature interactive 3D models — others showcase
                high-resolution imagery.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-border bg-card overflow-hidden group hover:border-parkwize_blue/40 hover:shadow-xl hover:shadow-parkwize_blue/5 transition-all duration-300"
                >
                  {/* Product visual */}
                  <div className="relative aspect-[4/3] bg-secondary/50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.type === "3d" && (
                      <div className="absolute top-4 right-4 bg-parkwize_blue/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                        3D Model
                      </div>
                    )}
                    {product.type === "image" && (
                      <div className="absolute top-4 right-4 bg-card/90 text-foreground text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border border-border">
                        Gallery
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.specs.map((spec) => (
                        <span
                          key={spec}
                          className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md"
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
        <section className="py-10 md:py-12 px-6 bg-parkwize_blue">
          <motion.div
            {...anim}
            className=" mx-auto text-center rounded-3xl  p-12 md:p-16 px-0 lg:px-12"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">
              Let&apos;s Build Together
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              The Best Hardware to Fit with the Best Software.
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Discover how Process Technology × Parkwize delivers a fully
              integrated, intelligent parking stack — from barrier to dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base px-8">
                Request Private Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 border-white/30 text-parkwize_blue hover:bg-white/10 hover:text-white"
              >
                Download Hardware Catalog
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Hardware;
