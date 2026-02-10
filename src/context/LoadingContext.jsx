import { createContext, useContext, useState, useCallback } from 'react'

const LoadingContext = createContext({
  loading: false,
  setLoading: () => {},
})

export function LoadingProvider({ children }) {
  const [loading, setLoadingState] = useState(false)

  const setLoading = useCallback((value) => {
    setLoadingState(Boolean(value))
  }, [])

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const ctx = useContext(LoadingContext)
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider')
  return ctx
}
