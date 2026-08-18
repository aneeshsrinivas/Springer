// ============================================================
// components/molecules/ChartTypeSelector.tsx
// "use client" — switches between Bar / Line / Pie chart types
// ============================================================

"use client";

import Button from "@/components/atoms/Button";
import type { ChartType } from "@/types/sales";

const CHART_TYPES: { type: ChartType; label: string }[] = [
  { type: "bar",  label: "Bar"  },
  { type: "line", label: "Line" },
  { type: "pie",  label: "Pie"  },
];

interface ChartTypeSelectorProps {
  selectedChart: ChartType;
  onChartChange: (chart: ChartType) => void;
}

export default function ChartTypeSelector({ selectedChart, onChartChange }: ChartTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-gray-700">Chart Type</span>
      <div className="flex gap-2" role="group" aria-label="Select chart type">
        {CHART_TYPES.map(({ type, label }) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            isActive={selectedChart === type}
            onClick={() => onChartChange(type)}
            aria-pressed={selectedChart === type}
            id={`chart-type-btn-${type}`}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
