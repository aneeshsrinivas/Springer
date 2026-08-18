// ============================================================
// components/charts/SalesPieChart.tsx
// "use client" — Recharts requires browser DOM
// Category-level sales distribution as a donut chart
// Percentages are derived from actual data, not hard-coded
// ============================================================

"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { CategorySales } from "@/types/sales";
import { formatINR } from "@/lib/sales-utils";

interface SalesPieChartProps {
  data: CategorySales[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Technology:        "#3b82f6",
  Furniture:         "#f59e0b",
  "Office Supplies": "#10b981",
};
const FALLBACK = ["#6366f1", "#ec4899", "#14b8a6"];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { percent: number } }>;
}) {
  if (!active || !payload?.length) return null;
  const e = payload[0];
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{e.name}</p>
      <p className="font-medium text-gray-900">{formatINR(e.value)}</p>
      <p className="text-xs text-gray-500 mt-0.5">
        {(e.payload.percent * 100).toFixed(1)}% of total
      </p>
    </div>
  );
}

export default function SalesPieChart({ data }: SalesPieChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-400 text-sm">
        No category data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey="sales"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={115}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.category}`}
              fill={CATEGORY_COLORS[entry.category] ?? FALLBACK[index % FALLBACK.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
