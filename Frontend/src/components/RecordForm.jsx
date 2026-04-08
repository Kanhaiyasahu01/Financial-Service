import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { createRecord } from '../features/records/recordsSlice'
import { fetchDashboardSummary } from '../features/dashboard/dashboardSlice'

const initialState = {
  amount: '',
  type: 'income',
  category: '',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
}

export function RecordForm() {
  const dispatch = useAppDispatch()
  const { creating } = useAppSelector((state) => state.records)
  const [form, setForm] = useState(initialState)

  const onSubmit = async (event) => {
    event.preventDefault()
    const action = await dispatch(createRecord({ ...form, amount: Number(form.amount) }))

    if (createRecord.fulfilled.match(action)) {
      setForm(initialState)
      dispatch(fetchDashboardSummary())
      toast.success('Record created successfully')
    } else {
      toast.error(action.payload || 'Failed to create record')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-teal-500'

  return (
    <form className="glass reveal rounded-2xl p-4" onSubmit={onSubmit}>
      <h3 className="text-lg font-semibold">Add Financial Record</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <input
          className={inputClass}
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
          required
        />
        <select
          className={inputClass}
          value={form.type}
          onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          className={inputClass}
          placeholder="Category"
          value={form.category}
          onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
          required
        />
        <input
          className={inputClass}
          type="date"
          value={form.date}
          onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
          required
        />
      </div>
      <textarea
        className={`${inputClass} mt-3 min-h-20`}
        placeholder="Notes"
        value={form.notes}
        onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
      />
      <button
        className="mt-3 rounded-xl bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700 disabled:opacity-60"
        disabled={creating}
        type="submit"
      >
        {creating ? 'Saving...' : 'Create Record'}
      </button>
    </form>
  )
}
