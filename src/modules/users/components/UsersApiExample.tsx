import { useState, useEffect } from 'react';
import { useUsersApi } from '../hooks/useUsersApi';
import type { User, UserFilters, CreateUserData, UpdateUserData } from '../types';

export function UsersApiExample() {
  const {
    users,
    pagination,
    roles,
    headquarters,
    isLoading,
    error,
    fetchUsers,
    fetchAllUsers,
    createUser,
    updateUser,
    deleteUser,
    clearError
  } = useUsersApi();
  
  const [filters, setFilters] = useState<UserFilters>({
    pagination: 10,
    column: 'name',
    order: 'asc'
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers(filters);
  }, []);

  const handleFilterChange = (newFilters: UserFilters) => {
    setFilters(newFilters);
    fetchUsers(newFilters);
  };

  const handleCreateUser = async (userData: CreateUserData) => {
    const success = await createUser(userData);
    if (success) {
      setShowCreateModal(false);
      // Opcionalmente recargar la lista
      fetchUsers(filters);
    }
  };

  const handleUpdateUser = async (id: string, userData: UpdateUserData) => {
    const success = await updateUser(id, userData);
    if (success) {
      setEditingUser(null);
      // La lista se actualiza automáticamente
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      const success = await deleteUser(id);
      if (success) {
        // La lista se actualiza automáticamente
      }
    }
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    handleFilterChange(newFilters);
  };

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
        <div className="text-red-700 dark:text-red-400">
          {error}
        </div>
        <button
          onClick={clearError}
          className="mt-2 text-sm text-red-600 hover:text-red-500"
        >
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Empleados ({pagination?.total || users.length})
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Nuevo Empleado
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={filters.name || ''}
              onChange={(e) => handleFilterChange({ ...filters, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Buscar por nombre..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={filters.email || ''}
              onChange={(e) => handleFilterChange({ ...filters, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Buscar por email..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Rol</label>
            <select
              value={filters.role || ''}
              onChange={(e) => handleFilterChange({ ...filters, role: Number(e.target.value) || undefined })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Todos los roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Sede</label>
            <select
              value={filters.sede || ''}
              onChange={(e) => handleFilterChange({ ...filters, sede: Number(e.target.value) || undefined })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Todas las sedes</option>
              {headquarters.map((hq) => (
                <option key={hq.id} value={hq.id}>
                  {hq.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando empleados...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Sede
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Creado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {user.roleName || user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                        {user.sedeName || 'Sin asignar'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {pagination && pagination.last_page > 1 && (
              <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Mostrando {pagination.from} a {pagination.to} de {pagination.total} resultados
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded ${
                          page === pagination.current_page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UsersApiExample;
