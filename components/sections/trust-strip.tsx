import { Container } from "../layout/container";
import { AnimatedReveal } from "../ui/animated-reveal";
import { TrustMarquee } from "../ui/trust-marquee";

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-card py-8">
      <Container>
        <AnimatedReveal>
          <TrustMarquee />
        </AnimatedReveal>
      </Container>
    </section>
  );
}
