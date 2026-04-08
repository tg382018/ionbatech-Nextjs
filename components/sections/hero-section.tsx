import { HeroBanner } from "@/components/ui/hero-banner";

export function HeroSection() {
  return (
    <section
      id="anasayfa"
      aria-label="Tanıtım"
      className="relative overflow-hidden border-b border-white/10"
    >
      <HeroBanner />
    </section>
  );
}
