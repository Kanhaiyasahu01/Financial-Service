import { TableSkeleton } from './LoadingSkeletons'

export function RecordsTable({ records, loading }) {
  return (
    <div className="glass reveal rounded-2xl p-4">
      <h3 className="text-lg font-semibold">Recent Records</h3>
      {loading ? (
        <div className="mt-3">
          <TableSkeleton rows={7} />
        </div>
      ) : (
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="pb-2">Date</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td className="py-3 text-slate-500" colSpan={5}>
                  No records found.
                </td>
              </tr>
            )}
            {records.map((record) => (
              <tr className="border-b border-slate-100" key={record._id}>
                <td className="py-2">{new Date(record.date).toLocaleDateString()}</td>
                <td className="py-2">{record.category}</td>
                <td className="py-2 capitalize">{record.type}</td>
                <td className="mono py-2">
                  <span className={record.type === 'income' ? 'text-emerald-700' : 'text-rose-600'}>
                    ₹ {Number(record.amount).toFixed(2)}
                  </span>
                </td>
                <td className="max-w-52 truncate py-2">{record.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  )
}
