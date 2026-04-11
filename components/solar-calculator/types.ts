import type { UsageFrequencyId } from "@/lib/solar-calculator/energy";

export type ElectricityAtSite = "yes" | "no" | "construction";

export type SelectedLine = {
  key: string;
  applianceId: string;
  quantity: number;
  hoursPerDay: number;
  frequencyId: UsageFrequencyId;
};
