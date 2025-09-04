
import { HiOutlineEnvelope, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';
import type { Client } from '../types';

interface Props {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const getStatusBadge = (status: string) => {
  if (status === 'active') return { text: 'Activo', className: 'bg-green-100 text-green-700 px-2 py-1 rounded text-xs' };
  if (status === 'inactive') return { text: 'Inactivo', className: 'bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs' };
  return { text: 'Suspendido', className: 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs' };
};

const getKycBadge = (kyc: string) => {
  if (kyc === 'verified') return { text: 'Verificado', className: 'bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs' };
  if (kyc === 'pending') return { text: 'Pendiente', className: 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs' };
  return { text: 'Rechazado', className: 'bg-red-100 text-red-700 px-2 py-1 rounded text-xs' };
};

const getRiskBadge = (risk: string) => {
  if (risk === 'low') return { text: 'Bajo', className: 'bg-green-100 text-green-700 px-2 py-1 rounded text-xs' };
  if (risk === 'medium') return { text: 'Medio', className: 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs' };
  return { text: 'Alto', className: 'bg-red-100 text-red-700 px-2 py-1 rounded text-xs' };
};

const Table: React.FC<Props> = ({ clients, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">KYC</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Riesgo</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">No hay clientes registrados</td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">{client.name.split(' ').map(n => n.charAt(0).toUpperCase()).join('').slice(0, 2)}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <span className="inline-flex items-center justify-center bg-blue-100 rounded-full p-1 mr-1"><HiOutlineEnvelope className="h-4 w-4 text-blue-600" /></span>
                        <span className="truncate max-w-[160px]" title={client.email}>{client.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.walletBalance}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{client.userType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{(() => {const badge = getStatusBadge(client.status);return (<span className={badge.className}>{badge.text}</span>);})()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{(() => {const badge = getKycBadge(client.kycStatus);return (<span className={badge.className}>{badge.text}</span>);})()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{(() => {const badge = getRiskBadge(client.riskLevel);return (<span className={badge.className}>{badge.text}</span>);})()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => onEdit(client)} className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 transition" title="Editar cliente"><HiOutlinePencil className="h-4 w-4" /></button>
                        <button onClick={() => onDelete(client.id)} className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 transition" title="Eliminar cliente"><HiOutlineTrash className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
