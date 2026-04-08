import { statsSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { SectionHeading } from "../layout/section-heading";
import { AnimatedReveal, AnimatedRevealItem } from "../ui/animated-reveal";
import { MetricCard } from "../ui/metric-card";

export function StatsSection() {
  return (
    <section
      id={statsSection.id}
      className="scroll-mt-24 py-16 sm:py-20"
      aria-labelledby="stats-heading"
    >
      <Container>
        <SectionHeading
          id="stats-heading"
          title={statsSection.title}
          subtitle={statsSection.subtitle}
        />
        <AnimatedReveal
          stagger
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statsSection.metrics.map((m) => (
            <AnimatedRevealItem key={m.label}>
              <MetricCard
                label={m.label}
                value={m.value}
                hint={m.hint}
                tone={m.tone}
              />
            </AnimatedRevealItem>
          ))}
        </AnimatedReveal>
      </Container>
    </section>
  );
}
