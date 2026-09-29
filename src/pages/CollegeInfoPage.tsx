import { ArrowRight, BookOpen, Building2, Briefcase, Phone, GraduationCap, MapPin } from 'lucide-react';
import { kctInfo, aboutKCT } from '../data/mockData/collegeInfo';
import { departments } from '../data/mockData/departments';

const infoCards = [
  {
    emoji: '🎓',
    icon: GraduationCap,
    title: 'Programmes',
    description: 'Undergraduate, Postgraduate, Management and Research Programmes offered at KCT.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
    border: 'border-blue-100 dark:border-blue-900',
  },
  {
    emoji: '📚',
    icon: BookOpen,
    title: 'Departments',
    description: `Explore ${departments.length} academic departments across Engineering, Technology, Science and Humanities.`,
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    border: 'border-indigo-100 dark:border-indigo-900',
  },
  {
    emoji: '🏫',
    icon: Building2,
    title: 'Campus',
    description: 'Academic facilities, Library, Sports, Hostel, Wellness, Transport, and Food facilities.',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-950/50',
    border: 'border-cyan-100 dark:border-cyan-900',
  },
  {
    emoji: '💼',
    icon: Briefcase,
    title: 'Placements',
    description: 'KCT Placement & Career Development support, training, and recruitment activities.',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/50',
    border: 'border-purple-100 dark:border-purple-900',
  },
];

export default function CollegeInfoPage() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">College Information</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Information about Kumaraguru College of Technology.
          </p>
        </div>

        {/* Hero banner */}
        <div className="bg-indigo-600 rounded-2xl p-6 mb-6 text-white">
          <h2 className="text-lg font-bold mb-1">{kctInfo.name} ({kctInfo.shortName})</h2>
          <p className="text-indigo-200 text-sm mb-4">
            {aboutKCT}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-indigo-500">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-indigo-300 flex-shrink-0" />
              <p className="text-xs text-indigo-100 leading-relaxed">
                {kctInfo.location.fullAddress}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 text-indigo-300 flex-shrink-0" />
              <div className="text-xs text-indigo-100 leading-relaxed space-y-1">
                <p>Main: {kctInfo.contact.main}</p>
                <p>Admissions: {kctInfo.contact.admissions}</p>
                <p>Website: <a href={kctInfo.contact.website} target="_blank" rel="noreferrer" className="underline">{kctInfo.contact.website}</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition-all group`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.bg} border ${card.border}`}>
                  <Icon size={20} className={card.color} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">
                  {card.emoji} {card.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  {card.description}
                </p>
                <button className={`flex items-center gap-1.5 text-xs font-semibold ${card.color} group-hover:gap-2.5 transition-all`}>
                  View Details <ArrowRight size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Source Note */}
        <p className="mt-6 text-[10px] text-gray-400 dark:text-gray-500 text-center uppercase tracking-wider">
          Source: Official KCT Website
        </p>
      </div>
    </div>
  );
}
