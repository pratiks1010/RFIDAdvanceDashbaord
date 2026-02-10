import { useNavigate } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { useAuth } from '@/context/AuthContext'

export function Dashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleSignOut() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <PageLayout title="RFID Dashboard">
      <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] p-4 shadow-sm sm:p-6">
        <h2 className="mb-2 text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
          Welcome to your RFID Dashboard
        </h2>
        <p className="mb-4 text-[var(--text-secondary)]">
          This layout is responsive for mobile, tablet, and desktop with light/dark theme support.
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className="auth-link text-sm bg-transparent border-none cursor-pointer font-inherit p-0"
        >
          Sign out
        </button>
      </div>
    </PageLayout>
  )
}
