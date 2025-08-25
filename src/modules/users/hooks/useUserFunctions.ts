import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAppDispatch } from '@/hooks';
import { fetchUsers, createUser } from '../store/thunks/usersThunks';
import type { User, CreateUserData } from '../index';

export function useUserFunctions() {
  const dispatch = useAppDispatch();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateUser = () => {
    setModalMode('create');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario. ¿Deseas continuar?',
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
      Swal.fire({
        title: 'Eliminado',
        text: 'El usuario ha sido eliminado.',
        icon: 'success',
        confirmButtonText: '<span class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-bold">OK</span>',
        buttonsStyling: false,
        customClass: {
          confirmButton: '',
          popup: 'dark:bg-gray-800 dark:text-white',
        },
      });
    }
  };

  const handleModalSave = async (formData: CreateUserData) => {
    if (modalMode === 'create') {
      try {
        await dispatch(createUser(formData)).unwrap();
        await Swal.fire({
          title: 'Usuario creado',
          text: 'El nuevo usuario ha sido creado exitosamente.',
          icon: 'success',
          confirmButtonText: '<span class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-bold">OK</span>',
          buttonsStyling: false,
          customClass: {
            confirmButton: '',
            popup: 'dark:bg-gray-800 dark:text-white',
          },
        });
        setIsModalOpen(false);
        dispatch(fetchUsers({}));
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          text: error?.message || 'No se pudo crear el usuario',
          icon: 'error',
          confirmButtonText: '<span class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-bold">OK</span>',
          buttonsStyling: false,
          customClass: {
            confirmButton: '',
            popup: 'dark:bg-gray-800 dark:text-white',
          },
        });
      }
    } else if (modalMode === 'edit') {
      // Aquí irá la lógica de edición
    }
  };

  return {
    modalMode,
    setModalMode,
    selectedUser,
    setSelectedUser,
    isModalOpen,
    setIsModalOpen,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleModalSave,
  };
}