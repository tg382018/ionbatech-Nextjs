"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { systemArchitectureSection } from "@/lib/constants";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SystemEnergyHubDiagramProps = {
  nodes: typeof systemArchitectureSection.nodes;
  hub: typeof systemArchitectureSection.hub;
  className?: string;
};

function FlowLines({ reducedMotion }: { reducedMotion: boolean }) {
  const anim = !reducedMotion ? "animate-energy-flow-line" : "";
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="20"
        className="stroke-slate-300 dark:stroke-slate-600"
        strokeWidth="0.45"
        strokeDasharray="1.2 1.2"
        vectorEffect="nonScalingStroke"
      />
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="20"
        className={cn("stroke-slate-500", anim)}
        strokeWidth="0.6"
        vectorEffect="nonScalingStroke"
      />
      <line
        x1="50"
        y1="50"
        x2="18"
        y2="50"
        className="stroke-slate-300 dark:stroke-slate-600"
        strokeWidth="0.45"
        strokeDasharray="1.2 1.2"
        vectorEffect="nonScalingStroke"
      />
      <line
        x1="50"
        y1="50"
        x2="18"
        y2="50"
        className={cn("stroke-amber-500", anim)}
        strokeWidth="0.6"
        vectorEffect="nonScalingStroke"
      />
      <line
        x1="50"
        y1="50"
        x2="82"
        y2="50"
        className="stroke-slate-300 dark:stroke-slate-600"
        strokeWidth="0.45"
        strokeDasharray="1.2 1.2"
        vectorEffect="nonScalingStroke"
      />
      <line
        x1="50"
        y1="50"
        x2="82"
        y2="50"
        className={cn("stroke-sky-500", anim)}
        strokeWidth="0.6"
        vectorEffect="nonScalingStroke"
      />
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="80"
        className="stroke-slate-300 dark:stroke-slate-600"
        strokeWidth="0.45"
        strokeDasharray="1.2 1.2"
        vectorEffect="nonScalingStroke"
      />
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="80"
        className={cn("stroke-emerald-500", anim)}
        strokeWidth="0.6"
        vectorEffect="nonScalingStroke"
      />
    </svg>
  );
}

function ArtGrid() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-16 w-full max-w-[88px] animate-diagram-float sm:h-[72px] sm:max-w-[96px]"
      aria-hidden
    >
      <path
        d="M50 20 L35 80 M50 20 L65 80 M38 50 L62 50 M42 35 L58 35"
        className="stroke-slate-500"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M10 40 Q30 55 50 25 Q70 55 90 40"
        fill="none"
        className="stroke-slate-400"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArtSolar() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-16 w-full max-w-[88px] animate-diagram-float sm:h-[72px] sm:max-w-[96px]"
      aria-hidden
    >
      <circle cx="25" cy="25" r="14" className="fill-amber-400" />
      <path
        d="M25 5v4m0 32v4m20-20h-4M9 25h4"
        className="stroke-amber-500"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <rect
        x="25"
        y="45"
        width="60"
        height="35"
        rx="4"
        className="fill-slate-800"
        transform="skewX(-15)"
      />
      <g className="stroke-sky-400" strokeWidth="2" transform="skewX(-15)">
        <line x1="45" y1="45" x2="45" y2="80" />
        <line x1="65" y1="45" x2="65" y2="80" />
        <line x1="25" y1="56" x2="85" y2="56" />
        <line x1="25" y1="68" x2="85" y2="68" />
      </g>
    </svg>
  );
}

function ArtBattery() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-16 w-full max-w-[88px] animate-diagram-float sm:h-[72px] sm:max-w-[96px]"
      aria-hidden
    >
      <rect
        x="35"
        y="25"
        width="30"
        height="50"
        rx="4"
        className="fill-white stroke-slate-500"
        strokeWidth="3"
      />
      <rect x="42" y="18" width="16" height="8" rx="2" className="fill-slate-500" />
      <rect x="40" y="32" width="20" height="10" rx="2" className="fill-emerald-500" />
      <rect x="40" y="46" width="20" height="10" rx="2" className="fill-emerald-500/80" />
      <rect x="40" y="60" width="20" height="10" rx="2" className="fill-slate-300" />
    </svg>
  );
}

function ArtInverter() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-[84px] w-full max-w-[104px] animate-diagram-float sm:h-[96px] sm:max-w-[112px]"
      aria-hidden
    >
      <rect
        x="20"
        y="15"
        width="60"
        height="70"
        rx="10"
        className="fill-slate-50 stroke-sky-500 dark:fill-slate-900"
        strokeWidth="3"
      />
      <rect x="30" y="30" width="40" height="25" rx="4" className="fill-slate-900" />
      <path
        d="M35 42 Q 50 25 65 42"
        fill="none"
        className="stroke-emerald-500"
        strokeWidth="2"
      />
      <circle cx="50" cy="70" r="8" className="fill-sky-500" />
      <circle
        cx="50"
        cy="70"
        r="16"
        fill="none"
        className="stroke-sky-400"
        strokeWidth="2"
        opacity={0.4}
      />
    </svg>
  );
}

function ArtHouse() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-16 w-full max-w-[88px] animate-diagram-float sm:h-[72px] sm:max-w-[96px]"
      aria-hidden
    >
      <path
        d="M20 50 L80 50 L80 85 C80 88 78 90 75 90 L25 90 C22 90 20 88 20 85 Z"
        className="fill-white stroke-slate-600"
        strokeWidth="4"
      />
      <path
        d="M10 50 L50 15 L90 50 Z"
        className="fill-red-500 stroke-red-500"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect x="42" y="65" width="16" height="25" rx="2" className="fill-slate-600" />
      <rect x="28" y="55" width="12" height="12" rx="2" className="fill-amber-400" />
      <rect
        x="60"
        y="55"
        width="12"
        height="12"
        rx="2"
        className="fill-slate-200 stroke-slate-400"
        strokeWidth="2"
      />
    </svg>
  );
}

function PeripheralCard({
  dashed,
  title,
  subtitle,
  artwork,
  delay = 0,
}: {
  dashed?: boolean;
  title: string;
  subtitle: string;
  artwork: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.4, delay, ease: motionEase }}
      className={cn(
        "relative z-[1] w-full max-w-[260px] rounded-2xl border-2 bg-white/95 px-4 py-5 text-center shadow-md backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg dark:bg-card/95",
        dashed
          ? "border-dashed border-slate-400/90 bg-white/70 dark:border-slate-500 dark:bg-card/60"
          : "border-slate-200/80 dark:border-border"
      )}
    >
      <div className="mb-2 flex min-h-[4.5rem] items-center justify-center sm:mb-3">
        {artwork}
      </div>
      <h4 className="font-heading text-[0.9rem] font-semibold leading-tight text-slate-900 dark:text-foreground sm:text-[0.95rem]">
        {title}
      </h4>
      <p className="mt-1.5 text-[0.75rem] font-medium leading-snug text-slate-600 dark:text-muted-foreground sm:text-[0.8rem]">
        {subtitle}
      </p>
    </motion.div>
  );
}

function HubCard({
  title,
  description,
  delay = 0,
}: {
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.45, delay, ease: motionEase }}
      className="relative z-[2] w-full max-w-[280px] sm:max-w-[300px]"
    >
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-[1.35rem] bg-gradient-to-br from-sky-500 to-emerald-500 opacity-35 animate-hub-pulse"
        aria-hidden
      />
      <div className="relative rounded-2xl border-2 border-sky-200 bg-white px-4 py-6 text-center shadow-[0_0_36px_-8px_rgba(14,165,233,0.35)] dark:border-sky-500/45 dark:bg-card sm:px-5 sm:py-7">
        <div className="flex min-h-[5.5rem] items-center justify-center sm:min-h-[6rem]">
          <ArtInverter />
        </div>
        <h4 className="mt-1 font-heading text-base font-semibold text-slate-900 dark:text-foreground sm:text-lg">
          {title}
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function MobileArrow({ animate }: { animate: boolean }) {
  return (
    <div className="flex h-7 shrink-0 items-center justify-center text-slate-400 lg:hidden">
      <ChevronDown
        className={cn("size-5 sm:size-6", animate && "animate-bounce")}
        strokeWidth={2}
        aria-hidden
      />
    </div>
  );
}

export function SystemEnergyHubDiagram({
  nodes,
  hub,
  className,
}: SystemEnergyHubDiagramProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("w-full", className)}>
      {/* lg+: haç — üst / orta üçlü / alt; hatlar merkeze göre */}
      <div className="relative mx-auto hidden min-h-[480px] w-full max-w-[900px] lg:block">
        <div
          className="pointer-events-none absolute inset-[6%_8%] z-0 min-h-[360px]"
          aria-hidden
        >
          <FlowLines reducedMotion={!!reduceMotion} />
        </div>

        <div className="relative z-[1] flex flex-col items-center gap-5 pt-2">
          <PeripheralCard
            dashed
            title={nodes.grid.title}
            subtitle={nodes.grid.subtitle}
            artwork={<ArtGrid />}
            delay={0.04}
          />

          <div className="flex w-full max-w-[880px] flex-row flex-nowrap items-center justify-between gap-3 px-2 lg:gap-5">
            <div className="flex min-w-0 flex-1 justify-end">
              <PeripheralCard
                title={nodes.solar.title}
                subtitle={nodes.solar.subtitle}
                artwork={<ArtSolar />}
                delay={0.08}
              />
            </div>
            <div className="flex shrink-0 justify-center">
              <HubCard
                title={hub.title}
                description={hub.description}
                delay={0.14}
              />
            </div>
            <div className="flex min-w-0 flex-1 justify-start">
              <PeripheralCard
                title={nodes.load.title}
                subtitle={nodes.load.subtitle}
                artwork={<ArtHouse />}
                delay={0.1}
              />
            </div>
          </div>

          <PeripheralCard
            title={nodes.battery.title}
            subtitle={nodes.battery.subtitle}
            artwork={<ArtBattery />}
            delay={0.06}
          />
        </div>
      </div>

      {/* Küçük ekran: dikey akış */}
      <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-2 px-1 sm:max-w-lg lg:hidden">
        <PeripheralCard
          dashed
          title={nodes.grid.title}
          subtitle={nodes.grid.subtitle}
          artwork={<ArtGrid />}
        />
        <MobileArrow animate={!reduceMotion} />
        <PeripheralCard
          title={nodes.solar.title}
          subtitle={nodes.solar.subtitle}
          artwork={<ArtSolar />}
        />
        <MobileArrow animate={!reduceMotion} />
        <PeripheralCard
          title={nodes.battery.title}
          subtitle={nodes.battery.subtitle}
          artwork={<ArtBattery />}
        />
        <MobileArrow animate={!reduceMotion} />
        <div className="flex justify-center">
          <HubCard title={hub.title} description={hub.description} />
        </div>
        <MobileArrow animate={!reduceMotion} />
        <PeripheralCard
          title={nodes.load.title}
          subtitle={nodes.load.subtitle}
          artwork={<ArtHouse />}
        />
      </div>
    </div>
  );
}
