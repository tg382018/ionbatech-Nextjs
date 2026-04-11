import type { Appliance } from "./appliances";

/** Maps usage pattern to average daily weight (fraction of a week normalized to per-day). */
export const USAGE_FREQUENCY = [
  { id: "every_day", label: "Her gün", factor: 1 },
  { id: "weekdays", label: "Hafta içi (5 gün)", factor: 5 / 7 },
  { id: "weekends", label: "Hafta sonu (2 gün)", factor: 2 / 7 },
  { id: "few_days", label: "Haftada birkaç gün", factor: 3 / 7 },
  { id: "rare", label: "Ayda birkaç gün (yaklaşık)", factor: 2 / 30 },
] as const;

export type UsageFrequencyId = (typeof USAGE_FREQUENCY)[number]["id"];

export function getFrequencyFactor(id: UsageFrequencyId): number {
  const row = USAGE_FREQUENCY.find((f) => f.id === id);
  return row?.factor ?? 1;
}

/** Daily energy in Wh for one line item. */
export function dailyWhForLine(
  appliance: Appliance,
  quantity: number,
  hoursPerDay: number,
  frequencyId: UsageFrequencyId
): number {
  const f = getFrequencyFactor(frequencyId);
  return appliance.watts * quantity * hoursPerDay * f;
}

/** Rough yearly savings in TRY — illustrative only; uses a flat blended tariff. */
export const ESTIMATED_TRY_PER_KWH = 4.2;

export function yearlyKwhFromDailyWh(dailyWh: number): number {
  return (dailyWh / 1000) * 365;
}

export function estimatedYearlyBillTry(yearlyKwh: number): number {
  return yearlyKwh * ESTIMATED_TRY_PER_KWH;
}
