import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { RecordForm } from '../components/RecordForm'
import { RecordsTable } from '../components/RecordsTable'
import { fetchRecords } from '../features/records/recordsSlice'

const defaultFilters = {
  page: 1,
  limit: 10,
  type: '',
  category: '',
  startDate: '',
  endDate: '',
  search: '',
}

export function RecordsPage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { list, loading, error, pagination } = useAppSelector((state) => state.records)
  const [searchParams, setSearchParams] = useSearchParams()

  const initial = useMemo(() => {
    const parsed = { ...defaultFilters }
    for (const key of Object.keys(defaultFilters)) {
      const value = searchParams.get(key)
      if (value) {
        parsed[key] = key === 'page' || key === 'limit' ? Number(value) : value
      }
    }
    return parsed
  }, [searchParams])

  const [filters, setFilters] = useState(initial)

  useEffect(() => {
    dispatch(fetchRecords(initial))
  }, [dispatch, initial])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const onFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const onApplyFilters = () => {
    const normalized = { ...filters, page: 1 }
    const params = {}

    Object.entries(normalized).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        params[key] = String(value)
      }
    })

    setSearchParams(params)
    dispatch(fetchRecords(normalized))
    toast.success('Filters applied')
  }

  const onResetFilters = () => {
    setFilters(defaultFilters)
    setSearchParams({ page: '1', limit: '10' })
    dispatch(fetchRecords(defaultFilters))
    toast.success('Filters reset')
  }

  const onNextPage = () => {
    if (!pagination || pagination.page >= pagination.pages) {
      return
    }
    const next = { ...filters, page: pagination.page + 1 }
    setFilters(next)
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: String(next.page) })
    dispatch(fetchRecords(next))
  }

  const onPrevPage = () => {
    if (!pagination || pagination.page <= 1) {
      return
    }
    const prev = { ...filters, page: pagination.page - 1 }
    setFilters(prev)
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: String(prev.page) })
    dispatch(fetchRecords(prev))
  }

  const inputClass = 'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none'

  return (
    <section className="space-y-4">
      <div className="glass reveal rounded-2xl p-4">
        <h2 className="text-lg font-semibold">Record Filters</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-6">
          <select
            className={inputClass}
            value={filters.type}
            onChange={(event) => onFilterChange('type', event.target.value)}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            className={inputClass}
            placeholder="Category"
            value={filters.category}
            onChange={(event) => onFilterChange('category', event.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Search in notes"
            value={filters.search}
            onChange={(event) => onFilterChange('search', event.target.value)}
          />
          <input
            className={inputClass}
            type="date"
            value={filters.startDate}
            onChange={(event) => onFilterChange('startDate', event.target.value)}
          />
          <input
            className={inputClass}
            type="date"
            value={filters.endDate}
            onChange={(event) => onFilterChange('endDate', event.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white"
              onClick={onApplyFilters}
              type="button"
            >
              Apply
            </button>
            <button
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              onClick={onResetFilters}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RecordsTable records={list} loading={loading} />
          <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
            <p>
              Page {pagination?.page || 1} of {pagination?.pages || 1}
            </p>
            <div className="flex gap-2">
              <button
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-50"
                disabled={!pagination || pagination.page <= 1}
                onClick={onPrevPage}
                type="button"
              >
                Previous
              </button>
              <button
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-50"
                disabled={!pagination || pagination.page >= pagination.pages}
                onClick={onNextPage}
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="xl:col-span-2">{user.role === 'admin' && <RecordForm />}</div>
      </div>
    </section>
  )
}
