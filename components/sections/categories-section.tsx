"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { categoriesSection } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motionEase } from "@/lib/motion";

import { Container } from "../layout/container";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: motionEase },
  },
};

function categoryGridClass(index: number): string {
  switch (index) {
    case 0:
      return "sm:col-span-2 lg:col-span-2 sm:row-span-2";
    case 5:
      return "sm:col-span-2 lg:col-span-2";
    default:
      return "";
  }
}

function categoryAspect(index: number): string {
  switch (index) {
    case 0:
      return "aspect-[4/3] sm:aspect-auto sm:h-full min-h-[240px]";
    case 5:
      return "aspect-[4/3] sm:aspect-[21/9] min-h-[180px]";
    default:
      return "aspect-[4/3] min-h-[180px]";
  }
}

export function CategoriesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={categoriesSection.id}
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-labelledby="categories-heading"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="animate-float-slower absolute bottom-0 left-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />
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
            Kategoriler
          </span>
          <h2
            id="categories-heading"
            className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {categoriesSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {categoriesSection.subtitle}
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-64px" }}
          variants={containerVariants}
        >
          {categoriesSection.items.map((item, index) => {
            const external = item.href.startsWith("http");
            const linkProps = external
              ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
              : {};

            return (
              <motion.a
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative isolate flex overflow-hidden rounded-2xl",
                  categoryGridClass(index),
                  categoryAspect(index),
                  "ring-1 ring-foreground/5 transition-all duration-500",
                  "hover:shadow-2xl hover:shadow-primary/15 hover:ring-primary/20",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
                aria-label={`${item.title} — Mağazada görüntüle`}
                variants={itemVariants}
                {...linkProps}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  }
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 transition-all duration-500 group-hover:from-black/85 group-hover:via-black/40"
                  aria-hidden
                />

                {/* Content */}
                <div className="relative z-[1] mt-auto flex w-full items-end justify-between gap-3 p-5 sm:p-6">
                  <div>
                    <h3
                      className={cn(
                        "font-heading font-bold tracking-tight text-white",
                        index === 0
                          ? "text-xl sm:text-2xl"
                          : "text-lg sm:text-xl"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/60 transition-colors duration-300 group-hover:text-white/80">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                    <ArrowUpRight
                      className="size-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-[2] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary via-primary/80 to-primary transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
              </motion.a>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
