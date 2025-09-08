import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/modules/shared/store/hooks';
import DataLoader from '@/modules/shared/components/DataLoader';
import { fetchCards } from '../../cards/store/cardsThunks';
import { fetchWalletTransactions } from '../store/walletThunks';
import { getStatusOperationBadge } from '@/modules/shared/utils/index';
import { getOperationIcon } from '@/modules/shared/utils/operation';
import { HiOutlineCreditCard, HiOutlineBanknotes, HiOutlineClock, HiOutlineQrCode } from 'react-icons/hi2';


export default function WalletDashboard() {
  const dispatch = useAppDispatch();
  const { cards, isLoading: loadingCards, error: errorCards } = useAppSelector((state) => state.cards);
  const { transactions, isLoading: loadingTx, error: errorTx } = useAppSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(fetchCards());
    dispatch(fetchWalletTransactions({}));
  }, [dispatch]);

  return (
    <DataLoader
      isLoading={loadingCards || loadingTx}
      error={errorCards || errorTx}
      empty={cards.length === 0 && transactions.length === 0}
      emptyMessage="No hay datos de tarjetas ni operaciones"
      loadingMessage="Cargando datos..."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* Tarjetas Activas */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <HiOutlineCreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Tarjetas Activas
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {cards.filter((c: any) => c.status === 'active').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Saldo Total */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <HiOutlineBanknotes className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Saldo Total
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      €{cards.reduce((sum: number, card: any) => sum + card.balance, 0).toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Operaciones Hoy */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <HiOutlineClock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Operaciones Hoy
                    </dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {transactions.filter((op: any) => new Date(op.createdAt).toDateString() === new Date().toDateString()).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder para otra métrica */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <HiOutlineQrCode className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">QRs Generados</dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      0
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Operations */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Operaciones Recientes
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Últimas transacciones y operaciones del sistema
            </p>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.slice(0, 10).map((operation: any) => (
              <li key={operation.id} className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getOperationIcon(operation.type)}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {operation.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {operation.clientName ?? '-'} • {new Date(operation.createdAt).toLocaleString('es-ES')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {operation.amount && (
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        €{operation.amount.toFixed(2)}
                      </span>
                    )}
                    {getStatusOperationBadge(operation.status)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DataLoader>
  );
}