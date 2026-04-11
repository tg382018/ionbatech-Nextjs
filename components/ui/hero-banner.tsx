"use client";

import { ArrowRight, Award, Cpu, Headset, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { useEffect, useRef, type VideoHTMLAttributes } from "react";

import {
  heroBanner,
  heroContent,
  heroTrustBadgeItems,
} from "@/lib/constants";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const trustIcons = {
  cpu: Cpu,
  shield: ShieldCheck,
  headset: Headset,
} as const;

function isExternalHref(href: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

function HeroPrimaryCta({ href, label }: { href: string; label: string }) {
  const external = isExternalHref(href);
  const classes = cn(
    "group inline-flex max-w-full items-center gap-3 rounded-full bg-[#0f3d33] py-2.5 pl-7 pr-2.5 text-left text-sm font-semibold text-white shadow-[0_12px_40px_-8px_rgba(15,61,51,0.55)] transition-[transform,box-shadow,background-color] duration-300",
    "hover:-translate-y-0.5 hover:bg-[#0c322a] hover:shadow-[0_16px_48px_-8px_rgba(15,61,51,0.6)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a2520]",
    "sm:gap-4 sm:py-3 sm:pl-9 sm:pr-3 sm:text-base"
  );

  const inner = (
    <>
      <span className="min-w-0 flex-1 leading-snug">{label}</span>
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25 sm:size-11"
        aria-hidden
      >
        <ArrowRight className="size-5 text-white" strokeWidth={2.25} />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

function HeroCalculatorCta({ href, label }: { href: string; label: string }) {
  const external = isExternalHref(href);
  const classes = cn(
    "inline-flex max-w-full items-center justify-center gap-2 rounded-full px-7 py-2.5 text-center text-sm font-semibold text-emerald-950 shadow-[0_10px_36px_-8px_rgba(34,197,94,0.55)] transition-[transform,box-shadow,background-color] duration-300",
    "bg-lime-400 hover:-translate-y-0.5 hover:bg-lime-300 hover:shadow-[0_14px_44px_-8px_rgba(34,197,94,0.6)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a2520]",
    "sm:px-9 sm:py-3 sm:text-base"
  );

  const inner = (
    <>
      <Zap className="size-4 shrink-0 sm:size-[1.15rem]" strokeWidth={2.25} aria-hidden />
      <span>{label}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

function HeroSecondaryCta({ href, label }: { href: string; label: string }) {
  const external = isExternalHref(href);
  const classes = cn(
    "inline-flex max-w-full items-center justify-center rounded-full border-2 border-white/55 bg-white/[0.08] px-7 py-2.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition-[transform,border-color,background-color] duration-300",
    "hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/[0.14]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a2520]",
    "sm:px-9 sm:py-3 sm:text-base"
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}

export function HeroBanner() {
  const reduceMotion = useReducedMotion();
  const instant = !!reduceMotion;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (instant) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    void el.play().catch(() => {});
  }, [instant]);

  const shellVariants = {
    hidden: { opacity: instant ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { duration: instant ? 0 : 0.55, ease: motionEase },
    },
  };

  const blockVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: instant ? 0 : 0.1,
        delayChildren: instant ? 0 : 0.12,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: instant ? 1 : 0, y: instant ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: instant ? 0 : 0.48, ease: motionEase },
    },
  };

  return (
    <div className="relative min-h-[min(72dvh,38rem)] w-full overflow-hidden">
      <div className="absolute inset-0">
        {instant ? (
          <div className="absolute inset-0">
            <Image
              src={heroBanner.imageSrc}
              alt={heroBanner.imageAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <video
              ref={videoRef}
              className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={heroBanner.imageSrc}
              {...({
                fetchPriority: "high",
              } as VideoHTMLAttributes<HTMLVideoElement>)}
              aria-hidden
            >
              <source src={heroBanner.videoSrc} type="video/mp4" />
            </video>
          </div>
        )}
        <Parallax
          speed={-6}
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <div className="absolute inset-0 bg-stone-900/45" />
        </Parallax>
        <Parallax
          speed={5}
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/88 via-stone-950/50 to-stone-900/35" />
        </Parallax>
        <Parallax
          speed={-4}
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-transparent to-stone-950/25" />
        </Parallax>
      </div>

      <motion.div
        className="relative z-[1] mx-auto flex w-full max-w-[1200px] flex-col justify-end px-4 pb-10 pt-20 sm:px-5 sm:pb-12 sm:pt-24 lg:min-h-[min(66dvh,36rem)] lg:justify-center lg:pb-14 lg:pt-28"
        variants={shellVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="max-w-xl lg:max-w-2xl"
          variants={blockVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-emerald-100/95 backdrop-blur-sm sm:text-xs"
            variants={lineVariants}
          >
            <Award className="size-3.5 text-emerald-300" aria-hidden />
            {heroBanner.badge}
          </motion.div>

          <motion.h1
            className="text-[2rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl sm:leading-[1.1] lg:text-[3.15rem] lg:leading-[1.08]"
            style={{
              fontFamily:
                "var(--font-hero-serif), ui-serif, Georgia, 'Times New Roman', serif",
            }}
            variants={lineVariants}
          >
            <span className="block">{heroContent.headlineLine1}</span>
            <span className="mt-1 block text-white sm:mt-1.5">
              {heroContent.headlineLine2}
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/90 sm:mt-6 sm:max-w-lg sm:text-lg"
            variants={lineVariants}
          >
            {heroContent.subheading}
          </motion.p>

          <motion.div
            className="mt-8 flex max-w-lg flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center"
            variants={lineVariants}
          >
            <HeroPrimaryCta
              href={heroContent.primaryCta.href}
              label={heroContent.primaryCta.label}
            />
            <HeroSecondaryCta
              href={heroContent.secondaryCta.href}
              label={heroContent.secondaryCta.label}
            />
            <HeroCalculatorCta
              href={heroContent.calculatorCta.href}
              label="Kazancını hesapla"
            />
          </motion.div>

          <motion.p
            className="mt-5 text-sm text-white/65 sm:mt-6"
            variants={lineVariants}
          >
            <Link
              href={heroContent.tertiaryCta.href}
              className="underline decoration-white/30 underline-offset-[5px] transition-colors hover:text-white hover:decoration-white/60"
            >
              {heroContent.tertiaryCta.label}
            </Link>
            <span className="mx-2 text-white/35" aria-hidden>
              ·
            </span>
            <Link
              href={heroContent.calculatorCta.href}
              className="underline decoration-white/30 underline-offset-[5px] transition-colors hover:text-white hover:decoration-white/60"
            >
              {heroContent.calculatorCta.label}
            </Link>
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-2 sm:mt-10"
            variants={lineVariants}
          >
            {heroTrustBadgeItems.map((b) => {
              const Icon = trustIcons[b.icon];
              return (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/88 backdrop-blur-sm"
                >
                  <Icon
                    className="size-3.5 shrink-0 text-emerald-300/90"
                    aria-hidden
                  />
                  {b.label}
                </span>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
