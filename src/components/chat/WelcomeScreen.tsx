import { useLanguage } from '../../context/LanguageContext';
import { suggestionCards } from '../../data/mockData';
import { GraduationCap } from 'lucide-react';

interface WelcomeScreenProps {
  onSuggestion: (question: string) => void;
}

export default function WelcomeScreen({ onSuggestion }: WelcomeScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
      {/* Icon */}
      <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 dark:border-indigo-900">
        <GraduationCap size={32} className="text-indigo-500" />
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        {t.howCanIHelp}
      </h1>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed mb-10">
        {t.askAnythingSubtitle}
      </p>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestionCards.map((card) => (
          <button
            key={card.title}
            onClick={() => onSuggestion(card.question)}
            className="group text-left p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all duration-150"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{card.emoji}</span>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {card.title}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 leading-snug transition-colors">
              {card.question}
            </p>
          </button>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-xs text-gray-400 dark:text-gray-500 max-w-lg mx-auto">
        <strong>Important:</strong> KCT AI Assistant provides information based on available college resources. For important matters such as fees, admission deadlines, examination dates, regulations, and official notices, always verify the latest information from KCT.
      </p>
    </div>
  );
}
