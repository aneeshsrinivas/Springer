// ============================================================
// components/templates/DashboardTemplate.tsx
// "use client" — owns all interactive state (year, threshold)
// Passes derived data down to organism components
// ============================================================

"use client";

import { useState, useMemo } from "react";

import DashboardHeader from "@/components/organisms/DashboardHeader";
import SalesOverview   from "@/components/organisms/SalesOverview";
import SalesChart      from "@/components/organisms/SalesChart";
import SalesTable      from "@/components/organisms/SalesTable";
import SalesSummary    from "@/components/organisms/SalesSummary";
import YearSelector    from "@/components/molecules/YearSelector";
import FilterInput     from "@/components/molecules/FilterInput";

import {
  getFilteredRecords,
  getMonthlySales,
  getSalesByCategory,
  getYearSummary,
  getYearOverYearGrowth,
} from "@/lib/sales-utils";

import type { SalesRecord, Year } from "@/types/sales";

interface DashboardTemplateProps {
  allRecords: SalesRecord[];
}

const ALL_YEARS: Year[] = [2022, 2023, 2024];

export default function DashboardTemplate({ allRecords }: DashboardTemplateProps) {
  const [selectedYear, setSelectedYear] = useState<Year>(2024);
  const [threshold,    setThreshold]    = useState<number>(0);

  // Filtered records respect both year + threshold
  const filteredRecords = useMemo(
    () => getFilteredRecords(allRecords, selectedYear, threshold),
    [allRecords, selectedYear, threshold],
  );

  // Monthly aggregation for bar/line charts and table
  const monthlyData = useMemo(() => getMonthlySales(filteredRecords), [filteredRecords]);

  // Category aggregation for pie chart
  const categoryData = useMemo(() => getSalesByCategory(filteredRecords), [filteredRecords]);

  // Summary card data — based on *filtered* records
  const summary = useMemo(() => {
    // Build a fake YearSummary from filtered data directly
    const totalSales      = filteredRecords.reduce((s, r) => s + r.sales, 0);
    const totalProfit     = filteredRecords.reduce((s, r) => s + r.profit, 0);
    const totalQuantity   = filteredRecords.reduce((s, r) => s + r.quantity, 0);
    const monthly         = getMonthlySales(filteredRecords);
    const nonZero         = monthly.filter((m) => m.sales > 0);
    const avgMonthlySales = nonZero.length > 0
      ? Math.round(totalSales / nonZero.length)
      : 0;
    return { year: selectedYear, totalSales, totalProfit, totalQuantity, avgMonthlySales };
  }, [filteredRecords, selectedYear]);

  // Year-over-year data — always uses unfiltered records for fair comparison
  const allYearSummaries = useMemo(
    () => ALL_YEARS.map((y) => getYearSummary(allRecords, y)),
    [allRecords],
  );

  const growthData = useMemo(
    () => getYearOverYearGrowth(allRecords, ALL_YEARS),
    [allRecords],
  );

  const currentGrowth = growthData.find((g) => g.year === selectedYear);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <DashboardHeader />

        {/* Filter bar */}
        <section
          aria-label="Filters"
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
        >
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end flex-wrap">
            <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
            <FilterInput threshold={threshold} onThresholdChange={setThreshold} />
          </div>
        </section>

        {/* Summary cards */}
        <SalesOverview
          summary={summary}
          growth={currentGrowth}
          selectedYear={selectedYear}
        />

        {/* Main chart */}
        <SalesChart
          monthlyData={monthlyData}
          categoryData={categoryData}
          year={selectedYear}
          threshold={threshold}
        />

        {/* Year-over-year comparison */}
        <SalesSummary summaries={allYearSummaries} growthData={growthData} />

        {/* Monthly data table */}
        <SalesTable data={monthlyData} year={selectedYear} />

      </div>
    </div>
  );
}
