"use client";

import {
  ArrowRightCircle,
  Battery,
  Layers,
  Settings2,
  ShieldAlert,
  Sun,
  ZapOff,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

import type { ProblemIconKey } from "@/lib/constants";
import { problemSection } from "@/lib/constants";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { Container } from "../layout/container";

const problemIcons: Record<ProblemIconKey, LucideIcon> = {
  "battery-warning": Battery,
  "zap-off": ZapOff,
  sun: Sun,
  "shield-alert": ShieldAlert,
  "settings-2": Settings2,
};

const headerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: motionEase },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.06 * i, ease: motionEase },
  }),
};

function BentoCard({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      custom={index}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px", amount: 0.12 }}
      variants={cardVariants}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-7 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300 dark:border-border/60 dark:bg-card/85",
        "hover:-translate-y-2 hover:border-emerald-500/45 hover:shadow-[0_20px_40px_-8px_rgba(16,185,129,0.12)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function ProblemSection() {
  const reduceMotion = useReducedMotion();
  const problems = problemSection.problems;
  const firstFour = problems.slice(0, 4);
  const last = problems[4]!;
  const LastIcon = problemIcons[last.key];

  return (
    <section
      id={problemSection.id}
      className="relative scroll-mt-24 overflow-hidden border-t border-border py-14 sm:py-20"
      aria-labelledby="problem-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[#f8fafc] dark:bg-background"
        aria-hidden
      />
      <Parallax
        speed={-6}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.07)_0%,transparent_42%),radial-gradient(circle_at_90%_80%,rgba(16,185,129,0.07)_0%,transparent_42%)]" />
      </Parallax>

      <Container className="relative">
        <motion.header
          className="mx-auto mb-10 max-w-4xl sm:mb-14"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={headerVariants}
        >
          <span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1.5 text-[0.85rem] font-semibold uppercase tracking-wider text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
            {problemSection.badge}
          </span>
          <h2
            id="problem-heading"
            className="font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-emerald-950 dark:text-emerald-100"
          >
            {problemSection.title}
          </h2>
          <p className="mt-6 max-w-2xl border-l-4 border-emerald-500 pl-5 text-base leading-relaxed text-slate-600 dark:text-muted-foreground sm:text-lg">
            {problemSection.subtitle}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {/* Hero — sol sütun, iki satır (lg) */}
          <BentoCard
            index={0}
            className="border-0 bg-gradient-to-br from-emerald-950 to-emerald-900 p-8 text-white shadow-lg md:col-span-2 lg:col-span-1 lg:row-span-2 dark:from-emerald-950 dark:to-emerald-950"
          >
            <Layers
              className="mb-5 size-9 text-emerald-300 opacity-90"
              strokeWidth={1.75}
              aria-hidden
            />
            <h3 className="font-heading text-xl font-semibold text-emerald-300 sm:text-[1.35rem]">
              {problemSection.heroTitle}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-emerald-50/95 sm:text-[1.05rem]">
              {problemSection.heroBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {problemSection.heroTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-50 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </BentoCard>

          {firstFour.map((p, idx) => {
            const Icon = problemIcons[p.key];
            const num = String(idx + 1).padStart(2, "0");
            return (
              <BentoCard key={p.key} index={idx + 1}>
                <span
                  className="pointer-events-none absolute right-5 top-5 select-none font-heading text-5xl font-extrabold text-slate-900/[0.05] dark:text-white/[0.06]"
                  aria-hidden
                >
                  {num}
                </span>
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-950/40 dark:text-emerald-400 dark:group-hover:bg-emerald-500 dark:group-hover:text-white">
                  <Icon className="size-6" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="font-heading text-lg font-semibold text-emerald-950 dark:text-emerald-100">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-600 dark:text-muted-foreground">
                  {p.description}
                </p>
              </BentoCard>
            );
          })}

          {/* Son kart — geniş + aside */}
          <BentoCard
            index={5}
            className="md:col-span-2 lg:col-span-2 lg:col-start-2"
          >
            <span
              className="pointer-events-none absolute right-5 top-5 select-none font-heading text-5xl font-extrabold text-slate-900/[0.05] dark:text-white/[0.06]"
              aria-hidden
            >
              05
            </span>
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-950/40 dark:text-emerald-400 dark:group-hover:bg-emerald-500 dark:group-hover:text-white">
              <LastIcon className="size-6" strokeWidth={2} aria-hidden />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <h3 className="font-heading text-lg font-semibold text-emerald-950 dark:text-emerald-100">
                  {last.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-600 dark:text-muted-foreground">
                  {last.description}
                </p>
              </div>
              <div className="border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-500 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0 dark:border-border dark:text-muted-foreground">
                {last.aside}
              </div>
            </div>
          </BentoCard>
        </div>

        <motion.div
          className="mx-auto mt-10 max-w-4xl sm:mt-14"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: motionEase }}
        >
          <div className="flex flex-col items-center gap-6 rounded-[1.75rem] border-2 border-dashed border-emerald-500 bg-white px-6 py-8 shadow-sm sm:flex-row sm:items-center sm:gap-8 sm:px-10 sm:py-9 dark:bg-card/90">
            <div
              className={cn(
                "flex size-14 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white sm:size-16",
                !reduceMotion && "animate-problem-cta-pulse"
              )}
            >
              <ArrowRightCircle className="size-8 sm:size-9" strokeWidth={1.75} aria-hidden />
            </div>
            <p className="text-center text-lg font-semibold leading-snug text-emerald-950 sm:text-left sm:text-xl dark:text-emerald-100">
              <strong className="font-bold">{problemSection.ctaBrand}</strong>
              {problemSection.ctaBeforeEmphasis}
              <span className="underline decoration-emerald-500/70 decoration-2 underline-offset-4">
                {problemSection.ctaEmphasis}
              </span>
              {problemSection.ctaAfterEmphasis}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
