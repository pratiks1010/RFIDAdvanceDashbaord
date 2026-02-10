/**
 * API base URL - use env in production
 * @see https://soni.loyalstring.co.in/
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://soni.loyalstring.co.in'

/**
 * Product/Stock API base (dashboard, stock, tags)
 * @see https://rrgold.loyalstring.co.in/
 */
export const PRODUCT_API_BASE_URL =
  import.meta.env.VITE_PRODUCT_API_BASE_URL ?? 'https://rrgold.loyalstring.co.in'

/**
 * Full URL for auth API path (no leading slash)
 */
export function apiUrl(path) {
  const base = API_BASE_URL.replace(/\/$/, '')
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${base}/${p}`
}

/**
 * Full URL for product/stock API path (no leading slash)
 */
export function productApiUrl(path) {
  const base = PRODUCT_API_BASE_URL.replace(/\/$/, '')
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${base}/${p}`
}
