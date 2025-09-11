import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { API_CONFIGS, STORAGE_KEYS } from '../config/api';
import type { ApiType } from '../config/api';

// Cache de instancias de API
const apiInstances: Map<ApiType, AxiosInstance> = new Map();

// Función para crear cliente API
export const createApiClient = (apiType: ApiType = 'MAIN'): AxiosInstance => {
  // Retornar instancia existente si ya existe
  if (apiInstances.has(apiType)) {
    return apiInstances.get(apiType)!;
  }

  const config = API_CONFIGS[apiType];
  
  // Crear nueva instancia
  const instance = axios.create({
    baseURL: config.BASE_URL,
    timeout: config.TIMEOUT,
    headers: config.HEADERS,
  });

  // Interceptor para agregar el token de autenticación
  instance.interceptors.request.use(
    (config) => {
      // Definir tipo para el usuario autenticado
      type AuthUser = { token: string };
      const userString = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      let token: string | null = null;
      if (userString) {
        try {
          const user: AuthUser = JSON.parse(userString);
          token = user.token;
        } catch (e) {
          token = null;
        }
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para manejar errores de respuesta
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        // Limpiar store de Redux si es necesario
        window.dispatchEvent(new CustomEvent('auth:logout'));
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  // Guardar en cache
  apiInstances.set(apiType, instance);
  
  return instance;
};

// Cliente API principal (para retrocompatibilidad)
export const apiClient = createApiClient('MAIN');

// Función para limpiar cache de instancias
export const clearApiCache = () => {
  apiInstances.clear();
};

export default apiClient;