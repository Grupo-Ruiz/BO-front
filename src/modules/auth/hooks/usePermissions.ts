import { useAuth } from './useAuth';

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => user.permissions.includes(permission));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!user) return false;
    return permissions.every(permission => user.permissions.includes(permission));
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const isOperator = (): boolean => {
    return user?.role === 'operator';
  };

  const canRead = (resource: string): boolean => {
    return hasPermission(`${resource}:read`);
  };

  const canWrite = (resource: string): boolean => {
    return hasPermission(`${resource}:write`);
  };

  const canDelete = (resource: string): boolean => {
    return hasPermission(`${resource}:delete`);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin,
    isOperator,
    canRead,
    canWrite,
    canDelete,
    permissions: user?.permissions || [],
    role: user?.role
  };
}
