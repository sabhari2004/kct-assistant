import { FileText, Archive } from 'lucide-react';
import type { CollegeDocument } from '../../types';

interface DocumentCardProps {
  doc: CollegeDocument;
}

const statusColors: Record<CollegeDocument['status'], string> = {
  Active: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400',
  Processing: 'text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400',
  Archived: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400',
};

const categoryColors: Record<string, string> = {
  Syllabus: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50',
  Regulations: 'text-purple-600 bg-purple-50 dark:bg-purple-950/50',
  'Academic Calendar': 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50',
  Notices: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50',
  Placements: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50',
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function DocumentCard({ doc }: DocumentCardProps) {
  const isArchived = doc.status === 'Archived';

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all duration-150">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isArchived ? 'bg-gray-100 dark:bg-gray-800' : 'bg-indigo-50 dark:bg-indigo-950'}`}>
          {isArchived ? (
            <Archive size={18} className="text-gray-400" />
          ) : (
            <FileText size={18} className="text-indigo-500" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight truncate">
            {doc.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-lg ${categoryColors[doc.category] || 'text-gray-600 bg-gray-100'}`}>
              {doc.category}
            </span>
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              {doc.format} · {doc.size}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              Updated {formatDate(doc.updatedAt)}
            </span>
            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-lg ${statusColors[doc.status]}`}>
              {doc.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
