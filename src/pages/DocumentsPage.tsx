import { useState } from 'react';
import { Search, Upload } from 'lucide-react';
import { mockDocuments } from '../data/mockData';
import DocumentCard from '../components/ui/DocumentCard';
import FileUploadModal from '../components/modals/FileUploadModal';
import type { DocumentCategory } from '../types';

const filterTabs: DocumentCategory[] = [
  'All', 'Syllabus', 'Regulations', 'Academic Calendar', 'Notices', 'Placements',
];

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<DocumentCategory>('All');
  const [uploadOpen, setUploadOpen] = useState(false);

  const filtered = mockDocuments.filter((doc) => {
    const matchSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || doc.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">College Documents</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Official documents available to the AI assistant
            </p>
          </div>
          <button
            onClick={() => setUploadOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors flex-shrink-0"
          >
            <Upload size={15} />
            Upload
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-thin">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                filter === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search size={36} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">No documents found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">{filtered.length} document{filtered.length !== 1 ? 's' : ''}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          </>
        )}
      </div>

      {uploadOpen && <FileUploadModal onClose={() => setUploadOpen(false)} />}
    </div>
  );
}
