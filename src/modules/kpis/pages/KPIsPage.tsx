import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { MockAPIService } from '@/modules/shared/services/mockApi';
import type { KPI } from '@/modules/shared/types';

// Mock data for charts
const monthlyData = [
  { name: 'Ene', usuarios: 12000, ingresos: 35000, transacciones: 2500 },
  { name: 'Feb', usuarios: 13500, ingresos: 42000, transacciones: 2800 },
  { name: 'Mar', usuarios: 14200, ingresos: 38000, transacciones: 2600 },
  { name: 'Abr', usuarios: 15100, ingresos: 45000, transacciones: 3100 },
  { name: 'May', usuarios: 15420, ingresos: 45620, transacciones: 2847 },
];

const ticketTypesData = [
  { name: 'Billetes Sencillos', value: 65, color: '#3b82f6' },
  { name: 'Abonos Mensuales', value: 25, color: '#10b981' },
  { name: 'Abonos Anuales', value: 10, color: '#f59e0b' },
];

const userActivityData = [
  { name: 'Lun', activos: 2400, nuevos: 240 },
  { name: 'Mar', activos: 1398, nuevos: 139 },
  { name: 'Mié', activos: 9800, nuevos: 980 },
  { name: 'Jue', activos: 3908, nuevos: 390 },
  { name: 'Vie', activos: 4800, nuevos: 480 },
  { name: 'Sáb', activos: 3800, nuevos: 380 },
  { name: 'Dom', activos: 4300, nuevos: 430 },
];

export default function KPIsPage() {
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
          KPIs y Analíticas
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Métricas clave y visualizaciones del rendimiento de la plataforma Yurni
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
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
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {kpi.changeType === 'increase' ? '+' : '-'}
                          {typeof kpi.change === 'number' ? Math.abs(kpi.change) : 0}%
                        </span>
                      </div>
                    </dd>
                    <dd className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      vs {typeof kpi.period === 'string' ? kpi.period.toLowerCase() : ''}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Trends */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/20">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tendencias Mensuales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'ingresos') return [`€${value.toLocaleString()}`, 'Ingresos'];
                  return [value.toLocaleString(), name === 'usuarios' ? 'Usuarios' : 'Transacciones'];
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="usuarios" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Usuarios"
              />
              <Line 
                type="monotone" 
                dataKey="ingresos" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Ingresos"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Ticket Types Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/20">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Distribución de Tipos de Billetes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketTypesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name: string; percent?: number }) => 
                  `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ticketTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Width Charts */}
      <div className="space-y-8">
        {/* Weekly User Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/20">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Actividad Semanal de Usuarios</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  value.toLocaleString(), 
                  name === 'activos' ? 'Usuarios Activos' : 'Nuevos Usuarios'
                ]}
              />
              <Legend />
              <Bar dataKey="activos" fill="#3b82f6" name="Usuarios Activos" />
              <Bar dataKey="nuevos" fill="#10b981" name="Nuevos Usuarios" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/20">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Evolución de Ingresos y Transacciones</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'ingresos') return [`€${value.toLocaleString()}`, 'Ingresos'];
                  return [value.toLocaleString(), 'Transacciones'];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="ingresos" fill="#10b981" name="Ingresos (€)" />
              <Bar yAxisId="right" dataKey="transacciones" fill="#f59e0b" name="Transacciones" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PowerBI Integration Placeholder */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M34 15l-6-6-14 14-8-8-6 6 14 14z"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Integración con PowerBI</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Aquí se mostrarían los dashboards embebidos de PowerBI con métricas adicionales.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Configurar PowerBI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}