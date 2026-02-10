import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

/**
 * For login/register: redirect to dashboard if user is already authenticated.
 */
export function PublicOnlyRoute({ children }) {
  const location = useLocation()
  const { token } = useAuth()

  if (token) {
    const from = (location.state?.from?.pathname) || '/'
    return <Navigate to={from} replace state={{ from: location }} />
  }

  return children
}
