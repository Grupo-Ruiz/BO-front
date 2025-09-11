import Tabs from "@/modules/shared/components/Tabs";
import type { PaymentsTabsProps } from "../types";

export default function PaymentsTabs({ tabs, activeTab, setActiveTab }: PaymentsTabsProps) {
  return <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />;
}