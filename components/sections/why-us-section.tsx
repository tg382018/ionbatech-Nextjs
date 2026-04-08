import {
  BadgeCheck,
  Cpu,
  HardHat,
  Headset,
  Layers,
  MapPin,
} from "lucide-react";

import type { WhyUsItemKey } from "@/lib/constants";
import { whyUsSection } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Container } from "../layout/container";
import { SectionHeading } from "../layout/section-heading";
import { AnimatedReveal, AnimatedRevealItem } from "../ui/animated-reveal";
import { WhyUsValueCard } from "../ui/why-us-value-card";

const valueIcons = {
  engineering: Cpu,
  custom: Layers,
  catalog: BadgeCheck,
  support: Headset,
  local: MapPin,
  field: HardHat,
} as const;

function whyUsGridClass(key: WhyUsItemKey): string {
  switch (key) {
    case "engineering":
      return "md:col-span-2 lg:col-span-3 lg:row-span-2";
    case "custom":
      return "lg:col-span-3";
    case "catalog":
      return "lg:col-span-3";
    case "support":
      return "lg:col-span-2";
    case "local":
      return "lg:col-span-2";
    case "field":
      return "md:col-span-2 lg:col-span-2";
    default:
      return "";
  }
}

function variantForKey(key: WhyUsItemKey): "featured" | "default" {
  return key === "engineering" ? "featured" : "default";
}

export function WhyUsSection() {
  return (
    <section
      id={whyUsSection.id}
      className="relative scroll-mt-24 overflow-hidden border-y border-border py-16 sm:py-20"
      aria-labelledby="why-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 size-[min(420px,90vw)] rounded-full bg-primary/[0.09] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 size-[min(360px,80vw)] rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <SectionHeading
          id="why-heading"
          title={whyUsSection.title}
          subtitle={whyUsSection.subtitle}
          className="max-w-2xl"
        />
        <AnimatedReveal
          stagger
          className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5"
        >
          {whyUsSection.items.map((item) => {
            const Icon = valueIcons[item.key];
            const variant = variantForKey(item.key);
            return (
              <AnimatedRevealItem
                key={item.key}
                className={cn("h-full min-h-0", whyUsGridClass(item.key))}
              >
                <WhyUsValueCard
                  variant={variant}
                  icon={Icon}
                  title={item.title}
                  description={item.description}
                  className="h-full"
                />
              </AnimatedRevealItem>
            );
          })}
        </AnimatedReveal>
      </Container>
    </section>
  );
}
