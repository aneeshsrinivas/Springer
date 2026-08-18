// ============================================================
// components/charts/SalesBarChart.tsx
// "use client" — Recharts requires browser DOM
// Monthly sales and profit as grouped bar chart
// ============================================================

"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import type { MonthlySales } from "@/types/sales";
import { abbreviateMonth, formatINR } from "@/lib/sales-utils";

interface SalesBarChartProps {
  data: MonthlySales[];
}

interface TooltipEntry {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm min-w-[150px]">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex justify-between gap-4 py-0.5">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="font-medium text-gray-900">{formatINR(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SalesBarChart({ data }: SalesBarChartProps) {
  const chartData = data.map((d) => ({
    month:  abbreviateMonth(d.month),
    Sales:  d.sales,
    Profit: d.profit,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) =>
            new Intl.NumberFormat("en-IN", { notation: "compact" }).format(v)
          }
          width={58}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="square" wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
        <Bar dataKey="Sales"  fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={32} />
        <Bar dataKey="Profit" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}
