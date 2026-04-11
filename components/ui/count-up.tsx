"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  duration?: number;
  delay?: number;
  className?: string;
};

export function CountUp({
  end,
  duration = 1.85,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setN(end);
      return;
    }
    const controls = animate(0, end, {
      duration,
      delay,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (latest) => {
        setN(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [isInView, end, duration, delay, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  );
}
