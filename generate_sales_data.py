"""
generate_sales_data.py
Reads the Kaggle Superstore Dataset (2014-2024),
filters for years 2022-2024, and generates the TypeScript data file.

Usage:
    python generate_sales_data.py
"""

import pandas as pd
import json

EXCEL_PATH = r"C:\Users\anees\.cache\kagglehub\datasets\mananapatel99\superstore-dataset-2014-2024\versions\1\Superstore Dataset.xlsx"
OUTPUT_PATH = r"c:\Users\anees\OneDrive\Desktop\Springer\sales-dashboard\data\sales.ts"

MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

USD_TO_INR = 83.0

print("Reading Excel file...")
df = pd.read_excel(EXCEL_PATH, engine="openpyxl")

print(f"Total rows: {len(df)}")
print(f"Columns: {list(df.columns)}")

# Filter for 2022-2024
df = df[df["Order Date"].dt.year.isin([2022, 2023, 2024])].copy()
print(f"Rows for 2022-2024: {len(df)}")

# Add helper columns
df["year"]  = df["Order Date"].dt.year
df["month"] = df["Order Date"].dt.month.apply(lambda m: MONTH_NAMES[m - 1])

# Convert USD -> INR
df["sales_inr"]  = (df["Sales"]  * USD_TO_INR).round(0).astype(int)
df["profit_inr"] = (df["Profit"] * USD_TO_INR).round(0).astype(int)

# Map Kaggle regions (Central -> North to match the 4-region type model)
REGION_MAP = {
    "Central": "North",
    "East":    "East",
    "South":   "South",
    "West":    "West",
}
df["region_mapped"] = df["Region"].map(REGION_MAP).fillna("North")

# Build records using explicit column names
records = []
for i, (_, row) in enumerate(df.iterrows(), start=1):
    date_str = row["Order Date"].strftime("%Y-%m-%d")
    record = {
        "id":          i,
        "date":        date_str,
        "year":        int(row["year"]),
        "month":       row["month"],
        "category":    row["Category"],
        "subCategory": row["Sub-Category"],
        "region":      row["region_mapped"],
        "segment":     row["Segment"],
        "sales":       int(row["sales_inr"]),
        "quantity":    int(row["Quantity"]),
        "discount":    round(float(row["Discount"]), 2),
        "profit":      int(row["profit_inr"]),
    }
    records.append(record)

print(f"Generated {len(records)} records")

# Summary
by_year = {}
for r in records:
    by_year.setdefault(r["year"], {"sales": 0, "count": 0})
    by_year[r["year"]]["sales"] += r["sales"]
    by_year[r["year"]]["count"] += 1
for y, d in sorted(by_year.items()):
    print(f"  {y}: {d['count']} records, total sales INR {d['sales']:,}")

# Write TypeScript file
records_json = json.dumps(records, indent=2)

ts_content = f"""// ============================================================
// data/sales.ts
// REAL DATA from the Kaggle Superstore Dataset (2014-2024)
// Source: https://www.kaggle.com/datasets/mananapatel99/superstore-dataset-2014-2024
// Records filtered to 2022-2024. Sales/Profit converted from USD to INR
// at an approximate rate of 1 USD = 83 INR (illustrative, not live rate).
// Region "Central" is mapped to "North" to match the 4-region type model.
// Total records: {len(records)}
//
// Note: "as SalesRecord[]" is intentional — large inline arrays trigger
// TS2590 ("union type too complex") if TypeScript tries to infer all
// literal types from 11,000+ records. The assertion is safe here.
// ============================================================

import type {{ SalesRecord }} from "@/types/sales";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const salesData: SalesRecord[] = ({records_json} as any[]) as SalesRecord[];

export default salesData;

export function getAllSalesData(): SalesRecord[] {{
  return salesData;
}}
"""

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"\nWrote TypeScript file: {OUTPUT_PATH}")
print("Done.")
