import {
  ArrowRight,
  BellRing,
  Camera,
  Check,
  Cpu,
  Headphones,
  KeyRound,
  Monitor,
  Settings,
  Shield,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import HomeFooter from "../../../../components/nav/home-footer";
import { Button } from "@/components/ui/button";
import { getDictionary, LangType } from "@/content/dictionary";

const solutionIcons = [
  Camera,
  Shield,
  Monitor,
  Cpu,
  Settings,
  BellRing,
] as const;
const iotIcons = [BellRing, Wrench, Cpu, Camera, KeyRound] as const;

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang: LangType = lang === "fr" || lang === "en" ? lang : "en";
  const dict = await getDictionary(safeLang);
  const processDict = dict.processPage;

  return (
    <div className="text-text">
      <section className="border-b border-border-light bg-background px-5 pb-16 pt-14">
        <div className="mx-auto max-w-screen-2xl text-center">
          <div className="mb-8 flex items-center justify-center">
            <Image
              src="/processlogo.svg"
              alt="Process Technology"
              width={320}
              height={72}
              className="h-16 w-auto"
            />
          </div>
          <p className="mx-auto max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {processDict.hero.title}
          </p>
          <Button
            asChild
            className="mt-8 bg-parkwize_blue text-white hover:bg-blue-700"
          >
            <Link href={`/${safeLang}/process`}>
              {processDict.cta.bookDemo}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="border-b border-border-light px-5 py-16">
        <div className="mx-auto max-w-screen-2xl space-y-8 text-center">
          <h2 className="text-4xl font-bold">{processDict.about.title}</h2>
          <h3 className="text-2xl font-semibold text-parkwize_blue">
            {processDict.about.subtitle}
          </h3>
          <p className="mx-auto max-w-3xl text-lg text-text-muted">
            {processDict.about.description}
          </p>

          <div className="pt-4">
            <h4 className="mb-6 text-xl font-semibold">
              {processDict.about.milestonesTitle}
            </h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {processDict.about.milestones.map((milestone) => (
                <article
                  key={milestone.year}
                  className="rounded-lg border border-border-light bg-neutral-50 p-6 text-left"
                >
                  <p className="mb-2 text-xl font-semibold text-parkwize_blue">
                    {milestone.year}
                  </p>
                  <p className="text-text-muted">{milestone.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <h4 className="mb-6 text-xl font-semibold">
              {processDict.about.whyTitle}
            </h4>
            <div className="flex flex-wrap justify-center gap-5">
              {processDict.about.whyPoints.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-parkwize_blue" />
                  <span className="text-sm text-text-muted">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-5 py-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              {processDict.solutions.title}
            </h2>
            <div className="mb-6 flex items-center justify-center gap-2">
              <Cpu className="h-6 w-6 text-parkwize_blue" />
              <h3 className="text-2xl font-semibold">
                {processDict.solutions.platformTitle}
              </h3>
            </div>
            <p className="mx-auto max-w-3xl text-lg text-text-muted">
              {processDict.solutions.description}
            </p>
          </div>

          <h4 className="mb-6 text-center text-xl font-semibold">
            {processDict.solutions.featuresTitle}
          </h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {processDict.solutions.features.map((feature, index) => {
              const Icon = solutionIcons[index % solutionIcons.length];

              return (
                <article
                  key={feature.title}
                  className="rounded-lg border border-border-light bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-parkwize_blue" />
                    <h5 className="font-semibold">{feature.title}</h5>
                  </div>
                  <p className="text-sm text-text-muted">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-parkwize_blue">
              {processDict.solutions.badge}
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">{processDict.iot.title}</h2>
            <p className="mx-auto max-w-3xl text-lg text-text-muted">
              {processDict.iot.description}
            </p>
            <h4 className="mt-8 text-xl font-semibold">
              {processDict.iot.benefitsTitle}
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {processDict.iot.features.map((feature, index) => {
              const Icon = iotIcons[index % iotIcons.length];

              return (
                <article
                  key={feature.title}
                  className="rounded-lg border border-border-light bg-white p-5 text-center"
                >
                  <Icon className="mx-auto mb-3 h-6 w-6 text-parkwize_blue" />
                  <p className="font-semibold">{feature.title}</p>
                  <p className="mt-2 text-sm text-text-muted">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-5 py-16">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="mb-10 text-center text-4xl font-bold">
            {processDict.equipment.title}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {processDict.equipment.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-border-light bg-white p-6 shadow-sm"
              >
                <h3 className="mb-4 text-xl font-semibold">{card.title}</h3>
                <div className="space-y-1">
                  {card.models.map((model) => (
                    <p key={model} className="text-sm text-text-muted">
                      {model}
                    </p>
                  ))}
                </div>
                <p className="mb-2 mt-5 text-sm font-semibold">
                  {processDict.equipment.benefitsLabel}
                </p>
                <ul className="space-y-1">
                  {card.benefits.map((benefit) => (
                    <li key={benefit} className="text-sm text-text-muted">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-screen-2xl text-center">
          <h2 className="mb-4 text-4xl font-bold">{processDict.trust.title}</h2>
          <p className="mb-6 text-lg text-text-muted">
            {processDict.trust.description}
          </p>
          <div className="mb-10 flex flex-wrap justify-center gap-3 text-sm font-semibold text-parkwize_blue">
            {processDict.trust.stats.map((stat) => (
              <span key={stat} className="rounded-full bg-blue-100 px-4 py-2">
                {stat}
              </span>
            ))}
          </div>

          <h3 className="mb-4 text-xl font-semibold">
            {processDict.trust.partnersTitle}
          </h3>
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {processDict.trust.partners.map((partner) => (
              <span
                key={partner}
                className="rounded-md border border-border-light bg-white px-3 py-1.5 text-sm text-text-muted"
              >
                {partner}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {processDict.trust.testimonials.map((testimonial) => (
              <article
                key={testimonial.company}
                className="rounded-lg border border-border-light bg-white p-6 text-left shadow-sm"
              >
                <p className="mb-3 text-sm text-text-muted">
                  {testimonial.text}
                </p>
                <p className="font-semibold text-parkwize_blue">
                  — {testimonial.company}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-5 py-16">
        <div className="mx-auto max-w-screen-xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Headphones className="h-8 w-8 text-parkwize_blue" />
            <h2 className="text-4xl font-bold">{processDict.support.title}</h2>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
            {processDict.support.cards.map((card) => (
              <article
                key={card}
                className="rounded-lg border border-border-light bg-white p-6"
              >
                <p className="font-medium">{card}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-lg font-semibold text-parkwize_blue">
            {processDict.support.benefitsTitle}
          </p>
          <p className="mt-2 text-text-muted">
            {processDict.support.benefitsDescription}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-5 pb-16 pt-16 text-center">
        <p className="text-primary_action">{processDict.contact.tag}</p>
        <h3 className="mx-auto mt-3 max-w-5xl text-4xl font-semibold sm:text-5xl md:text-6xl">
          {processDict.contact.title}
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          {processDict.contact.description1}
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-text-muted">
          {processDict.contact.description2}
        </p>
        <Button
          asChild
          className="mt-8 bg-parkwize_blue text-white hover:bg-blue-700"
        >
          <Link href={`/${safeLang}/process`}>
            {processDict.cta.bookDemo}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      <HomeFooter lang={safeLang} dict={dict} />
    </div>
  );
}
