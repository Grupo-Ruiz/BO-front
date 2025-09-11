import type { FilterField, FiltersListButton } from '@/modules/shared/components/FiltersList';
import type { TableColumn } from '@/modules/shared/components/TableList';
import { HiOutlineMagnifyingGlass, HiOutlineTrash, HiOutlinePlusCircle, HiOutlinePencil } from 'react-icons/hi2';
import type { UseClientsListPageProps } from '../types';

import { HiOutlineUser, HiOutlineEnvelope, HiOutlineCurrencyDollar, HiOutlineIdentification, HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';

export function useClientsListPage({
  perPage,
  searchTerm,
  selectedStatus,
  setSearchTerm,
  setSelectedStatus,
  setPerPage,
  onPerPageChange,
  onNewClient,
  onEditClient,
  onDeleteClient,
}: UseClientsListPageProps) {
  const showPaginationFilter = true;

  // Campos de filtro de la tabla
  const filterFields: FilterField[] = [
    {
      type: 'input',
      name: 'search',
      label: 'Buscar',
      value: searchTerm,
      onChange: setSearchTerm,
      placeholder: 'Buscar por nombre, email o documento...',
      icon: <HiOutlineMagnifyingGlass className="h-5 w-5 text-gray-400" />,
    },
    {
      type: 'select',
      name: 'status',
      label: 'Estado',
      value: selectedStatus,
      onChange: setSelectedStatus,
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' },
        { value: 'suspended', label: 'Suspendido' },
      ],
    },
    ...(showPaginationFilter ? [{
      type: 'select' as const,
      name: 'perPage',
      label: 'Mostrar',
      value: String(perPage ?? 10),
      onChange: (v: string | number) => onPerPageChange(Number(v)),
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

  // Botones de acción del filtro
  const filterButtons: FiltersListButton[] = [
    {
      label: 'Limpiar',
      icon: <HiOutlineTrash className="h-5 w-5" />,
      onClick: () => {
        setSearchTerm('');
        setSelectedStatus('');
        setPerPage(10);
      },
      className: 'flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold shadow-sm transition border border-gray-300 dark:border-gray-600',
    },
    {
      label: 'Nuevo Cliente',
      icon: <HiOutlinePlusCircle className="h-5 w-5" />,
      onClick: onNewClient,
      className: 'flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition',
    },
  ];

  // Definición de columnas
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
          € {client.walletBalance}
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

  const fieldsClientForm = [
    {
      name: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del cliente',
      icon: <HiOutlineUser className="h-4 w-4 text-gray-400/80" style={{ opacity: 0.7 }} />,
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Correo electrónico',
      icon: <HiOutlineEnvelope className="h-4 w-4 text-gray-400/80" style={{ opacity: 0.7 }} />,
    },
    {
      name: 'walletBalance',
      label: 'Balance',
      type: 'number',
      placeholder: 'Balance inicial',
      icon: <HiOutlineCurrencyDollar className="h-4 w-4 text-gray-400/80" style={{ opacity: 0.7 }} />,
    },
    {
      name: 'userType',
      label: 'Tipo',
      type: 'select',
      options: [
        { value: 'regular', label: 'Regular' },
        { value: 'premium', label: 'Premium' },
      ],
      icon: <HiOutlineIdentification className="h-4 w-4 text-gray-400/80" style={{ opacity: 0.7 }} />,
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' },
        { value: 'suspended', label: 'Suspendido' },
      ],
      icon: <HiOutlineAdjustmentsHorizontal className="h-4 w-4 text-gray-400/80" style={{ opacity: 0.7 }} />,
    },
    {
      name: 'riskLevel',
      label: 'Riesgo',
      type: 'select',
      options: [
        { value: 'low', label: 'Bajo' },
        { value: 'medium', label: 'Medio' },
        { value: 'high', label: 'Alto' },
      ],
      icon: <HiOutlineAdjustmentsHorizontal className="h-4 w-4 text-gray-400/80" style={{ opacity: 0.7 }} />,
    },
  ];

  // Acciones de la tabla del filtro
  const tableActions = (client: any) => (
    <div className="flex justify-end space-x-2">
      <button onClick={() => onEditClient(client)} className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 hover:text-blue-900 dark:hover:text-white transition" title="Editar cliente"><HiOutlinePencil className="h-4 w-4" /></button>
      <button onClick={() => onDeleteClient(client.id)} className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/60 hover:text-red-900 dark:hover:text-white transition" title="Eliminar cliente"><HiOutlineTrash className="h-4 w-4" /></button>
    </div>
  );

  return {
    filterFields,
    columns,
    filterButtons,
    tableActions,
    fieldsClientForm,
  };
}