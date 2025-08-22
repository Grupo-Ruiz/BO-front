/**
 * Hooks personalizados para el sistema de servicios de Yurni IA
 * 
 * Este archivo exporta todos los hooks disponibles para usar los servicios
 * de forma reactiva en componentes React.
 * 
 * Hooks disponibles:
 * - useServices: Hook base para ejecutar cualquier servicio
 * - useUsers: Hook especializado para gestión de usuarios
 * - useClients: Hook especializado para gestión de clientes  
 * - useOperations: Hook especializado para gestión de operaciones
 * - usePayments: Hook especializado para gestión de pagos
 * - useWallet: Hook especializado para gestión de wallets
 * - useDashboard: Hook para operaciones combinadas (dashboards)
 */

export {
  useServices,
  useClients,
  useOperations,
  usePayments,
  useWallet,
  useDashboard
} from './useServices';
