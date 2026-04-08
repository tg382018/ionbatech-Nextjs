import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl space-y-3",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <h2
        id={id}
        className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
