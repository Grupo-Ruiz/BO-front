import type { PaginationProps } from '../types';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
import { Button } from '@/modules/shared/components';

function Pagination({ pagination, page, setPage }: PaginationProps) {
  if (!pagination) return null;
  return (
    <div className="flex flex-col items-center mt-6 gap-2">
      <div className="flex items-center gap-4">
        <Button onClick={() => setPage(page - 1)} disabled={page <= 1} className="flex items-center px-3 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50">
          <HiOutlineChevronLeft className="h-4 w-4 mr-1" /> Anterior
        </Button>
        <span className="text-sm text-gray-700 dark:text-gray-300 px-2">Página <strong>{page}</strong> de <strong>{pagination.pages}</strong></span>
        <Button onClick={() => setPage(page + 1)} disabled={page >= pagination.pages} className="flex items-center px-3 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50">
          Siguiente <HiOutlineChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">Mostrando <strong>{pagination.per_page}</strong> por página</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">Total: <strong>{pagination.total}</strong> usuarios</span>
      </div>
    </div>
  );
}

export default Pagination;