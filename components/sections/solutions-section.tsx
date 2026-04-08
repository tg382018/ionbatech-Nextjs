import {
  Battery,
  CarFront,
  Droplets,
  Sun,
  Warehouse,
  Zap,
} from "lucide-react";

import type { SolutionIconKey } from "@/lib/constants";
import { solutionsSection } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Container } from "../layout/container";
import { SectionHeading } from "../layout/section-heading";
import { AnimatedReveal, AnimatedRevealItem } from "../ui/animated-reveal";
import { SolutionBentoCard } from "../ui/solution-bento-card";

const solutionIcons: Record<SolutionIconKey, typeof Battery> = {
  battery: Battery,
  storage: Warehouse,
  inverter: Zap,
  solar: Sun,
  irrigation: Droplets,
  ev: CarFront,
};

function bentoCellClass(iconKey: SolutionIconKey): string {
  switch (iconKey) {
    case "solar":
      return "md:col-span-2 md:row-span-2 md:min-h-[300px]";
    case "battery":
    case "storage":
      return "";
    case "inverter":
    case "irrigation":
    case "ev":
      return "md:col-span-2 lg:col-span-2";
    default:
      return "";
  }
}

export function SolutionsSection() {
  return (
    <section
      id={solutionsSection.id}
      className="scroll-mt-24 py-16 sm:py-20"
      aria-labelledby="solutions-heading"
    >
      <Container>
        <SectionHeading
          id="solutions-heading"
          title={solutionsSection.title}
          subtitle={solutionsSection.subtitle}
        />
        <AnimatedReveal
          stagger
          className={cn(
            "grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          )}
        >
          {solutionsSection.items.map((item) => {
            const Icon = solutionIcons[item.iconKey];
            return (
              <AnimatedRevealItem
                key={item.iconKey}
                className={cn("h-full min-h-0", bentoCellClass(item.iconKey))}
              >
                <SolutionBentoCard
                  variant={item.bento}
                  icon={Icon}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                />
              </AnimatedRevealItem>
            );
          })}
        </AnimatedReveal>
      </Container>
    </section>
  );
}
