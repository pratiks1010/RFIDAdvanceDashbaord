/**
 * Parse JWT payload (no signature verification – use only for reading claims).
 * Returns payload object or null if invalid.
 */
export function parseJwt(token) {
  if (!token || typeof token !== 'string') return null
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

/**
 * Get ClientCode from JWT payload (tries ClientCode, clientCode, client_code).
 */
export function getClientCodeFromToken(token) {
  const payload = parseJwt(token)
  if (!payload) return null
  return payload.ClientCode ?? payload.clientCode ?? payload.client_code ?? null
}
