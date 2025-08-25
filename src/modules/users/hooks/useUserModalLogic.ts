import { useState, useEffect } from 'react';
import type { UserModalProps, UserFormData, UseUserModalLogic } from '../types';

export function useUserModalLogic(props: UserModalProps): UseUserModalLogic {
  const { isOpen, onClose, onSave, user, mode } = props;

  const [formData, setFormData] = useState<UserFormData>({
    nombre: user?.nombre || '',
    apellidos: user?.apellidos || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    password: user?.password || '',
    confirmPassword: '',
    delegacion_id: user?.delegacion_id || undefined,
    activo: user?.activo ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        nombre: user.nombre || '',
        apellidos: user.apellidos || '',
        email: user.email || '',
        password: user.password || '',
        confirmPassword: '',
        telefono: user.telefono || '',
        activo: user.activo ?? true,
        delegacion_id: user.delegacion_id || undefined,
      });
      setErrors({});
    } else if (isOpen && mode === 'create') {
      setFormData({
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        confirmPassword: '',
        telefono: '',
        activo: true,
        delegacion_id: undefined,
      });
      setErrors({});
    }
  }, [isOpen, user, mode]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son obligatorios';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (mode === 'create' || formData.password) {
      if (!formData.password || formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Debes confirmar la contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (mode === 'create') {
        await onSave?.(formData);
      } else if (user) {
        await onSave?.(formData, user.id);
      }
      onClose();
    } catch (error) {
      // Aquí podrías setear errores de API
      // setErrors({ api: 'Error al guardar usuario' });
      // console.error('Error al guardar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof UserFormData | 'confirmPassword') => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return {
    mode,
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    onClose,
    user,
    isOpen,
  };
}