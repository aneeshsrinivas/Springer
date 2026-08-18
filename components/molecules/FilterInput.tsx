// ============================================================
// components/molecules/FilterInput.tsx
// "use client" — minimum sales threshold input with validation
// ============================================================

"use client";

import { useState, useCallback } from "react";
import Input from "@/components/atoms/Input";

interface FilterInputProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
}

export default function FilterInput({ threshold, onThresholdChange }: FilterInputProps) {
  const [rawValue, setRawValue] = useState<string>(String(threshold));
  const [error, setError]       = useState<string>("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setRawValue(val);

      if (val === "" || val === "0") {
        setError("");
        onThresholdChange(0);
        return;
      }

      const num = Number(val);
      if (isNaN(num)) {
        setError("Please enter a valid number");
        return;
      }
      if (num < 0) {
        setError("Threshold cannot be negative");
        return;
      }

      setError("");
      onThresholdChange(Math.round(num));
    },
    [onThresholdChange],
  );

  return (
    <Input
      id="sales-threshold"
      label="Minimum Sales (₹)"
      type="number"
      min={0}
      step={1000}
      value={rawValue}
      onChange={handleChange}
      placeholder="e.g. 50000"
      error={error}
      helperText={`Showing sales >= ₹${threshold}`}
      className="w-44"
    />
  );
}
