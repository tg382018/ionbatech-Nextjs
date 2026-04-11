"use client";

import {
  ArrowLeft,
  ClipboardList,
  Mail,
  Plus,
  Search,
  Trash2,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APPLIANCES, getApplianceById } from "@/lib/solar-calculator/appliances";
import {
  dailyWhForLine,
  USAGE_FREQUENCY,
  type UsageFrequencyId,
} from "@/lib/solar-calculator/energy";
import { cn } from "@/lib/utils";

import type { SelectedLine } from "./types";

function newLineKey(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

type StepAppliancesProps = {
  selected: SelectedLine[];
  onAdd: (line: SelectedLine) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
  onBack: () => void;
  onCalculate: () => void;
};

export function StepAppliances({
  selected,
  onAdd,
  onRemove,
  onClear,
  onBack,
  onCalculate,
}: StepAppliancesProps) {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [draftQty, setDraftQty] = useState(1);
  const [draftHours, setDraftHours] = useState(2);
  const [draftFreq, setDraftFreq] = useState<UsageFrequencyId>("every_day");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return APPLIANCES;
    return APPLIANCES.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        String(a.watts).includes(q)
    );
  }, [query]);

  function openExpand(applianceId: string) {
    setExpandedId(applianceId);
    setDraftQty(1);
    setDraftHours(2);
    setDraftFreq("every_day");
  }

  function cancelExpand() {
    setExpandedId(null);
  }

  function confirmAdd(applianceId: string) {
    const app = getApplianceById(applianceId);
    if (!app) return;
    onAdd({
      key: newLineKey(),
      applianceId,
      quantity: Math.min(99, Math.max(1, draftQty)),
      hoursPerDay: Math.min(24, Math.max(0.5, draftHours)),
      frequencyId: draftFreq,
    });
    setExpandedId(null);
  }

  const totalCount = selected.length;
  const canCalculate = totalCount > 0;

  return (
    <div className="min-h-[calc(100dvh-5.5rem)] bg-zinc-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 sm:mb-8">
          <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            Tüketim
          </p>
          <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            Hangi cihazları kullanıyorsunuz?
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
            Cihaz eklerken kaç adet ve günde kaç saat kullandığınızı belirtin.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Catalog */}
          <div
            className={cn(
              "flex max-h-[min(70dvh,560px)] flex-col rounded-2xl border-2 border-sky-200/80 bg-white p-4 shadow-sm sm:p-5",
              "dark:border-sky-800/50"
            )}
          >
            <div className="relative mb-3">
              <Search
                className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2"
                aria-hidden
              />
              <Input
                type="search"
                placeholder="Cihaz ara... (klima, buzdolabı, TV...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 rounded-xl border-sky-200/90 pl-10"
                aria-label="Cihaz ara"
              />
            </div>
            <p className="text-muted-foreground mb-3 text-sm">
              {filtered.length} cihaz bulundu
            </p>
            <ul
              className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-color:oklch(0.46_0.16_148)_transparent] [scrollbar-width:thin]"
              role="list"
            >
              {filtered.map((a) => {
                const expanded = expandedId === a.id;
                return (
                  <li
                    key={a.id}
                    className={cn(
                      "rounded-xl border bg-white transition-shadow",
                      expanded
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-zinc-200 hover:border-zinc-300"
                    )}
                  >
                    <div className="flex items-center gap-3 px-3 py-3 sm:px-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-zinc-900">{a.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {a.watts} W
                        </p>
                      </div>
                      {!expanded ? (
                        <Button
                          type="button"
                          size="sm"
                          className="shrink-0 rounded-lg"
                          onClick={() => openExpand(a.id)}
                        >
                          <Plus className="size-4" aria-hidden />
                          Ekle
                        </Button>
                      ) : null}
                    </div>
                    {expanded ? (
                      <div className="space-y-4 border-t border-zinc-100 bg-zinc-50/80 px-3 py-4 sm:px-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor={`qty-${a.id}`}>Adet</Label>
                            <div className="mt-1 flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon-sm"
                                className="shrink-0"
                                onClick={() =>
                                  setDraftQty((q) => Math.max(1, q - 1))
                                }
                                aria-label="Adet azalt"
                              >
                                −
                              </Button>
                              <Input
                                id={`qty-${a.id}`}
                                type="number"
                                min={1}
                                max={99}
                                value={draftQty}
                                onChange={(e) =>
                                  setDraftQty(
                                    Number.parseInt(e.target.value, 10) || 1
                                  )
                                }
                                className="text-center"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon-sm"
                                className="shrink-0"
                                onClick={() =>
                                  setDraftQty((q) => Math.min(99, q + 1))
                                }
                                aria-label="Adet artır"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor={`hrs-${a.id}`}>
                              Günde saat
                            </Label>
                            <div className="mt-1 flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon-sm"
                                onClick={() =>
                                  setDraftHours((h) =>
                                    Math.max(0.5, Math.round((h - 0.5) * 2) / 2)
                                  )
                                }
                                aria-label="Saat azalt"
                              >
                                −
                              </Button>
                              <Input
                                id={`hrs-${a.id}`}
                                type="number"
                                min={0.5}
                                max={24}
                                step={0.5}
                                value={draftHours}
                                onChange={(e) =>
                                  setDraftHours(
                                    Number.parseFloat(e.target.value) || 0.5
                                  )
                                }
                                className="text-center"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon-sm"
                                onClick={() =>
                                  setDraftHours((h) =>
                                    Math.min(24, Math.round((h + 0.5) * 2) / 2)
                                  )
                                }
                                aria-label="Saat artır"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor={`freq-${a.id}`}>
                            Kullanım sıklığı
                          </Label>
                          <select
                            id={`freq-${a.id}`}
                            value={draftFreq}
                            onChange={(e) =>
                              setDraftFreq(e.target.value as UsageFrequencyId)
                            }
                            className="border-input mt-1 flex h-8 w-full rounded-lg border bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                          >
                            {USAGE_FREQUENCY.map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            className="rounded-lg"
                            onClick={() => confirmAdd(a.id)}
                          >
                            Listeye Ekle
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            className="rounded-lg"
                            onClick={cancelExpand}
                          >
                            İptal
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Selected */}
          <div
            className={cn(
              "flex max-h-[min(70dvh,560px)] flex-col rounded-2xl border-2 border-primary/40 bg-emerald-50/40 shadow-sm",
              "dark:bg-emerald-950/20"
            )}
          >
            <div className="flex items-center justify-between gap-3 rounded-t-2xl border-b border-primary/15 bg-primary/10 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-2">
                <ClipboardList
                  className="text-primary size-5 shrink-0"
                  aria-hidden
                />
                <span className="font-semibold text-zinc-900">
                  Seçilen Cihazlar
                </span>
                <span className="bg-primary text-primary-foreground inline-flex size-7 items-center justify-center rounded-full text-xs font-bold">
                  {totalCount}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="shrink-0 text-zinc-600"
                disabled={totalCount === 0}
                onClick={onClear}
              >
                <Trash2 className="size-4" aria-hidden />
                Temizle
              </Button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
              {totalCount === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Mail
                    className="text-muted-foreground mb-4 size-14 opacity-40"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <p className="text-muted-foreground max-w-xs text-sm">
                    Sol taraftan cihaz ekleyerek başlayın.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3" role="list">
                  {selected.map((line) => {
                    const app = getApplianceById(line.applianceId);
                    if (!app) return null;
                    const wh = dailyWhForLine(
                      app,
                      line.quantity,
                      line.hoursPerDay,
                      line.frequencyId
                    );
                    const freqLabel =
                      USAGE_FREQUENCY.find((f) => f.id === line.frequencyId)
                        ?.label ?? "";
                    return (
                      <li
                        key={line.key}
                        className="flex items-start gap-3 rounded-xl border border-primary/20 bg-white p-3 shadow-sm"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-zinc-900">
                            {app.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {line.quantity} adet · {line.hoursPerDay} saat/gün ·{" "}
                            {freqLabel}
                          </p>
                          <p className="mt-1 text-sm font-medium text-primary">
                            ~{wh.toLocaleString("tr-TR", { maximumFractionDigits: 0 })}{" "}
                            Wh/gün
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="shrink-0 text-zinc-500 hover:text-destructive"
                          onClick={() => onRemove(line.key)}
                          aria-label="Kaldır"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
            size="lg"
            className="rounded-full px-8"
            disabled={!canCalculate}
            onClick={onCalculate}
          >
            <Zap className="size-4" aria-hidden />
            Sistemi Hesapla
          </Button>
        </div>
      </div>
    </div>
  );
}
