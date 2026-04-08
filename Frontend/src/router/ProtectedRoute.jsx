import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

export function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation()
  const { user } = useAppSelector((state) => state.auth)

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
