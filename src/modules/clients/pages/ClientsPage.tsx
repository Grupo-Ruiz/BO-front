import { useState } from 'react';
import { useClients } from '../hooks/useClients';

import { HiOutlinePlus, HiOutlineMagnifyingGlass, HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiOutlineNoSymbol, HiOutlineCheckCircle, HiOutlineCreditCard, HiOutlineBanknotes, HiOutlineUser } from 'react-icons/hi2';
import type { Client } from '../types';

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
  suspended: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
};

const kycStatusColors = {
  verified: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
};

const riskLevelColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
};

export default function ClientsPage() {
  const { clients, isLoading, error, applyFilters, suspendClient, activateClient } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedKycStatus, setSelectedKycStatus] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({
      search: searchTerm || undefined,
      status: selectedStatus as any || undefined,
      kycStatus: selectedKycStatus as any || undefined
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('');
    setSelectedKycStatus('');
    applyFilters({});
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusChange = async (clientId: string, newStatus: 'active' | 'suspended') => {
    if (newStatus === 'suspended') {
      await suspendClient(clientId);
    } else {
      await activateClient(clientId);
    }
  };

  const ClientDetailsModal = () => {
    if (!selectedClient) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Detalles del Cliente
                </h2>
                <p className="text-gray-600 dark:text-gray-400">ID: {selectedClient.id}</p>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información Personal */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Información Personal
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Nombre</label>
                    <p className="text-gray-900 dark:text-white">{selectedClient.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                    <p className="text-gray-900 dark:text-white">{selectedClient.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Teléfono</label>
                    <p className="text-gray-900 dark:text-white">{selectedClient.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Documento</label>
                    <p className="text-gray-900 dark:text-white">
                      {selectedClient.documentType}: {selectedClient.documentNumber}
                    </p>
                  </div>
                  {selectedClient.address && (
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400">Dirección</label>
                      <p className="text-gray-900 dark:text-white">{selectedClient.address}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Ciudad/País</label>
                    <p className="text-gray-900 dark:text-white">
                      {selectedClient.city ? `${selectedClient.city}, ` : ''}{selectedClient.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Información de la Cuenta */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Información de la Cuenta
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Balance</label>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(selectedClient.walletBalance)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Tipo de Usuario</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      selectedClient.userType === 'premium' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {selectedClient.userType === 'premium' ? 'Premium' : 'Regular'}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Estado</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[selectedClient.status]}`}>
                      {selectedClient.status === 'active' ? 'Activo' : 
                       selectedClient.status === 'inactive' ? 'Inactivo' : 'Suspendido'}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Estado KYC</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${kycStatusColors[selectedClient.kycStatus]}`}>
                      {selectedClient.kycStatus === 'verified' ? 'Verificado' : 
                       selectedClient.kycStatus === 'pending' ? 'Pendiente' : 'Rechazado'}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Nivel de Riesgo</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${riskLevelColors[selectedClient.riskLevel]}`}>
                      {selectedClient.riskLevel === 'low' ? 'Bajo' : 
                       selectedClient.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">Total Transacciones</label>
                    <p className="text-gray-900 dark:text-white">{selectedClient.totalTransactions}</p>
                  </div>
                  {selectedClient.lastTransactionDate && (
                    <div>
                      <label className="text-sm text-gray-500 dark:text-gray-400">Última Transacción</label>
                      <p className="text-gray-900 dark:text-white">
                        {formatDate(selectedClient.lastTransactionDate)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cerrar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Editar Cliente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Gestión de Clientes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra los clientes de la aplicación
          </p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <HiOutlinePlus className="h-5 w-5" />
          Nuevo Cliente
        </button>
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
              Estado
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="suspended">Suspendido</option>
            </select>
          </div>

          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estado KYC
            </label>
            <select
              value={selectedKycStatus}
              onChange={(e) => setSelectedKycStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos</option>
              <option value="verified">Verificado</option>
              <option value="pending">Pendiente</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Clientes</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {clients.length}
              </p>
            </div>
            <HiOutlineUser className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Clientes Activos</p>
              <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                {clients.filter(c => c.status === 'active').length}
              </p>
            </div>
            <HiOutlineCheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">KYC Verificados</p>
              <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                {clients.filter(c => c.kycStatus === 'verified').length}
              </p>
            </div>
            <HiOutlineCreditCard className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Balance Total</p>
              <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                {formatCurrency(clients.reduce((acc, c) => acc + c.walletBalance, 0))}
              </p>
            </div>
            <HiOutlineBanknotes className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando clientes...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 dark:text-red-400">
            Error: {error}
          </div>
        ) : clients.length === 0 ? (
          <div className="p-8 text-center text-gray-600 dark:text-gray-400">
            No se encontraron clientes
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    KYC
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Riesgo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {client.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {client.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(client.walletBalance)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        client.userType === 'premium' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {client.userType === 'premium' ? 'Premium' : 'Regular'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[client.status]}`}>
                        {client.status === 'active' ? 'Activo' : 
                         client.status === 'inactive' ? 'Inactivo' : 'Suspendido'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${kycStatusColors[client.kycStatus]}`}>
                        {client.kycStatus === 'verified' ? 'Verificado' : 
                         client.kycStatus === 'pending' ? 'Pendiente' : 'Rechazado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${riskLevelColors[client.riskLevel]}`}>
                        {client.riskLevel === 'low' ? 'Bajo' : 
                         client.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedClient(client);
                            setShowDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Ver detalles"
                        >
                          <HiOutlineEye className="h-4 w-4" />
                        </button>

                        <button
                          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                          title="Editar"
                        >
                          <HiOutlinePencil className="h-4 w-4" />
                        </button>

                        {client.status === 'active' ? (
                          <button
                            onClick={() => handleStatusChange(client.id, 'suspended')}
                            className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
                            title="Suspender"
                          >
                            <HiOutlineNoSymbol className="h-4 w-4" />
                          </button>
                        ) : client.status === 'suspended' ? (
                          <button
                            onClick={() => handleStatusChange(client.id, 'active')}
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                            title="Activar"
                          >
                            <HiOutlineCheckCircle className="h-4 w-4" />
                          </button>
                        ) : null}

                        <button
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          title="Eliminar"
                        >
                          <HiOutlineTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDetails && <ClientDetailsModal />}
    </div>
  );
}
