import { productApiUrl } from '@/config/api'

const GET_ALL_STOCK_PATH = 'api/ProductMaster/GetAllStockAndroid'
const GET_ALL_USED_UNUSED_TAG_PATH = 'api/ProductMaster/GetAllUsedAndUnusedTag'

/**
 * Fetch all stock (Android) for the given client.
 * @param {string} ClientCode - Current login client code
 * @returns {Promise<Array>} Array of stock items
 */
export async function getAllStockAndroid(ClientCode) {
  const url = productApiUrl(GET_ALL_STOCK_PATH)
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ClientCode: ClientCode ?? '' }),
  })
  if (!res.ok) throw new Error(`GetAllStockAndroid: ${res.status}`)
  const data = await res.json()
  return Array.isArray(data) ? data : []
}

/**
 * Fetch used and unused tag counts for the given client.
 * @param {string} ClientCode - Current login client code
 * @returns {Promise<{ used?: number, unused?: number, UsedCount?: number, UnusedCount?: number }>}
 */
export async function getAllUsedAndUnusedTag(ClientCode) {
  const url = productApiUrl(GET_ALL_USED_UNUSED_TAG_PATH)
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ClientCode: ClientCode ?? '' }),
  })
  if (!res.ok) throw new Error(`GetAllUsedAndUnusedTag: ${res.status}`)
  const data = await res.json()
  return data ?? {}
}
