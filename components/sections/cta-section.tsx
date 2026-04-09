import { ctaSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { AnimatedReveal } from "../ui/animated-reveal";
import { CtaButton } from "../ui/cta-button";

export function CtaSection() {
  return (
    <section
      id={ctaSection.id}
      className="scroll-mt-24 py-16 sm:py-20"
      aria-labelledby="cta-heading"
    >
      <Container>
        <AnimatedReveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-primary px-8 py-12 text-center shadow-[0_20px_50px_-12px_oklch(0.46_0.16_148_/_0.45)] ring-1 ring-white/15 sm:px-12 sm:py-16">
            <div
              className="absolute inset-x-0 top-0 h-1 bg-white/25"
              aria-hidden
            />
            <h2
              id="cta-heading"
              className="mx-auto max-w-2xl font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              {ctaSection.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
              {ctaSection.subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CtaButton
                href={ctaSection.primary.href}
                external
                className="w-full min-w-[200px] border-0 bg-white font-semibold text-primary shadow-md transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
              >
                {ctaSection.primary.label}
              </CtaButton>
              <CtaButton
                href={ctaSection.secondary.href}
                external={ctaSection.secondary.href.startsWith("http")}
                variant="outline"
                className="w-full border-2 border-white/80 bg-transparent font-semibold text-white hover:bg-white/15 hover:text-white sm:w-auto"
              >
                {ctaSection.secondary.label}
              </CtaButton>
            </div>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
