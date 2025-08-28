import type { TableProps } from '../types';
import { IoMdArrowDropup } from 'react-icons/io';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlinePencil, HiOutlineTrash, HiOutlineArrowPath } from 'react-icons/hi2';

function Table({ users, isLoading, error, orderBy, orderDir, handleSort, includeDeleted, formatDate, getStatusBadge, handleEditUser, handleDeleteUser, handleRestoreUser }: TableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando usuarios...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

              {/* Encabezado de la tabla */}
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('nombre')}>
                    <strong><span className="flex items-center gap-1">Usuario{orderBy === 'nombre' && (<IoMdArrowDropup className={`inline ml-1 transition-transform ${orderDir === 'desc' ? 'rotate-180' : ''}`}/>)}</span></strong>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('email')}>
                    <strong><span className="flex items-center gap-1">Contacto{orderBy === 'email' && (<IoMdArrowDropup className={`inline ml-1 transition-transform ${orderDir === 'desc' ? 'rotate-180' : ''}`}/>)}</span></strong>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('estado')}>
                    <strong><span className="flex items-center gap-1">Estado{orderBy === 'estado' && (<IoMdArrowDropup className={`inline ml-1 transition-transform ${orderDir === 'desc' ? 'rotate-180' : ''}`}/>)}</span></strong>
                  </th>
                  {includeDeleted && (
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('deleted_at')}>
                      <strong><span className="flex items-center gap-1">Fecha de Eliminación{orderBy === 'deleted_at' && (<IoMdArrowDropup className={`inline ml-1 transition-transform ${orderDir === 'desc' ? 'rotate-180' : ''}`}/>)}</span></strong>
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none" onClick={() => handleSort('created_at')}>
                    <strong><span className="flex items-center gap-1">Fecha de Creación{orderBy === 'created_at' && (<IoMdArrowDropup className={`inline ml-1 transition-transform ${orderDir === 'desc' ? 'rotate-180' : ''}`}/>)}</span></strong>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <strong>Acciones</strong>
                  </th>
                </tr>
              </thead>

              {/* Contenido de la tabla */}
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {error ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center text-red-500 dark:text-red-400">
                      {error.status === 0 && 'Ocurrió un error en el servidor. Intenta más tarde.'}
                      {error.status === 500 && 'Ocurrió un error en el servidor. Intenta más tarde.'}
                      {error.status === 403 && 'No tienes permiso para ver los usuarios.'}
                      {error.status === 401 && 'Tu sesión ha expirado. Inicia sesión de nuevo.'}
                      {error.status === 404 && 'No se encontró el recurso solicitado.'}
                      {!([0, 500,403,401,404].includes(error.status)) && (error.message || 'Ocurrió un error inesperado.')}
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center text-gray-500 dark:text-gray-400">No hay usuarios registrados</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">{user.nombre.split(' ').map((nombre: string) => nombre.charAt(0).toUpperCase()).join('').slice(0, 2)}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.nombre + ' ' + user.apellidos}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap align-middle">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                            <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-1"><HiOutlineEnvelope className="h-4 w-4 text-blue-600 dark:text-blue-400" /></span>
                            <span className="truncate max-w-[160px]" title={user.email}>{user.email}</span>
                          </div>
                          {user.telefono && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-1"><HiOutlinePhone className="h-4 w-4 text-green-600 dark:text-green-400" /></span>
                              <span className="truncate max-w-[120px]" title={user.telefono}>{user.telefono}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{(() => {const badge = getStatusBadge(user.activo);return (<span className={badge.className}>{badge.text}</span>);})()}</td>
                      {includeDeleted && (<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.deleted_at ? formatDate(user.deleted_at) : 'Sin fecha de eliminación'}</td>)}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.created_at ? formatDate(user.created_at) : 'Sin fecha de creación'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => handleEditUser(user)} className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/60 dark:hover:text-white transition" title="Editar usuario"><HiOutlinePencil className="h-4 w-4" /></button>
                          <button onClick={() => handleDeleteUser(user.id)} className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/60 dark:hover:text-white transition" title="Eliminar usuario"><HiOutlineTrash className="h-4 w-4" /></button>
                          {includeDeleted && user.deleted_at && (
                            <button onClick={() => handleRestoreUser(user.id)} className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/60 dark:hover:text-white transition" title="Restaurar usuario"><HiOutlineArrowPath className="h-4 w-4" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Table;