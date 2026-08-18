// ============================================================
// components/molecules/YearSelector.tsx
// "use client" — interactive year selection buttons
// ============================================================

"use client";

import Button from "@/components/atoms/Button";
import type { Year } from "@/types/sales";

const YEARS: Year[] = [2022, 2023, 2024];

interface YearSelectorProps {
  selectedYear: Year;
  onYearChange: (year: Year) => void;
}

export default function YearSelector({ selectedYear, onYearChange }: YearSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-gray-700">Year</span>
      <div className="flex gap-2" role="group" aria-label="Select year">
        {YEARS.map((year) => (
          <Button
            key={year}
            variant="outline"
            size="sm"
            isActive={selectedYear === year}
            onClick={() => onYearChange(year)}
            aria-pressed={selectedYear === year}
            id={`year-btn-${year}`}
          >
            {year}
          </Button>
        ))}
      </div>
    </div>
  );
}
