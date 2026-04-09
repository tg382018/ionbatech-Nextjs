"use client";

import {
  BadgeCheck,
  Cpu,
  Headset,
  Layers,
  Scale,
  Truck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WhyUsItemKey } from "@/lib/constants";
import { whyUsSection } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motionEase } from "@/lib/motion";

import { Container } from "../layout/container";

const valueIcons: Record<WhyUsItemKey, typeof Cpu> = {
  engineering: Cpu,
  products: BadgeCheck,
  modular: Layers,
  capacity: Scale,
  support: Headset,
  logistics: Truck,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: motionEase },
  },
};

export function WhyUsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={whyUsSection.id}
      className="relative scroll-mt-24 overflow-hidden py-14 sm:py-20"
      aria-labelledby="why-heading"
    >
      {/* Multi-layer ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-muted/60 via-background to-muted/40" />
        <div className="animate-float-slow absolute -right-20 top-1/4 size-[500px] rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="animate-float-slower absolute -bottom-24 -left-16 size-[400px] rounded-full bg-primary/[0.05] blur-[100px]" />
        <div className="animate-float-slow absolute left-1/2 top-1/3 size-[280px] -translate-x-1/2 rounded-full bg-primary/[0.03] blur-[80px]" />
        <div className="absolute inset-0 bg-dot-slate opacity-30" />
      </div>

      <Container className="relative">
        {/* Section header */}
        <motion.div
          className="mb-8 max-w-2xl sm:mb-10"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: motionEase },
            },
          }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Neden Biz
          </span>
          <h2
            id="why-heading"
            className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {whyUsSection.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {whyUsSection.subtitle}
          </p>
        </motion.div>

        {/* Value grid */}
        <motion.div
          className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-64px" }}
          variants={containerVariants}
        >
          {whyUsSection.items.map((item, index) => {
            const Icon = valueIcons[item.key];
            const highlight = item.key === "engineering";

            return (
              <motion.div
                key={item.key}
                className="h-full min-h-0"
                variants={cardVariants}
              >
                <ValueCard
                  icon={Icon}
                  title={item.title}
                  description={item.description}
                  index={index}
                  highlight={highlight}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
  index,
  highlight = false,
}: {
  icon: typeof Cpu;
  title: string;
  description: string;
  index: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border bg-card/90 p-4 shadow-sm ring-1 ring-foreground/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-4",
        highlight
          ? "border-primary/25 bg-gradient-to-br from-card to-primary/[0.05] hover:border-primary/35"
          : "border-border/60 hover:border-primary/20"
      )}
    >
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg text-primary ring-1 transition-colors duration-300 group-hover:text-primary-foreground",
              highlight
                ? "bg-primary/15 ring-primary/20 group-hover:bg-primary"
                : "bg-primary/10 ring-primary/10 group-hover:bg-primary"
            )}
          >
            <Icon className="size-[18px] sm:size-5" aria-hidden />
          </div>
          <span className="select-none font-heading text-xl font-bold tabular-nums text-muted-foreground/25 transition-colors duration-300 group-hover:text-primary/20 sm:text-2xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="font-heading text-sm font-semibold leading-snug tracking-tight text-foreground sm:text-[0.9375rem]">
          {title}
        </h3>
        <p className="mt-1.5 line-clamp-4 flex-1 text-xs leading-relaxed text-muted-foreground sm:line-clamp-none sm:text-[0.8125rem]">
          {description}
        </p>
      </div>
    </div>
  );
}
