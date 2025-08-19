import { useState } from 'react';
import { UserModal, useUsers, UserService, type User } from '../index';
import { PermissionGuard, usePermissions } from '../../auth';
import { Button } from '../../../shared/components';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  UserIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function UsersPage() {
  const { users, isLoading, refetch } = useUsers();
  const { isAdmin } = usePermissions();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleCreateUser = () => {
    setModalMode('create');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      try {
        await UserService.deleteUser(userId);
        await refetch();
      } catch (error) {
        console.error('Error deleting user:', error);
        // Aquí podrías mostrar un toast de error
      }
    }
  };

  const handleModalSave = async () => {
    await refetch();
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const getStatusBadge = (status: 'active' | 'inactive') => {
    const badgeClasses = status === 'active'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badgeClasses}`}>
        {status === 'active' ? 'Activo' : 'Inactivo'}
      </span>
    );
  };

  const getRoleBadge = (role: 'admin' | 'operator') => {
    const badgeClasses = role === 'admin'
      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badgeClasses}`}>
        {role === 'admin' ? 'Administrador' : 'Operador'}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando empleados...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Empleados
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Administra los empleados con acceso al backoffice
            {!isAdmin && (
              <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-full">
                <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                Vista de solo lectura
              </span>
            )}
          </p>
        </div>
        
        <PermissionGuard permissions={['users:write']}>
          <Button onClick={handleCreateUser} className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Empleado
          </Button>
        </PermissionGuard>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Empleados
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {users.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Empleados Activos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {users.filter(u => u.status === 'active').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShieldCheckIcon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Administradores
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {users.filter(u => u.role === 'admin').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Operadores
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {users.filter(u => u.role === 'operator').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Empleado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Último Login
                  </th>
                  <PermissionGuard permissions={['users:write', 'users:delete']} requireAll={false}>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Acciones
                    </th>
                  </PermissionGuard>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center text-gray-500 dark:text-gray-400">
                      No hay empleados registrados
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {user.name.split(' ').map(n => n.charAt(0).toUpperCase()).join('').slice(0, 2)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Empleado desde {formatDate(user.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Nunca'}
                      </td>
                      <PermissionGuard permissions={['users:write', 'users:delete']} requireAll={false}>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <PermissionGuard permissions={['users:write']}>
                              <button
                                onClick={() => handleEditUser(user)}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                title="Editar empleado"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                            </PermissionGuard>
                            
                            <PermissionGuard permissions={['users:delete']}>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                title="Eliminar empleado"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </PermissionGuard>
                          </div>
                        </td>
                      </PermissionGuard>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        user={selectedUser}
        mode={modalMode}
      />
    </div>
  );
}
