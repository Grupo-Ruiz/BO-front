import { useState } from 'react';

import { HiOutlineQrCode, HiOutlineDocumentText, HiOutlineUserGroup, HiOutlineCreditCard } from 'react-icons/hi2';
import CardSearch from '@/modules/cards/components/CardSearch';
import QRGenerator from '@/modules/qr/components/QRGenerator';
import ClientsListPage from '@/modules/clients/pages/ClientsListPage';
import Tabs from '@/modules/shared/components/Tabs';
import ManagementDashboard from './ManagementDashboard';
import type { TabConfig, TabType } from '@/modules/shared/types';

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs: TabConfig[] = [
    { id: 'dashboard', name: 'Estadísticas', icon: HiOutlineDocumentText },
    { id: 'clients', name: 'Clientes', icon: HiOutlineUserGroup },
    { id: 'cards', name: 'Tarjetas', icon: HiOutlineCreditCard },
    { id: 'qr-generator', name: 'Generar QR', icon: HiOutlineQrCode },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Gestión de Tarjetas y Operaciones
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Panel unificado para gestión de tarjetas, abonos, operaciones, pagos y códigos QR
        </p>
      </div>
      
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab as TabType)} />

      {activeTab === 'dashboard' && (
        <ManagementDashboard />
      )}
      {activeTab === 'clients' && (
        <ClientsListPage />
      )}
      {activeTab === 'cards' && (
        <CardSearch />
      )}
      {activeTab === 'qr-generator' && (
        <QRGenerator />
      )}
    </div>
  );
}