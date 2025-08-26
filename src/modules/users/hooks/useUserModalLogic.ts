import { useState, useEffect } from 'react';
import type { UserModalProps, UserFormData, UseUserModalLogic } from '../types';
import { useAuth } from '@/modules/auth';
import type { AuthUser } from '@/modules/auth/types';

export function useUserModalLogic(props: UserModalProps): UseUserModalLogic {
  const { isOpen, onClose, onSave, onEdit, user, mode } = props;
  const { user: userAuth } = useAuth() as { user?: AuthUser };
  const delegationId = userAuth?.delegacion_id;
  const [formData, setFormData] = useState<UserFormData>({
    id: user?.id,
    nombre: user?.nombre || '',
    apellidos: user?.apellidos || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    password: '',
    delegacion_id: delegationId,
    activo: user?.activo ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && mode === 'edit' && user) {
      setFormData({
        id: user.id,
        nombre: user.nombre || '',
        apellidos: user.apellidos || '',
        email: user.email || '',
        telefono: user.telefono || '',
        password: '',
        delegacion_id: user.delegacion_id ?? delegationId,
        activo: user.activo ?? true,
      });
      setErrors({});

    } else if (isOpen && mode === 'create') {
      setFormData({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        password: '',
        delegacion_id: delegationId,
        activo: true,
      });
      setErrors({});
    }
  }, [isOpen, user, mode, delegationId]);

  const validateForm = (): boolean => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (mode === 'create') {
        await onSave?.(formData);
      } else if (mode === 'edit' && onEdit && formData.id) {
        await onEdit(formData, formData.id);
      }
      onClose();
    } catch (error) {
      // setErrors({ api: 'Error al guardar usuario' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof UserFormData) => (value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
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