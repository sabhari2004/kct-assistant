import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelectorFull } from '../components/ui/LanguageSelector';
import { Sun, Moon, Monitor, Check, LogOut } from 'lucide-react';
import type { AppSettings } from '../types';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/auth';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}

function Toggle({ checked, onChange, id }: ToggleProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-6 rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-4' : ''}`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.name || 'Student';
  const email = user?.email || '';
  const department = user?.department || '';
  const year = user?.year;
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    try { await logout(); } finally {
      navigate('/login', { replace: true });
    }
  };

  const [prefs, setPrefs] = useState({
    enterToSend: true,
    showTimestamps: true,
    autoScroll: true,
    notifications: true,
  });

  const themeOptions: { value: AppSettings['theme']; label: string; icon: typeof Sun }[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your preferences and account settings.</p>
        </div>

        {/* Appearance */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Appearance</h2>
          <div className="flex gap-3">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`flex-1 flex flex-col items-center gap-2 py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
                  theme === value
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon size={18} />
                {label}
                {theme === value && <Check size={13} className="text-indigo-600 dark:text-indigo-400" />}
              </button>
            ))}
          </div>
        </section>

        {/* Chat Preferences */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Chat Preferences</h2>
          <div className="space-y-4">
            {[
              { key: 'enterToSend', label: 'Enter to send', desc: 'Press Enter to send messages (Shift+Enter for new line)' },
              { key: 'showTimestamps', label: 'Show timestamps', desc: 'Display message timestamps in conversations' },
              { key: 'autoScroll', label: 'Auto-scroll', desc: 'Automatically scroll to new messages' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                </div>
                <Toggle
                  id={`toggle-${key}`}
                  checked={prefs[key as keyof typeof prefs]}
                  onChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Language */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Language</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Select your preferred interface language. Translated UI will use mock content for now.
          </p>
          <LanguageSelectorFull />

          {language === 'ta' && (
            <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900">
              <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                தமிழ் இடைமுகம் தேர்ந்தெடுக்கப்பட்டது
              </p>
              <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-0.5">
                Tamil interface selected. Full translation coming soon.
              </p>
            </div>
          )}
        </section>

        {/* Notifications */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Notifications</h2>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Enable notifications</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Receive updates about college notices, exams, and placements.
              </p>
            </div>
            <Toggle
              id="toggle-notifications"
              checked={prefs.notifications}
              onChange={(v) => setPrefs((p) => ({ ...p, notifications: v }))}
            />
          </div>
        </section>

        {/* Account */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Account</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-base font-bold text-indigo-700 dark:text-indigo-300">{initials}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{displayName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
              {(department || year) && (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {[department, year ? `Year ${year}` : ''].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </section>
      </div>
    </div>
  );
}
