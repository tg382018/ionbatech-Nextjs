import { problemSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { SectionHeading } from "../layout/section-heading";
import { AnimatedReveal } from "../ui/animated-reveal";

export function ProblemSection() {
  return (
    <section
      id={problemSection.id}
      className="scroll-mt-24 border-t border-border bg-muted/25 py-16 sm:py-20"
      aria-labelledby="problem-heading"
    >
      <Container>
        <SectionHeading
          id="problem-heading"
          title={problemSection.title}
          subtitle={problemSection.subtitle}
        />
        <AnimatedReveal>
          <div className="mx-auto max-w-3xl space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              {problemSection.intro}
            </p>
            <ul className="space-y-5">
              {problemSection.problems.map((p) => (
                <li
                  key={p.title}
                  className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm ring-1 ring-foreground/5 sm:p-6"
                >
                  <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {p.description}
                  </p>
                </li>
              ))}
            </ul>
            <p className="border-l-2 border-primary/50 pl-4 text-sm font-medium leading-relaxed text-foreground sm:text-base">
              {problemSection.closing}
            </p>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
