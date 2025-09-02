import React from 'react';

export function getCardTypeBadge(type: string): React.ReactNode {
  const badges: Record<string, string> = {
    'sencillo': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    'mensual': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    'anual': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[type] || ''}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}
