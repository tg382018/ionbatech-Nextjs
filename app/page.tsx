import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CategoriesSection } from "@/components/sections/categories-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WhyUsSection } from "@/components/sections/why-us-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <TrustStrip />
        <SolutionsSection />
        <WhyUsSection />
        <CategoriesSection />
        <ProcessSection />
        <StatsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
