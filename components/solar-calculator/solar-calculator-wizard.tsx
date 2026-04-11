"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { StepAppliances } from "./step-appliances";
import { StepSummary } from "./step-summary";
import type { SelectedLine } from "./types";

/** 0: cihazlar, 1: özet */
export function SolarCalculatorWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
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
      <StepAppliances
        selected={selected}
        onAdd={addLine}
        onRemove={removeLine}
        onClear={clearAll}
        onBack={() => router.push("/")}
        onCalculate={() => setStep(1)}
      />
    );
  }

  if (step === 1) {
    return (
      <StepSummary
        selected={selected}
        onBack={() => setStep(0)}
      />
    );
  }

  return null;
}
