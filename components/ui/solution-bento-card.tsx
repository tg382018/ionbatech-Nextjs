import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type SolutionBentoCardProps = {
  variant: "hero" | "tile";
  icon: LucideIcon;
  title: string;
  description: string;
  benefits?: readonly string[];
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
  benefits,
  href,
  imageSrc,
  imageAlt,
  gridClassName,
}: SolutionBentoCardProps) {
  const external = href.startsWith("http");
  const linkProps = external
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};

  if (variant === "hero") {
    return (
      <a
        href={href}
        className={cn(
          "group relative isolate block h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/10 shadow-lg ring-1 ring-foreground/5 transition-all duration-500 lg:min-h-0",
          "hover:shadow-2xl hover:shadow-primary/20 hover:ring-primary/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          gridClassName
        )}
        aria-label={`${title} — İncele`}
        {...linkProps}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-110"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/5 transition-opacity duration-500 group-hover:from-black/85 group-hover:via-black/50"
          aria-hidden
        />
        {/* Shimmer sweep on hover */}
        <div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
          aria-hidden
        />

        <div className="relative z-[1] flex h-full min-h-[220px] flex-col justify-end gap-3 p-5 sm:p-6 lg:min-h-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/90 text-primary-foreground shadow-md shadow-primary/25 backdrop-blur-sm ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
              <Icon className="size-5" aria-hidden />
            </div>
            <div className="flex size-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary group-hover:scale-105">
              <ArrowUpRight
                className="size-4 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-heading text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl">
              {title}
            </h3>
            <p className="max-w-xl text-xs leading-relaxed text-white/75 sm:text-sm">
              {description}
            </p>
            {benefits && benefits.length > 0 ? (
              <ul className="max-w-xl list-inside list-disc space-y-1 pl-0.5 text-[0.6875rem] leading-snug text-white/78 marker:text-emerald-300/90 sm:text-xs">
                {benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 sm:text-sm">
            <span className="h-px w-6 bg-primary transition-all duration-500 group-hover:w-10" />
            İncele
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm ring-1 ring-foreground/[0.03] transition-all duration-500",
        "hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        gridClassName
      )}
      aria-label={`${title} — İncele`}
      {...linkProps}
    >
      <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden sm:aspect-[16/9]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-50"
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/10 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/25 group-hover:scale-105">
            <Icon className="size-[18px] sm:size-5" aria-hidden />
          </div>
          <ArrowUpRight
            className="size-3.5 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:size-4"
            aria-hidden
          />
        </div>
        <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground sm:text-base">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {description}
        </p>
        {benefits && benefits.length > 0 ? (
          <ul className="mt-1 list-inside list-disc space-y-0.5 text-[0.6875rem] leading-snug text-muted-foreground marker:text-primary sm:text-xs">
            {benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : null}
        <div className="flex items-center gap-2 text-xs font-semibold text-primary opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1">
          <span className="h-px w-4 bg-primary transition-all duration-500 group-hover:w-8" />
          İncele
        </div>
      </div>
      {/* Bottom accent glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 origin-center group-hover:scale-x-100"
        aria-hidden
      />
    </a>
  );
}
