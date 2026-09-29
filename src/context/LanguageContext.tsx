import React, { createContext, useContext, useState } from 'react';
import type { AppSettings } from '../types';

interface Translations {
  askAnything: string;
  placeholder: string;
  howCanIHelp: string;
  askAnythingSubtitle: string;
  aiThinking: string;
  newChat: string;
  chatHistory: string;
  collegeInfo: string;
  documents: string;
  notifications: string;
  settings: string;
  helpSupport: string;
}

const en: Translations = {
  askAnything: 'Ask anything about KCT',
  placeholder: 'Ask anything about KCT...',
  howCanIHelp: 'Welcome to KCT AI Assistant',
  askAnythingSubtitle: 'Your intelligent assistant for Kumaraguru College of Technology. Supporting students with information about Admissions, Academics, Courses, Examinations, Placements, Campus Facilities, Hostel, Library, Transport, and College Notices.',
  aiThinking: 'KCT AI Assistant is thinking...',
  newChat: 'New Chat',
  chatHistory: 'Chat History',
  collegeInfo: 'College Information',
  documents: 'Documents',
  notifications: 'Notifications',
  settings: 'Settings',
  helpSupport: 'Help & Support',
};

const ta: Translations = {
  askAnything: 'உங்கள் கல்லூரியைப் பற்றி எதையும் கேளுங்கள்',
  placeholder: 'உங்கள் கல்லூரியைப் பற்றி கேளுங்கள்...',
  howCanIHelp: 'இன்று நான் எப்படி உதவலாம்?',
  askAnythingSubtitle: 'உங்கள் கல்லூரி, கல்வி, தேர்வுகள், சேர்க்கை, வேலைவாய்ப்புகள் மற்றும் வளாக வசதிகள் பற்றி என்னிடம் கேளுங்கள்.',
  aiThinking: 'AI உதவியாளர் சிந்திக்கிறார்...',
  newChat: 'புதிய அரட்டை',
  chatHistory: 'அரட்டை வரலாறு',
  collegeInfo: 'கல்லூரி தகவல்',
  documents: 'ஆவணங்கள்',
  notifications: 'அறிவிப்புகள்',
  settings: 'அமைப்புகள்',
  helpSupport: 'உதவி மற்றும் ஆதரவு',
};

const translations: Record<AppSettings['language'], Translations> = { en, ta };

interface LanguageContextType {
  language: AppSettings['language'];
  setLanguage: (lang: AppSettings['language']) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<AppSettings['language']>(() => {
    return (localStorage.getItem('campusai-lang') as AppSettings['language']) || 'en';
  });

  const setLanguage = (lang: AppSettings['language']) => {
    setLanguageState(lang);
    localStorage.setItem('campusai-lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
