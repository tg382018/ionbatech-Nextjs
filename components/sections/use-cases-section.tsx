"use client";

import {
  Building2,
  House,
  Sprout,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { UseCaseIconKey } from "@/lib/constants";
import { useCasesSection } from "@/lib/constants";
import { motionEase, staggerContainer } from "@/lib/motion";

import { Container } from "../layout/container";

const useCaseIcons: Record<UseCaseIconKey, LucideIcon> = {
  cottage: House,
  farm: Sprout,
  commercial: Building2,
  backup: Zap,
  hybrid: Sun,
};

const cardMotion = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: motionEase },
  },
};

export function UseCasesSection() {
  const reduceMotion = useReducedMotion();
  const items = useCasesSection.items;

  return (
    <section
      id={useCasesSection.id}
      className="relative scroll-mt-24 overflow-hidden border-t border-border/80 bg-slate-50/80 py-16 dark:bg-muted/20 sm:py-24"
      aria-labelledby="use-cases-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-[400px] rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,oklch(0.46_0.16_148_/_0.12)_0%,transparent_70%)]"
        aria-hidden
      />

      <Container className="relative">
        <header className="mb-12 max-w-[44rem] sm:mb-16">
          <h2
            id="use-cases-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            {useCasesSection.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {useCasesSection.subtitle}
          </p>
        </header>

        {reduceMotion ? (
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <UseCaseCard key={item.iconKey} item={item} />
            ))}
          </ul>
        ) : (
          <motion.ul
            className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-48px", amount: 0.12 }}
            variants={staggerContainer}
          >
            {items.map((item) => (
              <motion.li key={item.iconKey} variants={cardMotion}>
                <UseCaseCard item={item} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </Container>
    </section>
  );
}

function UseCaseCard({
  item,
}: {
  item: (typeof useCasesSection.items)[number];
}) {
  const Icon = useCaseIcons[item.iconKey];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-border/80 bg-card p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] ring-1 ring-foreground/[0.03] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2.5 hover:border-transparent hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_10px_10px_-5px_rgba(0,0,0,0.04)] dark:shadow-none dark:hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.25)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="mb-6 flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/[0.12] to-emerald-500/[0.1] transition-[transform,background-color] duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:from-primary group-hover:to-emerald-600">
        <Icon
          className="size-7 stroke-[1.5] text-primary transition-colors duration-300 group-hover:text-primary-foreground"
          aria-hidden
        />
      </div>

      <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
        {item.title}
      </h3>
      <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </article>
  );
}
