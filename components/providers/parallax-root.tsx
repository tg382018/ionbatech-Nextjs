"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import { useSyncExternalStore, type ReactNode } from "react";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getClientReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** SSR / ilk paint: parallax kapalı; hidrasyon sonrası gerçek tercih uygulanır. */
function getServerReducedMotion() {
  return true;
}

export function ParallaxRoot({ children }: { children: ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getClientReducedMotion,
    getServerReducedMotion
  );

  return (
    <ParallaxProvider isDisabled={reducedMotion}>{children}</ParallaxProvider>
  );
}
