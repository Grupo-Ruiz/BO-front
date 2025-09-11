import Tabs from "@/modules/shared/components/Tabs";
import type { ManagementTabsProps } from "../types";

export default function ManagementTabs({ tabs, activeTab, setActiveTab }: ManagementTabsProps) {
  return <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />;
}