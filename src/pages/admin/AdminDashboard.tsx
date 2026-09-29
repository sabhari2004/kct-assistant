import { Users, MessageSquare, FileText, HelpCircle, UserCheck, TrendingUp, BookOpen, BarChart3 } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import { UsageLineChart } from '../../components/ui/AnalyticsChart';
import { adminStats, dailyUsageData } from '../../data/mockData';

export default function AdminDashboard() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">KCT AI Assistant — Admin Portal</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Admin overview — August 15, 2026
            </p>
          </div>
          <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase border border-amber-200 dark:border-amber-800">
            Frontend Prototype
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Students"
            value={adminStats.totalStudents}
            icon={Users}
            change="+48 this month"
            changeType="up"
            iconColor="text-indigo-600"
            iconBg="bg-indigo-50 dark:bg-indigo-950"
          />
          <StatCard
            title="Conversations"
            value={adminStats.totalConversations}
            icon={MessageSquare}
            change="+1,240 this week"
            changeType="up"
            iconColor="text-blue-600"
            iconBg="bg-blue-50 dark:bg-blue-950"
          />
          <StatCard
            title="Documents"
            value={adminStats.totalDocuments}
            icon={FileText}
            change="4 added recently"
            changeType="neutral"
            iconColor="text-purple-600"
            iconBg="bg-purple-50 dark:bg-purple-950"
          />
          <StatCard
            title="FAQs"
            value={adminStats.totalFAQs}
            icon={HelpCircle}
            change="+12 this month"
            changeType="up"
            iconColor="text-amber-600"
            iconBg="bg-amber-50 dark:bg-amber-950"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Active Users Today"
            value={adminStats.activeUsers}
            icon={UserCheck}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50 dark:bg-emerald-950"
          />
          <StatCard
            title="Total Questions"
            value={adminStats.totalQuestions.toLocaleString()}
            icon={BookOpen}
            iconColor="text-cyan-600"
            iconBg="bg-cyan-50 dark:bg-cyan-950"
          />
          <StatCard
            title="Avg Questions / User"
            value={adminStats.avgQuestionsPerUser}
            icon={BarChart3}
            iconColor="text-pink-600"
            iconBg="bg-pink-50 dark:bg-pink-950"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Usage chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Chatbot Usage</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Last 7 days</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} />
                +23% vs last week
              </div>
            </div>
            <UsageLineChart data={dailyUsageData} />
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Answer Rate</h2>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-24 h-24 mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f3f4f6" strokeWidth="3" className="dark:stroke-gray-800" />
                  <circle
                    cx="18" cy="18" r="15.915" fill="none"
                    stroke="#4F46E5" strokeWidth="3"
                    strokeDasharray={`${(adminStats.answeredQuestions / adminStats.totalQuestions) * 100} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {Math.round((adminStats.answeredQuestions / adminStats.totalQuestions) * 100)}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {adminStats.answeredQuestions.toLocaleString()} of {adminStats.totalQuestions.toLocaleString()} questions answered
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Most Asked</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{adminStats.mostAskedCategory}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Today's Conversations</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{dailyUsageData[dailyUsageData.length - 1].conversations}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
