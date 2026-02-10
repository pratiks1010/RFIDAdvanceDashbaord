import { createContext, useCallback, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ToastContext = createContext(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

const types = ['success', 'error', 'warning', 'info']

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const show = useCallback((message, type = 'info', options = {}) => {
    const id = Math.random().toString(36).slice(2)
    const t = { id, message, type: types.includes(type) ? type : 'info', ...options }
    setToasts((prev) => [...prev, t])
    if (options.duration !== 0 && (options.duration ?? 4000) > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id))
      }, options.duration ?? 4000)
    }
    return id
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
      style={{ maxWidth: 'min(24rem, calc(100vw - 2rem))' }}
    >
      <div className="pointer-events-auto flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 8, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className={`dash-toast ${t.type}`}
            >
              <span className="flex-1">{t.message}</span>
              <button
                type="button"
                onClick={() => onDismiss(t.id)}
                className="opacity-70 hover:opacity-100 p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                aria-label="Dismiss"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
