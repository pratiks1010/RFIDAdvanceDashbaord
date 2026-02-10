import { useState, useRef, useEffect } from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'

/**
 * Row actions menu – "..." button that toggles a dropdown. actions: [{ label, onClick }].
 */
export function RowActionsMenu({ actions = [], row, className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  return (
    <div className={`relative inline-block ${className}`.trim()} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        aria-label="Row actions"
        aria-expanded={open}
      >
        <FiMoreHorizontal size={18} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-1 z-50 min-w-[8rem] py-1 rounded-md border border-[var(--border-default)] bg-[var(--bg-card)] shadow-lg"
          role="menu"
        >
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] focus:outline-none focus:bg-[var(--bg-secondary)]"
              onClick={() => {
                action.onClick?.(row)
                setOpen(false)
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
