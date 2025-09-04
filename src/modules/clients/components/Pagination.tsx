import React from 'react';
import type { ClientsPaginationMeta } from '../types';

interface Props {
  pagination: ClientsPaginationMeta;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ pagination, onPageChange }) => {
  const { page, pages } = pagination;
  return (
    <div className="flex justify-center mt-4 gap-2">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        ← Anterior
      </button>
      <span className="px-2 py-1 text-sm">Página {page} de {pages}</span>
      <button
        disabled={page >= pages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Siguiente →
      </button>
    </div>
  );
};

export default Pagination;
