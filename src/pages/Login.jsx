import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useLoading } from '@/context/LoadingContext'
import { useAuth } from '@/context/AuthContext'
import { authLogin } from '@/api/auth'

export function Login() {
  const navigate = useNavigate()
  const { setLoading: setGlobalLoading } = useLoading()
  const { setAuth } = useAuth()
  const [loginName, setLoginName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!loginName.trim() || !password) {
      setError('Please enter username and password.')
      return
    }
    setLoading(true)
    setGlobalLoading(true)
    try {
      const res = await authLogin({ LoginName: loginName.trim(), Password: password })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        const token = data?.token ?? data?.Token
        if (token) setAuth(token, data?.user ?? data)
        navigate('/', { replace: true })
        return
      }
      setError(data?.message || data?.error || `Login failed (${res.status}). Please try again.`)
    } catch (err) {
      setError(err?.message || 'Network error. Please try again.')
    } finally {
      setLoading(false)
      setGlobalLoading(false)
    }
  }

  return (
    <div className="login-page flex flex-col relative h-dvh max-h-dvh overflow-hidden">
      <header className="login-header">
        <Link to="/" className="flex items-center min-w-0">
          <img
            src="/assets/logo/Vector.png"
            alt="Sparkle RFID"
            className="login-header-logo"
          />
        </Link>
        <ThemeToggle />
      </header>

      <main className="login-main">
        <div className="login-card-wrap">
          <div className="login-glass-card">
            <div className="flex justify-center mb-2 sm:mb-3">
              <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[var(--login-primary)] text-white">
                <HiOutlineArrowRight className="login-header-icon" aria-hidden />
              </span>
            </div>
            <h1 className="text-base font-bold text-[var(--login-text)] text-center sm:text-lg md:text-xl">
              Sign in with username
            </h1>
            <p className="mt-0.5 text-xs text-[var(--login-muted)] text-center sm:text-sm login-subtitle">
              Enter your credentials to access the RFID Dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-3 sm:mt-4 md:mt-5" noValidate>
              <label className="login-label">Username</label>
              <div className="login-input-wrap mt-0.5 mb-2 sm:mb-3">
                <FiMail className="login-input-icon" aria-hidden />
                <input
                  type="text"
                  placeholder="Enter username"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  autoComplete="username"
                  disabled={loading}
                />
              </div>

              <label className="login-label">Password</label>
              <div className="login-input-wrap mt-0.5 mb-4 sm:mb-5">
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
                  className="p-0.5 text-[var(--login-icon-muted)] hover:text-[var(--login-icon)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--login-accent)] rounded"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff className="login-eye-icon" /> : <FiEye className="login-eye-icon" />}
                </button>
              </div>

              {error && (
                <p className="mb-3 text-xs text-[var(--color-error)]" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="login-btn-primary mt-1" disabled={loading}>
                {loading ? 'Signing in…' : 'Get Started'}
              </button>
            </form>

            <p className="mt-3 sm:mt-4 md:mt-5 text-center text-xs sm:text-sm text-[var(--login-muted)]">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="auth-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="login-footer shrink-0">
        <div className="login-footer-inner">
          <img
            src="/assets/logo/logo.png"
            alt="Loyal String International"
            className="login-footer-logo"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <p className="login-footer-text">
            © {new Date().getFullYear()} All rights reserved. Loyal String International Pvt. Ltd.
          </p>
        </div>
      </footer>
    </div>
  )
}
