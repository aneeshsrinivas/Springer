// ============================================================
// components/organisms/SalesSummary.tsx
// Server Component — year-over-year comparison section
// ============================================================

import Card from "@/components/atoms/Card";
import { formatINRCompact } from "@/lib/sales-utils";
import type { YearSummary, YearOverYearGrowth } from "@/types/sales";

interface SalesSummaryProps {
  summaries: YearSummary[];
  growthData: YearOverYearGrowth[];
}

export default function SalesSummary({ summaries, growthData }: SalesSummaryProps) {
  return (
    <Card>
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Year-over-Year Comparison
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaries.map((s) => {
          const growth = growthData.find((g) => g.year === s.year);
          const growthValue = growth?.growth;
          return (
            <div
              key={s.year}
              className="flex flex-col gap-1 p-4 rounded-lg bg-gray-50 border border-gray-100"
            >
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {s.year}
              </p>
              <p className="text-xl font-bold text-gray-900 tracking-tight">
                {formatINRCompact(s.totalSales)}
              </p>
              {growthValue !== null && growthValue !== undefined ? (
                <p
                  className={`text-xs font-semibold mt-1 ${
                    growthValue >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {growthValue > 0 ? "▲" : "▼"} {Math.abs(growthValue)}% vs{" "}
                  {s.year - 1}
                </p>
              ) : (
                <p className="text-xs text-gray-400 mt-1">Base year</p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
