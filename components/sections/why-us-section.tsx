"use client";

import {
  CircleCheck,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { WhyUsItemKey } from "@/lib/constants";
import { whyUsSection } from "@/lib/constants";
import { motionEase } from "@/lib/motion";

import { Container } from "../layout/container";

const valueIcons: Record<WhyUsItemKey, typeof CircleCheck> = {
  turnkey: CircleCheck,
  warranty: Shield,
  nationwide: Truck,
  engineering: Star,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: motionEase },
  },
};

export function WhyUsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={whyUsSection.id}
      className="scroll-mt-24 bg-white py-16 sm:py-24"
      aria-labelledby="why-heading"
    >
      <Container className="relative">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: motionEase },
            },
          }}
        >
          <span className="inline-flex rounded-full bg-primary/[0.1] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            {whyUsSection.badge}
          </span>
          <h2
            id="why-heading"
            className="mt-5 font-heading text-3xl font-bold tracking-tight text-[#1A1D23] sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
          >
            {whyUsSection.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-64px" }}
          variants={containerVariants}
        >
          {whyUsSection.items.map((item) => {
            const Icon = valueIcons[item.key];

            return (
              <motion.div key={item.key} variants={cardVariants}>
                <article
                  className="group flex h-full flex-col items-center rounded-2xl border border-[#F0F0F0] bg-white px-8 py-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.14),0_8px_16px_-4px_rgba(0,0,0,0.08)]"
                >
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/[0.09] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                    aria-hidden
                  >
                    <Icon className="size-6 stroke-[1.5] transition-colors duration-300" />
                  </div>
                  <h3 className="mt-6 font-heading text-base font-bold leading-snug text-[#1A1D23] sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                    {item.description}
                  </p>
                </article>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
