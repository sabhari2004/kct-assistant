import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  HelpCircle,
  FileText,
  Megaphone,
  BarChart3,
  Settings,
  Bot,
  Shield,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Students', to: '/admin/students', icon: Users },
  { label: 'Conversations', to: '/admin/conversations', icon: MessageSquare },
  { label: 'FAQs', to: '/admin/faqs', icon: HelpCircle },
  { label: 'Documents', to: '/admin/documents', icon: FileText },
  { label: 'Notices', to: '/admin/notices', icon: Megaphone },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
    isActive
      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
  }`;

export default function AdminSidebar() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-56">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
              KCT AI Assistant
            </h1>
            <div className="flex items-center gap-1">
              <Shield size={9} className="text-indigo-500" />
              <p className="text-[10px] text-indigo-500 font-medium leading-tight">Admin Portal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map(({ label, to, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={navLinkClass}>
            {({ isActive }) => (
              <>
                <Icon size={16} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        <NavLink
          to="/chat"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
        >
          <MessageSquare size={16} className="text-gray-400" />
          Student View
        </NavLink>

        <div className="flex items-center gap-3 px-3 py-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">RK</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Dr. Ramesh Kumar</p>
            <p className="text-xs text-gray-400 truncate">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
