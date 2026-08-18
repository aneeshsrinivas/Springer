// ============================================================
// components/molecules/StatCard.tsx
// Summary metric card — receives pre-computed values as props
// ============================================================

import Card from "@/components/atoms/Card";

interface StatCardProps {
  label: string;
  value: string;
  subLabel?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export default function StatCard({ label, value, subLabel, trend }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-2">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <div className="flex items-end justify-between gap-2">
        <p className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{value}</p>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-0.5 ${
              trend.positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
            }`}
          >
            {trend.positive ? "▲" : "▼"} {trend.value}
          </span>
        )}
      </div>
      {subLabel && <p className="text-xs text-gray-400">{subLabel}</p>}
    </Card>
  );
}
