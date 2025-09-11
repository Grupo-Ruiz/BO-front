import { useState } from 'react';

import StripePage from './StripePage';
import RedsysPage from './RedsysPage';
import { SiRedsys } from 'react-icons/si';
import { FaCcStripe } from 'react-icons/fa';
import type { TabConfig, TabType } from '@/modules/shared/types';
import Tabs from '@/modules/shared/components/Tabs';

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('redsys');

  const tabs: TabConfig[] = [
    { id: 'redsys', name: 'Redsys', icon: SiRedsys  },
    { id: 'stripe', name: 'Stripe', icon: FaCcStripe  },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Gestión de pasarelas de pagos
        </h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Panel unificado para gestión de tarjetas, abonos, operaciones, pagos y códigos QR
        </p>
      </div>
      
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab as TabType)} />

      {activeTab === 'redsys' && (
        <RedsysPage />
      )}
      {activeTab === 'stripe' && (
        <StripePage />
      )}
    </div>
  );
}