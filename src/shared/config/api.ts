// Configuración de APIs múltiples
export const API_CONFIGS = {
  // API Principal (Laravel - Usuarios y Auth)
  MAIN: {
    BASE_URL: 'http://127.0.0.1:8000/api',
    TIMEOUT: 10000,
    HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
  // API Secundaria (para futuras integraciones)
  SECONDARY: {
    BASE_URL: 'http://api.ejemplo.com/v1',
    TIMEOUT: 8000,
    HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }
} as const;

// Configuración de localStorage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'yurni_auth_token',
  AUTH_USER: 'yurni_auth_user',
  REDUX_PERSIST: 'yurni-root'
} as const;

// URLs de endpoints de la API principal
export const API_ENDPOINTS = {
  // Autenticación
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  
  // Usuarios/Empleados
  USERS: '/usuarios',
  USERS_FRONT: '/usuarios_front',
  ROLES: '/roles',
  
  // Sedes
  HEADQUARTERS: '/sedes',
} as const;

// Tipos de API
export type ApiType = keyof typeof API_CONFIGS;
