import type { TabConfig } from "@/modules/shared/types";
import type { PaymentsTabsProps } from "../types";


export default function PaymentsTabs({ tabs, activeTab, setActiveTab }: PaymentsTabsProps) {
  return (
    <div className="mb-6">
      <nav className="flex space-x-8 border-b border-gray-200 dark:border-gray-700" aria-label="Tabs">
        {tabs.map((tab: TabConfig) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            {tab.icon && <tab.icon className="h-5 w-5 mr-2" />}
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
}