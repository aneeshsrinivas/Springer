// ============================================================
// lib/sales-service.ts
// Data-access abstraction layer.
// Currently wraps local mock data.
// To switch to a real API:
//   Replace getAllSalesData() with: await fetch("/api/sales")
// ============================================================

import { getAllSalesData } from "@/data/sales";
import type { SalesRecord } from "@/types/sales";

/**
 * Returns all sales records.
 *
 * Future API replacement:
 *   const res = await fetch(`/api/sales`);
 *   return res.json() as SalesRecord[];
 */
export function getSalesData(): SalesRecord[] {
  return getAllSalesData();
}
