import { UserModal } from '../../modules/users/components/UserModal';
import { useUserModal } from '../contexts/UserModalContext';

export function UserModalManager() {
  const { isOpen, mode, selectedUser, closeModal } = useUserModal();

  return (
    <UserModal
      isOpen={isOpen}
      onClose={closeModal}
      onSave={() => {
        // Aquí puedes agregar lógica adicional después de guardar
        closeModal();
      }}
      user={selectedUser}
      mode={mode}
    />
  );
}
