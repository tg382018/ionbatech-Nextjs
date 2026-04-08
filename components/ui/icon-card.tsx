import { ArrowUpRight, type LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type IconCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  href?: string;
};

export function IconCard({
  icon: Icon,
  title,
  description,
  className,
  href,
}: IconCardProps) {
  const inner = (
    <Card
      className={cn(
        "h-full border-border/80 bg-card/80 shadow-sm ring-foreground/8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        href && "cursor-pointer",
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" aria-hidden />
          </div>
          {href ? (
            <ArrowUpRight
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
          ) : null}
        </div>
        <CardTitle className="pt-2 text-lg font-semibold tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
      {href ? (
        <CardFooter className="pt-0 text-xs font-medium text-primary">
          İncele
        </CardFooter>
      ) : null}
    </Card>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`${title} — İncele`}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return inner;
}
