import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { toast } from "sonner"
import { formatApiError } from "@/utils/error-handler"

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth-token")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const formattedError = formatApiError(error)
    
    if (formattedError.status === 401) {
      localStorage.removeItem("auth-token")
      window.location.href = "/login"
    }

    toast.error(formattedError.message)
    return Promise.reject(formattedError)
  }
)

export default api
