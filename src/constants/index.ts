export const APP_CONFIG = {
  NAME: 'Boilerplate',
  VERSION: '1.0.0',
  API_URL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  USERS: '/dashboard/users',
  SETTINGS: '/dashboard/settings',
}

export const AUTH_KEYS = {
  TOKEN: 'auth-token',
  USER: 'auth-user',
}
