import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { UserModal, type User } from '../index';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { Button } from '../../../shared/components';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineEnvelope, HiOutlinePhone, HiOutlineMagnifyingGlass, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
import { fetchUsers } from '../store/usersSlice';
import { formatDate, getStatusBadge, handlePageChangeFactory } from '../utils';
import { PiBroom } from 'react-icons/pi';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const isLoading = useAppSelector((state) => state.users.isLoading);
  const pagination = useAppSelector((state) => state.users.pagination);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  // Filtros locales
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [delegacionId, setDelegacionId] = useState('');
  const [orderBy, setOrderBy] = useState('created_at');
  const [orderDir, setOrderDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Cargar usuarios al montar y cuando cambian filtros/paginación
  // Debounce para el campo de búsqueda
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 1000);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchTerm]);

  useEffect(() => {
    const filters: any = {
      page,
      per_page: perPage,
      q: debouncedSearch || undefined,
      only_active: selectedStatus || undefined,
      delegacion_id: delegacionId || undefined,
      order_by: orderBy,
      order_dir: orderDir,
    };
    dispatch(fetchUsers({ filters }));
  }, [dispatch, debouncedSearch, selectedStatus, delegacionId, orderBy, orderDir, page, perPage]);

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

  const handleDeleteUser = async (userId: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<span class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-bold">Sí, eliminar</span>',
      cancelButtonText: '<span class="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition font-bold">Cancelar</span>',
      focusConfirm: false,
      customClass: {
        confirmButton: '',
        cancelButton: '',
        actions: 'flex gap-2 justify-center',
        popup: 'dark:bg-gray-800 dark:text-white',
      },
      buttonsStyling: false,
    });
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Eliminado',
        text: 'El usuario ha sido eliminado.',
        icon: 'success',
        confirmButtonText: '<span class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-bold">OK</span>',
        buttonsStyling: false,
        customClass: {
          confirmButton: '',
          popup: 'dark:bg-gray-800 dark:text-white',
        },
      });
    }
  };
  const handleModalSave = async () => {};

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reinicia a la primera página al buscar
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('');
    setDelegacionId('');
    setOrderBy('created_at');
    setOrderDir('desc');
    setPage(1);
    setPerPage(10);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Usuarios
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Administra los usuarios con acceso al backoffice

          </p>
        </div>
        
        <Button onClick={handleCreateUser} className="flex items-center">
          <HiOutlinePlus className="h-5 w-5 mr-2" />
          Nuevo Empleado
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar
            </label>
            <div className="relative">
              <HiOutlineMagnifyingGlass className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, email o documento..."
                className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Paginación
            </label>
            <select
              value={perPage}
              onChange={e => setPerPage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={20}>20 por página</option>
              <option value={50}>50 por página</option>
              <option value={100}>100 por página</option>
            </select>
          </div>

          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estado
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value=''>Todos</option>
              <option value='true'>Activo</option>
              <option value='false'>Inactivo</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition"
            >
              <HiOutlineMagnifyingGlass className="h-5 w-5" />
              Buscar
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold shadow-sm transition border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
            >
              {/* Ícono de escobilla (broom) de React Icons */}
              <PiBroom className="h-5 w-5" />
              Limpiar
            </button>
          </div>
        </form>
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
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fecha de Creación
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center text-gray-500 dark:text-gray-400">
                      No hay usuarios registrados
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
                                {user.nombre.split(' ').map(nombre => nombre.charAt(0).toUpperCase()).join('').slice(0, 2)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.nombre + ' ' + user.apellidos}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap align-middle">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                            <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-1">
                              <HiOutlineEnvelope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </span>
                            <span className="truncate max-w-[160px]" title={user.email}>{user.email}</span>
                          </div>
                          {user.telefono && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-1">
                                <HiOutlinePhone className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </span>
                              <span className="truncate max-w-[120px]" title={user.telefono}>{user.telefono}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {(() => {
                          const badge = getStatusBadge(user.activo);
                          return (
                            <span className={badge.className}>{badge.text}</span>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.created_at ? formatDate(user.created_at) : 'Sin fecha de creación'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/60 dark:hover:text-white transition"
                            title="Editar empleado"
                          >
                            <HiOutlinePencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/60 dark:hover:text-white transition"
                            title="Eliminar empleado"
                          >
                            <HiOutlineTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Paginación clara y funcional */}
      {pagination && (
        <div className="flex flex-col items-center mt-6 gap-2">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handlePageChangeFactory(pagination, setPage)(page - 1)}
              disabled={page <= 1}
              className="flex items-center px-3 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
            >
              <HiOutlineChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            <span className="text-sm text-gray-700 dark:text-gray-300 px-2">
              Página <strong>{page}</strong> de <strong>{pagination.pages}</strong>
            </span>
            <Button
              onClick={() => handlePageChangeFactory(pagination, setPage)(page + 1)}
              disabled={page >= pagination.pages}
              className="flex items-center px-3 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Siguiente <HiOutlineChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Mostrando <strong>{pagination.per_page}</strong> por página
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total: <strong>{pagination.total}</strong> usuarios
            </span>
          </div>
        </div>
      )}

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