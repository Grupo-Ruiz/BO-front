import type { PermissionGuardProps } from '../types/index';
import { usePermissions } from '../hooks/usePermissions';

export function PermissionGuard({ 
  children, 
  permission, 
  permissions = [], 
  requireAll = false,
  role,
  fallback = null 
}: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isAdmin, isOperator } = usePermissions();

  // Check role-based access
  if (role) {
    if (role === 'admin' && !isAdmin()) {
      return <>{fallback}</>;
    }
    if (role === 'operator' && !isOperator()) {
      return <>{fallback}</>;
    }
  }

  // Check single permission
  if (permission && !hasPermission(permission)) {
    return <>{fallback}</>;
  }

  // Check multiple permissions
  if (permissions.length > 0) {
    const hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
    
    if (!hasAccess) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}
