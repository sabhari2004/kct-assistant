// ────────── User & Auth ──────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  department?: string;
  year?: number;
  avatar?: string;
}

// ────────── Chat ──────────

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  liked?: boolean | null;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationGroup {
  label: string;
  conversations: ConversationSummary[];
}

export interface ConversationSummary {
  id: string;
  title: string;
  preview: string;
  updatedAt: Date;
}

// ────────── Documents ──────────

export type DocumentCategory =
  | 'All'
  | 'Syllabus'
  | 'Regulations'
  | 'Academic Calendar'
  | 'Notices'
  | 'Placements';

export type DocumentStatus = 'Active' | 'Processing' | 'Archived';

export interface CollegeDocument {
  id: string;
  name: string;
  category: Exclude<DocumentCategory, 'All'>;
  format: 'PDF' | 'DOCX' | 'TXT';
  size: string;
  updatedAt: Date;
  status: DocumentStatus;
}

// ────────── Notifications ──────────

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: Date;
  read: boolean;
  type: 'notice' | 'exam' | 'placement' | 'general';
}

// ────────── FAQs ──────────

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  status: 'Active' | 'Inactive';
  updatedAt: Date;
}

// ────────── Notices ──────────

export interface Notice {
  id: string;
  title: string;
  category: string;
  content: string;
  publishedAt: Date;
  status: 'Published' | 'Draft';
}

// ────────── Admin / Analytics ──────────

export interface DailyUsage {
  date: string;
  conversations: number;
  questions: number;
}

export interface CategoryStat {
  category: string;
  count: number;
}

export interface AdminStudent {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  joinedAt: Date;
  totalConversations: number;
}

// ────────── Settings ──────────

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'ta';
  enterToSend: boolean;
  showTimestamps: boolean;
  autoScroll: boolean;
  notificationsEnabled: boolean;
}

// ────────── Suggestion Cards ──────────

export interface SuggestionCard {
  emoji: string;
  title: string;
  question: string;
}
