import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '@/modules/shared/store/hooks';
import { fetchClients, addClient, updateClient, deleteClient } from '../store/clientsThunks';
import type { Client, ClientCreateData } from '../types';

export function useClientFunctions() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.clients.filters);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateClient = () => {
    setModalMode('create');
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setModalMode('edit');
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleDeleteClient = async (clientId: string) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el cliente. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<span class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-bold">Sí, eliminar</span>',
      cancelButtonText: '<span class="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition font-bold">Cancelar</span>',
      focusConfirm: false,
      customClass: {
        confirmButton: '',
        cancelButton: '',
        actions: 'flex gap-2 justify-center',
        popup: 'dark:bg-gray-800 dark:text-white',
      },
      buttonsStyling: false,
    });
    if (result.isConfirmed) {
      handleModalDelete(clientId);
    }
  };

  // Solo para crear
  const handleModalSave = async (formData: ClientCreateData) => {
    try {
      await dispatch(addClient(formData)).unwrap();
      await Swal.fire({
        title: 'Cliente creado',
        text: 'El nuevo cliente ha sido creado exitosamente.',
        html: '<p>Al dar click en "OK", se cerrará esta ventana y se recargara el listado.</p>',
        icon: 'success',
        confirmButtonText: '<span class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-bold">OK</span>',
        buttonsStyling: false,
        customClass: {
          confirmButton: '',
          popup: 'dark:bg-gray-800 dark:text-white',
        },
      });
      setIsModalOpen(false);
      dispatch(fetchClients({ filters }));
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        html: '<p>' + (error?.message || 'No se pudo crear el cliente') + '</p>',
        icon: 'error',
        confirmButtonText: '<span class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-bold">OK</span>',
        buttonsStyling: false,
        customClass: {
          confirmButton: '',
          popup: 'dark:bg-gray-800 dark:text-white',
        },
      });
    }
  };

  // Solo para editar
  const handleModalEdit = async (formData: Client, clientId: string) => {
    try {
      await dispatch(updateClient({ ...formData, id: clientId })).unwrap();
      await Swal.fire({
        title: 'Cliente actualizado',
        text: 'El cliente ha sido actualizado exitosamente.',
        html: '<p>Al dar click en "OK", se cerrará esta ventana y se recargara el listado.</p>',
        icon: 'success',
        confirmButtonText: '<span class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-bold">OK</span>',
        buttonsStyling: false,
        customClass: {
          confirmButton: '',
          popup: 'dark:bg-gray-800 dark:text-white',
        },
      });
      setIsModalOpen(false);
      dispatch(fetchClients({ filters }));
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        html: '<p>' + (error?.message || 'No se pudo editar el cliente') + '</p>',
        icon: 'error',
        confirmButtonText: '<span class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-bold">OK</span>',
        buttonsStyling: false,
        customClass: {
          confirmButton: '',
          popup: 'dark:bg-gray-800 dark:text-white',
        },
      });
    }
  };

  // Solo para eliminar
  const handleModalDelete = async (clientId: string) => {
    try {
      await dispatch(deleteClient(clientId)).unwrap();
      await Swal.fire({
        title: 'Cliente eliminado',
        text: 'El cliente ha sido eliminado exitosamente.',
        html: '<p>Al dar click en "OK", se cerrará esta ventana y se recargara el listado.</p>',
        icon: 'success',
        confirmButtonText: '<span class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-bold">OK</span>',
        buttonsStyling: false,
        customClass: {
          confirmButton: '',
          popup: 'dark:bg-gray-800 dark:text-white',
        },
      });
      setIsModalOpen(false);
      dispatch(fetchClients({ filters }));
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        html: '<p>' + (error?.message || 'No se pudo eliminar el cliente') + '</p>',
        icon: 'error',
        confirmButtonText: '<span class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-bold">OK</span>',
        buttonsStyling: false,
        customClass: {
          confirmButton: '',
          popup: 'dark:bg-gray-800 dark:text-white',
        },
      });
    }
  };

  return {
    modalMode,
    setModalMode,
    selectedClient,
    setSelectedClient,
    isModalOpen,
    setIsModalOpen,
    handleCreateClient,
    handleEditClient,
    handleDeleteClient,
    handleModalSave,
    handleModalEdit,
    handleModalDelete,
  };
}