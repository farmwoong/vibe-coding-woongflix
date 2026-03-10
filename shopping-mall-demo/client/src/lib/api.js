const API_BASE = import.meta.env.VITE_API_URL || ''

export async function api(path, options = {}) {
  const url = `${API_BASE}${path}`
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  const text = await res.text().catch(() => res.statusText)
  if (!res.ok) {
    try {
      const body = JSON.parse(text)
      throw new Error(body.error || body.message || text)
    } catch (e) {
      if (e instanceof SyntaxError) throw new Error(text || res.statusText)
      throw e
    }
  }
  return text ? JSON.parse(text) : {}
}

export const productsApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams()
    if (params.page != null) qs.set('page', params.page)
    if (params.limit != null) qs.set('limit', params.limit)
    const query = qs.toString()
    return api('/api/products' + (query ? '?' + query : ''))
  },
  get: (id) => api(`/api/products/${id}`),
  create: (body) => api('/api/products', { method: 'POST', body: JSON.stringify(body) }),
}

export const usersApi = {
  list: () => api('/api/users'),
  create: (body) => api('/api/users', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => api('/api/users/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: (token) =>
    api('/api/users/me', { headers: { Authorization: `Bearer ${token}` } }),
}
