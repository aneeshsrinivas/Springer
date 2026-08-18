// ============================================================
// components/organisms/SalesChart.tsx
// "use client" — manages chart type switching + renders chart
// ============================================================

"use client";

import { useState } from "react";
import Card from "@/components/atoms/Card";
import ChartTypeSelector from "@/components/molecules/ChartTypeSelector";
import SalesBarChart     from "@/components/charts/SalesBarChart";
import SalesLineChart    from "@/components/charts/SalesLineChart";
import SalesPieChart     from "@/components/charts/SalesPieChart";
import type { MonthlySales, CategorySales, ChartType } from "@/types/sales";

interface SalesChartProps {
  monthlyData:  MonthlySales[];
  categoryData: CategorySales[];
  year:         number;
  threshold:    number;
}

const CHART_TITLES: Record<ChartType, string> = {
  bar:  "Monthly Sales & Profit",
  line: "Sales Trend",
  pie:  "Sales by Category",
};

export default function SalesChart({ monthlyData, categoryData, year, threshold }: SalesChartProps) {
  const [chartType, setChartType] = useState<ChartType>("bar");

  const hasData = monthlyData.some((m) => m.sales > 0) || categoryData.length > 0;

  return (
    <Card className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            {CHART_TITLES[chartType]} — {year}
          </h2>
          {threshold > 0 && (
            <p className="text-xs text-gray-500 mt-0.5">
              Showing sales ≥ ₹{threshold.toLocaleString("en-IN")}
            </p>
          )}
        </div>
        <ChartTypeSelector selectedChart={chartType} onChartChange={setChartType} />
      </div>

      {/* Chart area */}
      {!hasData ? (
        <div
          role="status"
          className="flex items-center justify-center h-80 rounded-lg bg-gray-50 text-gray-400 text-sm border border-dashed border-gray-200"
        >
          No sales records match your current filter.
        </div>
      ) : (
        <div>
          {chartType === "bar"  && <SalesBarChart  data={monthlyData}  />}
          {chartType === "line" && <SalesLineChart data={monthlyData}  />}
          {chartType === "pie"  && <SalesPieChart  data={categoryData} />}
        </div>
      )}
    </Card>
  );
}
