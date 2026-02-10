/**
 * Segmented control – e.g. "Customer List" | "Organization". options: [{ value, label }].
 */
export function SegmentedControl({
  options = [],
  value,
  onChange,
  className = '',
}) {
  return (
    <div className={`dash-segmented ${className}`.trim()} role="tablist">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          className={`dash-segmented-option ${value === opt.value ? 'active' : ''}`}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
