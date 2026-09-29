import { MessageSquare, BookOpen, CheckCircle, Users } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import { UsageLineChart, CategoryBarChart } from '../../components/ui/AnalyticsChart';
import { dailyUsageData, categoryStatsData, adminStats } from '../../data/mockData';

export default function AnalyticsPage() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Chatbot usage and performance metrics</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Questions" value={adminStats.totalQuestions.toLocaleString()} icon={BookOpen}
            iconColor="text-indigo-600" iconBg="bg-indigo-50 dark:bg-indigo-950" />
          <StatCard title="Answered" value={adminStats.answeredQuestions.toLocaleString()} icon={CheckCircle}
            change="97.3% rate" changeType="up" iconColor="text-emerald-600" iconBg="bg-emerald-50 dark:bg-emerald-950" />
          <StatCard title="Active Users" value={adminStats.activeUsers} icon={Users}
            iconColor="text-blue-600" iconBg="bg-blue-50 dark:bg-blue-950" />
          <StatCard title="Avg / User" value={adminStats.avgQuestionsPerUser} icon={MessageSquare}
            iconColor="text-purple-600" iconBg="bg-purple-50 dark:bg-purple-950" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Daily Usage</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Conversations and questions over the last 7 days</p>
            <UsageLineChart data={dailyUsageData} />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Questions by Category</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Most asked topic categories</p>
            <CategoryBarChart data={categoryStatsData} />
          </div>
        </div>

        {/* Most asked */}
        <div className="mt-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Category Breakdown</h2>
          <div className="space-y-3">
            {categoryStatsData.map((cat) => {
              const max = Math.max(...categoryStatsData.map((c) => c.count));
              const pct = (cat.count / max) * 100;
              return (
                <div key={cat.category} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-gray-500 dark:text-gray-400 text-right flex-shrink-0">{cat.category}</div>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="w-10 text-xs font-medium text-gray-700 dark:text-gray-300">{cat.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
