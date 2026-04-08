import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type WhyUsValueCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "featured" | "default";
  className?: string;
};

export function WhyUsValueCard({
  icon: Icon,
  title,
  description,
  variant = "default",
  className,
}: WhyUsValueCardProps) {
  if (variant === "featured") {
    return (
      <div
        className={cn(
          "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.06] p-6 shadow-sm ring-1 ring-foreground/5 transition-[transform,box-shadow,border-color] duration-300 sm:p-8",
          "hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10",
          className
        )}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/[0.12] blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:size-56"
          aria-hidden
        />
        <div className="relative flex flex-1 flex-col gap-5">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/85 text-primary-foreground shadow-md shadow-primary/25 ring-1 ring-primary/30 sm:size-16">
            <Icon className="size-7 sm:size-8" aria-hidden />
          </div>
          <div className="space-y-3">
            <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group flex h-full min-h-0 flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition-[transform,box-shadow,border-color] duration-300 sm:p-6",
        "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md",
        className
      )}
    >
      <div className="mb-4 flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-[background-color,color,transform] duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground sm:size-12">
        <Icon className="size-[22px] sm:size-6" aria-hidden />
      </div>
      <h3 className="font-heading text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
