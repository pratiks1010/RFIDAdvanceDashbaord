/**
 * API base URL - use env in production
 * @see https://soni.loyalstring.co.in/
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://soni.loyalstring.co.in'

/**
 * Full URL for a path (no leading slash on path)
 */
export function apiUrl(path) {
  const base = API_BASE_URL.replace(/\/$/, '')
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${base}/${p}`
}
