// ============================================================
// components/atoms/Input.tsx
// Reusable controlled input with label, helper text, error state
// ============================================================

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
}

export default function Input({ label, id, error, helperText, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className={`
          w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-lg
          transition-colors duration-150 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-50 disabled:text-gray-400
          ${error ? "border-red-400" : "border-gray-300"}
          ${className}
        `.trim()}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        {...props}
      />
      {!error && helperText && (
        <p id={`${id}-helper`} className="text-xs text-gray-500">{helperText}</p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
