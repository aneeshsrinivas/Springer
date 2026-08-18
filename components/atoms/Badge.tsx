// ============================================================
// components/atoms/Badge.tsx
// Small label badge for categories / status indicators
// ============================================================

import React from "react";

type BadgeColor = "blue" | "green" | "amber" | "purple" | "gray";

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
}

const colorMap: Record<BadgeColor, string> = {
  blue:   "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  green:  "bg-green-50 text-green-700 ring-1 ring-green-200",
  amber:  "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  purple: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  gray:   "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
};

export default function Badge({ children, color = "gray" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorMap[color]}`}>
      {children}
    </span>
  );
}
