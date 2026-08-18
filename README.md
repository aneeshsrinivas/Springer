# Sales Analytics Dashboard

A production-quality, responsive Sales Analytics Dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Recharts** — demonstrating real-world frontend architecture, Atomic Design principles, and interactive data visualization.

---

## Live Demo

Run locally at [http://localhost:3000](http://localhost:3000)

---

## Features

| Feature | Description |
|---|---|
| Year Filtering | Toggle between 2022, 2023, and 2024 data |
| Sales Threshold | Filter records where sales >= minimum value |
| Bar Chart | Monthly sales & profit as grouped bars |
| Line Chart | Monthly sales trend visualization |
| Pie / Donut Chart | Category-level sales distribution |
| Chart Switching | Toggle between Bar / Line / Pie in one click |
| Summary Cards | Total Sales, Profit, Quantity, Avg Monthly Sales |
| Year-over-Year | Growth % comparison across all three years |
| Monthly Table | Full monthly data table with margin column |
| Responsive UI | Desktop, tablet, and mobile layouts |
| Accessible | Semantic HTML, keyboard nav, ARIA attributes |
| API Route | `/api/sales?year=2024` endpoint included |

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15 | App Router, Server + Client Components |
| **React** | 19 | UI component library |
| **TypeScript** | 5+ | Static typing throughout |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Recharts** | 2+ | Bar, Line, Pie chart components |
| **ESLint** | 9 | Code linting |
| **npm** | — | Package management |

---

## Dataset

> **Dataset Source:** [Kaggle Superstore Dataset 2014-2024](https://www.kaggle.com/datasets/mananapatel99/superstore-dataset-2014-2024)
>
> **Disclosure:** The dashboard uses **mock data modeled after the Kaggle Superstore dataset structure**. The field names (`sales`, `profit`, `quantity`, `category`, `region`, etc.) and data shape match the Kaggle dataset. However, the actual numeric values are **deterministic approximations created for this project** — they are NOT directly extracted Kaggle records. This is clearly documented here and in the code (`data/sales.ts`).
>
> The mock data is:
> - Internally consistent (profit is always a realistic fraction of sales)
> - Seasonally realistic (Q4 spike, slow Q1)
> - Showing genuine year-over-year growth (2022 < 2023 < 2024)
> - Stable across reloads (no `Math.random()`)

---

## Architecture

### App Router Structure

```
app/
├── layout.tsx          <- Root layout (font, metadata)
├── page.tsx            <- Redirects to /dashboard
├── globals.css
├── dashboard/
│   └── page.tsx        <- Server Component: loads data, renders DashboardTemplate
└── api/
    └── sales/
        └── route.ts    <- Optional API: GET /api/sales?year=2024
```

### Atomic Design

Components are organized following Brad Frost's Atomic Design methodology:

```
components/
├── atoms/              <- Smallest reusable elements (no business logic)
│   ├── Button.tsx      <- Styled button with variant + active state
│   ├── Card.tsx        <- Card container
│   ├── Input.tsx       <- Labeled input with validation display
│   └── Badge.tsx       <- Small label pill
│
├── molecules/          <- Combinations of atoms
│   ├── YearSelector.tsx       <- Year toggle buttons
│   ├── ChartTypeSelector.tsx  <- Bar/Line/Pie toggle
│   ├── FilterInput.tsx        <- Threshold input with validation
│   └── StatCard.tsx           <- Metric display card
│
├── organisms/          <- Independent, self-contained sections
│   ├── DashboardHeader.tsx    <- Title + description
│   ├── SalesOverview.tsx      <- 4 summary stat cards
│   ├── SalesChart.tsx         <- Chart area + switcher
│   ├── SalesSummary.tsx       <- Year-over-year comparison
│   └── SalesTable.tsx         <- Monthly data table
│
├── templates/          <- Page-level layout + state management
│   └── DashboardTemplate.tsx  <- Owns year/threshold state, passes data down
│
└── charts/             <- Individual Recharts implementations
    ├── SalesBarChart.tsx
    ├── SalesLineChart.tsx
    └── SalesPieChart.tsx
```

### Data Flow

```
data/sales.ts          (mock data source)
      |
lib/sales-service.ts   (data access abstraction)
      |
app/dashboard/page.tsx (Server Component — passes all records as prop)
      |
DashboardTemplate.tsx  ("use client" — owns year + threshold state)
      |  useMemo() transforms:
      ├── getMonthlySales()       -> SalesChart (Bar/Line) + SalesTable
      ├── getSalesByCategory()    -> SalesChart (Pie)
      ├── getYearSummary()        -> SalesOverview (stat cards)
      └── getYearOverYearGrowth() -> SalesSummary
```

---

## Project Structure

```
sales-dashboard/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── dashboard/
│   │   └── page.tsx
│   └── api/
│       └── sales/
│           └── route.ts
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Badge.tsx
│   ├── molecules/
│   │   ├── YearSelector.tsx
│   │   ├── ChartTypeSelector.tsx
│   │   ├── FilterInput.tsx
│   │   └── StatCard.tsx
│   ├── organisms/
│   │   ├── DashboardHeader.tsx
│   │   ├── SalesOverview.tsx
│   │   ├── SalesChart.tsx
│   │   ├── SalesSummary.tsx
│   │   └── SalesTable.tsx
│   ├── templates/
│   │   └── DashboardTemplate.tsx
│   └── charts/
│       ├── SalesBarChart.tsx
│       ├── SalesLineChart.tsx
│       └── SalesPieChart.tsx
├── data/
│   └── sales.ts          <- Mock dataset
├── lib/
│   ├── sales-utils.ts    <- Pure data transformation functions
│   └── sales-service.ts  <- Data access layer (swap here for API)
├── types/
│   └── sales.ts          <- TypeScript interfaces and types
├── public/
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

---

## Installation

```bash
# 1. Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd sales-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build production bundle
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## How It Works

### Year Filter
- `DashboardTemplate` holds `selectedYear` in `useState`.
- Clicking a year button updates state -> `getFilteredRecords()` recomputes -> all charts and cards re-render with new data.

### Threshold Filter
- `FilterInput` validates the input and calls `onThresholdChange(value)`.
- `getFilteredRecords(allRecords, year, threshold)` returns only records where `r.sales >= threshold`.
- If no records match, charts show an empty-state message.

### Chart Switching
- `SalesChart` organism owns a `chartType` state.
- `ChartTypeSelector` updates it -> the correct Recharts component (`SalesBarChart`, `SalesLineChart`, or `SalesPieChart`) is rendered.
- Each chart is a **separate reusable component** — not one large switch statement.

### Data Transformation
All transformations happen in `lib/sales-utils.ts`:
- `getMonthlySales()` aggregates records -> `[{ month, sales, profit, quantity }]`
- `getSalesByCategory()` groups by category -> powers the pie chart
- `getYearOverYearGrowth()` computes % growth between consecutive years

### Replacing Mock Data with a Real API
`lib/sales-service.ts` is the swap point:

```typescript
// Current (local data):
export function getSalesData(): SalesRecord[] {
  return getAllSalesData();
}

// Future (real API):
export async function getSalesData(): Promise<SalesRecord[]> {
  const res = await fetch("/api/sales");
  return res.json();
}
```

No component code changes needed — only the service function.

---

## Future Improvements

- Real API integration (replace mock data with a database)
- PostgreSQL + Prisma ORM for persistent storage
- Authentication (NextAuth.js)
- CSV / Excel export
- Date-range picker (instead of year-only)
- Region filter
- Scatter plot / area chart options
- Dark mode toggle
- Unit tests (Vitest + Testing Library)
- Server-side filtering via API query params

---

## Git Setup

```bash
git init
git add .
git commit -m "Initial commit: Sales Analytics Dashboard"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

---

## License

MIT — free for personal and commercial use.
