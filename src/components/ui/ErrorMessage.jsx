/**
 * Inline error message – theme-aware.
 */
export function ErrorMessage({ children, className = '' }) {
  if (!children) return null
  return (
    <div className={`dash-msg-error ${className}`.trim()} role="alert">
      {children}
    </div>
  )
}
