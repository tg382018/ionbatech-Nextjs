"use client";

import { ArrowLeft, Sun } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactHref } from "@/lib/constants";
import { getApplianceById } from "@/lib/solar-calculator/appliances";
import {
  dailyWhForLine,
  estimatedYearlyBillTry,
  ESTIMATED_TRY_PER_KWH,
  yearlyKwhFromDailyWh,
} from "@/lib/solar-calculator/energy";

import type { SelectedLine } from "./types";

type StepSummaryProps = {
  selected: SelectedLine[];
  onBack: () => void;
};

export function StepSummary({ selected, onBack }: StepSummaryProps) {
  let dailyWh = 0;
  for (const line of selected) {
    const app = getApplianceById(line.applianceId);
    if (!app) continue;
    dailyWh += dailyWhForLine(
      app,
      line.quantity,
      line.hoursPerDay,
      line.frequencyId
    );
  }
  const yearlyKwh = yearlyKwhFromDailyWh(dailyWh);
  const yearlyTry = estimatedYearlyBillTry(yearlyKwh);

  return (
    <div className="min-h-[calc(100dvh-5.5rem)] bg-zinc-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-start gap-3">
          <Sun
            className="text-primary mt-1 size-9 shrink-0"
            strokeWidth={1.5}
            aria-hidden
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Tahmini enerji özeti
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Aşağıdaki değerler, seçtiğiniz cihazlara göre yaklaşık günlük ve
              yıllık elektrik ihtiyacını gösterir. Gerçek tüketim kullanım
              alışkanlıklarınıza göre değişir.
            </p>
          </div>
        </div>

        <Card className="border-primary/25 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Tüketim tahmini</CardTitle>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Seçtiğiniz cihazlar ve kullanım sürelerine göre hesaplanmıştır.
            </p>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                Günlük (tahmini)
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-zinc-900">
                {(dailyWh / 1000).toLocaleString("tr-TR", {
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-lg font-semibold text-zinc-600">kWh</span>
              </p>
            </div>
            <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                Yıllık (tahmini)
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-zinc-900">
                {yearlyKwh.toLocaleString("tr-TR", {
                  maximumFractionDigits: 0,
                })}{" "}
                <span className="text-lg font-semibold text-zinc-600">kWh</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Yaklaşık yıllık elektrik gideri (örnek)
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Ortalama {ESTIMATED_TRY_PER_KWH} ₺/kWh blended tarife ile
              kabaca hesaplanmıştır; yalnızca karşılaştırma içindir.
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tabular-nums text-primary">
              {yearlyTry.toLocaleString("tr-TR", {
                maximumFractionDigits: 0,
              })}{" "}
              ₺
            </p>
            <p className="text-muted-foreground mt-3 text-sm">
              Güneş enerjisi ile bu tüketimin büyük bölümünü karşılamak mümkün
              olabilir; net tasarruf panel gücü, batarya ve teşviklere bağlıdır.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={onBack}
          >
            <ArrowLeft className="size-4" aria-hidden />
            Geri
          </Button>
          <Link
            href={contactHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              className: "rounded-full px-6",
            })}
          >
            Teklif Al
          </Link>
        </div>
      </div>
    </div>
  );
}
