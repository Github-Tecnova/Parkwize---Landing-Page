import DashboardClient from "./dashboardPage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";

  return {
    title: isFr ? "Tableau de bord | Parkwize" : "Dashboard | Parkwize",
    description: isFr
      ? "Pilotez vos stationnements en temps réel avec des KPI, alertes et rapports centralisés."
      : "Run your parking operations in real time with centralized KPIs, alerts, and reports.",
  };
}

export default function ProductDashboard() {
  return <DashboardClient />;
}
