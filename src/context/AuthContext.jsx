import { createContext, useContext, useCallback, useEffect, useState } from 'react'
import { getClientCodeFromToken } from '@/utils/jwt'

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_USER_KEY = 'auth_user'

const AuthContext = createContext({
  token: null,
  user: null,
  clientCode: null,
  setAuth: () => {},
  logout: () => {},
  isAuthenticated: false,
})

function readStored() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  const userStr = localStorage.getItem(AUTH_USER_KEY)
  let user = null
  try {
    if (userStr) user = JSON.parse(userStr)
  } catch {}
  const clientCode = token ? getClientCodeFromToken(token) : null
  return { token, user, clientCode }
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(() => readStored())

  const setAuth = useCallback((token, user = null) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
      const fromToken = getClientCodeFromToken(token)
      const fromUser = user?.ClientCode ?? user?.clientCode ?? user?.client_code
      const clientCode = fromToken ?? fromUser ?? null
      if (user != null) {
        try {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
        } catch {}
      } else {
        const existing = localStorage.getItem(AUTH_USER_KEY)
        try {
          user = existing ? JSON.parse(existing) : null
        } catch {
          user = null
        }
      }
      setState({ token, user, clientCode })
    } else {
      setState({ token: null, user: null, clientCode: null })
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem(AUTH_USER_KEY)
    }
  }, [])

  const logout = useCallback(() => {
    setState({ token: null, user: null, clientCode: null })
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
  }, [])

  useEffect(() => {
    const stored = readStored()
    if (stored.token && !state.token) {
      setState(stored)
    }
  }, [])

  const value = {
    token: state.token,
    user: state.user,
    clientCode: state.clientCode,
    setAuth,
    logout,
    isAuthenticated: !!state.token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
