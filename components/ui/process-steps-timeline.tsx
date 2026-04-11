"use client";

import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { processSection } from "@/lib/constants";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const steps = processSection.steps;

const viewport = { once: true, margin: "-80px" as const };

const stepSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

function ArrowConnector() {
  return (
    <div
      className="hidden h-12 shrink-0 items-center lg:flex lg:w-8 xl:w-12"
      aria-hidden
    >
      <div className="h-px flex-1 bg-[#D1D5DB]" />
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        className="shrink-0 text-[#9CA3AF]"
        aria-hidden
      >
        <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
      </svg>
    </div>
  );
}

function StepCircle({
  index,
  reduceMotion,
}: {
  index: number;
  reduceMotion: boolean | null;
}) {
  const n = index + 1;
  return (
    <motion.span
      className="relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold tabular-nums text-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
      initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
      whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
      viewport={viewport}
      transition={{
        ...stepSpring,
        delay: 0.08 + index * 0.12,
      }}
    >
      {n}
    </motion.span>
  );
}

function StepCard({
  step,
  index,
  reduceMotion,
}: {
  step: (typeof steps)[number];
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.article
      className="flex w-full flex-col rounded-2xl border border-[#F0F0F0] bg-white px-5 py-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] sm:px-6 sm:py-8"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.08,
        ease: motionEase,
      }}
    >
      <h3 className="font-heading text-base font-bold leading-snug text-[#1A1D23] sm:text-lg">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
        {step.description}
      </p>
    </motion.article>
  );
}

export function ProcessStepsTimeline({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("w-full", className)}>
      {/* Mobil / tablet: dikey akış */}
      <ol className="relative list-none space-y-0 lg:hidden">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col items-center">
            <div className="flex w-full max-w-md flex-col items-center">
              <StepCircle index={index} reduceMotion={reduceMotion} />
              <div className="mt-6 w-full">
                <StepCard
                  step={step}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              </div>
            </div>
            {index < steps.length - 1 ? (
              <div
                className="flex justify-center py-3 text-[#9CA3AF]"
                aria-hidden
              >
                <ChevronDown className="size-6 stroke-[1.5]" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      {/* Masaüstü: [sütun][ok][sütun][ok][sütun][ok][sütun] */}
      <div className="hidden lg:flex lg:w-full lg:items-start lg:justify-center">
        {steps.map((step, index) => (
          <Fragment key={step.title}>
            {index > 0 ? <ArrowConnector /> : null}
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <StepCircle index={index} reduceMotion={reduceMotion} />
              <div className="mt-10 w-full px-0">
                <StepCard
                  step={step}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
