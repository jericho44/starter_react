import { AxiosError } from "axios"

export interface ApiError {
  message: string
  status?: number
  errors?: Record<string, string[]>
}

export const formatApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const data = error.response?.data
    
    return {
      message: data?.message || error.message || "An unexpected error occurred",
      status: error.response?.status,
      errors: data?.errors,
    }
  }

  if (error instanceof Error) {
    return { message: error.message }
  }

  return { message: "An unknown error occurred" }
}
