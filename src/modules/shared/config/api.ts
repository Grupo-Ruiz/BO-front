// Configuración de APIs
export const API_CONFIGS = {
  MAIN: {
    BASE_URL: 'http://127.0.0.1:5000/api/v1/',
    TIMEOUT: 10000,
    HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  SECONDARY: {
    BASE_URL: 'http://127.0.0.1:5000/api/v1/',
    TIMEOUT: 8000,
    HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }
} as const;

export const STORAGE_KEYS = {
  AUTH_USER: 'yurni_auth_user',
} as const;

export type ApiType = keyof typeof API_CONFIGS;