import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../../modules/users/types';

interface UserModalContextType {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'view';
  selectedUser: User | null;
  openModal: (mode: 'create' | 'edit' | 'view', user?: User) => void;
  closeModal: () => void;
}

const UserModalContext = createContext<UserModalContextType | undefined>(undefined);

interface UserModalProviderProps {
  children: ReactNode;
}

export function UserModalProvider({ children }: UserModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit' | 'view'>('view');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openModal = (modalMode: 'create' | 'edit' | 'view', user?: User) => {
    setMode(modalMode);
    setSelectedUser(user || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  const value = {
    isOpen,
    mode,
    selectedUser,
    openModal,
    closeModal,
  };

  return (
    <UserModalContext.Provider value={value}>
      {children}
    </UserModalContext.Provider>
  );
}

export function useUserModal() {
  const context = useContext(UserModalContext);
  if (context === undefined) {
    throw new Error('useUserModal debe ser usado dentro de un UserModalProvider');
  }
  return context;
}