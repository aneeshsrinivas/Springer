// ============================================================
// components/atoms/Button.tsx
// Smallest reusable button — supports variants, sizes, active state
// ============================================================

import React from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isActive?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:   "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400",
  outline:   "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
  ghost:     "text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant   = "secondary",
  size      = "md",
  isActive  = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const activeClass = isActive
    ? "!bg-blue-600 !text-white !border-blue-600 hover:!bg-blue-700"
    : "";

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${activeClass}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
