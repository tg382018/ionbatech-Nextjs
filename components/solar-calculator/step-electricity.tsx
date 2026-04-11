"use client";

import { ArrowLeft, ArrowRight, Info, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { ElectricityAtSite } from "./types";

const OPTIONS: {
  value: ElectricityAtSite;
  label: string;
  hint: string;
}[] = [
  {
    value: "yes",
    label: "Evet, elektriğim var",
    hint: "Şebekeye bağlı veya sayaçlı bağlantı: öz tüketim ve hibrit senaryolar için uygundur.",
  },
  {
    value: "no",
    label: "Hayır, yok",
    hint: "Bağımsız kurulum: batarya ve off-grid tasarımı öne çıkar.",
  },
  {
    value: "construction",
    label: "Yapım / geçici sahada",
    hint: "İnşaat veya geçici enerji ihtiyacı: mobil ve genişletilebilir paketler değerlendirilebilir.",
  },
];

type StepElectricityProps = {
  value: ElectricityAtSite | null;
  onChange: (v: ElectricityAtSite) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function StepElectricity({
  value,
  onChange,
  onBack,
  onContinue,
}: StepElectricityProps) {
  const groupName = "electricity-at-site";

  return (
    <div className="min-h-[calc(100dvh-5.5rem)] bg-zinc-100 px-4 py-8 sm:px-6 sm:py-12">
      <Card className="mx-auto max-w-lg border-zinc-200/80 bg-white shadow-lg shadow-zinc-900/5 ring-zinc-200/60">
        <CardContent className="space-y-6 pt-8 pb-2 sm:pt-10">
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 text-amber-400">
              <Zap className="size-10" strokeWidth={1.5} aria-hidden />
            </span>
            <h1 className="text-balance text-2xl font-bold tracking-tight text-zinc-900 sm:text-[1.65rem]">
              Kurulum yapılacak yerde elektrik var mı?
            </h1>
            <p className="mt-3 max-w-md text-sm text-zinc-500">
              Bir seçenek işaretleyin. Detaylar için ⓘ simgesine dokunun.
            </p>
          </div>

          <div className="space-y-3 pt-2" role="radiogroup" aria-label={groupName}>
            {OPTIONS.map((opt) => {
              const selected = value === opt.value;
              return (
                <div
                  key={opt.value}
                  className={cn(
                    "flex items-stretch overflow-hidden rounded-2xl border bg-white transition-colors",
                    selected
                      ? "border-primary ring-2 ring-primary/25"
                      : "border-zinc-200 hover:border-zinc-300"
                  )}
                >
                  <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-4 py-4">
                    <input
                      type="radio"
                      name={groupName}
                      value={opt.value}
                      checked={selected}
                      onChange={() => onChange(opt.value)}
                      className="size-4 shrink-0 accent-primary"
                    />
                    <span className="text-left text-sm font-medium text-zinc-900">
                      {opt.label}
                    </span>
                  </label>
                  <button
                    type="button"
                    className="flex w-12 shrink-0 items-center justify-center border-l border-zinc-100 bg-zinc-50/80 text-primary hover:bg-zinc-100"
                    title={opt.hint}
                    aria-label={`Açıklama: ${opt.hint}`}
                  >
                    <Info className="size-5" aria-hidden />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-zinc-200"
              onClick={onBack}
            >
              <ArrowLeft className="size-4" aria-hidden />
              Geri
            </Button>
            <Button
              type="button"
              className="rounded-full px-6"
              disabled={value === null}
              onClick={onContinue}
            >
              Devam Et
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
