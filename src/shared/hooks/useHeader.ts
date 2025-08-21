import { useAuth } from '../../modules/auth';
import { useUserModal } from '../contexts/UserModalContext';
import type { User } from '../../modules/users/types';

export function useHeader(props: { sidebarOpen?: boolean; setSidebarOpen?: (open: boolean) => void }) {
  const { user, logout } = useAuth();
  const { openModal } = useUserModal();

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    if (user) {
      const userForModal: User = {
        id: String(user.id),
        name: user.name,
        email: user.email,
        phone: '',
        // ...eliminado campo role...
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
