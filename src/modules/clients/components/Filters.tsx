
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import type { ClientFilters } from '../types';

interface Props {
  filters: ClientFilters;
  onChange: (filters: ClientFilters) => void;
}

const Filters: React.FC<Props> = ({ filters, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    onChange({});
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-4">
      <form className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <div className="relative">
            <HiOutlineMagnifyingGlass className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input type="text" name="search" value={filters.search || ''} onChange={handleInputChange} placeholder="Buscar por nombre o email..." className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select name="status" value={filters.status || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">Todos</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="suspended">Suspendido</option>
          </select>
        </div>
        <div className="md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">KYC</label>
          <select name="kycStatus" value={filters.kycStatus || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">Todos</option>
            <option value="verified">Verificado</option>
            <option value="pending">Pendiente</option>
            <option value="rejected">Rechazado</option>
          </select>
        </div>
        <div className="md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">Riesgo</label>
          <select name="riskLevel" value={filters.riskLevel || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">Todos</option>
            <option value="low">Bajo</option>
            <option value="medium">Medio</option>
            <option value="high">Alto</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={handleClear} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold shadow-sm transition border border-gray-300">
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
