// ============================================================
// components/organisms/DashboardHeader.tsx
// Server Component — static header section
// ============================================================

import Badge from "@/components/atoms/Badge";

export default function DashboardHeader() {
  return (
    <header className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Sales Analytics Dashboard
        </h1>
        <Badge color="blue">2022 – 2024</Badge>
      </div>
      <p className="text-sm text-gray-500 max-w-2xl">
        Monitor yearly sales performance across regions and product categories.
        Data is modeled after the{" "}
        <a
          href="https://www.kaggle.com/datasets/mananapatel99/superstore-dataset-2014-2024"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Kaggle Superstore dataset
        </a>{" "}
        structure (mock values — see README for disclosure).
      </p>
    </header>
  );
}
