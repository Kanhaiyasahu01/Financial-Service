import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/api/v1',
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
