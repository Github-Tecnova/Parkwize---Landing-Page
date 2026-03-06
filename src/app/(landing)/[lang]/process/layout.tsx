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
      ? "Technologie Process | Parkwize"
      : "Process Technology | Parkwize",
    description: isFr
      ? "Decouvrez les solutions materielles Process integrees a l'ecosysteme Parkwize."
      : "Discover Process hardware solutions integrated with the Parkwize ecosystem.",
  };
}

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
