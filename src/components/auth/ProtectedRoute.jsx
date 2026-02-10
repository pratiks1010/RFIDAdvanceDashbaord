import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

/**
 * Protects routes that require authentication.
 * Redirects to /login if no token, preserving intended path in state.
 */
export function ProtectedRoute({ children }) {
  const location = useLocation()
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
