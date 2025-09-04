import { useState } from 'react';
import type { TabType, TabConfig } from '../types/index';
import WalletDashboard from './WalletDashboard';
import WalletPayments from './WalletPayments';
import WalletCard from './WalletCard';
import WalletQRGenerator from './WalletQRGenerator';
import WalletTabs from '../components/WalletTabs';

import { HiOutlineQrCode, HiOutlineDocumentText, HiOutlineUserGroup, HiOutlineCreditCard } from 'react-icons/hi2';
import WalletClients from './WalletClients';

export default function WalletPage() {
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
        <WalletTabs tabs={tabs} activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab as TabType)} />

    {activeTab === 'dashboard' && (
      <WalletDashboard />
    )}
    {activeTab === 'clients' && (
      <WalletClients />
    )}
    {activeTab === 'payments' && (
      <WalletPayments />
    )}
    {activeTab === 'cards' && (
      <WalletCard />
    )}
    {activeTab === 'qr-generator' && (
      <WalletQRGenerator />
    )}
    </div>
  );
}