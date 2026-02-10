import { FiCheck } from 'react-icons/fi'

/**
 * Checkbox – rounded style like reference. Supports checked, indeterminate.
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled,
  'aria-label': ariaLabel,
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={ariaLabel ?? 'Toggle'}
      disabled={disabled}
      className={`dash-checkbox ${className}`.trim()}
      data-checked={checked ? 'true' : 'false'}
      data-indeterminate={indeterminate ? 'true' : 'false'}
      onClick={() => onChange?.(!checked)}
      {...props}
    >
      {indeterminate ? (
        <span style={{ width: 10, height: 2, background: 'currentColor', borderRadius: 1 }} aria-hidden />
      ) : checked ? (
        <FiCheck size={12} strokeWidth={3} aria-hidden />
      ) : null}
    </button>
  )
}
