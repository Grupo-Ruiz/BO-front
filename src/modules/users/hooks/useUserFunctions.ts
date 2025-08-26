import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAppDispatch } from '@/hooks';
import { fetchUsers, createUser, updateUser, deleteUser } from '../store/thunks/usersThunks';
import type { User } from '../index';
import type { UserEditFormData, UserFormData } from '../types';

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

  const handleDeleteUser = async (userId: number) => {
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
      handleModalDelete(userId);
    }
  };
  
  // Solo para crear
  const handleModalSave = async (formData: UserFormData) => {
    try {
      // Validar confirmación de contraseña
      if (formData.password !== formData.confirmPassword) {
        await Swal.fire({
          title: 'Error',
          html: '<p>Las contraseñas no coinciden</p>',
          icon: 'error',
          confirmButtonText: '<span class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-bold">OK</span>',
          buttonsStyling: false,
          customClass: {
            confirmButton: '',
            popup: 'dark:bg-gray-800 dark:text-white',
          },
        });
        return;
      }
      const { confirmPassword, ...dataToSend } = formData;

      await dispatch(createUser(dataToSend)).unwrap();
      await Swal.fire({
        title: 'Usuario creado',
        text: 'El nuevo usuario ha sido creado exitosamente.',
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
      dispatch(fetchUsers({}));
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        html: '<p>' + (error?.message || 'No se pudo crear el usuario') + '</p>',
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
  const handleModalEdit = async (formData: UserEditFormData, userId: number) => {
    try {
      const { id, confirmPassword, ...dataToSend } = formData as UserEditFormData & { confirmPassword?: string };

      await dispatch(updateUser({ userData: dataToSend, id: userId })).unwrap();
      await Swal.fire({
        title: 'Usuario actualizado',
        text: 'El usuario ha sido actualizado exitosamente.',
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
      dispatch(fetchUsers({}));
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        html: '<p>' + (error?.message || 'No se pudo editar el usuario') + '</p>',
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
  const handleModalDelete = async (userId: number) => {
    try {
      await dispatch(deleteUser({ id: userId })).unwrap();
      await Swal.fire({
        title: 'Usuario eliminado',
        text: 'El usuario ha sido eliminado exitosamente.',
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
      dispatch(fetchUsers({}));
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        html: '<p>' + (error?.message || 'No se pudo eliminar el usuario') + '</p>',
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
    selectedUser,
    setSelectedUser,
    isModalOpen,
    setIsModalOpen,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleModalSave,
    handleModalEdit,
    handleModalDelete,
  };
}