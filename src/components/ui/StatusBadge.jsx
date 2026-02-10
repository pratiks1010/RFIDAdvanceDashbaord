/**
 * Status badge – active | inactive | pending | error. Pill style.
 */
export function StatusBadge({ status = 'inactive', children, className = '' }) {
  const label = children ?? status
  const statusClass = ['active', 'inactive', 'pending', 'error'].includes(status) ? status : 'inactive'
  return (
    <span className={`dash-status-badge ${statusClass} ${className}`.trim()}>
      {label}
    </span>
  )
}
