import { processSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { SectionHeading } from "../layout/section-heading";
import { AnimatedReveal } from "../ui/animated-reveal";
import { ProcessStepsTimeline } from "../ui/process-steps-timeline";

export function ProcessSection() {
  return (
    <section
      id={processSection.id}
      className="relative scroll-mt-24 overflow-hidden border-t border-border py-16 sm:py-20"
      aria-labelledby="process-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/25 via-background to-muted/20"
        aria-hidden
      />
      <Container className="relative">
        <AnimatedReveal>
          <SectionHeading
            id="process-heading"
            title={processSection.title}
            subtitle={processSection.subtitle}
          />
        </AnimatedReveal>
        <ProcessStepsTimeline />
      </Container>
    </section>
  );
}
