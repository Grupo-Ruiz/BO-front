import { useEffect, useState, useRef } from 'react';
import TableList from '@/modules/shared/components/TableList';
import FiltersList from '@/modules/shared/components/FiltersList';
import PaginationList from '@/modules/shared/components/PaginationList';
import { ModalForm } from '@/modules/shared/components/ModalForm';
import type { Client, ClientCreateData } from '../types';
import { useAppSelector, useAppDispatch } from '@/modules/shared/store/hooks';

import { useClientFunctions } from '../hooks/useClientFunctions';
import { useClientsListPage } from '../hooks/useClientsListPage';
import { fetchClients } from '../store/clientsThunks';

export default function ClientsListPage() {
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state) => state.clients.clients);
  const isLoading = useAppSelector((state) => state.clients.isLoading);
  const pagination = useAppSelector((state) => state.clients.pagination);
  const error = useAppSelector((state) => state.clients.error);
  const filters = useAppSelector((state) => state.clients.filters);

  // Lógica de negocio (CRUD, selección, modal)
  const {
    selectedClient,
    setSelectedClient,
    isModalOpen,
    setIsModalOpen,
    modalMode,
    handleModalSave,
    handleModalEdit,
    handleCreateClient,
    handleEditClient,
    handleDeleteClient,
  } = useClientFunctions();

  // Estado y lógica de formulario para el modal
  const [formData, setFormData] = useState<Client | ClientCreateData>({
    name: '',
    email: '',
    walletBalance: 0,
    userType: 'regular',
    status: 'active',
    riskLevel: 'low',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isModalOpen && modalMode === 'edit' && selectedClient) {
      setFormData({ ...selectedClient });
      setErrors({});
    } else if (isModalOpen && modalMode === 'create') {
      setFormData({
        name: '',
        email: '',
        walletBalance: 0,
        userType: 'regular',
        status: 'active',
        riskLevel: 'low',
      });
      setErrors({});
    }
  }, [isModalOpen, selectedClient, modalMode]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email?.trim()) newErrors.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'El email no es válido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof (Client | ClientCreateData)) => (value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (modalMode === 'create') {
        await handleModalSave(formData as ClientCreateData);
      } else if (modalMode === 'edit' && selectedClient) {
        await handleModalEdit(formData as Client, selectedClient.id);
      }
      setIsModalOpen(false);
      setSelectedClient(null);
    } catch (error) {
      // setErrors({ api: 'Error al guardar cliente' });
    } finally {
      setLoading(false);
    }
  };

  // Estados de UI
  const [searchTerm, setSearchTermState] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [selectedStatus, setSelectedStatusState] = useState('');
  const [perPage, setPerPageState] = useState(10);
  const [page, setPage] = useState(1);

  // Setters que reinician la página
  const setSearchTerm = (v: string) => {
    setSearchTermState(v);
    setPage(1);
  };
  const setSelectedStatus = (v: string) => {
    setSelectedStatusState(v);
    setPage(1);
  };
  const setPerPage = (v: number) => {
    setPerPageState(v);
    setPage(1);
  };

  // Debounce para búsqueda
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => { if (debounceTimeout.current) clearTimeout(debounceTimeout.current); };
  }, [searchTerm]);

  // Fetch de clientes
  useEffect(() => {
    dispatch(fetchClients({
      filters: { ...filters, search: debouncedSearch, status: selectedStatus, per_page: perPage, page },
    }));
  }, [filters, debouncedSearch, selectedStatus, perPage, page]);

  // Lógica de UI del listado (columnas, filtros)
  const { filterFields, columns, filterButtons, fieldsClientForm, tableActions } = useClientsListPage({
    perPage,
    searchTerm,
    selectedStatus,
    setSearchTerm,
    setSelectedStatus,
    setPerPage,
    onPerPageChange: (value) => setPerPage(value),
    onNewClient: handleCreateClient,
    onEditClient: handleEditClient,
    onDeleteClient: handleDeleteClient,
  });

  // Mapear los campos del formulario con valores y handlers, tipado seguro
  type ClientFieldName = keyof (Client | ClientCreateData);
  
  const clientFormFields = fieldsClientForm.map(field => {
    const name = field.name as ClientFieldName;
    return {
      ...field,
      value: formData[name] ?? '',
      onChange: handleChange(name),
      error: errors[name] ?? '',
    };
  });

  return (
    <div className="p-6">

      <FiltersList fields={filterFields} buttons={filterButtons} />

      <TableList columns={columns} data={clients} loading={isLoading} error={error?.message} actions={tableActions} />

      {pagination && (
        <PaginationList
          page={page}
          pages={pagination.pages}
          perPage={perPage}
          total={pagination.total}
          onPageChange={p => setPage(p)}
        />
      )}

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClient(null);
        }}
        title={modalMode === 'edit' ? 'Editar Cliente' : 'Nuevo Cliente'}
        fields={clientFormFields}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Guardar"
        cancelLabel="Cancelar"
      />
      
    </div>
  );
}