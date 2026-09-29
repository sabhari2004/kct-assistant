import { useState } from 'react';
import { CheckCheck, Info, CalendarCheck, Briefcase, Bell } from 'lucide-react';
import { mockNotifications } from '../data/mockData';
import type { Notification } from '../types';

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
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Notifications</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors"
            >
              <CheckCheck size={15} />
              Mark all read
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="space-y-2">
          {notifications.map((notif) => {
            const Icon = typeIcon[notif.type];
            return (
              <div
                key={notif.id}
                className={`flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                  !notif.read
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
                onClick={() => markRead(notif.id)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColor[notif.type]}`}>
                  <Icon size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-sm font-semibold leading-tight ${!notif.read ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {notif.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {timeAgo(notif.time)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
