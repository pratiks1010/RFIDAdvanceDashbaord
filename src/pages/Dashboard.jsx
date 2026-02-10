import { Link } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'

export function Dashboard() {
  return (
    <PageLayout title="RFID Dashboard">
      <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] p-4 shadow-sm sm:p-6">
        <h2 className="mb-2 text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
          Welcome to your RFID Dashboard
        </h2>
        <p className="mb-4 text-[var(--text-secondary)]">
          This layout is responsive for mobile, tablet, and desktop with light/dark theme support.
        </p>
        <Link to="/login" className="auth-link text-sm">
          Sign out
        </Link>
      </div>
    </PageLayout>
  )
}
