"use client";

import {
  Battery,
  CarFront,
  Droplets,
  Sun,
  Warehouse,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

import type { SolutionIconKey } from "@/lib/constants";
import { solutionsSection } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motionEase } from "@/lib/motion";

import { Container } from "../layout/container";
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
    case "storage":
      return "md:col-span-2 md:row-span-2 md:min-h-[168px]";
    case "solar":
    case "battery":
      return "";
    case "inverter":
    case "irrigation":
    case "ev":
      return "md:col-span-2 lg:col-span-2";
    default:
      return "";
  }
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: motionEase },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: motionEase },
  },
};

export function SolutionsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={solutionsSection.id}
      className="relative scroll-mt-24 overflow-hidden py-14 sm:py-20"
      aria-labelledby="solutions-heading"
    >
      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Parallax
          speed={7}
          className="absolute left-1/4 top-0 h-[500px] w-[600px] -translate-x-1/2"
        >
          <div className="animate-float-slow h-full w-full rounded-full bg-primary/[0.06] blur-[120px]" />
        </Parallax>
        <Parallax
          speed={-5}
          className="absolute bottom-0 right-1/4 h-[400px] w-[500px] translate-x-1/2"
        >
          <div className="animate-float-slower h-full w-full rounded-full bg-primary/[0.04] blur-[100px]" />
        </Parallax>
      </div>

      <Container className="relative">
        {/* Section header */}
        <motion.div
          className="mb-8 max-w-2xl sm:mb-10"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headingVariants}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Çözümler
          </span>
          <h2
            id="solutions-heading"
            className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {solutionsSection.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {solutionsSection.subtitle}
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid auto-rows-fr gap-2.5 md:grid-cols-2 lg:grid-cols-4 lg:gap-3"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-64px" }}
          variants={containerVariants}
        >
          {solutionsSection.items.map((item) => {
            const Icon = solutionIcons[item.iconKey];
            return (
              <motion.div
                key={item.title}
                className={cn("h-full min-h-0", bentoCellClass(item.iconKey))}
                variants={itemVariants}
              >
                <SolutionBentoCard
                  variant={item.bento}
                  icon={Icon}
                  title={item.title}
                  description={item.description}
                  benefits={item.benefits}
                  href={item.href}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
