const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV
  ? 'http://localhost:8000'
  : 'https://vayu-backend-o4xa.onrender.com')

export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '')
