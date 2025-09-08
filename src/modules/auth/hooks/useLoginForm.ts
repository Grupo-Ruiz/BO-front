import { useState } from 'react';
import type { LoginCredentials, UseLoginFormProps } from '../types/index';

export function useLoginForm({ onSubmit, initialValues }: UseLoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>(
    initialValues || { email: '', password: '', delegacion_id: 0 }
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: field === 'delegacion_id' ? Number(e.target.value) : e.target.value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!credentials.email || !credentials.password || !credentials.delegacion_id) {
      setError('Por favor, completa todos los campos');
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await onSubmit(credentials);
      if (!success) {
        setError('Credenciales inválidas. Intenta de nuevo.');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginWithMicrosoft = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Iniciando sesión con Microsoft...');
    setIsSubmitting(false);
  };

  return {
    credentials,
    setCredentials,
    showPassword,
    setShowPassword,
    error,
    setError,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleLoginWithMicrosoft
  };
}
