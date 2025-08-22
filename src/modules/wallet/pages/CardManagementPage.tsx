import { useEffect, useState } from 'react';
import { MockAPIService } from '@/modules/shared/services/mockApi';

import { HiOutlineCreditCard, HiOutlineQrCode, HiOutlinePlus, HiOutlineMinus, HiOutlineArrowPath, HiOutlineMagnifyingGlass, HiOutlineDocumentText, HiOutlineBanknotes, HiOutlineClock } from 'react-icons/hi2';
import type { SAEOperation, WalletOperation } from '@/modules/shared/types';
import type { Payment } from '@/modules/shared/types';

type TabType = 'dashboard' | 'operations' | 'payments' | 'cards' | 'qr-generator';
type OperationType = 'all' | 'recharge' | 'payment' | 'refund' | 'subscription' | 'qr_generation';

interface CardInfo {
  id: string;
  userId: string;
  userName: string;
  cardNumber: string;
  balance: number;
  type: 'sencillo' | 'mensual' | 'anual';
  status: 'active' | 'inactive' | 'blocked';
  expiryDate: string;
  lastUsed: string;
}

// Tipo unificado para todas las operaciones
interface UnifiedOperation {
  id: string;
  userId: string;
  userName: string;
  type: string;
  description: string;
  amount?: number;
  timestamp: string;
  status: string;
  source: 'wallet' | 'payment' | 'sae';
  reference?: string;
  method?: string;
}

export default function CardManagementPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [operations, setOperations] = useState<WalletOperation[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [saeOperations, setSaeOperations] = useState<SAEOperation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OperationType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for cards
  const [cards] = useState<CardInfo[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Juan Pérez',
      cardNumber: '4532-****-****-1234',
      balance: 25.50,
      type: 'mensual',
      status: 'active',
      expiryDate: '2025-12-31',
      lastUsed: '2024-08-04T10:30:00Z'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'María García',
      cardNumber: '4532-****-****-5678',
      balance: 5.75,
      type: 'sencillo',
      status: 'active',
      expiryDate: '2025-06-30',
      lastUsed: '2024-08-03T15:45:00Z'
    }
  ]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [walletOps, paymentOps, saeOps] = await Promise.all([
        MockAPIService.getWalletOperations(),
        MockAPIService.getPayments(),
        MockAPIService.getSAEOperations(),
      ]);
      
      setOperations(walletOps);
      setPayments(paymentOps);
      setSaeOperations(saeOps);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Combinar todas las operaciones para el dashboard con normalización
  const allOperations: UnifiedOperation[] = [
    ...operations.map(op => ({
      id: op.id,
      userId: op.userId ?? '',
      userName: op.userName ?? '',
      type: op.type ?? '',
      description: op.type ?? '', // Ajusta si tienes descripción en WalletOperation
      amount: op.amount ?? 0,
      timestamp: op.timestamp ?? op.date ?? '',
      status: 'completed', // Ajusta si tienes status en WalletOperation
      source: 'wallet' as const,
      reference: undefined,
      method: undefined
    })),
    ...payments.map(op => ({
      id: op.id,
      userId: op.userId ?? '',
      userName: op.userName ?? '',
      type: 'payment',
      description: op.reference ?? '', // Ajusta si tienes descripción en Payment
      amount: op.amount ?? 0,
      timestamp: op.date ?? '',
      status: op.status ?? '',
      source: 'payment' as const,
      reference: op.reference,
      method: op.method
    })),
    ...saeOperations.map(op => ({
      id: op.id,
      userId: op.userId ?? '',
      userName: op.userName ?? '',
      type: op.type ?? '',
      description: op.description ?? '',
      amount: op.amount ?? 0,
      timestamp: op.timestamp ?? op.date ?? '',
      status: op.status ?? '',
      source: 'sae' as const,
      reference: op.saeReference,
      method: undefined
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const filteredOperations = allOperations.filter(op => {
    const matchesFilter = filter === 'all' || op.type === filter;
    const matchesSearch = op.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         op.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'recharge':
        return <HiOutlinePlus className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'payment':
        return <HiOutlineMinus className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'refund':
        return <HiOutlineArrowPath className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'subscription_recharge':
      case 'subscription':
        return <HiOutlineCreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'qr_generation':
      case 'qr_scan':
        return <HiOutlineQrCode className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <HiOutlineDocumentText className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            Completado
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
            Pendiente
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
            Fallido
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {status}
          </span>
        );
    }
  };

  const getCardTypeBadge = (type: string) => {
    const badges = {
      'sencillo': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'mensual': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'anual': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[type as keyof typeof badges]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: HiOutlineDocumentText },
    { id: 'operations', name: 'Operaciones', icon: HiOutlineClock },
    { id: 'payments', name: 'Pagos', icon: HiOutlineBanknotes },
    { id: 'cards', name: 'Tarjetas', icon: HiOutlineCreditCard },
    { id: 'qr-generator', name: 'Generar QR', icon: HiOutlineQrCode },
  ];

  const DashboardTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HiOutlineCreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Tarjetas Activas</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">{cards.filter(c => c.status === 'active').length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HiOutlineBanknotes className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Saldo Total</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    €{cards.reduce((sum, card) => sum + card.balance, 0).toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HiOutlineClock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Operaciones Hoy</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {allOperations.filter(op => 
                      new Date(op.timestamp).toDateString() === new Date().toDateString()
                    ).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

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
                    {saeOperations.filter(op => op.type === 'qr_generation').length}
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
          {allOperations.slice(0, 10).map((operation) => (
            <li key={`${operation.source}-${operation.id}`} className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
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
                      {operation.userName} • {new Date(operation.timestamp).toLocaleString('es-ES')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {operation.amount && (
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      €{operation.amount.toFixed(2)}
                    </span>
                  )}
                  {getStatusBadge(operation.status)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const OperationsTab = () => (
    <div className="space-y-6">
      {/* Filters */}
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

      {/* Operations Table */}
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
              <tr key={`${operation.source}-${operation.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
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
                  {operation.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {operation.amount ? `€${operation.amount.toFixed(2)}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(operation.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(operation.timestamp).toLocaleString('es-ES')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    operation.source === 'wallet' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                    operation.source === 'payment' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                    'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                  }`}>
                    {operation.source === 'wallet' ? 'Monedero' : 
                     operation.source === 'payment' ? 'Pago' : 'SAE'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CardsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <HiOutlineCreditCard className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{card.cardNumber}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{card.userName}</p>
                  </div>
                </div>
                {getCardTypeBadge(card.type)}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Saldo:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">€{card.balance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Vence:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(card.expiryDate).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Último uso:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(card.lastUsed).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Estado:</span>
                  <span className={`text-sm font-medium ${
                    card.status === 'active' ? 'text-green-600 dark:text-green-400' :
                    card.status === 'inactive' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {card.status === 'active' ? 'Activa' : 
                     card.status === 'inactive' ? 'Inactiva' : 'Bloqueada'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                  Ver Detalles
                </button>
                <button className="flex-1 px-3 py-2 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                  Recargar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const QRGeneratorTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Generar Código QR</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de QR
                </label>
                <select className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white">
                  <option value="single">Billete Sencillo</option>
                  <option value="subscription">Recarga Abono</option>
                  <option value="validation">Validación</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  placeholder="Buscar usuario..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monto (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors">
                Generar QR
              </button>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                <div className="text-center">
                  <HiOutlineQrCode className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">El código QR aparecerá aquí</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent QR Codes */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Códigos QR Recientes
          </h3>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {saeOperations.filter(op => op.type === 'qr_generation').slice(0, 5).map((qr) => (
            <li key={qr.id} className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HiOutlineQrCode className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {qr.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {qr.userName} • {qr.timestamp ? new Date(qr.timestamp).toLocaleString('es-ES') : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    €{qr.amount !== undefined ? qr.amount.toFixed(2) : '0.00'}
                  </span>
                  {getStatusBadge(qr.status ?? '')}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Gestión de Tarjetas y Operaciones
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Panel unificado para gestión de tarjetas, abonos, operaciones, pagos y códigos QR
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8 border-b border-gray-200 dark:border-gray-700" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'operations' && <OperationsTab />}
      {activeTab === 'payments' && <OperationsTab />}
      {activeTab === 'cards' && <CardsTab />}
      {activeTab === 'qr-generator' && <QRGeneratorTab />}
    </div>
  );
}
