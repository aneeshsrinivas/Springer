// ============================================================
// types/sales.ts
// Core TypeScript types for the Sales Analytics Dashboard
// ============================================================

export type Year = 2022 | 2023 | 2024;

export type ChartType = "bar" | "line" | "pie";

export type Region = "North" | "South" | "East" | "West";

export type Category = "Technology" | "Furniture" | "Office Supplies";

export type MonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export interface SalesRecord {
  id: number;
  date: string;       // ISO date string e.g. "2024-01-15"
  year: Year;
  month: MonthName;
  category: Category;
  subCategory: string;
  region: Region;
  segment: string;
  sales: number;      // in INR
  quantity: number;
  discount: number;   // 0.0 – 1.0
  profit: number;     // in INR
}

export interface MonthlySales {
  month: MonthName;
  sales: number;
  profit: number;
  quantity: number;
}

export interface CategorySales {
  category: Category;
  sales: number;
  profit: number;
  quantity: number;
}

export interface YearSummary {
  year: Year;
  totalSales: number;
  totalProfit: number;
  totalQuantity: number;
  avgMonthlySales: number;
}

export interface YearOverYearGrowth {
  year: Year;
  growth: number | null; // null for the first year (no prior year)
}
