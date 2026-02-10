export function Input({ label, id, type = 'text', placeholder, value, onChange, error, required, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-')
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="auth-label">
          {label}
          {required && <span className="text-[var(--color-primary)]"> *</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="auth-input"
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
