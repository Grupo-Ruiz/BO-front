import Table from '../components/Table';
import Pagination from '../components/Pagination';
import { useState, useEffect, useRef } from 'react';
import Filters from '../components/Filters';
import { UserModal } from '../index';
import { useAppSelector, useAppDispatch } from '@/modules/shared/store/hooks';
import { Button } from '@/modules/shared/components';
import { HiOutlinePlus } from 'react-icons/hi2';
import { fetchUsers } from '../store/thunks/usersThunks';
import { formatDate, getStatusBadge } from '@/utils';
import { useUserFunctions } from '../hooks/useUserFunctions';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  // Datos en el storage
  const users = useAppSelector((state) => state.users.users);
  const isLoading = useAppSelector((state) => state.users.isLoading);
  const pagination = useAppSelector((state) => state.users.pagination);
  const error = useAppSelector((state) => state.users.error);

  // Estado del modal y funciones de usuario
  const {
    selectedUser,
    isModalOpen,
    setIsModalOpen,
    modalMode,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleRestoreUser,
    handleModalSave,
    handleModalEdit,
  } = useUserFunctions();
  
  // Filtros locales
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [delegacionId, setDelegacionId] = useState('');
  const [orderBy, setOrderBy] = useState('created_at');
  const [orderDir, setOrderDir] = useState('desc');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Función reutilizable para ordenar columnas
  const handleSort = (field: string) => {
    if (orderBy === field) {
      setOrderDir(orderDir === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(field);
      setOrderDir('asc');
    }
    setPage(1);
  };

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

  // Cargar usuarios al montar y cuando cambian filtros/paginación
  useEffect(() => {
    const filters: any = {
      page,
      per_page: perPage,
      q: debouncedSearch || undefined,
      only_active: selectedStatus || undefined,
      delegacion_id: delegacionId || undefined,
      order_by: orderBy,
      order_dir: orderDir,
      include_deleted: includeDeleted,
    };
    dispatch(fetchUsers({ filters }));
  }, [dispatch, debouncedSearch, selectedStatus, delegacionId, orderBy, orderDir, page, perPage, includeDeleted]);

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
    setIncludeDeleted(false);
  };

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
          Nuevo Usuario
        </Button>
      </div>

      {/* Filtros */}
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        perPage={perPage}
        setPerPage={setPerPage}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        includeDeleted={includeDeleted}
        setIncludeDeleted={setIncludeDeleted}
        onSearch={handleSearch}
        onClear={clearFilters}
      />

      {/* Tabla de usuarios */}
      <Table
        users={users}
        isLoading={isLoading}
        error={error}
        orderBy={orderBy}
        orderDir={orderDir}
        handleSort={handleSort}
        includeDeleted={includeDeleted}
        formatDate={formatDate}
        getStatusBadge={getStatusBadge}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
        handleRestoreUser={handleRestoreUser}
      />

  {/* Paginación */}
  <Pagination pagination={pagination} page={page} setPage={setPage}/>
      {/* Modal */}
      <UserModal  
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        onEdit={handleModalEdit}
        user={selectedUser}
        mode={modalMode}
      />
    </div>
  );
}