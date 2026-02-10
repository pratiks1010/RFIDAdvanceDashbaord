import { apiUrl } from '@/config/api'

const AUTH_LOGIN_PATH = 'api/ProductMaster/AuthLogin'

/**
 * Login payload per API spec
 * @param {Object} payload
 * @param {string} payload.LoginName
 * @param {string} payload.Password
 * @returns {Promise<Response>}
 */
export async function authLogin({ LoginName, Password }) {
  const url = apiUrl(AUTH_LOGIN_PATH)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ LoginName, Password }),
  })
  return res
}
