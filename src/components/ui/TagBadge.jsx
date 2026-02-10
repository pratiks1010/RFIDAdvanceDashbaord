/**
 * Tag badge with colored dot – e.g. "Slow response" (red), "Fast response" (green), "No response" (gray).
 * variant: slow | fast | neutral
 */
export function TagBadge({ variant = 'neutral', children, className = '' }) {
  const v = ['slow', 'fast', 'neutral'].includes(variant) ? variant : 'neutral'
  return (
    <span className={`dash-tag-badge ${v} ${className}`.trim()}>
      <span className="dash-tag-dot" aria-hidden />
      {children}
    </span>
  )
}
