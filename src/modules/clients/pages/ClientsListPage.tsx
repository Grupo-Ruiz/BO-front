import React, { useState } from 'react';
import { useClientsList } from '../hooks/useClientsList';
import Table from '../components/Table';
import ListHeader from '@/modules/shared/components/ListHeader';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import DataLoader from '@/modules/shared/components/DataLoader';

const ClientsListPage: React.FC = () => {
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

  React.useEffect(() => {
    loadClients(filters);
    // eslint-disable-next-line
  }, [filters, pagination?.page, pagination?.per_page]);

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
    onSetPagination(page, pagination?.per_page || 10);
  };

  return (
    <div className="p-6">
      <ListHeader
        title="Clientes"
        fields={[ 
          { type: 'input', name: 'search', label: 'Buscar', placeholder: 'Nombre o email...' },
          { type: 'select', name: 'status', label: 'Estado', options: [
            { value: 'active', label: 'Activo' },
            { value: 'inactive', label: 'Inactivo' },
            { value: 'suspended', label: 'Suspendido' },
          ] },
          { type: 'select', name: 'kycStatus', label: 'KYC', options: [
            { value: 'verified', label: 'Verificado' },
            { value: 'pending', label: 'Pendiente' },
            { value: 'rejected', label: 'Rechazado' },
          ] },
          { type: 'select', name: 'riskLevel', label: 'Riesgo', options: [
            { value: 'low', label: 'Bajo' },
            { value: 'medium', label: 'Medio' },
            { value: 'high', label: 'Alto' },
          ] },
        ]}
        values={filters}
        onChange={onSetFilters}
        onNew={() => setModalOpen(true)}
        newLabel="Nuevo Cliente"
      />
      <DataLoader isLoading={isLoading} error={error?.message} empty={clients.length === 0} emptyMessage="No hay clientes registrados">
        <Table clients={clients} onEdit={handleEdit} onDelete={handleDelete} />
      </DataLoader>
      {pagination && (
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      )}
      <Modal
        open={modalOpen}
        client={selectedClient}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default ClientsListPage;
