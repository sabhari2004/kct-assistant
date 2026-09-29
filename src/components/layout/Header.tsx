import { useState } from 'react';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import ProfileMenu from '../ui/ProfileMenu';
import NotificationPanel from '../ui/NotificationPanel';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
  subtitle?: string;
}

export default function Header({
  onMenuClick,
  title = 'AI College Assistant',
  subtitle = 'Ask questions about your college, academics, admissions and more.',
}: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user } = useAuth();

  const displayName = user?.name || 'Student';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 relative z-30">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            {title}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block leading-tight">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Notification */}
        <div className="relative">
          <button
            id="notification-btn"
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
          </button>
          {notifOpen && (
            <NotificationPanel onClose={() => setNotifOpen(false)} />
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile */}
        <div className="relative">
          <button
            id="profile-btn"
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">{initials}</span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
              {displayName}
            </span>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </button>
          {profileOpen && (
            <ProfileMenu onClose={() => setProfileOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
}
