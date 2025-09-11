import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { LoginCredentials } from '../types';

export function useLoginHandler() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la ubicación desde donde se redirigió, o usar '/' como fallback
  const from = location.state?.from?.pathname || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const result = await login(credentials);
      if (result) {
        // Después del login exitoso, navegar a la página original
        navigate(from, { replace: true });
      }
      return result;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  return {
    handleLogin,
    isLoading,
  };
}