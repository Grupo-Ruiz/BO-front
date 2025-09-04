import DataLoader from '@/modules/shared/components/DataLoader';

import React from 'react';
import { useClientsList } from '@/modules/clients/hooks/useClientsList';
import Table from '@/modules/clients/components/Table';
import Filters from '@/modules/clients/components/Filters';
import Pagination from '@/modules/clients/components/Pagination';
import Modal from '@/modules/clients/components/Modal';

export default function WalletClients() {
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

  const [modalOpen, setModalOpen] = React.useState(false);

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
      <h1 className="text-2xl font-bold mb-4">Clientes Wallet</h1>
      <Filters filters={filters} onChange={onSetFilters} />
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
}