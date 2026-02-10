import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiLock, FiHash, FiEye, FiEyeOff } from 'react-icons/fi'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useLoading } from '@/context/LoadingContext'
import { useAuth } from '@/context/AuthContext'
import { authRegister } from '@/api/auth'

export function Register() {
  const navigate = useNavigate()
  const { setLoading: setGlobalLoading } = useLoading()
  const { clientCode: authClientCode, setAuth } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [clientCode, setClientCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authClientCode && !clientCode) setClientCode(authClientCode)
  }, [authClientCode, clientCode])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password || !clientCode.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    setGlobalLoading(true)
    try {
      const res = await authRegister({
        Username: username.trim(),
        Password: password,
        ClientCode: clientCode.trim(),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        const token = data?.token ?? data?.Token
        if (token) setAuth(token, data?.user ?? data)
        navigate('/login')
        return
      }
      setError(data?.message || data?.error || `Registration failed (${res.status}). Please try again.`)
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
          <div className="login-glass-card register-card">
            <div className="flex justify-center mb-2">
              <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[var(--login-primary)] text-white">
                <HiOutlineArrowRight className="login-header-icon" aria-hidden />
              </span>
            </div>
            <h1 className="text-base font-bold text-[var(--login-text)] text-center sm:text-lg">
              Create your account
            </h1>
            <p className="mt-0.5 text-xs text-[var(--login-muted)] text-center login-subtitle">
              Enter your details to register for RFID Dashboard.
            </p>

            <form onSubmit={handleSubmit} className="register-form" noValidate>
              <label className="login-label">Username</label>
              <div className="login-input-wrap register-input-row">
                <FiUser className="login-input-icon" aria-hidden />
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  disabled={loading}
                />
              </div>

              <label className="login-label">Client code</label>
              <div className="login-input-wrap register-input-row">
                <FiHash className="login-input-icon" aria-hidden />
                <input
                  type="text"
                  placeholder="e.g. LS000443"
                  value={clientCode}
                  onChange={(e) => setClientCode(e.target.value)}
                  autoComplete="off"
                  disabled={loading}
                />
              </div>

              <label className="login-label">Password</label>
              <div className="login-input-wrap register-input-row register-input-row-last">
                <FiLock className="login-input-icon" aria-hidden />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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
                <p className="mb-2 text-xs text-[var(--color-error)]" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="login-btn-primary register-submit" disabled={loading}>
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>

            <p className="register-footer-link text-center text-xs text-[var(--login-muted)]">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
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
