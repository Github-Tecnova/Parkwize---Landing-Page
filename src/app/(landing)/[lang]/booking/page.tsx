import ProductBooking from "./bookingPage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";

  return {
    title: isFr ? "Réservation | Parkwize" : "Booking | Parkwize",
    description: isFr
      ? "Gérez les réservations de stationnement en ligne avec une expérience simple et optimisée."
      : "Manage online parking reservations with a seamless and optimized experience.",
  };
}

export default function BookingPage() {
  return <ProductBooking />;
}
