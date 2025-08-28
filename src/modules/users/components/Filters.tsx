import type { FiltersProps } from '../types';
import { HiOutlineMagnifyingGlass, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { PiBroom } from 'react-icons/pi';

function Filters({ searchTerm, setSearchTerm, perPage, setPerPage, selectedStatus, setSelectedStatus, includeDeleted, setIncludeDeleted, onSearch, onClear }: FiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <form onSubmit={onSearch} className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Buscar</label>
          <div className="relative">
            <HiOutlineMagnifyingGlass className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Buscar por nombre, email o documento..." className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
        <div className="md:w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Paginación</label>
          <select value={perPage} onChange={e => setPerPage(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
            <option value={50}>50 por página</option>
            <option value={100}>100 por página</option>
          </select>
        </div>
        <div className="md:w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Solo Activos</label>
          <div className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 flex items-center gap-3 shadow-sm">
            <span
              role="button"
              tabIndex={0}
              onClick={() => setSelectedStatus(selectedStatus === 'true' ? '' : 'true')}
              className={`flex items-center gap-2 cursor-pointer select-none transition-colors ${selectedStatus === 'true' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}
              aria-label={selectedStatus === 'true' ? 'Mostrar todos' : 'Mostrar solo activos'}
            >
              {selectedStatus === 'true' ? (<HiOutlineEye className="h-5 w-5"/>) : (<HiOutlineEyeSlash className="h-5 w-5"/>)}
              <span className="text-sm font-semibold">{selectedStatus === 'true' ? 'Solo activos' : 'Todos'}</span>
            </span>
          </div>
        </div>
        <div className="md:w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Eliminados</label>
          <div className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 flex items-center gap-3 shadow-sm">
            <span role="button" tabIndex={0} onClick={() => setIncludeDeleted(!includeDeleted)} className={`flex items-center gap-2 cursor-pointer select-none transition-colors ${includeDeleted ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} aria-label={includeDeleted ? 'Ocultar eliminados' : 'Mostrar eliminados'}>
              {includeDeleted ? (<HiOutlineEye className="h-5 w-5"/>) : (<HiOutlineEyeSlash className="h-5 w-5"/>)}
              <span className="text-sm font-semibold">{includeDeleted ? 'Mostrando' : 'Sin mostrar'}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition">
            <HiOutlineMagnifyingGlass className="h-5 w-5" /> Buscar
          </button>
          <button type="button" onClick={onClear} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold shadow-sm transition border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600">
            <PiBroom className="h-5 w-5" /> Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Filters;