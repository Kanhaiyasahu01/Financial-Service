import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1'

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem('finance_auth')

  if (!raw) {
    return config
  }

  try {
    const auth = JSON.parse(raw)
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
  } catch {
    localStorage.removeItem('finance_auth')
  }

  return config
})
