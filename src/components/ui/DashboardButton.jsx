/**
 * Dashboard button – primary, secondary, ghost, danger; sm/md/lg.
 * Use for all dashboard pages. Light/dark via CSS vars.
 */
export function DashboardButton({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) {
  const variantClass = {
    primary: 'dash-btn-primary',
    secondary: 'dash-btn-secondary',
    ghost: 'dash-btn-ghost',
    danger: 'dash-btn-danger',
  }[variant] || 'dash-btn-primary'
  const sizeClass = {
    sm: 'dash-btn-sm',
    md: 'dash-btn-md',
    lg: 'dash-btn-lg',
  }[size] || 'dash-btn-md'
  return (
    <button
      type={type}
      className={`dash-btn ${variantClass} ${sizeClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="dash-btn-icon">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="dash-btn-icon">{rightIcon}</span>}
    </button>
  )
}
