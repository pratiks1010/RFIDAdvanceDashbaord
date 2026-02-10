import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GlobalLoader } from '@/components/ui/GlobalLoader'
import { AuthPageTransition } from '@/components/auth/AuthPageTransition'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PublicOnlyRoute } from '@/components/auth/PublicOnlyRoute'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Dashboard } from '@/pages/Dashboard'

function App() {
  return (
    <>
      <GlobalLoader />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <PublicOnlyRoute>
                <AuthPageTransition />
              </PublicOnlyRoute>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
