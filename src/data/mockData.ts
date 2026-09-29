import type {
  User,
  Conversation,
  Notification,
  DailyUsage,
  CategoryStat,
  AdminStudent,
  SuggestionCard,
} from '../types';

// Import new modular data sources
import { kctInfo } from './mockData/collegeInfo';
import { mockDocuments as kctDocs } from './mockData/documents';
import { mockNotices as kctNotices } from './mockData/notices';
import { kctFAQs } from './mockData/faqs';
import { chatHistoryGroups as kctChats } from './mockData/mockChats';

// ────────── Current User ──────────

export const currentUser: User = {
  id: 'user-1',
  name: 'Shree Sabhari',
  email: 'shreesabhari@kct.ac.in',
  role: 'student',
  department: 'MCA',
  year: 2,
};

export const adminUser: User = {
  id: 'admin-1',
  name: 'Dr. Ramesh Kumar',
  email: 'ramesh.kumar@kct.ac.in',
  role: 'admin',
};

// ────────── Suggestion Cards ──────────

export const suggestionCards: SuggestionCard[] = [
  {
    emoji: '🎓',
    title: 'Admissions',
    question: 'What are the admission programmes available at KCT?',
  },
  {
    emoji: '📚',
    title: 'Academics',
    question: 'What postgraduate programmes are offered at KCT?',
  },
  {
    emoji: '📝',
    title: 'Examinations',
    question: 'Where can I find examination-related information?',
  },
  {
    emoji: '💼',
    title: 'Placements',
    question: 'Tell me about KCT placement activities.',
  },
  {
    emoji: '🏫',
    title: 'Campus',
    question: 'What facilities are available on the KCT campus?',
  },
  {
    emoji: '📖',
    title: 'Library',
    question: 'Tell me about the KCT Central Library.',
  },
  {
    emoji: '🚌',
    title: 'Transport',
    question: 'Does KCT provide campus transportation?',
  },
  {
    emoji: '🏠',
    title: 'Hostel',
    question: 'What hostel facilities are available at KCT?',
  },
];

// ────────── Mock AI Responses ──────────

export const mockAIResponses: Record<string, string> = {
  default: `I'm here to help you with information about ${kctInfo.name}. You can ask me about:

- **Admissions** – Programmes offered, eligibility, application process
- **Academics** – Courses, syllabus, departments, faculty
- **Examinations** – Schedules, regulations, results, hall tickets
- **Fees** – Fee structure, payment deadlines, scholarships
- **Placements** – Activities, company visits, career support
- **Campus** – Facilities, library, hostel, transport

What would you like to know?

> **Important:** KCT AI Assistant provides information based on available college resources. For important matters such as fees, admission deadlines, examination dates, regulations, and official notices, always verify the latest information from official KCT sources.`,

  kct_programmes: `Kumaraguru College of Technology offers undergraduate and postgraduate programmes across engineering, technology, management and related academic areas. The current programme list includes B.E., B.Tech., M.E., M.Tech., MCA and MBA programmes. Please refer to the official KCT programme list for the latest details.

> Source: Official KCT Website`,

  kct_location: `Kumaraguru College of Technology is located at:
${kctInfo.location.fullAddress}

> Source: Official KCT Website`,

  kct_contact: `You can contact Kumaraguru College of Technology through the main office at ${kctInfo.contact.main}. For admissions-related enquiries, the official KCT admissions contact is ${kctInfo.contact.admissions}. For the latest contact information, please refer to the official KCT website.

> Source: Official KCT Website`,

  kct_hostel: `Yes, KCT provides hostel facilities for students. For current hostel availability, fees, rules and other details, please refer to the latest official KCT hostel information.

> Source: Official KCT Website`,
};

// ────────── Mock Conversations ──────────

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'KCT Programmes',
    createdAt: new Date('2026-08-15T09:00:00'),
    updatedAt: new Date('2026-08-15T09:15:00'),
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'What programmes does KCT offer?',
        timestamp: new Date('2026-08-15T09:00:00'),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: mockAIResponses.kct_programmes,
        timestamp: new Date('2026-08-15T09:00:05'),
        sources: ['Official KCT Website'],
      },
    ],
  },
  {
    id: 'conv-2',
    title: 'KCT Location',
    createdAt: new Date('2026-08-15T11:30:00'),
    updatedAt: new Date('2026-08-15T11:45:00'),
    messages: [
      {
        id: 'msg-3',
        role: 'user',
        content: 'Where is KCT located?',
        timestamp: new Date('2026-08-15T11:30:00'),
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: mockAIResponses.kct_location,
        timestamp: new Date('2026-08-15T11:30:05'),
        sources: ['Official KCT Website'],
      },
    ],
  },
];

// ────────── Forwarded Data ──────────

export const chatHistoryGroups = kctChats;
export const mockDocuments = kctDocs;
export const mockFAQs = kctFAQs;
export const mockNotices = kctNotices;

// ────────── Notifications ──────────

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Demo Notice: Semester Examination',
    description: 'Please refer to the official KCT examination portal for the actual semester examination schedule.',
    time: new Date('2026-08-15T08:00:00'),
    read: false,
    type: 'notice',
  },
  {
    id: 'notif-2',
    title: 'Demo Notice: Campus Placement Drive',
    description: 'Details regarding upcoming campus placement drives will be communicated officially by the KCT Placement Cell.',
    time: new Date('2026-08-14T14:00:00'),
    read: false,
    type: 'placement',
  },
  {
    id: 'notif-3',
    title: 'Demo Notice: Academic Calendar',
    description: 'The official academic calendar for the current semester is available on the KCT website.',
    time: new Date('2026-08-13T10:30:00'),
    read: true,
    type: 'exam',
  },
];

// ────────── Analytics ──────────

export const dailyUsageData: DailyUsage[] = [
  { date: 'Aug 9', conversations: 42, questions: 87 },
  { date: 'Aug 10', conversations: 58, questions: 124 },
  { date: 'Aug 11', conversations: 35, questions: 71 },
  { date: 'Aug 12', conversations: 67, questions: 143 },
  { date: 'Aug 13', conversations: 89, questions: 198 },
  { date: 'Aug 14', conversations: 74, questions: 162 },
  { date: 'Aug 15', conversations: 91, questions: 203 },
];

export const categoryStatsData: CategoryStat[] = [
  { category: 'Academics', count: 312 },
  { category: 'Admissions', count: 280 },
  { category: 'Examinations', count: 248 },
  { category: 'Campus', count: 189 },
  { category: 'Placements', count: 156 },
  { category: 'Fees', count: 134 },
  { category: 'Hostel', count: 77 },
  { category: 'Library', count: 54 },
];

// ────────── Admin Students ──────────

export const mockStudents: AdminStudent[] = [
  { id: 's-1', name: 'Shree Sabhari', email: 'shreesabhari@kct.ac.in', department: 'MCA', year: 2, joinedAt: new Date('2024-08-01'), totalConversations: 24 },
  { id: 's-2', name: 'Arun Prakash', email: 'arunprakash@kct.ac.in', department: 'MCA', year: 1, joinedAt: new Date('2025-08-01'), totalConversations: 18 },
  { id: 's-3', name: 'Divya Meenakshi', email: 'divyam@kct.ac.in', department: 'B.E. CSE', year: 2, joinedAt: new Date('2024-08-01'), totalConversations: 31 },
  { id: 's-4', name: 'Karthik Selvan', email: 'karthiks@kct.ac.in', department: 'B.E. Mech', year: 1, joinedAt: new Date('2025-08-01'), totalConversations: 9 },
  { id: 's-5', name: 'Priya Lakshmi', email: 'priyal@kct.ac.in', department: 'MBA', year: 2, joinedAt: new Date('2024-08-01'), totalConversations: 42 },
];

// ────────── Admin Stats ──────────

export const adminStats = {
  totalStudents: 1248,
  totalConversations: 8642,
  totalDocuments: 8,
  totalFAQs: 8,
  activeUsers: 89,
  totalQuestions: 19450,
  answeredQuestions: 18923,
  avgQuestionsPerUser: 15.6,
  mostAskedCategory: 'Academics',
};
