"use client";

import { Parallax } from "react-scroll-parallax";

export function SystemArchitectureParallaxBg() {
  return (
    <>
      <Parallax
        speed={-4}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-background to-muted/40 dark:from-muted/20 dark:via-background dark:to-muted/30" />
      </Parallax>
      <Parallax
        speed={6}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.96_0.02_200_/_0.5),transparent_55%)]" />
      </Parallax>
    </>
  );
}
