import { DashboardCard } from '../DashboardCard'
import { ProgressBar } from '../ProgressBar'

/**
 * Linear progress card – e.g. "Spending Limit" with $252 of $1,200 and a bar.
 */
export function LinearProgressCard({
  title,
  subtitle,
  value,
  max = 100,
  valueLabel,
  maxLabel,
  variant = 'default',
  onViewReport,
  className = '',
}) {
  const pct = max ? Math.min(100, (Number(value) / Number(max)) * 100) : 0
  return (
    <DashboardCard title={title} subtitle={subtitle} onViewReport={onViewReport} className={className}>
      {valueLabel != null && (
        <p className="text-2xl font-bold text-[var(--text-primary)] mb-1">
          {valueLabel}
          {maxLabel != null && (
            <span className="text-base font-normal text-[var(--text-muted)]"> of {maxLabel}</span>
          )}
        </p>
      )}
      <ProgressBar value={pct} max={100} variant={variant} showLabel={false} />
    </DashboardCard>
  )
}
