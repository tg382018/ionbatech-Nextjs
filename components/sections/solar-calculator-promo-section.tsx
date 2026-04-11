"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Check,
  Clock,
  Laptop,
  Sun,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { heroContent } from "@/lib/constants";
import { motionEase, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const features = [
  "Cihazlarınıza göre kişisel hesaplama",
  "Tahmini yıllık elektrik tasarrufu",
  "Size özel Off-Grid / Öz Tüketim / Hibrit paket önerisi",
] as const;

const footerBadges = [
  { icon: Clock, label: "2 dakika" },
  { icon: Laptop, label: "Ücretsiz" },
  { icon: BarChart3, label: "Anında sonuç" },
] as const;

export function SolarCalculatorPromoSection() {
  const reduceMotion = useReducedMotion();
  const instant = !!reduceMotion;

  const fadeUp = {
    hidden: { opacity: instant ? 1 : 0, y: instant ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: instant ? 0 : 0.55, ease: motionEase },
    },
  };

  const cardReveal = {
    hidden: {
      opacity: instant ? 1 : 0,
      y: instant ? 0 : 20,
      scale: instant ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: instant ? 0 : 0.65, ease: motionEase, delay: instant ? 0 : 0.08 },
    },
  };

  return (
    <section
      id="tasarruf-hesaplayici"
      aria-labelledby="solar-calc-promo-heading"
      className="relative overflow-hidden border-y border-emerald-950/30 py-14 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,#062c1d_0%,#0a3d2a_45%,#051f15_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/2 size-[min(90vw,520px)] -translate-y-1/2 rounded-full bg-emerald-500/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-lime-400/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative z-[1]">
        <motion.div
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-white">
            <Sun
              className="mb-5 size-12 text-amber-300 sm:mb-6 sm:size-14"
              strokeWidth={1.6}
              aria-hidden
            />
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-emerald-950/55 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-emerald-100/95 backdrop-blur-sm sm:text-xs">
              <span
                className="size-2 shrink-0 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.7)]"
                aria-hidden
              />
              Ücretsiz &amp; anında sonuç
            </p>
            <h2
              id="solar-calc-promo-heading"
              className="text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl"
            >
              Evin için hangi sistem uygun? Ne kadar kazanırsın?
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/78 sm:text-lg">
              Hemen hesapla ve size özel teklif al
            </p>
            <ul className="mt-8 space-y-3.5 text-[0.95rem] sm:text-base">
              {features.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-lime-400/18 text-lime-300">
                    <Check className="size-4" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="text-white/92">{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={cardReveal}>
            <div
              className={cn(
                "rounded-[1.35rem] border border-white/18 bg-white/[0.07] p-6 shadow-[0_28px_90px_-28px_rgba(0,0,0,0.55)] backdrop-blur-md",
                "sm:p-8"
              )}
            >
              <div className="flex flex-col items-center text-center">
                <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-amber-300/14 text-amber-300 ring-1 ring-amber-300/25">
                  <Zap className="size-8" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Hesaplayıcıyı başlat
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/68">
                  Elektrik faturanızı sıfıra indirmenin tam olarak ne kadara mal
                  olacağını öğrenin.
                </p>
                <Link
                  href={heroContent.calculatorCta.href}
                  className={cn(
                    "mt-8 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-xl px-6 text-base font-semibold text-emerald-950 shadow-lg shadow-emerald-950/40 transition-[transform,box-shadow] duration-300",
                    "bg-lime-500 hover:-translate-y-0.5 hover:bg-lime-400 hover:shadow-xl",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#062c1d]"
                  )}
                >
                  Kazancını hesapla
                </Link>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  {footerBadges.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                    >
                      <Icon className="size-3.5 text-amber-200/90" aria-hidden />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
