/**
 * Filter select – options: [{ value, label }]. Use for dropdown filters.
 */
export function FilterSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select…',
  disabled,
  className = '',
  id,
  'aria-label': ariaLabel,
}) {
  const val = value ?? ''
  return (
    <select
      id={id}
      className={`dash-filter-select ${className}`.trim()}
      value={val}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      aria-label={ariaLabel ?? placeholder}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label ?? opt.value}
        </option>
      ))}
    </select>
  )
}
