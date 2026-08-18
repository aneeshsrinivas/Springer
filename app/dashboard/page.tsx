// ============================================================
// app/dashboard/page.tsx
// Server Component — fetches data, passes to DashboardTemplate
// No business logic lives here; this page is purely a shell.
// ============================================================

import DashboardTemplate from "@/components/templates/DashboardTemplate";
import { getSalesData }  from "@/lib/sales-service";

export const metadata = {
  title: "Sales Analytics Dashboard",
  description:
    "Interactive sales analytics dashboard showing 2022–2024 performance data by year, category, and region.",
};

export default function DashboardPage() {
  // getSalesData() returns local mock data.
  // To switch to an API: const records = await fetch("/api/sales").then(r => r.json())
  const allRecords = getSalesData();

  return <DashboardTemplate allRecords={allRecords} />;
}
