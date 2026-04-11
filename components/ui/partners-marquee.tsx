"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { partnersSection } from "@/lib/constants";
import { motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const partners = partnersSection.partners;
const PX_PER_SEC = 42;

function PartnerCard({
  name,
  imageSrc,
}: {
  name: string;
  imageSrc: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="w-[200px] shrink-0 sm:w-[220px]"
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.06,
              transition: { duration: 0.28, ease: motionEase },
            }
      }
      style={{ transformOrigin: "center center" }}
    >
      <div
        className={cn(
          "group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/70 bg-white/95 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] ring-1 ring-foreground/[0.04]",
          "transition-[border-color,box-shadow] duration-300",
          "hover:border-primary/25 hover:shadow-[0_16px_40px_-16px_rgba(18,100,88,0.2)]"
        )}
        aria-label={name}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-contain p-6 transition-[filter,transform] duration-500 group-hover:brightness-105"
          sizes="192px"
        />
      </div>
    </motion.div>
  );
}

function PartnersMarqueeTrack({ paused }: { paused: boolean }) {
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
      duration: Math.max(22, loopWidth / PX_PER_SEC),
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

  return (
    <div className="relative overflow-hidden py-2">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-background via-background/90 to-transparent sm:w-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-background via-background/90 to-transparent sm:w-20"
        aria-hidden
      />

      <motion.div
        ref={innerRef}
        className="flex w-max gap-5 will-change-transform sm:gap-6"
        style={{ x }}
      >
        {partners.map((p) => (
          <PartnerCard key={p.key} name={p.name} imageSrc={p.imageSrc} />
        ))}
        {partners.map((p) => (
          <PartnerCard
            key={`dup-${p.key}`}
            name={p.name}
            imageSrc={p.imageSrc}
          />
        ))}
      </motion.div>
    </div>
  );
}

function PartnersGridStatic() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {partners.map((p) => (
        <PartnerCard key={p.key} name={p.name} imageSrc={p.imageSrc} />
      ))}
    </div>
  );
}

export function PartnersMarquee() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  if (reduceMotion) {
    return <PartnersGridStatic />;
  }

  const labels = partners.map((p) => p.name).join(", ");

  return (
    <div
      role="region"
      aria-label={`İş ortakları: ${labels}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <PartnersMarqueeTrack paused={paused} />
    </div>
  );
}
