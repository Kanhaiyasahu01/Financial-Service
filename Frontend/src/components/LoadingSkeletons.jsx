export function SummarySkeleton() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="glass h-24 animate-pulse rounded-2xl bg-slate-100/60"
          key={`summary-skeleton-${index}`}
        />
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          className="glass h-80 animate-pulse rounded-2xl bg-slate-100/60"
          key={`chart-skeleton-${index}`}
        />
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 6 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          className="h-8 w-full animate-pulse rounded-lg bg-slate-100/70"
          key={`row-skeleton-${index}`}
        />
      ))}
    </div>
  )
}
