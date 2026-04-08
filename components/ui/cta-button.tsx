"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  external?: boolean;
  onClick?: () => void;
};

export function CtaButton({
  href,
  children,
  className,
  variant = "default",
  size = "default",
  external,
  onClick,
}: CtaButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size }),
    size === "default" && "h-10 min-h-10 px-4 text-sm sm:h-11 sm:min-h-11 sm:px-5",
    className
  );

  const isExternal =
    external === true ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
