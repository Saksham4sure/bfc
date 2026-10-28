const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('bfc_token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  // Allow passing FormData without JSON Content-Type header
  if (options.body instanceof FormData) {
    delete headers['Content-Type']
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export const api = {
  get: (url) => apiRequest(url, { method: 'GET' }),
  post: (url, body) =>
    apiRequest(url, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  put: (url, body) =>
    apiRequest(url, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  delete: (url) => apiRequest(url, { method: 'DELETE' }),
}

export default api
