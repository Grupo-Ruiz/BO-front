import type { TabConfig } from "@/modules/shared/types";

interface TabsProps {
  tabs: TabConfig[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeTab, setActiveTab, className = "" }: TabsProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <nav
        className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent space-x-4 sm:space-x-8 border-b border-gray-200 dark:border-gray-700 px-1 sm:px-0"
        aria-label="Tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center whitespace-nowrap py-3 px-2 sm:py-4 sm:px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/10'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            style={{ minWidth: 120 }}
          >
            {tab.icon && <tab.icon className="h-5 w-5 mr-2" />}
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
