"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  BatteryCharging,
  CarFront,
  Sprout,
  SunMedium,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { brandTrustStripItems } from "@/lib/constants";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const stripIcons: Record<(typeof brandTrustStripItems)[number]["key"], LucideIcon> =
  {
    battery: BatteryCharging,
    storage: Warehouse,
    solar: SunMedium,
    agri: Sprout,
    ev: CarFront,
  };

const PX_PER_SEC = 52;

function TrustMarqueeTrack({
  paused,
}: {
  paused: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.scrollWidth / 2;
      if (w > 0) setLoopWidth(w);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;

    if (reduceMotion || !loopWidth) return;

    controlsRef.current = animate(x, [0, -loopWidth], {
      duration: Math.max(18, loopWidth / PX_PER_SEC),
      repeat: Infinity,
      ease: "linear",
    });

    return () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
  }, [loopWidth, reduceMotion, x]);

  useEffect(() => {
    if (!controlsRef.current) return;
    if (paused) {
      controlsRef.current.pause();
    } else {
      controlsRef.current.play();
    }
  }, [paused]);

  const renderCard = (item: (typeof brandTrustStripItems)[number], key: string) => {
    const Icon = stripIcons[item.key];
    return (
      <motion.div
        key={key}
        className="min-w-[240px] max-w-[280px] shrink-0 sm:min-w-[260px]"
        whileHover={
          reduceMotion
            ? undefined
            : { y: -3, transition: { duration: 0.25, ease: motionEase } }
        }
      >
        <div
          className={cn(
            "group flex h-full cursor-default items-center gap-4 rounded-2xl border border-border/80 bg-card/95 p-4 shadow-sm ring-1 ring-foreground/5 backdrop-blur-sm",
            "transition-[box-shadow,background-color,border-color] duration-300",
            "hover:border-primary/20 hover:bg-muted/60 hover:shadow-md"
          )}
        >
          <div
            className={cn(
              "flex size-[50px] shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-[background-color,color,transform] duration-300",
              "group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground"
            )}
          >
            <Icon className="size-[22px]" aria-hidden />
          </div>
          <div className="min-w-0 text-left">
            <h3 className="text-base font-bold tracking-tight text-foreground">
              {item.label}
            </h3>
            <p className="text-sm text-muted-foreground">{item.subtitle}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative overflow-hidden py-1">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 bg-gradient-to-r from-card to-transparent sm:w-24"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 bg-gradient-to-l from-card to-transparent sm:w-24"
        aria-hidden
      />

      <motion.div
        ref={innerRef}
        className="flex w-max gap-5 will-change-transform sm:gap-6"
        style={{ x }}
        aria-hidden
      >
        {brandTrustStripItems.map((item) => renderCard(item, item.key))}
        {brandTrustStripItems.map((item) =>
          renderCard(item, `loop-${item.key}`)
        )}
      </motion.div>
    </div>
  );
}

function TrustMarqueeStatic() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {brandTrustStripItems.map((item) => {
        const Icon = stripIcons[item.key];
        return (
          <div
            key={item.key}
            className={cn(
              "group flex cursor-default items-center gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm ring-1 ring-foreground/5 transition-[transform,box-shadow,background-color] duration-300",
              "hover:-translate-y-1 hover:bg-muted/80 hover:shadow-md"
            )}
          >
            <div
              className={cn(
                "flex size-[50px] shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-[background-color,color] duration-300",
                "group-hover:bg-primary group-hover:text-primary-foreground"
              )}
            >
              <Icon className="size-[22px]" aria-hidden />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="text-base font-bold text-foreground">
                {item.label}
              </h3>
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TrustMarquee() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  if (reduceMotion) {
    return <TrustMarqueeStatic />;
  }

  const a11ySummary = brandTrustStripItems.map((i) => i.label).join(", ");

  return (
    <div
      role="region"
      aria-label={`Kaydırılan uzmanlık alanları: ${a11ySummary}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <TrustMarqueeTrack paused={paused} />
    </div>
  );
}
