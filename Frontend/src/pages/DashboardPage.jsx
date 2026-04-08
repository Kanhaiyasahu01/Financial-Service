import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { ChartsPanel } from '../components/ChartsPanel'
import { ChartSkeleton, SummarySkeleton } from '../components/LoadingSkeletons'
import { SummaryCards } from '../components/SummaryCards'
import { fetchDashboardSummary } from '../features/dashboard/dashboardSlice'

export function DashboardPage() {
  const dispatch = useAppDispatch()
  const { summary, loading, error } = useAppSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(fetchDashboardSummary())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <section className="space-y-4">
      {loading ? (
        <>
          <SummarySkeleton />
          <ChartSkeleton />
        </>
      ) : (
        <>
          <SummaryCards totals={summary?.totals} />
          <ChartsPanel summary={summary} />
        </>
      )}
    </section>
  )
}
