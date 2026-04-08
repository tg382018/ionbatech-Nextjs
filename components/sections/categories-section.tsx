import { categoriesSection } from "@/lib/constants";

import { Container } from "../layout/container";
import { SectionHeading } from "../layout/section-heading";
import { AnimatedReveal, AnimatedRevealItem } from "../ui/animated-reveal";
import { CategoryTile } from "../ui/category-tile";

export function CategoriesSection() {
  return (
    <section
      id={categoriesSection.id}
      className="scroll-mt-24 py-16 sm:py-20"
      aria-labelledby="categories-heading"
    >
      <Container>
        <SectionHeading
          id="categories-heading"
          title={categoriesSection.title}
          subtitle={categoriesSection.subtitle}
        />
        <AnimatedReveal
          stagger
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categoriesSection.items.map((item) => (
            <AnimatedRevealItem key={item.href}>
              <CategoryTile
                title={item.title}
                description={item.description}
                href={item.href}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
              />
            </AnimatedRevealItem>
          ))}
        </AnimatedReveal>
      </Container>
    </section>
  );
}
