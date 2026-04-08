import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type CategoryTileProps = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

export function CategoryTile({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  className,
}: CategoryTileProps) {
  const external = href.startsWith("http");
  const linkProps = external
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};

  return (
    <a
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm ring-1 ring-foreground/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      aria-label={`${title} — Mağazada görüntüle`}
      {...linkProps}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[5/3]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-105 group-hover:brightness-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3 p-5 sm:p-6">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <ArrowUpRight
              className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-primary"
              aria-hidden
            />
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Mağazada görüntüle
        </span>
      </div>
    </a>
  );
}
