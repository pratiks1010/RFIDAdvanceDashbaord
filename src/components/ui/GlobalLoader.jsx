import { Oval } from 'react-loader-spinner'
import { useLoading } from '@/context/LoadingContext'

export function GlobalLoader() {
  const { loading } = useLoading()

  if (!loading) return null

  return (
    <div
      className="global-loader-overlay"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="global-loader-content">
        <Oval
          height={48}
          width={48}
          color="var(--loader-color)"
          secondaryColor="var(--loader-color-muted)"
          strokeWidth={3}
          strokeWidthSecondary={3}
          visible
        />
        <span className="global-loader-text">Loading…</span>
      </div>
    </div>
  )
}
