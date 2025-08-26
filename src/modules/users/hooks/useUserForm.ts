import { useState, useEffect } from 'react';
import type { User, UserFormData } from '../types';

interface UseUserFormProps {
  user?: User | null;
  mode: 'create' | 'edit';
  delegationId?: number;
}

export function useUserForm({ user, mode, delegationId }: UseUserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    id: user?.id || undefined,
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    delegacion_id: delegationId,
    activo: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && user) {
      setFormData({
        id: user.id,
        nombre: user.nombre || '',
        apellidos: user.apellidos || '',
        email: user.email || '',
        telefono: user.telefono || '',
        password: '',
        confirmPassword: '',
        delegacion_id: user.delegacion_id ?? delegationId,
        activo: user.activo ?? true,
      });
    } else if (mode === 'create') {
      setFormData({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        delegacion_id: delegationId,
        activo: true,
      });
    }
    setErrors({});
  }, [user, mode, delegationId]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'El email no es válido';
    if (mode === 'create' || formData.password) {
      if (!formData.password || formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Debes confirmar la contraseña';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof UserFormData | 'confirmPassword') => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    loading,
    setLoading,
    validate,
    handleChange,
  };
}