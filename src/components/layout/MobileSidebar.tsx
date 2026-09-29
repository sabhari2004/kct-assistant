import { X } from 'lucide-react';
import Sidebar from './Sidebar';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

export default function MobileSidebar({ isOpen, onClose, onNewChat }: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 z-50 flex slide-in-left">
        <div className="relative w-64">
          <button
            onClick={onClose}
            className="absolute top-3 right-[-44px] z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <X size={16} className="text-gray-600 dark:text-gray-300" />
          </button>
          <div className="h-full">
            <Sidebar onNewChat={onNewChat} onClose={onClose} />
          </div>
        </div>
      </div>
    </>
  );
}
