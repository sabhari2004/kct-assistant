# 🎓 KCT AI College Assistant — Project Documentation

> **Project:** `chatbot_college`
> **Version:** 0.0.0
> **Stack:** React 19 + TypeScript + Vite 8 + Tailwind CSS v4
> **College:** Kumaraguru College of Technology (KCT), Coimbatore

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack & Tools](#-tech-stack--tools)
3. [Project Structure](#-project-structure)
4. [Architecture Diagram](#-architecture-diagram)
5. [Services](#-services)
6. [Components](#-components)
7. [Pages & Routes](#-pages--routes)
8. [Types & Data Models](#-types--data-models)
9. [Contexts](#-contexts)
10. [Custom Hooks](#-custom-hooks)
11. [Mock Data Layer](#-mock-data-layer)
12. [Workflows](#-workflows)
13. [Scripts & Commands](#-scripts--commands)
14. [Environment Variables](#-environment-variables)
15. [Known Issues & TODOs](#-known-issues--todos)
16. [Future Roadmap](#-future-roadmap)

---

## 🏫 Project Overview

The **KCT AI College Assistant** is a full-featured React web application that provides students of Kumaraguru College of Technology an AI-powered chatbot interface. It supports both **Student** and **Admin** portals.

### Key Features

| Feature | Description |
|---|---|
| 💬 AI Chat | Ask questions about academics, admissions, placements, campus life |
| 📜 Chat History | View and manage past conversations |
| 📄 Documents | Browse official college documents used by AI knowledge base |
| 🔔 Notifications | College announcements and exam/placement alerts |
| 🏫 College Info | Departments, courses, and campus resources |
| ⚙️ Settings | Theme, language, chat preferences |
| 🔐 Auth | Login, Register, Forgot Password flows |
| 🛠️ Admin Portal | Dashboard, Students, Conversations, FAQs, Documents, Notices, Analytics |

---

## 🛠️ Tech Stack & Tools

### Core

| Tool | Version | Purpose |
|---|---|---|
| React | `^19.2.8` | UI framework |
| TypeScript | `~6.0.2` | Static type safety |
| Vite | `^8.2.0` | Build tool and dev server |
| React Router DOM | `^7.18.2` | Client-side routing |

### Styling

| Tool | Version | Purpose |
|---|---|---|
| Tailwind CSS | `^4.3.3` | Utility-first CSS |
| @tailwindcss/vite | `^4.3.3` | Vite plugin for Tailwind v4 |

### UI & Visualisation

| Tool | Version | Purpose |
|---|---|---|
| Lucide React | `^1.31.0` | Icon library (1,300+ icons) |
| Recharts | `^3.10.1` | Chart library for admin analytics |

### Linting

| Tool | Version | Purpose |
|---|---|---|
| Oxlint | `^1.75.0` | Fast Rust-based linter |

### Backend (Planned / Stub)

| Tool | Status | Purpose |
|---|---|---|
| Firebase | Stub | Auth, Firestore, Storage |
| Gemini AI | Stub | Generative AI responses |

> **Stub** = Service file exists with mock implementation. Replace with real SDK when backend is ready.

---

## 📁 Project Structure

```
chatbot_college/
├── index.html                    # Vite HTML entry
├── vite.config.ts                # Vite + Tailwind + React config
├── tsconfig.json                 # TypeScript base config
├── tsconfig.app.json             # App-specific TS config
├── tsconfig.node.json            # Node TS config (Vite)
├── package.json                  # Dependencies & scripts
├── .oxlintrc.json                # Oxlint rules
├── .gitignore
│
├── public/                       # Static assets
│
└── src/
    ├── main.tsx                  # App entry point
    ├── App.tsx                   # Root component + routing
    ├── App.css                   # Global app styles
    ├── index.css                 # Tailwind base + design tokens
    │
    ├── types/
    │   └── index.ts              # All TypeScript interfaces & types
    │
    ├── context/
    │   ├── ThemeContext.tsx       # Dark/Light mode provider
    │   └── LanguageContext.tsx   # i18n (English/Tamil) provider
    │
    ├── hooks/
    │   └── useChat.ts            # Chat state & message logic hook
    │
    ├── services/                 # Backend abstraction layer
    │   ├── auth.ts               # Login, register, logout stubs
    │   ├── chat.ts               # Conversation CRUD stubs
    │   ├── documents.ts          # Document upload/delete stubs
    │   ├── firebase.ts           # Firebase SDK config stub
    │   └── gemini.ts             # Gemini AI stub + keyword matcher
    │
    ├── data/                     # Mock data (replaces DB in dev)
    │   ├── mockData.ts           # Central mock data aggregator
    │   └── mockData/
    │       ├── collegeInfo.ts    # KCT college metadata
    │       ├── documents.ts      # Sample college documents
    │       ├── notices.ts        # Sample notices
    │       ├── faqs.ts           # Sample FAQs
    │       └── mockChats.ts      # Sample chat history groups
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.tsx        # Student sidebar (desktop)
    │   │   ├── MobileSidebar.tsx  # Student sidebar (mobile overlay)
    │   │   ├── Header.tsx         # Top header bar
    │   │   └── AdminSidebar.tsx   # Admin portal sidebar
    │   │
    │   ├── chat/
    │   │   ├── ChatWindow.tsx     # Scrollable message list container
    │   │   ├── ChatMessage.tsx    # Individual message bubble
    │   │   ├── MessageInput.tsx   # Chat input box
    │   │   ├── TypingIndicator.tsx # AI typing animation
    │   │   └── WelcomeScreen.tsx  # Chat landing with suggestion cards
    │   │
    │   ├── ui/
    │   │   ├── DocumentCard.tsx   # Card for a college document
    │   │   ├── StatCard.tsx       # Admin dashboard stat tile
    │   │   ├── AnalyticsChart.tsx # Recharts wrapper
    │   │   ├── NotificationPanel.tsx # Notification dropdown
    │   │   ├── ProfileMenu.tsx    # User profile dropdown
    │   │   ├── ThemeToggle.tsx    # Dark/light toggle button
    │   │   └── LanguageSelector.tsx # EN/TA language switcher
    │   │
    │   ├── admin/
    │   │   ├── FAQTable.tsx       # CRUD table for FAQs
    │   │   └── NoticeTable.tsx    # CRUD table for Notices
    │   │
    │   ├── modals/
    │   │   ├── FAQModal.tsx        # Add/edit FAQ dialog
    │   │   ├── FileUploadModal.tsx  # Document upload dialog
    │   │   └── VoiceInputModal.tsx  # Voice input dialog
    │   │
    │   └── modals/               # (Reserved for modal components)
    │
    ├── pages/
    │   ├── ChatPage.tsx           # Main AI chat interface
    │   ├── HistoryPage.tsx        # Conversation history list
    │   ├── CollegeInfoPage.tsx    # College info browser
    │   ├── DocumentsPage.tsx      # Student document viewer
    │   ├── NotificationsPage.tsx  # Notification center
    │   ├── SettingsPage.tsx       # User settings
    │   ├── LoginPage.tsx          # Login screen
    │   ├── RegisterPage.tsx       # Registration screen
    │   ├── ForgotPasswordPage.tsx # Password reset screen
    │   └── admin/
    │       ├── AdminDashboard.tsx  # Admin overview with stats
    │       ├── StudentsPage.tsx    # Student management table
    │       ├── ConversationsPage.tsx # View all conversations
    │       ├── FAQsPage.tsx        # Manage FAQs (scaffold)
    │       ├── AdminDocumentsPage.tsx # Upload/manage documents
    │       ├── NoticesPage.tsx     # Manage notices (scaffold)
    │       └── AnalyticsPage.tsx   # Usage charts & stats
    │
    └── assets/                   # Image/SVG assets
```

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│                                                             │
│  ┌──────────────┐     ┌──────────────┐                     │
│  │ ThemeContext  │     │LanguageCtx   │   (Global Providers)│
│  └──────┬───────┘     └──────┬───────┘                     │
│         │                   │                              │
│  ┌──────▼───────────────────▼──────────────────────────┐   │
│  │                    App.tsx (Router)                  │   │
│  │  ┌───────────────────┐  ┌──────────────────────┐    │   │
│  │  │   StudentShell    │  │     AdminShell        │    │   │
│  │  │ ┌─────────────┐  │  │  ┌────────────────┐   │    │   │
│  │  │ │   Sidebar   │  │  │  │  AdminSidebar  │   │    │   │
│  │  │ ├─────────────┤  │  │  └────────────────┘   │    │   │
│  │  │ │   Header    │  │  │  ┌────────────────┐   │    │   │
│  │  │ ├─────────────┤  │  │  │  Admin Pages   │   │    │   │
│  │  │ │  <Outlet/>  │  │  │  └────────────────┘   │    │   │
│  │  │ │  (Pages)    │  │  └──────────────────────┘    │   │
│  │  │ └─────────────┘  │                              │   │
│  │  └───────────────────┘                              │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               Services Layer                        │   │
│  │  auth.ts | chat.ts | documents.ts | gemini.ts       │   │
│  └─────────────────────────────────────────────────────┘   │
│                      |             |                        │
│  ┌───────────────────┴──┐  ┌───────┴─────────────────┐    │
│  │    Firebase           │  │    Gemini AI API         │    │
│  │  (Auth / Firestore /  │  │  (Generative AI)         │    │
│  │   Storage) [PLANNED]  │  │  [PLANNED]               │    │
│  └───────────────────────┘  └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Services

All service files are in `src/services/`. They follow a **stub pattern** — each function has a mock implementation that can be swapped for real API/SDK calls without changing the calling code.

### `auth.ts` — Authentication Service

| Function | Signature | Description |
|---|---|---|
| `login` | `(email, password) → Promise<User>` | Simulates login (800ms delay) |
| `register` | `(name, email, password) → Promise<User>` | Simulates registration |
| `logout` | `() → Promise<void>` | Simulates logout |
| `resetPassword` | `(email) → Promise<void>` | Simulates password reset email |
| `getCurrentUser` | `() → User or null` | Returns current user from mock |

> **To connect Firebase Auth:** Import `signInWithEmailAndPassword` from `firebase/auth` and replace stub bodies.

---

### `chat.ts` — Conversation Service

| Function | Signature | Description |
|---|---|---|
| `getConversations` | `() → Promise<Conversation[]>` | Fetches all conversations |
| `getConversation` | `(id) → Promise<Conversation or null>` | Fetch single conversation |
| `createConversation` | `(firstMessage) → Promise<Conversation>` | Creates new chat thread |
| `addMessage` | `(convId, message) → Promise<Message>` | Appends message to thread |
| `deleteConversation` | `(id) → Promise<void>` | Deletes a conversation |
| `renameConversation` | `(id, title) → Promise<void>` | Renames a conversation |

> **To connect Firestore:** Replace in-memory array mutations with `addDoc`, `updateDoc`, `deleteDoc` from `firebase/firestore`.

---

### `documents.ts` — Document Service

| Function | Signature | Description |
|---|---|---|
| `getDocuments` | `() → Promise<CollegeDocument[]>` | Lists all documents (300ms delay) |
| `uploadDocument` | `(file, category) → Promise<CollegeDocument>` | Simulates file upload (2s delay) |
| `deleteDocument` | `(id) → Promise<void>` | Removes document from list |

> **To connect Firebase Storage:** Use `uploadBytes` + `getDownloadURL` from `firebase/storage`, and store metadata in Firestore.

---

### `gemini.ts` — AI Service

| Export | Description |
|---|---|
| `sendMessageToAI(userMessage, context?)` | Returns AI response (mock keyword matcher, 1.5–2.5s simulated delay) |
| `geminiStub` | Object indicating Gemini is not yet initialized |

**Keyword matching logic:**

| Keyword Match | Response Returned |
|---|---|
| `subject`, `semester 2`, `mca sem` | MCA subjects info |
| `exam`, `timetable`, `schedule` | Exam schedule |
| `eligib`, `admission`, `requirement` | MCA eligibility info |
| `placement`, `job`, `company` | Placement criteria info |
| *(default)* | General assistant welcome message |

> **To connect Gemini API:** Add `VITE_GEMINI_API_KEY` to `.env`, install `@google/generative-ai`, and replace mock with `genAI.getGenerativeModel('gemini-pro').generateContent(...)`.

---

### `firebase.ts` — Firebase Configuration

Exports `firebaseConfig` object with placeholder values and a `firebaseStub` status object.

> **To initialize:** Replace placeholder values with real Firebase project config and uncomment `initializeApp(firebaseConfig)`.

---

## 🧩 Components

### Layout Components (`src/components/layout/`)

| Component | Props | Description |
|---|---|---|
| `Sidebar` | `onNewChat: () => void` | Desktop navigation sidebar for students |
| `MobileSidebar` | `isOpen, onClose, onNewChat` | Mobile slide-over sidebar |
| `Header` | `onMenuClick, title, subtitle` | Top bar with title, search, notifications, profile |
| `AdminSidebar` | none | Admin portal left navigation |

### Chat Components (`src/components/chat/`)

| Component | Description |
|---|---|
| `ChatWindow` | Scrollable container rendering list of `ChatMessage` items |
| `ChatMessage` | Single message bubble — handles user/assistant, formatting, like/dislike |
| `MessageInput` | Rich textarea input with send button and Enter-to-send toggle support |
| `TypingIndicator` | Animated three-dot indicator while AI is generating |
| `WelcomeScreen` | Shown before first message; renders suggestion cards |

### UI Components (`src/components/ui/`)

| Component | Description |
|---|---|
| `DocumentCard` | Displays document name, category, format badge, size, status, last updated |
| `StatCard` | Admin dashboard KPI tile with icon, value, label, and trend indicator |
| `AnalyticsChart` | Recharts AreaChart wrapper for daily usage data |
| `NotificationPanel` | Dropdown panel listing notifications with read/unread state |
| `ProfileMenu` | User avatar dropdown with settings and logout links |
| `ThemeToggle` | Sun/Moon icon button that toggles dark/light mode |
| `LanguageSelector` | EN / Tamil language switcher |

### Admin Components (`src/components/admin/`)

| Component | Description |
|---|---|
| `FAQTable` | Full CRUD table for FAQ management (add, edit, delete, status toggle) |
| `NoticeTable` | Full CRUD table for Notice management (publish/draft toggle) |

---

## 🗺️ Pages & Routes

### Route Tree

```
/                          → redirect → /chat
│
├── /login                 LoginPage
├── /register              RegisterPage
├── /forgot-password       ForgotPasswordPage
│
├── /chat          [StudentShell]   ChatPage
├── /history       [StudentShell]   HistoryPage
├── /college-info  [StudentShell]   CollegeInfoPage
├── /documents     [StudentShell]   DocumentsPage
├── /notifications [StudentShell]   NotificationsPage
├── /settings      [StudentShell]   SettingsPage
│
└── /admin         [AdminShell]
    ├── /admin/             AdminDashboard
    ├── /admin/students     StudentsPage
    ├── /admin/conversations ConversationsPage
    ├── /admin/faqs         FAQsPage
    ├── /admin/documents    AdminDocumentsPage
    ├── /admin/notices      NoticesPage
    └── /admin/analytics    AnalyticsPage
```

### Shell Components

| Shell | Layout |
|---|---|
| `StudentShell` | `Sidebar` (desktop) + `MobileSidebar` (mobile) + `Header` + Outlet |
| `AdminShell` | `AdminSidebar` + Admin header + Outlet |

---

## 📐 Types & Data Models

Defined in `src/types/index.ts`:

### User & Auth

```ts
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  department?: string;
  year?: number;
  avatar?: string;
}
```

### Chat

```ts
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  liked?: boolean | null;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Documents

```ts
type DocumentCategory =
  | 'All' | 'Syllabus' | 'Regulations'
  | 'Academic Calendar' | 'Notices' | 'Placements';

type DocumentStatus = 'Active' | 'Processing' | 'Archived';

interface CollegeDocument {
  id: string;
  name: string;
  category: Exclude<DocumentCategory, 'All'>;
  format: 'PDF' | 'DOCX' | 'TXT';
  size: string;
  updatedAt: Date;
  status: DocumentStatus;
}
```

### Notifications

```ts
interface Notification {
  id: string;
  title: string;
  description: string;
  time: Date;
  read: boolean;
  type: 'notice' | 'exam' | 'placement' | 'general';
}
```

### Admin

```ts
interface AdminStudent {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  joinedAt: Date;
  totalConversations: number;
}

interface DailyUsage {
  date: string;
  conversations: number;
  questions: number;
}

interface CategoryStat {
  category: string;
  count: number;
}
```

### Settings

```ts
interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'ta';
  enterToSend: boolean;
  showTimestamps: boolean;
  autoScroll: boolean;
  notificationsEnabled: boolean;
}
```

---

## 🌐 Contexts

### `ThemeContext` (`src/context/ThemeContext.tsx`)

| Export | Type | Description |
|---|---|---|
| `ThemeProvider` | React.FC | Wraps app; applies `dark` class to `<html>` |
| `useTheme` | `() => { theme, setTheme }` | Consume theme state anywhere |

**Supported themes:** `'light'` | `'dark'` | `'system'`

---

### `LanguageContext` (`src/context/LanguageContext.tsx`)

| Export | Type | Description |
|---|---|---|
| `LanguageProvider` | React.FC | Wraps app with i18n state |
| `useLanguage` | `() => { language, setLanguage, t }` | Access language and translation function |

**Supported languages:** `'en'` (English) | `'ta'` (Tamil)

---

## 🪝 Custom Hooks

### `useChat` (`src/hooks/useChat.ts`)

Encapsulates all chat state and message submission logic.

| Return Value | Type | Description |
|---|---|---|
| `messages` | `Message[]` | Current conversation messages |
| `isLoading` | `boolean` | `true` while AI is generating |
| `sendMessage` | `(text: string) => Promise<void>` | Send user message and fetch AI response |
| `clearMessages` | `() => void` | Reset chat (used for "New Chat") |

**Workflow inside `sendMessage`:**
1. Append user message to `messages`
2. Set `isLoading = true`
3. Call `sendMessageToAI(text)` from `gemini.ts`
4. Append AI response to `messages`
5. Set `isLoading = false`

---

## 🗃️ Mock Data Layer

Located in `src/data/`. All mock data will be replaced by real Firebase/API calls in production.

| File | Exports | Description |
|---|---|---|
| `mockData.ts` | Central aggregator | Re-exports from modular sources + users, notifications, analytics, admin stats |
| `mockData/collegeInfo.ts` | `kctInfo` | KCT name, location, contact, accreditations |
| `mockData/documents.ts` | `mockDocuments` | Sample college documents list |
| `mockData/notices.ts` | `mockNotices` | Sample notice board entries |
| `mockData/faqs.ts` | `kctFAQs` | Frequently asked questions |
| `mockData/mockChats.ts` | `chatHistoryGroups` | Grouped conversation history |

**Admin Stats (from `mockData.ts`):**

| Stat | Value |
|---|---|
| Total Students | 1,248 |
| Total Conversations | 8,642 |
| Total Documents | 8 |
| Total FAQs | 8 |
| Active Users | 89 |
| Total Questions Asked | 19,450 |
| Answered Questions | 18,923 |
| Avg Questions per User | 15.6 |
| Most Asked Category | Academics |

---

## 🔄 Workflows

### 1. 💬 Chat Workflow

```
User types message
       │
       ▼
MessageInput.tsx → useChat.sendMessage(text)
                          │
              ┌───────────▼───────────┐
              │  Append user Message  │
              │  to messages[]        │
              └───────────┬───────────┘
                          │
              ┌───────────▼───────────┐
              │  isLoading = true     │
              │  TypingIndicator shown│
              └───────────┬───────────┘
                          │
              ┌───────────▼───────────┐
              │ sendMessageToAI(text) │
              │  [gemini.ts service]  │
              │  (mock: 1.5–2.5s)     │
              └───────────┬───────────┘
                          │
              ┌───────────▼───────────┐
              │  Append AI Message    │
              │  isLoading = false    │
              └───────────┬───────────┘
                          │
                          ▼
                 ChatWindow re-renders
                 with new message bubble
```

---

### 2. 📄 Document Upload Workflow (Admin)

```
Admin selects file + category
           │
           ▼
AdminDocumentsPage.tsx
           │
           ▼
uploadDocument(file, category)   ← documents.ts
           │
    ┌──────▼──────┐
    │  2s simulated│
    │    delay     │
    └──────┬──────┘
           │
    ┌──────▼──────────────────┐
    │ Create CollegeDocument  │
    │ Prepend to documents[]  │
    └──────┬──────────────────┘
           │
           ▼
   DocumentCard renders in list
```

---

### 3. 🔐 Authentication Workflow

```
User fills LoginPage form
        │
        ▼
login(email, password)  ← auth.ts
        │
   ┌────▼────┐
   │  800ms  │
   │  delay  │
   └────┬────┘
        │
        ▼
   Returns User object
        │
        ▼
   Navigate to /chat
```

---

### 4. 🌙 Theme Toggle Workflow

```
User clicks ThemeToggle
        │
        ▼
useTheme().setTheme(newTheme)
        │
        ▼
ThemeContext updates state
        │
        ▼
ThemeProvider applies/removes
'dark' class on <html> element
        │
        ▼
Tailwind dark: variants activate
```

---

### 5. 📜 Chat History Workflow

```
HistoryPage mounts
        │
        ▼
getConversations()  ← chat.ts
        │
        ▼
Conversations grouped by date:
Today / Yesterday / Past 7 days / Older
        │
        ▼
User clicks conversation → expand messages
User can delete or rename conversation
        │
        ▼
deleteConversation(id)
  or renameConversation(id, title)  ← chat.ts
```

---

### 6. 📊 Admin Analytics Workflow

```
AnalyticsPage mounts
        │
        ▼
Reads dailyUsageData + categoryStatsData
from mockData.ts
        │
        ▼
AnalyticsChart renders AreaChart (Recharts)
StatCards render KPI tiles
        │
        ▼
[Future] Replace with Firebase aggregate
queries or Cloud Functions endpoints
```

---

## 🧑‍💻 Scripts & Commands

Defined in `package.json`:

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR at `http://localhost:5173` |
| `npm run build` | Type-check with `tsc -b` then bundle with Vite |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint static analysis on the source |

---

## 🌍 Environment Variables

Create a `.env` file at the project root:

```env
# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase (when ready)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Warning:** Never commit `.env` to version control. It is already in `.gitignore`.
> All Vite env vars must be prefixed with `VITE_` to be accessible in the browser.

---

## 🐛 Known Issues & TODOs

| # | File | Issue / TODO |
|---|---|---|
| 1 | `services/gemini.ts` | AI responses are keyword-based mocks — integrate real Gemini SDK |
| 2 | `services/firebase.ts` | Firebase config has placeholder strings — add real credentials |
| 3 | `services/auth.ts` | Auth always returns `currentUser` mock — no real session management |
| 4 | `services/chat.ts` | Conversations stored in-memory, lost on page refresh — add Firestore persistence |
| 5 | `services/documents.ts` | File upload is simulated — no real file stored anywhere |
| 6 | `App.tsx` | No auth guard on routes — any user can access `/admin` or `/chat` |
| 7 | `AdminShell` | Admin user is hardcoded as "Dr. Ramesh Kumar" — tie to real auth session |
| 8 | `gemini.ts` | No RAG (Retrieval Augmented Generation) — documents not passed as AI context |
| 9 | `pages/admin/FAQsPage.tsx` | FAQTable is wired and functional with FAQModal for add/edit |
| 10 | `pages/admin/NoticesPage.tsx` | NoticeTable is wired and functional with publish/draft toggle |

---

## 🚀 Future Roadmap

### Phase 1 — Backend Integration
- [ ] Initialize Firebase project and add real config
- [ ] Replace `auth.ts` stub with Firebase Authentication
- [ ] Replace `chat.ts` stub with Firestore real-time listeners
- [ ] Replace `documents.ts` stub with Firebase Storage upload
- [ ] Connect `gemini.ts` to Gemini API with RAG using uploaded documents

### Phase 2 — Auth & Security
- [ ] Add protected route HOC (redirect unauthenticated users to `/login`)
- [ ] Role-based access control (student vs. admin route guards)
- [ ] Session persistence across page refreshes

### Phase 3 — Features
- [ ] Full-text search across conversations
- [ ] PDF viewer for documents (in-app)
- [ ] Real-time notification push (Firebase Cloud Messaging)
- [ ] Multi-language AI responses (Tamil support)
- [ ] Mobile PWA support
- [ ] Export chat history as PDF

### Phase 4 — Admin Enhancements
- [ ] Complete FAQs management page
- [ ] Complete Notices management page
- [ ] Bulk document upload
- [ ] User ban/suspend functionality
- [ ] Analytics export to CSV

---

## 👥 Roles & Demo Users

| Role | Name | Email | Access |
|---|---|---|---|
| Student | Shree Sabhari | shreesabhari@kct.ac.in | `/chat`, `/history`, `/documents`, `/settings`, `/notifications`, `/college-info` |
| Admin | Dr. Ramesh Kumar | ramesh.kumar@kct.ac.in | `/admin/*` — all admin pages |

---

*Documentation generated on 2026-08-16. Update this file whenever services, routes, or data models change.*
