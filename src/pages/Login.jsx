import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { authLogin } from '@/api/auth'

export function Login() {
  const navigate = useNavigate()
  const [loginName, setLoginName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!loginName.trim() || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)
    try {
      const res = await authLogin({ LoginName: loginName.trim(), Password: password })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        // Store token or user if API returns it
        if (data?.token) localStorage.setItem('auth_token', data.token)
        if (data?.user) localStorage.setItem('auth_user', JSON.stringify(data.user))
        navigate('/')
        return
      }
      setError(data?.message || data?.error || `Login failed (${res.status}). Please try again.`)
    } catch (err) {
      setError(err?.message || 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page flex flex-col relative h-dvh max-h-dvh overflow-hidden">
      <header className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 relative z-10 shrink-0">
        <Link to="/" className="flex items-center gap-1.5 text-[var(--login-text)] font-semibold text-sm sm:text-base">
          <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[var(--login-text)] text-[var(--login-bg)] text-xs sm:text-sm font-bold">
            R
          </span>
          RFID Dashboard
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center px-3 py-2 sm:px-4 sm:py-4 relative z-10 min-h-0 overflow-hidden">
        <div className="w-full max-w-[24rem]">
          <div className="login-glass-card rounded-xl p-4 sm:p-5">
            <div className="flex justify-center mb-2 sm:mb-3">
              <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[var(--login-primary)] text-white">
                <HiOutlineArrowRight className="login-header-icon" aria-hidden />
              </span>
            </div>
            <h1 className="text-base font-bold text-[var(--login-text)] text-center sm:text-lg">
              Sign in with email
            </h1>
            <p className="mt-0.5 text-xs text-[var(--login-muted)] text-center sm:text-sm">
              Enter your credentials to access the RFID Dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-3 sm:mt-4" noValidate>
              <label className="login-label">Email</label>
              <div className="login-input-wrap mt-0.5 mb-2 sm:mb-3">
                <FiMail className="login-input-icon" aria-hidden />
                <input
                  type="text"
                  placeholder="Email or username"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  autoComplete="username"
                  disabled={loading}
                />
              </div>

              <label className="login-label">Password</label>
              <div className="login-input-wrap mt-0.5 mb-1">
                <FiLock className="login-input-icon" aria-hidden />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="p-0.5 text-[var(--login-muted)] hover:text-[var(--login-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--login-primary)] rounded"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff className="login-eye-icon" /> : <FiEye className="login-eye-icon" />}
                </button>
              </div>
              <div className="flex justify-end mb-2">
                <Link to="/forgot-password" className="auth-link text-xs sm:text-sm">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <p className="mb-2 text-xs text-[var(--color-error)]" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="login-btn-primary" disabled={loading}>
                {loading ? 'Signing in…' : 'Get Started'}
              </button>
            </form>

            <p className="mt-3 sm:mt-4 text-center text-xs text-[var(--login-muted)]">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="auth-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
