import { X, Clock } from 'lucide-react';

interface FileUploadModalProps {
  onClose: () => void;
}

export default function FileUploadModal({ onClose }: FileUploadModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl w-full max-w-md scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Upload Document</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-10 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
            <Clock size={28} className="text-indigo-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Document Storage – Coming Soon
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
            We are currently integrating a new storage provider (like Supabase Storage). 
            File uploads are temporarily disabled while we transition away from Firebase Storage to keep the platform free.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-sm font-medium text-white shadow-sm hover:shadow transition-all"
          >
            Got it, close
          </button>
        </div>
      </div>
    </div>
  );
}

