// ============================================================
// components/organisms/SalesTable.tsx
// Server Component — monthly data table with responsive scroll
// ============================================================

import Card from "@/components/atoms/Card";
import { formatINR, formatNumber } from "@/lib/sales-utils";
import type { MonthlySales } from "@/types/sales";

interface SalesTableProps {
  data: MonthlySales[];
  year: number;
}

export default function SalesTable({ data, year }: SalesTableProps) {
  const hasData = data.some((d) => d.sales > 0);

  return (
    <Card padding="sm" className="overflow-hidden">
      <div className="px-2 pt-2 pb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">
          Monthly Sales Data — {year}
        </h2>
      </div>

      {/* Responsive horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label={`Monthly sales data for ${year}`}>
          <thead>
            <tr className="border-t border-gray-100">
              <th className="text-left py-3 px-3 font-medium text-gray-500 bg-gray-50">Month</th>
              <th className="text-right py-3 px-3 font-medium text-gray-500 bg-gray-50">Sales</th>
              <th className="text-right py-3 px-3 font-medium text-gray-500 bg-gray-50">Profit</th>
              <th className="text-right py-3 px-3 font-medium text-gray-500 bg-gray-50">Quantity</th>
              <th className="text-right py-3 px-3 font-medium text-gray-500 bg-gray-50">Margin</th>
            </tr>
          </thead>
          <tbody>
            {!hasData ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No sales records match your current filter.
                </td>
              </tr>
            ) : (
              data.map((row, idx) => {
                const margin = row.sales > 0
                  ? ((row.profit / row.sales) * 100).toFixed(1) + "%"
                  : "—";
                return (
                  <tr
                    key={row.month}
                    className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${
                      idx % 2 === 0 ? "" : "bg-gray-50/50"
                    } ${row.sales === 0 ? "opacity-40" : ""}`}
                  >
                    <td className="py-3 px-3 font-medium text-gray-700">{row.month}</td>
                    <td className="py-3 px-3 text-right text-gray-900 tabular-nums">
                      {row.sales > 0 ? formatINR(row.sales) : "—"}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      <span className={row.profit >= 0 ? "text-green-700" : "text-red-600"}>
                        {row.profit > 0 ? formatINR(row.profit) : "—"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-gray-700 tabular-nums">
                      {row.quantity > 0 ? formatNumber(row.quantity) : "—"}
                    </td>
                    <td className="py-3 px-3 text-right text-gray-500 tabular-nums">{margin}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
