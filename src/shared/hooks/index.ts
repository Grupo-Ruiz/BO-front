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
  useUsers,
  useClients,
  useOperations,
  usePayments,
  useWallet,
  useDashboard
} from './useServices';

// Ejemplo de uso en un componente:
/*
import { useUsers, useClients } from '@/shared/hooks';

const MyComponent = () => {
  const { users, loading, error, loadUsers, createUser } = useUsers();
  const { clients, loadClients } = useClients();
  
  useEffect(() => {
    loadUsers();
    loadClients();
  }, [loadUsers, loadClients]);
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Usuarios: {users.length}</h2>
      <h2>Clientes: {clients.length}</h2>
    </div>
  );
};
*/
