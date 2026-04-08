import { cn } from "@/lib/utils";

type BadgeChipProps = {
  children: React.ReactNode;
  className?: string;
};

export function BadgeChip({ children, className }: BadgeChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-xs font-medium text-foreground/85 shadow-sm ring-1 ring-primary/10",
        className
      )}
    >
      {children}
    </span>
  );
}
