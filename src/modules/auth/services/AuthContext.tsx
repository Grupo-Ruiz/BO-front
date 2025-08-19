export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import { createContext, useContext } from 'react';
import type { AuthContextType, AuthProviderProps } from '../types/index';
import { useAuthProvider } from '../hooks/useAuthProvider';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export { AuthContext };

export function AuthProvider({ children }: AuthProviderProps) {
  const value = useAuthProvider();
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}