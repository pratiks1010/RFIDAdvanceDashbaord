/**
 * Inline success message – theme-aware.
 */
export function SuccessMessage({ children, className = '' }) {
  if (!children) return null
  return (
    <div className={`dash-msg-success ${className}`.trim()} role="status">
      {children}
    </div>
  )
}
