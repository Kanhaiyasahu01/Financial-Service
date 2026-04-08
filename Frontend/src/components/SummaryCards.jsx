function StatCard({ label, value, tone }) {
  const toneClass = {
    income: 'from-emerald-100 to-emerald-50 text-emerald-700',
    expense: 'from-rose-100 to-rose-50 text-rose-700',
    net: 'from-sky-100 to-cyan-50 text-sky-800',
  }[tone]

  return (
    <div className={`reveal glass rounded-2xl bg-gradient-to-br p-4 ${toneClass}`}>
      <p className="text-sm font-medium uppercase tracking-wide">{label}</p>
      <p className="mono mt-2 text-2xl font-semibold">₹ {Number(value || 0).toFixed(2)}</p>
    </div>
  )
}

export function SummaryCards({ totals }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <StatCard label="Total Income" value={totals?.income} tone="income" />
      <StatCard label="Total Expense" value={totals?.expenses} tone="expense" />
      <StatCard label="Net Balance" value={totals?.netBalance} tone="net" />
    </div>
  )
}
