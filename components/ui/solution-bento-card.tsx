import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type SolutionBentoCardProps = {
  variant: "hero" | "tile";
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  gridClassName?: string;
};

export function SolutionBentoCard({
  variant,
  icon: Icon,
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  gridClassName,
}: SolutionBentoCardProps) {
  const external = href.startsWith("http");
  const linkProps = external
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};

  const baseLink = cn(
    "block h-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm ring-1 ring-foreground/5 transition-[border-color,box-shadow,transform] duration-300",
    "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    gridClassName
  );

  if (variant === "hero") {
    return (
      <a
        href={href}
        className={cn(
          baseLink,
          "group relative isolate h-full min-h-[260px] lg:min-h-0"
        )}
        aria-label={`${title} — İncele`}
        {...linkProps}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-105"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/25"
          aria-hidden
        />
        <div className="relative z-[1] flex h-full min-h-[260px] flex-col justify-end gap-3 p-5 sm:gap-4 sm:p-6 lg:min-h-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md ring-1 ring-primary/20">
              <Icon className="size-6" aria-hidden />
            </div>
            <ArrowUpRight
              className="size-5 shrink-0 text-foreground/90 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
              {description}
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            İncele
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn(baseLink, "group flex flex-col")}
      aria-label={`${title} — İncele`}
      {...linkProps}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[5/3]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-105 group-hover:brightness-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 sm:gap-3 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-[22px]" aria-hidden />
          </div>
          <ArrowUpRight
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-primary"
            aria-hidden
          />
        </div>
        <h3 className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {title}
        </h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <span className="text-xs font-semibold text-primary">İncele</span>
      </div>
    </a>
  );
}
