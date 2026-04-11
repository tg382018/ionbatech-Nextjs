"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { StepAppliances } from "./step-appliances";
import { StepElectricity } from "./step-electricity";
import { StepSummary } from "./step-summary";
import type { ElectricityAtSite, SelectedLine } from "./types";

/** 0: elektrik, 1: cihazlar, 2: özet — intro yok, doğrudan quiz. */
export function SolarCalculatorWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [electricity, setElectricity] = useState<ElectricityAtSite | null>(
    null
  );
  const [selected, setSelected] = useState<SelectedLine[]>([]);

  function addLine(line: SelectedLine) {
    setSelected((s) => [...s, line]);
  }

  function removeLine(key: string) {
    setSelected((s) => s.filter((x) => x.key !== key));
  }

  function clearAll() {
    setSelected([]);
  }

  if (step === 0) {
    return (
      <StepElectricity
        value={electricity}
        onChange={setElectricity}
        onBack={() => router.push("/")}
        onContinue={() => setStep(1)}
      />
    );
  }

  if (step === 1) {
    return (
      <StepAppliances
        selected={selected}
        onAdd={addLine}
        onRemove={removeLine}
        onClear={clearAll}
        onBack={() => setStep(0)}
        onCalculate={() => setStep(2)}
      />
    );
  }

  if (step === 2) {
    return (
      <StepSummary
        electricity={electricity!}
        selected={selected}
        onBack={() => setStep(1)}
      />
    );
  }

  return null;
}
