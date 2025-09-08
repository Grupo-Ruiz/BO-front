import type { ReactNode } from 'react';

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface TableListProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  loading?: boolean;
  error?: string;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => ReactNode;
  className?: string;
}

export function TableList<T extends { id: string | number }>({
  columns,
  data,
  emptyMessage = 'No hay datos',
  loading = false,
  error,
  onRowClick,
  actions,
  className = '',
}: TableListProps<T>) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg ${className}`}>
      <div className="px-4 py-5 sm:p-6">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 dark:text-red-400 py-8">{error}</div>
          ) : data.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">{emptyMessage}</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {columns.map(col => (
                    <th
                      key={col.key as string}
                      className={`px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider ${col.headerClassName || ''}`}
                    >
                      {col.label}
                    </th>
                  ))}
                  {actions && <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data.map(row => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {columns.map(col => (
                      <td key={col.key as string} className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}>{col.render ? col.render(row) : (row[col.key as keyof T] as ReactNode)}</td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">{actions(row)}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableList;
