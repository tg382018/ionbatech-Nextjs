import { cn } from "@/lib/utils";

export type MetricCardTone = "emerald" | "ocean" | "amber" | "violet";

const toneStyles: Record<
  MetricCardTone,
  { shell: string; label: string; value: string; hint: string }
> = {
  emerald: {
    shell:
      "border-[oklch(0.55_0.12_148_/_0.4)] bg-[oklch(0.96_0.035_148)] shadow-[oklch(0.46_0.14_148_/_0.08)] ring-[oklch(0.55_0.12_148_/_0.12)]",
    label: "text-[oklch(0.4_0.1_148)]",
    value: "text-[oklch(0.22_0.06_148)]",
    hint: "text-[oklch(0.44_0.05_148)]",
  },
  ocean: {
    shell:
      "border-[oklch(0.55_0.1_230_/_0.38)] bg-[oklch(0.96_0.025_230)] shadow-[oklch(0.5_0.1_230_/_0.07)] ring-[oklch(0.55_0.1_230_/_0.1)]",
    label: "text-[oklch(0.42_0.08_230)]",
    value: "text-[oklch(0.24_0.06_240)]",
    hint: "text-[oklch(0.45_0.04_230)]",
  },
  amber: {
    shell:
      "border-[oklch(0.72_0.14_75_/_0.45)] bg-[oklch(0.98_0.03_95)] shadow-[oklch(0.75_0.12_75_/_0.1)] ring-[oklch(0.72_0.12_75_/_0.14)]",
    label: "text-[oklch(0.48_0.1_65)]",
    value: "text-[oklch(0.28_0.06_55)]",
    hint: "text-[oklch(0.46_0.06_70)]",
  },
  violet: {
    shell:
      "border-[oklch(0.58_0.14_290_/_0.35)] bg-[oklch(0.97_0.025_290)] shadow-[oklch(0.52_0.12_290_/_0.08)] ring-[oklch(0.55_0.12_290_/_0.1)]",
    label: "text-[oklch(0.45_0.1_290)]",
    value: "text-[oklch(0.26_0.07_300)]",
    hint: "text-[oklch(0.46_0.05_290)]",
  },
};

type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
  tone?: MetricCardTone;
  className?: string;
};

export function MetricCard({
  label,
  value,
  hint,
  tone = "emerald",
  className,
}: MetricCardProps) {
  const t = toneStyles[tone];

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-sm ring-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md",
        t.shell,
        className
      )}
    >
      <p className={cn("text-xs font-semibold uppercase tracking-wide", t.label)}>
        {label}
      </p>
      <p
        className={cn(
          "mt-2 text-xl font-semibold tracking-tight sm:text-2xl",
          t.value
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className={cn("mt-2 text-sm leading-relaxed", t.hint)}>{hint}</p>
      ) : null}
    </div>
  );
}
