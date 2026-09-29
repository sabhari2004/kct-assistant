import { NavLink, useNavigate } from 'react-router-dom';
import {
  MessageSquarePlus,
  History,
  GraduationCap,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  BookOpen,
  CalendarCheck,
  DollarSign,
  Briefcase,
  Building2,
  BedDouble,
  Library,
  Bot,
  Bus,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  onNewChat: () => void;
  onClose?: () => void;
}

const categories = [
  { label: 'Admissions', icon: GraduationCap, color: 'text-indigo-500', q: 'What are the admission programmes available at KCT?' },
  { label: 'Academics', icon: BookOpen, color: 'text-blue-500', q: 'What undergraduate and postgraduate programmes does KCT offer?' },
  { label: 'Examinations', icon: CalendarCheck, color: 'text-amber-500', q: 'Where can I find examination-related information at KCT?' },
  { label: 'Fees', icon: DollarSign, color: 'text-green-500', q: 'What is the fee structure at KCT?' },
  { label: 'Placements', icon: Briefcase, color: 'text-purple-500', q: 'Tell me about KCT placement activities and the placement cell.' },
  { label: 'Campus', icon: Building2, color: 'text-cyan-500', q: 'What facilities are available on the KCT campus?' },
  { label: 'Hostel', icon: BedDouble, color: 'text-pink-500', q: 'What hostel facilities are available at KCT?' },
  { label: 'Library', icon: Library, color: 'text-orange-500', q: 'Tell me about the KCT Central Library.' },
  { label: 'Transport', icon: Bus, color: 'text-yellow-500', q: 'Does KCT provide campus transportation?' },
  { label: 'Notices', icon: Bell, color: 'text-red-500', q: 'What are the latest notices and announcements from KCT?' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 group ${
    isActive
      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
  }`;

export default function Sidebar({ onNewChat, onClose }: SidebarProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const displayName = user?.name || 'Student';
  const department = user?.department || '';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleNewChat = () => {
    onNewChat();
    navigate('/chat');
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-64">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
              KCT AI Assistant
            </h1>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
              College AI Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1">
        {/* New Chat */}
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-150 mb-2"
        >
          <MessageSquarePlus size={16} />
          {t.newChat}
        </button>

        {/* Main nav */}
        <NavLink to="/chat" className={navLinkClass} onClick={onClose}>
          {({ isActive }) => (
            <>
              <Bot size={16} className={isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'} />
              AI Assistant
            </>
          )}
        </NavLink>

        <NavLink to="/history" className={navLinkClass} onClick={onClose}>
          {({ isActive }) => (
            <>
              <History size={16} className={isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'} />
              {t.chatHistory}
            </>
          )}
        </NavLink>

        <NavLink to="/college-info" className={navLinkClass} onClick={onClose}>
          {({ isActive }) => (
            <>
              <GraduationCap size={16} className={isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'} />
              {t.collegeInfo}
            </>
          )}
        </NavLink>

        <NavLink to="/documents" className={navLinkClass} onClick={onClose}>
          {({ isActive }) => (
            <>
              <FileText size={16} className={isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'} />
              {t.documents}
            </>
          )}
        </NavLink>

        <NavLink to="/notifications" className={navLinkClass} onClick={onClose}>
          {({ isActive }) => (
            <>
              <Bell size={16} className={isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'} />
              {t.notifications}
            </>
          )}
        </NavLink>

        {/* Divider */}
        <div className="my-3 border-t border-gray-100 dark:border-gray-800" />

        {/* Categories */}
        <p className="px-3 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
          Quick Access
        </p>

        {categories.map(({ label, icon: Icon, color, q }) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-all duration-150"
            onClick={() => {
              navigate(`/chat?q=${encodeURIComponent(q)}`);
              onClose?.();
            }}
          >
            <Icon size={14} className={color} />
            {label}
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
        <NavLink to="/settings" className={navLinkClass} onClick={onClose}>
          {({ isActive }) => (
            <>
              <Settings size={16} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
              {t.settings}
            </>
          )}
        </NavLink>
        <NavLink to="/settings" className={navLinkClass} onClick={onClose}>
          {() => (
            <>
              <HelpCircle size={16} className="text-gray-400" />
              {t.helpSupport}
            </>
          )}
        </NavLink>

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{displayName}</p>
            <p className="text-xs text-gray-400 truncate">{department || 'Student'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
