import { useEffect, useState } from 'react';
import { MockAPIService } from '@/modules/shared/services/mockApi';
import type { FAQ } from '@/modules/shared/types';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineQuestionMarkCircle, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const data = await MockAPIService.getFAQs();
      // Sort by order and then by creation date
      const sortedData = data.sort((a, b) => {
        if ((a.order ?? 0) !== (b.order ?? 0)) return (a.order ?? 0) - (b.order ?? 0);
        return new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime();
      });
      setFaqs(sortedData);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFAQs = faqs.filter(faq => {
    if (filter === 'active') return faq.isActive;
    if (filter === 'inactive') return !faq.isActive;
    return true;
  });

  const handleCreateFAQ = () => {
    setModalMode('create');
    setSelectedFAQ(null);
    setIsModalOpen(true);
  };

  const handleEditFAQ = (faq: FAQ) => {
    setModalMode('edit');
    setSelectedFAQ(faq);
    setIsModalOpen(true);
  };

  const handleDeleteFAQ = async (faqId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta FAQ?')) {
      try {
        await MockAPIService.deleteFAQ(faqId);
        await fetchFAQs();
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      }
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
        <HiOutlineEye className="h-3 w-3 mr-1" />
        Activa
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        <HiOutlineEyeSlash className="h-3 w-3 mr-1" />
        Inactiva
      </span>
    );
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      'Monedero': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'Billetes': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'QR': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      'General': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
      }`}>
        {category}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Gestión de FAQs
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Administra las preguntas frecuentes de la sección de ayuda de Yurni
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={handleCreateFAQ}
            className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <HiOutlinePlus className="h-5 w-5 inline-block mr-1" />
            Añadir FAQ
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-6 rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4 border border-yellow-200 dark:border-yellow-800">
        <div className="flex">
          <div className="flex-shrink-0">
            <HiOutlineQuestionMarkCircle className="h-5 w-5 text-yellow-400 dark:text-yellow-300" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Gestión de Contenido de Ayuda
            </h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
              <p>
                Las FAQs se muestran en la sección de ayuda de la app según su orden y estado. 
                Solo las FAQs activas son visibles para los usuarios.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow dark:shadow-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HiOutlineQuestionMarkCircle className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total FAQs</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">{faqs.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow dark:shadow-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HiOutlineEye className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">FAQs Activas</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {faqs.filter(faq => faq.isActive).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow dark:shadow-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HiOutlineEyeSlash className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">FAQs Inactivas</dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {faqs.filter(faq => !faq.isActive).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8">
        <nav className="flex space-x-8" aria-label="Tabs">
          {[
            { key: 'all', name: 'Todas', count: faqs.length },
            { key: 'active', name: 'Activas', count: faqs.filter(faq => faq.isActive).length },
            { key: 'inactive', name: 'Inactivas', count: faqs.filter(faq => !faq.isActive).length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`
                whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm
                ${filter === tab.key
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                }
              `}
            >
              {tab.name}
              <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs ${
                filter === tab.key ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300' : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* FAQs List */}
      <div className="mt-8 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredFAQs.map((faq) => (
            <li key={faq.id}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">{faq.order}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      {getCategoryBadge(faq.category ?? '')}
                      {getStatusBadge(faq.isActive ?? false)}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {faq.question}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {faq.answer}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-gray-400 dark:text-gray-500 space-x-4">
                      <span>Creado: {faq.createdAt ? new Date(faq.createdAt).toLocaleDateString('es-ES') : '-'}</span>
                      <span>Actualizado: {faq.updatedAt ? new Date(faq.updatedAt).toLocaleDateString('es-ES') : '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEditFAQ(faq)}
                    className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                    title="Editar FAQ"
                  >
                    <HiOutlinePencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteFAQ(faq.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    title="Eliminar FAQ"
                  >
                    <HiOutlineTrash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <HiOutlineQuestionMarkCircle className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No hay FAQs</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            No se encontraron FAQs {filter !== 'all' ? `con estado "${filter}"` : ''}.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleCreateFAQ}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <HiOutlinePlus className="h-5 w-5 mr-1" />
              Crear primera FAQ
            </button>
          </div>
        </div>
      )}

      {/* Modal placeholder for create/edit FAQ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {modalMode === 'create' ? 'Crear Nueva FAQ' : 'Editar FAQ'}
            </h3>
            <div className="space-y-4">
                              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {modalMode === 'create' ? 'Nueva FAQ' : `Editando: ${selectedFAQ?.question}`}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Aquí se implementaría el formulario completo para {modalMode === 'create' ? 'crear' : 'editar'} una FAQ con los siguientes campos:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                  <li>• Pregunta (obligatorio)</li>
                  <li>• Respuesta (obligatorio)</li>
                  <li>• Categoría (Monedero, Billetes, QR, General)</li>
                  <li>• Orden de visualización</li>
                  <li>• Estado (Activa/Inactiva)</li>
                </ul>
                {selectedFAQ && (
                  <div className="mt-3 p-3 bg-white dark:bg-gray-600 rounded border border-gray-200 dark:border-gray-500">
                    <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">Datos actuales:</div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      <strong>Pregunta:</strong> {selectedFAQ.question}
                    </div>
                    <div className="text-sm mt-1 text-gray-900 dark:text-white">
                      <strong>Categoría:</strong> {selectedFAQ.category}
                    </div>
                    <div className="text-sm mt-1 text-gray-900 dark:text-white">
                      <strong>Estado:</strong> {selectedFAQ.isActive ? 'Activa' : 'Inactiva'}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
              >
                {modalMode === 'create' ? 'Crear FAQ' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}