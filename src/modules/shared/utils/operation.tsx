import { HiOutlineCreditCard, HiOutlineQrCode, HiOutlinePlus, HiOutlineMinus, HiOutlineArrowPath, HiOutlineDocumentText } from 'react-icons/hi2';
import React from 'react';

export function getOperationIcon(type: string): React.ReactNode {
  switch (type) {
    case 'recharge':
      return <HiOutlinePlus className="h-5 w-5 text-green-600 dark:text-green-400" />;
    case 'payment':
      return <HiOutlineMinus className="h-5 w-5 text-red-600 dark:text-red-400" />;
    case 'refund':
      return <HiOutlineArrowPath className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    case 'subscription_recharge':
    case 'subscription':
      return <HiOutlineCreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
    case 'qr_generation':
    case 'qr_scan':
      return <HiOutlineQrCode className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
    default:
      return <HiOutlineDocumentText className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
  }
}
