import ProductAI from "./aiPage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";

  return {
    title: isFr
      ? "Parkwize IA | Assistant et prévisions"
      : "Parkwize AI | Assistant and Forecasting",
    description: isFr
      ? "Découvrez les outils IA de Parkwize pour la prévision, la tarification et l'automatisation du stationnement."
      : "Explore Parkwize AI tools for parking forecasting, pricing, and automation.",
  };
}

export default function AIPage() {
  return <ProductAI />;
}
