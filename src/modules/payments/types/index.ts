import type { TabConfig, TabType } from "@/modules/shared/types";

export interface PaymentsTabsProps {
  tabs: TabConfig[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}