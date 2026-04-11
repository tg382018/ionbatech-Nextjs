import { processSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { AnimatedReveal } from "../ui/animated-reveal";
import { ProcessStepsTimeline } from "../ui/process-steps-timeline";

export function ProcessSection() {
  return (
    <section
      id={processSection.id}
      className="scroll-mt-24 border-t border-[#F0F0F0] bg-white py-16 sm:py-24"
      aria-labelledby="process-heading"
    >
      <Container className="relative">
        <AnimatedReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <h2
              id="process-heading"
              className="font-heading text-3xl font-bold tracking-tight text-[#1A1D23] sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
            >
              {processSection.title}
            </h2>
          </div>
        </AnimatedReveal>
        <ProcessStepsTimeline />
      </Container>
    </section>
  );
}
