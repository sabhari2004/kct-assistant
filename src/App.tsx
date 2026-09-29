import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { useAuth } from './hooks/useAuth';

// Layout
import Sidebar from './components/layout/Sidebar';
import MobileSidebar from './components/layout/MobileSidebar';
import Header from './components/layout/Header';
import AdminSidebar from './components/layout/AdminSidebar';

// Student pages
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import CollegeInfoPage from './pages/CollegeInfoPage';
import DocumentsPage from './pages/DocumentsPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';

// Auth pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentsPage from './pages/admin/StudentsPage';
import ConversationsPage from './pages/admin/ConversationsPage';
import FAQsPage from './pages/admin/FAQsPage';
import AdminDocumentsPage from './pages/admin/AdminDocumentsPage';
import NoticesPage from './pages/admin/NoticesPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/chat': { title: 'AI College Assistant', subtitle: 'Ask questions about your college, academics, admissions and more.' },
  '/history': { title: 'Chat History', subtitle: 'Review your past conversations.' },
  '/college-info': { title: 'College Information', subtitle: 'Explore departments, courses, and campus resources.' },
  '/documents': { title: 'Documents', subtitle: 'Official documents used by the AI knowledge base.' },
  '/notifications': { title: 'Notifications', subtitle: 'Stay updated with college announcements.' },
  '/settings': { title: 'Settings', subtitle: 'Manage your preferences.' },
};

// ─── Student shell ─────────────────────────────────────────────────────────────
function StudentShell({ onNewChat }: { onNewChat: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = window.location.pathname;
  const pageInfo = pageTitles[path] || pageTitles['/chat'];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar onNewChat={onNewChat} />
      </div>
      <MobileSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNewChat={onNewChat}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          onMenuClick={() => setMobileOpen(true)}
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ─── Admin shell ───────────────────────────────────────────────────────────────
function AdminShell() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="hidden md:flex flex-shrink-0">
        <AdminSidebar />
      </div>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="h-14 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">KCT AI Assistant Admin</span>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-md">PORTAL</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">RK</span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">Dr. Ramesh Kumar</span>
          </div>
        </header>
        <main className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ─── Protected Route ───────────────────────────────────────────────────────────
function ProtectedRoute({ adminOnly = false }: { adminOnly?: boolean }) {
  const { loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/chat" replace />;
  return <Outlet />;
}

// ─── ChatPage key wrapper ──────────────────────────────────────────────────────
// Forces ChatPage to fully remount when:
//   - A new chat is started (newChatCount changes) → /chat with no params
//   - A different conversation is opened (conv param changes) → /chat?conv=ID
//   - A different category question fires (q param changes) → /chat?q=text
function ChatPageWithKey({ newChatCount }: { newChatCount: number }) {
  const [searchParams] = useSearchParams();
  const conv = searchParams.get('conv') || '';
  const q = searchParams.get('q') || '';
  // Unique key ensures a clean mount for each distinct chat context
  const key = `${newChatCount}-${conv}-${q}`;
  return <ChatPage key={key} />;
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const [newChatCount, setNewChatCount] = useState(0);
  const handleNewChat = useCallback(() => setNewChatCount((n) => n + 1), []);

  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/chat" replace />} />

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Student routes — requires authentication */}
      <Route element={<ProtectedRoute />}>
        <Route element={<StudentShell onNewChat={handleNewChat} />}>
          <Route path="/chat" element={<ChatPageWithKey newChatCount={newChatCount} />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/college-info" element={<CollegeInfoPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Admin routes — requires authentication + admin role */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin" element={<AdminShell />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="conversations" element={<ConversationsPage />} />
          <Route path="faqs" element={<FAQsPage />} />
          <Route path="documents" element={<AdminDocumentsPage />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}
