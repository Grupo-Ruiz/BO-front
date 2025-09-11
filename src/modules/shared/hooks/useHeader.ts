import { useAuth } from '@/modules/auth';
import { useUserModal } from '../contexts/UserModalContext';
import type { User } from '@/modules/users';

export function useHeader(props: { sidebarOpen?: boolean; setSidebarOpen?: (open: boolean) => void }) {
  const { user, logout } = useAuth();
  const { openModal } = useUserModal();

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {    
    if (user) {
      const userForModal: User = {
        id: typeof user.id === 'string' ? parseInt(user.id) : user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        telefono: user.telefono ?? '',
        password: '', // No enviamos la contraseña
        activo: true,
        delegacion_id: user.delegacion_id ?? undefined,
        created_at: '',
        updated_at: '',
        deleted_at: null,
      };
      openModal('view', userForModal);
    }
  };

  const handleSidebarToggle = () => {
    if (props.setSidebarOpen) {
      props.setSidebarOpen(!props.sidebarOpen);
    }
  };

  return {
    user,
    handleLogout,
    handleProfileClick,
    handleSidebarToggle,
    sidebarOpen: props.sidebarOpen,
    setSidebarOpen: props.setSidebarOpen,
  };
}