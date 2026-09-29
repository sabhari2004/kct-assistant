import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  History,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../services/auth';

interface ProfileMenuProps {
  onClose: () => void;
}

const menuItems = [
  { label: 'My Profile', icon: User, to: '/settings' },
  { label: 'Chat History', icon: History, to: '/history' },
  { label: 'Settings', icon: Settings, to: '/settings' },
  { label: 'Help & Support', icon: HelpCircle, to: '/settings' },
];

export default function ProfileMenu({ onClose }: ProfileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const displayName = user?.name || 'Student';
  const email = user?.email || '';
  const department = user?.department || '';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const handleNav = (to: string) => {
    navigate(to);
    onClose();
  };

  const handleLogout = async () => {
    onClose();
    try {
      await logout();
    } finally {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden scale-in"
    >
      {/* User info */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{displayName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {department ? `${department} · ` : ''}{email}
            </p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-1.5">
        {menuItems.map(({ label, icon: Icon, to }) => (
          <button
            key={label}
            onClick={() => handleNav(to)}
            className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icon size={15} className="text-gray-400" />
              {label}
            </div>
            <ChevronRight size={13} className="text-gray-300 dark:text-gray-600" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="border-t border-gray-100 dark:border-gray-800 py-1.5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </div>
  );
}
