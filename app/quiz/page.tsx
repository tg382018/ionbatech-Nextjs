import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SolarCalculatorWizard } from "@/components/solar-calculator/solar-calculator-wizard";

export const metadata: Metadata = {
  title: "Güneş enerjisi tasarruf hesaplayıcısı",
  description:
    "Cihazlarınıza göre tahmini elektrik ihtiyacını ve yıllık tasarruf potansiyelini ücretsiz hesaplayın.",
};

export default function QuizPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <SolarCalculatorWizard />
      </main>
      <SiteFooter />
    </>
  );
}
