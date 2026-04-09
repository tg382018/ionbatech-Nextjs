import { useCasesSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { SectionHeading } from "../layout/section-heading";
import { AnimatedReveal } from "../ui/animated-reveal";

export function UseCasesSection() {
  return (
    <section
      id={useCasesSection.id}
      className="scroll-mt-24 border-t border-border bg-muted/15 py-16 sm:py-20"
      aria-labelledby="use-cases-heading"
    >
      <Container>
        <SectionHeading
          id="use-cases-heading"
          title={useCasesSection.title}
          subtitle={useCasesSection.subtitle}
        />
        <AnimatedReveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {useCasesSection.items.map((item) => (
              <li
                key={item.title}
                className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-sm ring-1 ring-foreground/5"
              >
                <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
