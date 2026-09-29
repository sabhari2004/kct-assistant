import { useEffect, useRef, useState } from 'react';
import { Bell, CalendarCheck, Briefcase, Info, CheckCheck } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import type { Notification } from '../../types';

interface NotificationPanelProps {
  onClose: () => void;
}

const typeIcon = {
  notice: Info,
  exam: CalendarCheck,
  placement: Briefcase,
  general: Bell,
};

const typeColor = {
  notice: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50',
  exam: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50',
  placement: 'text-purple-500 bg-purple-50 dark:bg-purple-950/50',
  general: 'text-gray-500 bg-gray-100 dark:bg-gray-800',
};

function timeAgo(date: Date): string {
  const now = new Date('2026-08-15T13:07:58+05:30');
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden scale-in"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium transition-colors"
          >
            <CheckCheck size={13} />
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto scrollbar-thin">
        {notifications.map((notif) => {
          const Icon = typeIcon[notif.type];
          return (
            <div
              key={notif.id}
              className={`flex gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${
                !notif.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
              }`}
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
                )
              }
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColor[notif.type]}`}>
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium leading-tight ${!notif.read ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
                    {notif.title}
                  </p>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1" />}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                  {notif.description}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                  {timeAgo(notif.time)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={onClose}
          className="w-full text-xs text-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 font-medium transition-colors"
        >
          View all notifications →
        </button>
      </div>
    </div>
  );
}
