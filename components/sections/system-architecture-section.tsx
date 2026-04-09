import { Fragment } from "react";
import { ChevronRight } from "lucide-react";

import { systemArchitectureSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { SectionHeading } from "../layout/section-heading";
import { AnimatedReveal } from "../ui/animated-reveal";

export function SystemArchitectureSection() {
  const flowSummary = systemArchitectureSection.flow
    .map((s) => s.label)
    .join(" → ");

  return (
    <section
      id={systemArchitectureSection.id}
      className="scroll-mt-24 py-16 sm:py-20"
      aria-labelledby="architecture-heading"
    >
      <Container>
        <SectionHeading
          id="architecture-heading"
          title={systemArchitectureSection.title}
          subtitle={systemArchitectureSection.subtitle}
        />
        <AnimatedReveal>
          <div
            className="mx-auto max-w-4xl space-y-10"
            aria-label={`Enerji akışı: ${flowSummary}`}
          >
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-2">
              {systemArchitectureSection.flow.map((step, index) => (
                <Fragment key={step.label}>
                  <div className="rounded-2xl border border-border/80 bg-card px-4 py-4 text-center shadow-sm ring-1 ring-foreground/5 sm:max-w-[11rem] sm:px-5">
                    <p className="font-heading text-sm font-semibold text-foreground sm:text-base">
                      {step.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      {step.hint}
                    </p>
                  </div>
                  {index < systemArchitectureSection.flow.length - 1 ? (
                    <ChevronRight
                      className="mx-auto hidden size-6 shrink-0 text-primary/60 sm:mx-0 sm:block"
                      aria-hidden
                    />
                  ) : null}
                </Fragment>
              ))}
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 sm:p-8">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {systemArchitectureSection.integrationTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {systemArchitectureSection.integrationBody}
              </p>
            </div>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
