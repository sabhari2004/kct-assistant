import { useState } from 'react';
import { X, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';
import { uploadDocument } from '../../services/documents';
import type { DocumentCategory } from '../../types';

interface FileUploadModalProps {
  onClose: () => void;
  onUploaded?: () => void;
}

const categories: Array<Exclude<DocumentCategory, 'All'>> = [
  'Academic Calendar',
  'Syllabus',
  'Regulations',
  'Notices',
  'Placements',
];

export default function FileUploadModal({ onClose, onUploaded }: FileUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<Exclude<DocumentCategory, 'All'>>('Academic Calendar');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await uploadDocument(file, category);
      setSuccess(true);
      setTimeout(() => {
        if (onUploaded) onUploaded();
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(err?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Upload College Document</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Stores document in cloud and makes it accessible to AI</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Form Body */}
        {success ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle2 size={42} className="text-emerald-500 animate-bounce" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Document Uploaded!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your document has been securely stored in the cloud.
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="p-6 space-y-4">
            {/* Category Select */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* File Drag / Drop Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                File (PDF, DOCX, TXT)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-colors cursor-pointer relative bg-gray-50/50 dark:bg-gray-800/40">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <UploadCloud size={32} className="text-indigo-500 mb-2" />
                {file ? (
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Click or drag file to upload
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">PDF, Word, or Text up to 25MB</p>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle size={15} />
                {error}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !file}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium text-white shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Uploading...' : 'Upload File'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
