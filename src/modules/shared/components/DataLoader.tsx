import React from 'react';
import type { DataLoaderProps } from '../types';

const DataLoader: React.FC<DataLoaderProps> = ({
  isLoading,
  error,
  empty,
  emptyMessage = 'No hay datos para mostrar',
  loadingMessage = 'Cargando...',
  children,
}) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{loadingMessage}</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8 text-center text-red-600 dark:text-red-400">
        Error: {error}
      </div>
    );
  }
  if (empty) {
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-400">
        {emptyMessage}
      </div>
    );
  }
  return <>{children}</>;
};

export default DataLoader;