export function getStatusBadge(activo: boolean) {
  const badgeClasses = activo
    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  return {
    text: activo ? 'Activo' : 'Inactivo',
    className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badgeClasses}`,
  };
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function handlePageChangeFactory(pagination: any, setPage: (n: number) => void) {
  return (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= (pagination.pages || 1)) {
      setPage(newPage);
    }
  };
}
