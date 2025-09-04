import { getStatusOperationBadge } from '@/modules/shared/utils/index';
import { getOperationIcon } from '@/modules/shared/utils/operation';

import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import type { OperationType } from '../types/index';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/modules/shared/store/hooks';
import { fetchWalletTransactions } from '../store/thunks/walletThunks';
import DataLoader from '@/modules/shared/components/DataLoader';


export default function WalletPayments() {
  const dispatch = useAppDispatch();
  const { transactions, isLoading, error } = useAppSelector((state) => state.wallet);
  const [filter, setFilter] = useState<OperationType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchWalletTransactions({}));
  }, [dispatch]);

  const filteredOperations = transactions.filter((op) => {
    const matchesFilter = filter === 'all' || op.type === filter;
    const matchesSearch =
      (op.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <DataLoader
      isLoading={isLoading}
      error={error}
      empty={filteredOperations.length === 0}
      emptyMessage="No se encontraron operaciones"
      loadingMessage="Cargando operaciones..."
    >
      <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <HiOutlineMagnifyingGlass className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar por usuario o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="sm:w-48">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as OperationType)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Todas las operaciones</option>
                <option value="recharge">Recargas</option>
                <option value="payment">Pagos</option>
                <option value="refund">Reembolsos</option>
                <option value="subscription">Abonos</option>
                <option value="qr_generation">Generación QR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Operaciones */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide">
                Operación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide">
                Origen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
            {filteredOperations.map((operation) => (
              <tr key={operation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getOperationIcon(operation.type)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {operation.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {operation.clientName ?? '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {operation.amount ? `€${operation.amount.toFixed(2)}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusOperationBadge(operation.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(operation.createdAt).toLocaleString('es-ES')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Monedero
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </DataLoader>
  );
}