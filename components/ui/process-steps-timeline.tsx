"use client";

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

export function ProcessStepsTimeline({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <ol
        className={cn(
          "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
          className
        )}
      >
        {steps.map((step, index) => (
          <li key={step.title}>
            <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-sm ring-1 ring-foreground/5">
              <span className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="font-heading text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className={cn("space-y-10", className)}>
      {/* Mobil: dikey çizgi + sıralı giriş */}
      <ol className="relative list-none space-y-8 pl-1 lg:hidden">
        <motion.div
          className="absolute bottom-3 left-[1.125rem] top-3 w-1 rounded-full bg-muted"
          aria-hidden
        >
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary via-primary/70 to-primary/30"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 1.15, ease: motionEase }}
          />
        </motion.div>
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            className="relative flex gap-5 pl-10"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{
              duration: 0.5,
              delay: index * 0.12,
              ease: motionEase,
            }}
          >
            <motion.span
              className="absolute left-0 top-1 flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md shadow-primary/25 ring-4 ring-background"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={viewport}
              transition={{ ...stepSpring, delay: index * 0.12 + 0.05 }}
            >
              {index + 1}
            </motion.span>
            <div className="min-w-0 flex-1 rounded-2xl border border-border/80 bg-card p-5 shadow-sm ring-1 ring-foreground/5">
              <h3 className="font-heading text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* Masaüstü: tek sıra, hat + adım + kart */}
      <ol className="relative hidden list-none gap-6 lg:grid lg:grid-cols-4">
        <div
          className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-6 h-1.5 rounded-full bg-muted"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute left-[12.5%] top-6 h-1.5 w-[75%] overflow-hidden rounded-full"
          aria-hidden
        >
          <motion.div
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary via-primary/85 to-primary/45 shadow-[0_0_18px_oklch(0.46_0.16_148_/_0.3)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 1.2, ease: motionEase, delay: 0.06 }}
          />
        </motion.div>

        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col items-center text-center">
            <motion.span
              className="relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-card"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewport}
              transition={{
                ...stepSpring,
                delay: 0.12 + index * 0.14,
              }}
            >
              {index + 1}
            </motion.span>
            <motion.div
              className="mt-10 flex w-full flex-col rounded-2xl border border-border/80 bg-card p-6 text-left shadow-sm ring-1 ring-foreground/5 transition-shadow duration-300 hover:shadow-md"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{
                duration: 0.55,
                delay: 0.32 + index * 0.1,
                ease: motionEase,
              }}
              whileHover={{ y: -4 }}
            >
              <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}
