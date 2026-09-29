import { useState } from 'react';
import { Search, Upload } from 'lucide-react';
import { mockDocuments } from '../../data/mockData';
import DocumentCard from '../../components/ui/DocumentCard';
import FileUploadModal from '../../components/modals/FileUploadModal';
import type { DocumentCategory } from '../../types';

const filterTabs: DocumentCategory[] = ['All', 'Syllabus', 'Regulations', 'Academic Calendar', 'Notices', 'Placements'];

export default function AdminDocumentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<DocumentCategory>('All');
  const [uploadOpen, setUploadOpen] = useState(false);

  const filtered = mockDocuments.filter((doc) => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || doc.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Documents</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage documents available to the AI knowledge base</p>
          </div>
          <button
            onClick={() => setUploadOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors flex-shrink-0"
          >
            <Upload size={15} />
            Upload Document
          </button>
        </div>

        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
          {filterTabs.map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${filter === tab ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((doc) => <DocumentCard key={doc.id} doc={doc} />)}
        </div>
      </div>
      {uploadOpen && <FileUploadModal onClose={() => setUploadOpen(false)} />}
    </div>
  );
}
