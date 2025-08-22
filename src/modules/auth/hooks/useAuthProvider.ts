import { useState, useEffect } from 'react';
import { loginWithApi, logoutWithApi } from '../services/authService';
import { STORAGE_KEYS } from '@/modules/shared/config/api';
import type { AuthUser, LoginCredentials, AuthContextType } from '../types';

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);

        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      } finally {
        setIsLoading(false);
      }
    };
    checkExistingSession();
  }, []);

  // Función de login que utiliza la API real
  const apiLogin = async (credentials: LoginCredentials): Promise<{ success: boolean; user?: AuthUser }> => {
    try {
      const result = await loginWithApi(credentials);
      if (result.success && result.data) {
        return { success: true, user: result.data as AuthUser };
      }
      return { success: false };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false };
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await apiLogin(credentials);
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(result.user));
        localStorage.setItem('COMPANY_ID', result.user.companyId);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutWithApi();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUser(null);
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
}