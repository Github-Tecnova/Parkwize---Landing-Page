import ProductDisplay from "./displayPage";
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
      ? "Affichage dynamique | Parkwize"
      : "Dynamic Signage | Parkwize",
    description: isFr
      ? "Contrôlez vos écrans de stationnement en temps réel avec une solution d'affichage intelligente."
      : "Control your parking displays in real time with an intelligent digital signage solution.",
  };
}

export default function DisplayPage() {
  return <ProductDisplay />;
}
