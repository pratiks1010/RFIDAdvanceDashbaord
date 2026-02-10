/**
 * Toggle (switch) – on/off. Accessible, theme-aware.
 */
export function Toggle({ checked, onChange, disabled, 'aria-label': ariaLabel, className = '', ...props }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={!!checked}
      aria-label={ariaLabel ?? (checked ? 'On' : 'Off')}
      disabled={disabled}
      className={`dash-toggle-track ${className}`.trim()}
      data-checked={checked ? 'true' : 'false'}
      onClick={() => onChange?.(!checked)}
      {...props}
    >
      <span className="dash-toggle-thumb" aria-hidden />
    </button>
  )
}
