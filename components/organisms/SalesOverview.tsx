// ============================================================
// components/organisms/SalesOverview.tsx
// Server Component — renders 4 StatCards from pre-computed data
// ============================================================

import StatCard from "@/components/molecules/StatCard";
import { formatINRCompact, formatNumber } from "@/lib/sales-utils";
import type { YearSummary, YearOverYearGrowth, Year } from "@/types/sales";

interface SalesOverviewProps {
  summary: YearSummary;
  growth: YearOverYearGrowth | undefined;
  selectedYear: Year;
}

export default function SalesOverview({ summary, growth, selectedYear }: SalesOverviewProps) {
  const growthStr =
    growth?.growth !== null && growth?.growth !== undefined
      ? `${growth.growth > 0 ? "+" : ""}${growth.growth}% vs ${selectedYear - 1}`
      : undefined;

  const trendPositive = (growth?.growth ?? 0) >= 0;

  return (
    <section aria-label="Summary statistics">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Sales"
          value={formatINRCompact(summary.totalSales)}
          subLabel={`FY ${selectedYear}`}
          trend={growthStr ? { value: growthStr, positive: trendPositive } : undefined}
        />
        <StatCard
          label="Total Profit"
          value={formatINRCompact(summary.totalProfit)}
          subLabel={`Margin: ${((summary.totalProfit / summary.totalSales) * 100).toFixed(1)}%`}
        />
        <StatCard
          label="Total Quantity"
          value={formatNumber(summary.totalQuantity)}
          subLabel="Units sold"
        />
        <StatCard
          label="Avg Monthly Sales"
          value={formatINRCompact(summary.avgMonthlySales)}
          subLabel="Per month"
        />
      </div>
    </section>
  );
}
