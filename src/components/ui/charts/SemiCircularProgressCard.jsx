import { DashboardCard } from '../DashboardCard'

/**
 * Semi-circular progress card – e.g. "Saving Goal" with arc and value inside.
 */
export function SemiCircularProgressCard({
  title,
  subtitle,
  value = 0,
  max = 100,
  valueLabel,
  maxLabel,
  onViewReport,
  className = '',
  chartHeight = 200,
}) {
  const pct = max ? Math.min(100, (Number(value) / Number(max)) * 100) : 0
  const arcLength = Math.PI * 50
  return (
    <DashboardCard title={title} subtitle={subtitle} onViewReport={onViewReport} className={className}>
      <div className="dash-chart-wrap flex flex-col items-center justify-center" style={{ minHeight: chartHeight }}>
        <div className="relative w-full max-w-[140px] mx-auto">
          <svg viewBox="0 0 120 70" className="w-full" style={{ overflow: 'visible' }}>
            <path
              d="M 110 60 A 50 50 0 0 0 10 60"
              fill="none"
              stroke="var(--bg-tertiary)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 110 60 A 50 50 0 0 0 10 60"
              fill="none"
              stroke="var(--color-success)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * arcLength} ${arcLength}`}
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            {valueLabel != null && (
              <span className="text-lg font-bold text-[var(--text-primary)]">{valueLabel}</span>
            )}
            {maxLabel != null && (
              <span className="text-sm text-[var(--text-muted)]">of {maxLabel}</span>
            )}
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}
