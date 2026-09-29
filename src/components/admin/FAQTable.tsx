import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import type { FAQ } from '../../types';
import FAQModal from '../modals/FAQModal';
import { mockFAQs } from '../../data/mockData';

export default function FAQTable() {
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs);
  const [modalFaq, setModalFaq] = useState<FAQ | null | undefined>(undefined);

  const handleSave = (partial: Partial<FAQ>) => {
    if (modalFaq) {
      setFaqs((prev) =>
        prev.map((f) => (f.id === modalFaq.id ? { ...f, ...partial, updatedAt: new Date() } : f))
      );
    } else {
      const newFaq: FAQ = {
        id: `faq-${Date.now()}`,
        question: partial.question!,
        answer: partial.answer!,
        category: partial.category!,
        status: partial.status!,
        updatedAt: new Date(),
      };
      setFaqs((prev) => [newFaq, ...prev]);
    }
    setModalFaq(undefined);
  };

  const handleDelete = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const statusColors = {
    Active: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400',
    Inactive: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400',
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">FAQs</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{faqs.length} questions</p>
        </div>
        <button
          onClick={() => setModalFaq(null)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Plus size={15} />
          Add FAQ
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Question</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Updated</th>
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 max-w-xs">
                      {faq.question}
                    </p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                      {faq.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${statusColors[faq.status]}`}>
                      {faq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500 dark:text-gray-400">
                    {faq.updatedAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setModalFaq(faq)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 dark:hover:text-indigo-400 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalFaq !== undefined && (
        <FAQModal
          faq={modalFaq}
          onClose={() => setModalFaq(undefined)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
