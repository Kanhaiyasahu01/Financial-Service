import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const COLORS = ['#14b8a6', '#0ea5e9', '#f59e0b', '#ef4444', '#8b5cf6']

export function ChartsPanel({ summary }) {
  const trendData = summary?.monthlyTrends?.map((item) => ({
    name: `${item.month}/${String(item.year).slice(2)}`,
    type: item.type,
    total: item.total,
  }))

  const categoryData = summary?.categoryTotals?.slice(0, 8)?.map((item) => ({
    name: `${item.category} (${item.type})`,
    total: item.total,
  }))

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass reveal-delay h-80 rounded-2xl p-4">
        <h3 className="mb-3 text-lg font-semibold">Monthly Trends</h3>
        <ResponsiveContainer width="100%" height="88%">
          <BarChart data={trendData || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1dbe0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" name="Amount">
              {(trendData || []).map((_, index) => (
                <Cell key={`trend-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass reveal-delay h-80 rounded-2xl p-4">
        <h3 className="mb-3 text-lg font-semibold">Category Totals</h3>
        <ResponsiveContainer width="100%" height="88%">
          <BarChart data={categoryData || []} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1dbe0" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={120} />
            <Tooltip />
            <Bar dataKey="total" name="Amount" radius={[0, 8, 8, 0]}>
              {(categoryData || []).map((_, index) => (
                <Cell key={`category-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
