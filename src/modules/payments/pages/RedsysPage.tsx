export default function RedsysPage() {
    return (
      <div className="space-y-6">
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
            <li className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/* Icon for mock transaction */}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Transacción 1
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cliente: - • Fecha: {new Date().toLocaleString('es-ES')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    €100.00
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Completada
                  </span>
                </div>
              </div>
            </li>
            <li className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/* Icon for mock transaction */}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Transacción 2
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cliente: - • Fecha: {new Date().toLocaleString('es-ES')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    €50.00
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Pendiente
                  </span>
                </div>
              </div>
            </li>
            <li className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/* Icon for mock transaction */}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Transacción 3
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cliente: - • Fecha: {new Date().toLocaleString('es-ES')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    €200.00
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Fallida
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  );
}