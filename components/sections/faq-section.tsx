import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { SectionHeading } from "../layout/section-heading";
import { AnimatedReveal } from "../ui/animated-reveal";

export function FaqSection() {
  return (
    <section
      id={faqSection.id}
      className="scroll-mt-24 border-t border-border bg-muted/20 py-16 sm:py-20"
      aria-labelledby="faq-heading"
    >
      <Container>
        <SectionHeading
          id="faq-heading"
          title={faqSection.title}
          subtitle={faqSection.subtitle}
        />
        <AnimatedReveal>
          <Accordion
            multiple
            defaultValue={[]}
            className="mx-auto max-w-3xl rounded-2xl border border-border/80 bg-card px-4 py-2 shadow-sm ring-1 ring-foreground/5 sm:px-6"
          >
            {faqSection.items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground sm:text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
