/**
 * Progress bar – value 0–100, variant: default | success | warning | error.
 */
export function ProgressBar({
  value = 0,
  max = 100,
  variant = 'default',
  showLabel = false,
  className = '',
  ...props
}) {
  const pct = Math.min(100, Math.max(0, Number(value)))
  const variantClass = variant === 'success' ? 'success' : variant === 'warning' ? 'warning' : variant === 'error' ? 'error' : ''
  return (
    <div className={className} {...props}>
      <div className="dash-progress-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div
          className={`dash-progress-fill ${variantClass}`.trim()}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="mt-1 block text-xs text-[var(--text-muted)]">{Math.round(pct)}%</span>
      )}
    </div>
  )
}
