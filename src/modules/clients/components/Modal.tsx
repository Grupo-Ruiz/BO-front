import React, { useState, useEffect } from 'react';
import type { Client } from '../types';

interface Props {
  open: boolean;
  client: Client | null;
  onClose: () => void;
  onSave: (client: Client) => void;
}

const defaultClient: Client = {
  id: '',
  name: '',
  email: '',
  walletBalance: 0,
  userType: 'regular',
  status: 'active',
  kycStatus: 'pending',
  riskLevel: 'low',
};

const Modal: React.FC<Props> = ({ open, client, onClose, onSave }) => {
  const [form, setForm] = useState<Client>(defaultClient);

  useEffect(() => {
    if (client) setForm(client);
    else setForm(defaultClient);
  }, [client, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="mb-4 text-lg font-bold">{form.id ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
        <div className="mb-2">
          <label className="text-xs mb-1">Nombre</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-2">
          <label className="text-xs mb-1">Email</label>
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-2">
          <label className="text-xs mb-1">Balance</label>
          <input name="walletBalance" type="number" value={form.walletBalance} onChange={handleChange} placeholder="Balance" className="w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-2">
          <label className="text-xs mb-1">Tipo</label>
          <select name="userType" value={form.userType} onChange={handleChange} className="w-full border px-2 py-1 rounded">
            <option value="regular">Regular</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="text-xs mb-1">Estado</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border px-2 py-1 rounded">
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="suspended">Suspendido</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="text-xs mb-1">KYC</label>
          <select name="kycStatus" value={form.kycStatus} onChange={handleChange} className="w-full border px-2 py-1 rounded">
            <option value="pending">Pendiente</option>
            <option value="verified">Verificado</option>
            <option value="rejected">Rechazado</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="text-xs mb-1">Riesgo</label>
          <select name="riskLevel" value={form.riskLevel} onChange={handleChange} className="w-full border px-2 py-1 rounded">
            <option value="low">Bajo</option>
            <option value="medium">Medio</option>
            <option value="high">Alto</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-1 border rounded">Cancelar</button>
          <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
