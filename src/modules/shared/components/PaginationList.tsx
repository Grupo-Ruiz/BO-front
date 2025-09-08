import type { ReactNode } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
import { Button } from '@/modules/shared/components';

export interface PaginationListProps {
  page: number;
  pages: number;
  perPage?: number;
  total?: number;
  onPageChange: (page: number) => void;
  className?: string;
  children?: ReactNode;
}

export function PaginationList({ page, pages, perPage, total, onPageChange, className = '', children }: PaginationListProps) {
  return (
    <div className={`flex flex-col items-center mt-6 gap-2 ${className}`}>
      <div className="flex items-center gap-4">
        <Button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="flex items-center px-3 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg disabled:opacity-50 disabled:bg-blue-300 dark:disabled:bg-blue-900">
          <HiOutlineChevronLeft className="h-4 w-4 mr-1" /> Anterior
        </Button>
  <span className="text-sm text-gray-700 dark:text-white px-2">Página <strong>{page}</strong> de <strong>{pages}</strong></span>
        <Button onClick={() => onPageChange(page + 1)} disabled={page >= pages} className="flex items-center px-3 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg disabled:opacity-50 disabled:bg-blue-300 dark:disabled:bg-blue-900">
          Siguiente <HiOutlineChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      {(perPage || total) && (
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {perPage && <span className="text-xs text-gray-500 dark:text-gray-200">Mostrando <strong>{perPage}</strong> por página</span>}
          {total && <span className="text-xs text-gray-500 dark:text-gray-200">Total: <strong>{total}</strong> registros</span>}
        </div>
      )}
      {children}
    </div>
  );
}

export default PaginationList;