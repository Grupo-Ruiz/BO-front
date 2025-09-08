import { useEffect, useState } from 'react';
import { useClientsList } from '../hooks/useClientsList';
import { HiOutlineEnvelope, HiOutlinePencil, HiOutlineTrash, HiOutlinePlusCircle } from 'react-icons/hi2';
import ModalForm from '@/modules/shared/components/ModalForm';
import TableList from '@/modules/shared/components/TableList';
import type { TableColumn } from '@/modules/shared/components/TableList';
import FiltersList from '@/modules/shared/components/FiltersList';
import type { FiltersListButton } from '@/modules/shared/components/FiltersList';
import type { FilterField } from '@/modules/shared/components/FiltersList';
import PaginationList from '@/modules/shared/components/PaginationList';

function ClientsListPage() {
  const {
    clients,
    isLoading,
    error,
    filters,
    selectedClient,
    pagination,
    loadClients,
    onAddClient,
    onUpdateClient,
    onDeleteClient,
    onSetFilters,
    onSetSelectedClient,
    onSetPagination,
  } = useClientsList();

  const [modalOpen, setModalOpen] = useState(false);
  // Estado local para perPage (cantidad por página)
  const [perPage, setPerPage] = useState(10);
  // Controla si se muestra el filtro de paginación
  const showPaginationFilter = true; // Cambia a false si no quieres mostrarlo

  useEffect(() => {
    loadClients({
      ...filters,
      page: pagination?.page,
      per_page: perPage,
    });
    // eslint-disable-next-line
  }, [filters, pagination?.page, perPage]);

  const handleEdit = (client: any) => {
    onSetSelectedClient(client);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    onDeleteClient(id);
  };

  const handleSave = (client: any) => {
    if (client.id) {
      onUpdateClient(client);
    } else {
      onAddClient(client);
    }
    setModalOpen(false);
    onSetSelectedClient(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    onSetSelectedClient(null);
  };

  const handlePageChange = (page: number) => {
    onSetPagination(page, perPage);
  };

  const handlePerPageChange = (v: string | number) => {
    const value = Number(v);
    setPerPage(value);
    onSetPagination(1, value); // Reinicia a la primera página
  };

  // Filtros reutilizables
  const filterFields: FilterField[] = [
    {
      type: 'input',
      name: 'search',
      label: 'Buscar',
      value: filters.search || '',
      onChange: v => onSetFilters({ ...filters, search: v }),
      placeholder: 'Nombre o email...'
    },
    {
      type: 'select',
      name: 'status',
      label: 'Estado',
      value: filters.status || '',
      onChange: v => onSetFilters({ ...filters, status: v }),
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' },
        { value: 'suspended', label: 'Suspendido' },
      ]
    },
    {
      type: 'select',
      name: 'kycStatus',
      label: 'KYC',
      value: filters.kycStatus || '',
      onChange: v => onSetFilters({ ...filters, kycStatus: v }),
      options: [
        { value: 'verified', label: 'Verificado' },
        { value: 'pending', label: 'Pendiente' },
        { value: 'rejected', label: 'Rechazado' },
      ]
    },
    {
      type: 'select',
      name: 'riskLevel',
      label: 'Riesgo',
      value: filters.riskLevel || '',
      onChange: v => onSetFilters({ ...filters, riskLevel: v }),
      options: [
        { value: 'low', label: 'Bajo' },
        { value: 'medium', label: 'Medio' },
        { value: 'high', label: 'Alto' },
      ]
    },
    // Filtro de paginación solo si showPaginationFilter es true
    ...(showPaginationFilter ? [{
      type: 'select' as const,
      name: 'perPage',
      label: 'Mostrar',
      value: String(perPage ?? 10),
      onChange: handlePerPageChange,
      options: [
        { value: '5', label: '5' },
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
      ],
      placeholder: 'por página',
      defaultOption: null,
    }] : []),
  ];

  // Columnas reutilizables para la tabla
  const columns: TableColumn<any>[] = [
    {
      key: 'name',
      label: 'Cliente',
      render: (client) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-sm font-medium text-white">{client.name.split(' ').map((n: string) => n.charAt(0).toUpperCase()).join('').slice(0, 2)}</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">{client.name}</div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Contacto',
      render: (client) => (
        <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
          <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-1"><HiOutlineEnvelope className="h-4 w-4 text-blue-600 dark:text-blue-400" /></span>
          <span className="truncate max-w-[160px]" title={client.email}>{client.email}</span>
        </div>
      )
    },
    {
      key: 'walletBalance',
      label: 'Balance',
      render: (client) => (
        <span className="px-2 py-1 rounded text-sm font-mono bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-green-300">
          € {client.walletBalance.toFixed(2)}
        </span>
      )
    },
    {
      key: 'userType',
      label: 'Tipo',
      render: (client) => {
        const badge = client.userType === 'regular'
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
        return <span className={`px-2 py-1 rounded text-xs font-semibold ${badge}`}>{client.userType === 'regular' ? 'Regular' : 'Premium'}</span>;
      }
    },
    {
      key: 'status',
      label: 'Estado',
      render: (client) => {
        const badge = client.status === 'active'
          ? 'bg-green-100 text-green-700'
          : client.status === 'inactive'
          ? 'bg-gray-100 text-gray-700'
          : 'bg-yellow-100 text-yellow-700';
        return <span className={`px-2 py-1 rounded text-xs ${badge}`}>{client.status === 'active' ? 'Activo' : client.status === 'inactive' ? 'Inactivo' : 'Suspendido'}</span>;
      }
    },
    {
      key: 'kycStatus',
      label: 'KYC',
      render: (client) => {
        const badge = client.kycStatus === 'verified'
          ? 'bg-blue-100 text-blue-700'
          : client.kycStatus === 'pending'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-red-100 text-red-700';
        return <span className={`px-2 py-1 rounded text-xs ${badge}`}>{client.kycStatus === 'verified' ? 'Verificado' : client.kycStatus === 'pending' ? 'Pendiente' : 'Rechazado'}</span>;
      }
    },
    {
      key: 'riskLevel',
      label: 'Riesgo',
      render: (client) => {
        const badge = client.riskLevel === 'low'
          ? 'bg-green-100 text-green-700'
          : client.riskLevel === 'medium'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-red-100 text-red-700';
        return <span className={`px-2 py-1 rounded text-xs ${badge}`}>{client.riskLevel === 'low' ? 'Bajo' : client.riskLevel === 'medium' ? 'Medio' : 'Alto'}</span>;
      }
    },
  ];

  // Acciones de la tabla
  const tableActions = (client: any) => (
    <div className="flex justify-end space-x-2">
      <button onClick={() => handleEdit(client)} className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 hover:text-blue-900 dark:hover:text-white transition" title="Editar cliente"><HiOutlinePencil className="h-4 w-4" /></button>
      <button onClick={() => handleDelete(client.id)} className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/60 hover:text-red-900 dark:hover:text-white transition" title="Eliminar cliente"><HiOutlineTrash className="h-4 w-4" /></button>
    </div>
  );

  // Campos del modal reutilizable
  const emptyClient = {
    id: '',
    name: '',
    email: '',
    walletBalance: 0,
    userType: 'regular' as const,
    status: 'active' as const,
    kycStatus: 'pending' as const,
    riskLevel: 'low' as const,
  };

  const clientData = { ...emptyClient, ...selectedClient };

  const modalFields = [
    {
      name: 'name',
      label: 'Nombre',
      value: clientData.name,
      onChange: (v: string) => onSetSelectedClient({ ...clientData, name: v }),
    },
    {
      name: 'email',
      label: 'Email',
      value: clientData.email,
      onChange: (v: string) => onSetSelectedClient({ ...clientData, email: v }),
    },
    {
      name: 'walletBalance',
      label: 'Balance',
      type: 'number',
      value: clientData.walletBalance,
      onChange: (v: string) => onSetSelectedClient({ ...clientData, walletBalance: Number(v) }),
    },
    {
      name: 'userType',
      label: 'Tipo',
      type: 'select',
      value: clientData.userType,
      onChange: (v: string) => onSetSelectedClient({ ...clientData, userType: v as typeof clientData.userType }),
      options: [
        { value: 'regular', label: 'Regular' },
        { value: 'premium', label: 'Premium' },
      ]
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      value: clientData.status,
      onChange: (v: string) => onSetSelectedClient({ ...clientData, status: v as typeof clientData.status }),
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' },
        { value: 'suspended', label: 'Suspendido' },
      ]
    },
    {
      name: 'kycStatus',
      label: 'KYC',
      type: 'select',
      value: clientData.kycStatus,
      onChange: (v: string) => onSetSelectedClient({ ...clientData, kycStatus: v as typeof clientData.kycStatus }),
      options: [
        { value: 'pending', label: 'Pendiente' },
        { value: 'verified', label: 'Verificado' },
        { value: 'rejected', label: 'Rechazado' },
      ]
    },
    {
      name: 'riskLevel',
      label: 'Riesgo',
      type: 'select',
      value: clientData.riskLevel,
      onChange: (v: string) => onSetSelectedClient({ ...clientData, riskLevel: v as typeof clientData.riskLevel }),
      options: [
        { value: 'low', label: 'Bajo' },
        { value: 'medium', label: 'Medio' },
        { value: 'high', label: 'Alto' },
      ]
    },
  ];

  // Botones personalizados para los filtros
  const filterButtons: FiltersListButton[] = [
    {
      label: 'Limpiar',
      icon: <HiOutlineTrash className="h-5 w-5" />,
      onClick: () => onSetFilters({}),
      className: 'flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold shadow-sm transition border border-gray-300 dark:border-gray-600',
    },
    {
      label: 'Nuevo Cliente',
      icon: <HiOutlinePlusCircle className="h-5 w-5" />,
      onClick: () => {
        setModalOpen(true);
        onSetSelectedClient(null);
      },
      className: 'flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition',
    },
  ];

  return (
    <div className="p-6">
      <FiltersList
        fields={filterFields}
        buttons={filterButtons}
      />
      <TableList columns={columns} data={clients} loading={isLoading} error={error?.message} actions={tableActions} />
      {pagination && (
        <PaginationList
          page={pagination.page}
          pages={pagination.pages}
          perPage={perPage}
          total={pagination.total}
          onPageChange={handlePageChange}
        />
      )}
      <ModalForm
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={selectedClient?.id ? 'Editar Cliente' : 'Nuevo Cliente'}
        fields={modalFields}
        onSubmit={e => {
          e.preventDefault();
          handleSave(selectedClient);
        }}
        submitLabel="Guardar"
        cancelLabel="Cancelar"
      />
    </div>
  );
};

export default ClientsListPage;