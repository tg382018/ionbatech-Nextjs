"use client";

import { motion, useReducedMotion } from "framer-motion";

import { fadeUp, motionEase, staggerContainer } from "@/lib/motion";

type AnimatedRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
};

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  stagger = false,
}: AnimatedRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-64px" }}
        variants={staggerContainer}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      variants={fadeUp}
      transition={{ duration: 0.5, delay, ease: motionEase }}
    >
      {children}
    </motion.div>
  );
}

type AnimatedRevealItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedRevealItem({
  children,
  className,
}: AnimatedRevealItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{ duration: 0.45, ease: motionEase }}
    >
      {children}
    </motion.div>
  );
}
