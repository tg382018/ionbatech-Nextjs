"use client";

import {
  BadgeCheck,
  Cpu,
  HardHat,
  Headset,
  Layers,
  MapPin,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WhyUsItemKey } from "@/lib/constants";
import { whyUsSection } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motionEase } from "@/lib/motion";

import { Container } from "../layout/container";

const valueIcons: Record<WhyUsItemKey, typeof Cpu> = {
  engineering: Cpu,
  custom: Layers,
  catalog: BadgeCheck,
  support: Headset,
  local: MapPin,
  field: HardHat,
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

export function WhyUsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={whyUsSection.id}
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
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
          className="mb-14 max-w-2xl"
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
            className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {whyUsSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {whyUsSection.subtitle}
          </p>
        </motion.div>

        {/* Value grid */}
        <motion.div
          className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-64px" }}
          variants={containerVariants}
        >
          {whyUsSection.items.map((item, index) => {
            const Icon = valueIcons[item.key];
            const isFeatured = item.key === "engineering";

            return (
              <motion.div
                key={item.key}
                className={cn("h-full min-h-0", whyUsGridClass(item.key))}
                variants={cardVariants}
              >
                {isFeatured ? (
                  <FeaturedCard
                    icon={Icon}
                    title={item.title}
                    description={item.description}
                    index={index}
                  />
                ) : (
                  <ValueCard
                    icon={Icon}
                    title={item.title}
                    description={item.description}
                    index={index}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

function FeaturedCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: typeof Cpu;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.08] p-6 shadow-lg ring-1 ring-foreground/5 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 sm:p-8">
      {/* Glow orbs */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/[0.1] blur-3xl transition-all duration-700 group-hover:bg-primary/[0.2] group-hover:scale-110"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-8 size-32 rounded-full bg-primary/[0.06] blur-2xl"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col gap-5">
        <div className="flex items-start justify-between">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="size-8" aria-hidden />
          </div>
          <span className="select-none font-heading text-6xl font-bold text-primary/[0.08] transition-colors duration-500 group-hover:text-primary/[0.16] sm:text-7xl">
            0{index + 1}
          </span>
        </div>
        <div className="mt-auto space-y-3">
          <h3 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-600 origin-center group-hover:scale-x-100"
        aria-hidden
      />
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: typeof Cpu;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm ring-1 ring-foreground/[0.03] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 hover:bg-card hover:shadow-xl hover:shadow-primary/8 sm:p-6">
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/[0.03] blur-2xl transition-all duration-700 group-hover:bg-primary/[0.1] group-hover:scale-150"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/25 group-hover:scale-110">
            <Icon className="size-6" aria-hidden />
          </div>
          <span className="select-none font-heading text-4xl font-bold text-foreground/[0.04] transition-colors duration-500 group-hover:text-primary/[0.12]">
            0{index + 1}
          </span>
        </div>
        <h3 className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-transform duration-500 origin-center group-hover:scale-x-100"
        aria-hidden
      />
    </div>
  );
}
