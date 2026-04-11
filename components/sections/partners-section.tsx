import { partnersSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { PartnersMarquee } from "../ui/partners-marquee";

export function PartnersSection() {
  return (
    <section
      id={partnersSection.id}
      className="relative scroll-mt-24 border-b border-border/80 bg-gradient-to-b from-muted/40 via-background to-background py-14 sm:py-16"
      aria-labelledby="partners-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.55 0.12 148 / 0.12), transparent)",
        }}
      />
      <Container className="relative">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex rounded-full bg-primary/[0.1] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            {partnersSection.badge}
          </span>
          <h2
            id="partners-heading"
            className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {partnersSection.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {partnersSection.subtitle}
          </p>
        </div>
        <PartnersMarquee />
      </Container>
    </section>
  );
}
