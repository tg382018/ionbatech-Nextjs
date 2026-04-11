import type { UsageFrequencyId } from "@/lib/solar-calculator/energy";

export type SelectedLine = {
  key: string;
  applianceId: string;
  quantity: number;
  hoursPerDay: number;
  frequencyId: UsageFrequencyId;
};
