import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { AppSettings } from '../../types';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const toggle = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
      title={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
    >
      <Globe size={14} className="text-gray-400" />
      {language === 'en' ? 'EN' : 'தமிழ்'}
    </button>
  );
}

export function LanguageSelectorFull() {
  const { language, setLanguage } = useLanguage();

  const options: { value: AppSettings['language']; label: string; native: string }[] = [
    { value: 'en', label: 'English', native: 'English' },
    { value: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLanguage(opt.value)}
          className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
            language === opt.value
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-700'
              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <span className="block font-semibold">{opt.native}</span>
          <span className="block text-xs opacity-70">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
