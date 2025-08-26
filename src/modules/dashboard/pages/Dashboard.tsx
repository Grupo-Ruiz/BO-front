import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MockAPIService } from '@/modules/shared/services/mockApi';
import type { KPI } from '@/modules/shared/types';
import { HiOutlineUsers, HiOutlineCreditCard, HiOutlineBanknotes, HiOutlineChartBar } from 'react-icons/hi2';

const iconMap = {
  'Usuarios Activos': HiOutlineUsers,
  'Transacciones Diarias': HiOutlineCreditCard,
  'Ingresos Mensuales': HiOutlineBanknotes,
  'Tickets Vendidos': HiOutlineChartBar,
};

export default function Dashboard() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const data = await MockAPIService.getKPIs();
        setKpis(data);
      } catch (error) {
        console.error('Error fetching KPIs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, []);

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
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Resumen general del sistema Yurni
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const IconComponent = iconMap[kpi.name as keyof typeof iconMap] || HiOutlineChartBar;
          return (
            <div
              key={kpi.id}
              className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 sm:p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <IconComponent
                    className="h-8 w-8 text-gray-400 dark:text-gray-500"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                      {kpi.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {kpi.name === 'Ingresos Mensuales' 
                          ? `€${kpi.value.toLocaleString()}` 
                          : kpi.value.toLocaleString()}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold">
                        <span
                          className={`${
                            kpi.changeType === 'increase'
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}
                        >
                          {kpi.changeType === 'increase' ? '+' : '-'}
                          {Math.abs(kpi.change ?? 0)}%
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">vs {(kpi.period ?? '').toLowerCase()}</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm dark:shadow-gray-900/20 flex items-center space-x-3 hover:border-gray-400 dark:hover:border-gray-500 focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900 focus-within:ring-primary-500">
            <div className="flex-shrink-0">
              <HiOutlineUsers className="h-10 w-10 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1 min-w-0">
              <Link to="/users" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Gestionar Usuarios</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ver y editar usuarios</p>
              </Link>
            </div>
          </div>

          <div className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm dark:shadow-gray-900/20 flex items-center space-x-3 hover:border-gray-400 dark:hover:border-gray-500 focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900 focus-within:ring-primary-500">
            <div className="flex-shrink-0">
              <HiOutlineCreditCard className="h-10 w-10 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1 min-w-0">
              <Link to="/cards" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Gestión de Tarjetas</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tarjetas, operaciones y pagos</p>
              </Link>
            </div>
          </div>

          <div className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-5 shadow-sm dark:shadow-gray-900/20 flex items-center space-x-3 hover:border-gray-400 dark:hover:border-gray-500 focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900 focus-within:ring-primary-500">
            <div className="flex-shrink-0">
              <HiOutlineChartBar className="h-10 w-10 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1 min-w-0">
              <Link to="/kpis" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Ver KPIs</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Analíticas detalladas</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Actividad Reciente</h2>
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/20 overflow-hidden sm:rounded-md border border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-2 w-2 bg-green-400 rounded-full"></div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Usuario registrado</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">María García se ha registrado</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Hace 2 min</div>
              </div>
            </li>
            <li className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-2 w-2 bg-blue-400 rounded-full"></div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Recarga de monedero</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Juan López recargó €20.00</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Hace 5 min</div>
              </div>
            </li>
            <li className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-2 w-2 bg-yellow-400 rounded-full"></div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Compra de billete</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ana Martínez compró billete sencillo</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Hace 10 min</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}