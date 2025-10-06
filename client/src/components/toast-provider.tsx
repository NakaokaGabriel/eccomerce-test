"use client";

import { useEffect, useState } from 'react';
import { toast, Toast } from '@/lib/toast';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe(setToasts);
    return unsubscribe;
  }, []);

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toastItem) => (
        <div
          key={toastItem.id}
          className={`
            flex items-center gap-3 p-4 rounded-lg border shadow-lg
            ${getBackgroundColor(toastItem.type)}
            animate-in slide-in-from-right-full duration-300
          `}
        >
          {getIcon(toastItem.type)}
          <span className="text-sm font-medium text-gray-900">
            {toastItem.message}
          </span>
          <button
            onClick={() => toast.remove(toastItem.id)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
