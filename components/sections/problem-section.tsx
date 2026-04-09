"use client";

import {
  Battery,
  Scale,
  ShieldAlert,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { problemSection } from "@/lib/constants";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { Container } from "../layout/container";

const problemIcons: LucideIcon[] = [Battery, Zap, Scale, ShieldAlert, Wrench];

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: motionEase },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: motionEase },
  },
};

export function ProblemSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={problemSection.id}
      className="relative scroll-mt-24 overflow-hidden border-t border-border py-14 sm:py-20"
      aria-labelledby="problem-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/30" />
      <div className="pointer-events-none absolute inset-0 bg-dot-slate opacity-[0.35]" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="animate-float-slow absolute -left-20 top-1/4 h-[420px] w-[420px] rounded-full bg-amber-500/[0.04] blur-[100px]" />
        <div className="animate-float-slower absolute bottom-0 right-0 h-[360px] w-[480px] translate-x-1/4 rounded-full bg-primary/[0.06] blur-[110px]" />
      </div>

      <Container className="relative">
        <motion.div
          className="mb-8 max-w-3xl sm:mb-10 lg:mb-12"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headingVariants}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-800 dark:text-amber-200">
            <span
              className="size-1.5 rounded-full bg-amber-500"
              aria-hidden
            />
            Teknik riskler
          </span>
          <h2
            id="problem-heading"
            className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {problemSection.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {problemSection.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <motion.aside
            className="lg:col-span-5 xl:col-span-4"
            initial={reduceMotion ? undefined : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-64px" }}
            variants={itemVariants}
          >
            <div className="sticky top-24 rounded-2xl border border-primary/15 bg-gradient-to-br from-card via-card to-primary/[0.04] p-5 shadow-sm ring-1 ring-foreground/[0.04] sm:p-6">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                {problemSection.intro}
              </p>
              <div
                className="mt-5 flex flex-wrap gap-2 border-t border-border/80 pt-5"
                aria-hidden
              >
                <span className="rounded-md bg-muted/80 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  BMS / koruma
                </span>
                <span className="rounded-md bg-muted/80 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  Kapasite planlama
                </span>
                <span className="rounded-md bg-muted/80 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  Uyumluluk
                </span>
              </div>
            </div>
          </motion.aside>

          <motion.div
            className="lg:col-span-7 xl:col-span-8"
            initial={reduceMotion ? undefined : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-48px" }}
            variants={containerVariants}
          >
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {problemSection.problems.map((p, index) => {
                const Icon = problemIcons[index] ?? Wrench;
                const isLast = index === problemSection.problems.length - 1;
                return (
                  <motion.li
                    key={p.title}
                    variants={itemVariants}
                    className={cn(
                      isLast && "sm:col-span-2"
                    )}
                  >
                    <div
                      className={cn(
                        "group flex h-full gap-4 rounded-2xl border border-border/70 bg-card/90 p-4 shadow-sm ring-1 ring-foreground/[0.03] backdrop-blur-sm transition-all duration-300",
                        "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md hover:ring-primary/10",
                        isLast && "sm:mx-auto sm:max-w-2xl"
                      )}
                    >
                      <div className="flex shrink-0 flex-col items-center gap-2 border-r border-border/60 pr-4">
                        <span className="font-heading text-[0.65rem] font-bold tabular-nums text-muted-foreground/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:size-11">
                          <Icon
                            className="size-[1.125rem] sm:size-5"
                            aria-hidden
                          />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <h3 className="font-heading text-sm font-semibold leading-snug text-foreground sm:text-base">
                          {p.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto mt-10 max-w-3xl sm:mt-12"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={itemVariants}
        >
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-card to-card p-5 shadow-sm ring-1 ring-primary/10 sm:p-6 md:p-8">
            <div
              className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-primary/10 blur-3xl"
              aria-hidden
            />
            <p className="relative text-sm font-medium leading-relaxed text-foreground sm:text-base">
              <span className="mr-2 inline-block text-primary" aria-hidden>
                →
              </span>
              {problemSection.closing}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
