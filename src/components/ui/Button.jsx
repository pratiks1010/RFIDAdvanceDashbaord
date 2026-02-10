export function Button({ children, type = 'button', variant = 'primary', className = '', disabled, ...props }) {
  const base = 'auth-btn-primary'
  const variantClass = variant === 'secondary' ? 'auth-btn-secondary' : base
  return (
    <button
      type={type}
      className={`${variantClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
