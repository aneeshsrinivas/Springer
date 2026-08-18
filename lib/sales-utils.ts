// ============================================================
// lib/sales-utils.ts
// Pure utility functions for filtering and aggregating sales data.
// All business logic lives here — never inside JSX components.
// ============================================================

import type {
  SalesRecord,
  Year,
  MonthlySales,
  CategorySales,
  MonthName,
  YearSummary,
  YearOverYearGrowth,
} from "@/types/sales";

const MONTH_ORDER: MonthName[] = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

/** All records for a given year */
export function getSalesByYear(records: SalesRecord[], year: Year): SalesRecord[] {
  return records.filter((r) => r.year === year);
}

/** Records for a year where individual record sales >= threshold */
export function getFilteredRecords(
  records: SalesRecord[],
  year: Year,
  threshold: number,
): SalesRecord[] {
  return records.filter((r) => r.year === year && r.sales >= threshold);
}

// ---------------------------------------------------------------------------
// Aggregation
// ---------------------------------------------------------------------------

/** Monthly totals ordered January → December */
export function getMonthlySales(records: SalesRecord[]): MonthlySales[] {
  const map = new Map<MonthName, { sales: number; profit: number; quantity: number }>();
  MONTH_ORDER.forEach((m) => map.set(m, { sales: 0, profit: 0, quantity: 0 }));

  for (const r of records) {
    const c = map.get(r.month)!;
    map.set(r.month, {
      sales:    c.sales    + r.sales,
      profit:   c.profit   + r.profit,
      quantity: c.quantity + r.quantity,
    });
  }

  return MONTH_ORDER.map((month) => ({ month, ...map.get(month)! }));
}

export function getTotalSales(records: SalesRecord[]): number {
  return records.reduce((s, r) => s + r.sales, 0);
}

export function getTotalProfit(records: SalesRecord[]): number {
  return records.reduce((s, r) => s + r.profit, 0);
}

export function getTotalQuantity(records: SalesRecord[]): number {
  return records.reduce((s, r) => s + r.quantity, 0);
}

export function getAverageMonthlySales(records: SalesRecord[]): number {
  const monthly  = getMonthlySales(records);
  const nonZero  = monthly.filter((m) => m.sales > 0);
  if (nonZero.length === 0) return 0;
  const total = nonZero.reduce((s, m) => s + m.sales, 0);
  return Math.round(total / nonZero.length);
}

export function getSalesByCategory(records: SalesRecord[]): CategorySales[] {
  const map = new Map<string, CategorySales>();
  for (const r of records) {
    const e = map.get(r.category);
    if (e) {
      e.sales    += r.sales;
      e.profit   += r.profit;
      e.quantity += r.quantity;
    } else {
      map.set(r.category, {
        category: r.category,
        sales:    r.sales,
        profit:   r.profit,
        quantity: r.quantity,
      });
    }
  }
  return Array.from(map.values());
}

export function getYearSummary(records: SalesRecord[], year: Year): YearSummary {
  const yr = getSalesByYear(records, year);
  return {
    year,
    totalSales:       getTotalSales(yr),
    totalProfit:      getTotalProfit(yr),
    totalQuantity:    getTotalQuantity(yr),
    avgMonthlySales:  getAverageMonthlySales(yr),
  };
}

export function getYearOverYearGrowth(
  records: SalesRecord[],
  years: Year[],
): YearOverYearGrowth[] {
  const sorted    = [...years].sort() as Year[];
  const summaries = sorted.map((y) => getYearSummary(records, y));

  return summaries.map((s, i): YearOverYearGrowth => {
    if (i === 0) return { year: s.year, growth: null };
    const prev = summaries[i - 1];
    if (prev.totalSales === 0) return { year: s.year, growth: null };
    const pct = ((s.totalSales - prev.totalSales) / prev.totalSales) * 100;
    return { year: s.year, growth: Math.round(pct * 10) / 10 };
  });
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrCompactFormatter = new Intl.NumberFormat("en-IN", {
  style:           "currency",
  currency:        "INR",
  notation:        "compact",
  compactDisplay:  "short",
  maximumFractionDigits: 2,
});

export function formatINR(value: number): string {
  return inrFormatter.format(value);
}

export function formatINRCompact(value: number): string {
  return inrCompactFormatter.format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function abbreviateMonth(month: MonthName): string {
  return month.slice(0, 3);
}
