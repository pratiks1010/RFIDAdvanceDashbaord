import { useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'

/**
 * Search input – icon, placeholder, value, onChange. Optional: onClear, shortcutHint (e.g. "⌘K").
 * Use showShortcut for the table-style search bar with shortcut on the right.
 */
export function SearchInput({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search…',
  shortcutHint,
  showShortcut = false,
  disabled,
  className = '',
  ...props
}) {
  useEffect(() => {
    if (!shortcutHint || typeof window === 'undefined') return
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector('.dash-search-wrap input, .dash-search-with-shortcut input')?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [shortcutHint])

  const wrapClass = showShortcut ? 'dash-search-with-shortcut' : 'dash-search-wrap'
  return (
    <div className={`${wrapClass} ${className}`.trim()}>
      <FiSearch className="flex-shrink-0 text-[var(--text-muted)]" size={18} aria-hidden />
      <input
        type="search"
        role="searchbox"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
      {showShortcut && shortcutHint && (
        <kbd className="dash-search-shortcut">{shortcutHint}</kbd>
      )}
      {!showShortcut && value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}
