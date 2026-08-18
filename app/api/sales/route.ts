// ============================================================
// app/api/sales/route.ts
// Optional API route — returns sales data as JSON
// Supports: /api/sales, /api/sales?year=2024
// This makes it easy to replace local data with a real DB later
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getAllSalesData } from "@/data/sales";
import type { Year } from "@/types/sales";

const VALID_YEARS: Year[] = [2022, 2023, 2024];

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");

  let records = getAllSalesData();

  if (yearParam) {
    const year = parseInt(yearParam, 10) as Year;
    if (!VALID_YEARS.includes(year)) {
      return NextResponse.json(
        { error: `Invalid year. Must be one of: ${VALID_YEARS.join(", ")}` },
        { status: 400 },
      );
    }
    records = records.filter((r) => r.year === year);
  }

  return NextResponse.json(records);
}
