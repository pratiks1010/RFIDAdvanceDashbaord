/**
 * Dashboard card – title, subtitle, optional "View Report", children. Matches reference style.
 */
export function DashboardCard({
  title,
  subtitle,
  viewReportLabel = 'View Report',
  onViewReport,
  children,
  className = '',
}) {
  return (
    <div className={`dash-card ${className}`.trim()}>
      <div className="dash-card-header">
        <div>
          <h3 className="dash-card-title">{title}</h3>
          {subtitle && <p className="dash-card-subtitle">{subtitle}</p>}
        </div>
        {onViewReport && (
          <button type="button" className="dash-card-view-report" onClick={onViewReport}>
            {viewReportLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  )
}
