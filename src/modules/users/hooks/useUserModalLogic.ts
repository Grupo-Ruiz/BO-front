import { useState, useEffect } from 'react';
import type { UserModalProps, UserFormData, UseUserModalLogic } from '../types';

export function useUserModalLogic(props: UserModalProps): UseUserModalLogic {
  const { isOpen, onClose, onSave, user, mode } = props;
  const [formData, setFormData] = useState<UserFormData>({
    nombre: user?.nombre || '',
    apellidos: user?.apellidos || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
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
        telefono: user.telefono || '',
        activo: user.activo ?? true,
      });
      setErrors({});
    } else if (isOpen && mode === 'create') {
      setFormData({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        activo: true,
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (mode === 'create') {
        // Aquí deberías llamar al hook de creación de usuario real
        // await createUser(formData)
        // Simulación:
        // console.log('Crear usuario:', formData);
      } else if (user) {
        // Aquí deberías llamar al hook de actualización de usuario real
        // await updateUser(user.id, formData)
        // Simulación:
        // console.log('Actualizar usuario:', { id: user.id, ...formData });
      }
      onSave?.();
      onClose();
    } catch (error) {
      // Aquí podrías setear errores de API
      // setErrors({ api: 'Error al guardar usuario' });
      // console.error('Error al guardar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof UserFormData) => (value: string) => {
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
